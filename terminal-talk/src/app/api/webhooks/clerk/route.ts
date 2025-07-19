// src/app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import prisma from '@/app/_lib/prisma';

export async function POST(req: Request) {
  console.log('WebHook Endpoint Hit');
  const secret = process.env.SIGNING_SECRET;
  if (!secret) {
    console.error('Missing SIGNING_SECRET');
    return new Response('Missing secret', { status: 500 });
  }

  // 1) verify payload
  const wh = new Webhook(secret);
  const body = await req.text();
  const headerPayload = await headers();

  let event: WebhookEvent;
  try {
    event = wh.verify(body, {
      'svix-id': headerPayload.get('svix-id')!,
      'svix-timestamp': headerPayload.get('svix-timestamp')!,
      'svix-signature': headerPayload.get('svix-signature')!,
    }) as WebhookEvent;
  } catch (err) {
    console.error('❌ Webhook signature verification failed', err);
    return new Response('Invalid signature', { status: 400 });
  }

  // 2) Handle events
  try {
    if (event.type === 'user.created' || event.type === 'user.updated') {
      const { id, email_addresses, username } = event.data;
      if (!username || email_addresses.length === 0) {
        console.warn(
          'Missing username or email on user.updated/created',
          event.data
        );
        return new Response('Incomplete data', { status: 400 });
      }

      // Upsert will insert on created, update on subsequent changes
      await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email: email_addresses[0].email_address,
          username,
        },
        create: {
          clerkId: id,
          email: email_addresses[0].email_address,
          username,
        },
      });

      console.log(`✅ Upserted user ${id} (${event.type})`);
    }

    if (event.type === 'user.deleted') {
      const { id } = event.data;

      // deleteMany won't throw if no rows match
      const deleted = await prisma.user.deleteMany({
        where: { clerkId: id },
      });
      console.log(`🗑️ Deleted ${deleted.count} user(s) for Clerk ID: ${id}`);
    }
  } catch (err) {
    console.error('❌ Error handling webhook:', err);
    return new Response('Server error', { status: 500 });
  }

  // 3) Done
  return new Response('OK');
}
