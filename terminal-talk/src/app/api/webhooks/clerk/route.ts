import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import prisma from '@/app/_lib/prisma';

export async function POST(req: Request) {
  console.log('WebHook Endpoint Hit');
  // const secret = process.env.SIGNING_SECRET;
  const secret = 'https://terminaltalks.vercel.app/api/webhooks/clerk';
  if (!secret) return new Response('Missing secret', { status: 500 });

  const wh = new Webhook(secret);
  const body = await req.text();
  const headerPayload = await headers();

  const event = wh.verify(body, {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  }) as WebhookEvent;

  if (event.type === 'user.created') {
    // Create User
    const { id, email_addresses, first_name, last_name } = event.data;
    await prisma.user.upsert({
      where: { clerkId: id },
      update: {},
      create: {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
      },
    });
  }

  if (event.type === 'user.deleted') {
    const { id } = event.data;

    // Optional: Remove related records (e.g., bookmarks)
    await prisma.bookmark.deleteMany({
      where: { user: { clerkId: id } },
    });

    // Then delete the user itself
    await prisma.user.delete({
      where: { clerkId: id },
    });

    console.log(`🗑️ Deleted user and related data for Clerk ID: ${id}`);
  }
  if (event.type === 'user.updated') {
  }

  return new Response('OK');
}
