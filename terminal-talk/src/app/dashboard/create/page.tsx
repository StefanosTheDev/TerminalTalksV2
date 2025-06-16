// Server Component
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/nextAuth';

export default async function createLecture() {
  // Step 1: Get the SErver Session
  const session = await getServerSession(authOptions);

  // Verify Server Session is Exists.
  if (!session) {
    return <p> You must be llogged in etc </p>;
  }

  return <p> Create Page Now </p>;
}
