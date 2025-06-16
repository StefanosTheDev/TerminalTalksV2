// Server Component
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth/nextAuth';

export default async function createLecture() {
  // Step 1: Get the SErver Session
  const session = await getServerSession(authOptions);

  // Verify Server Session is Exists.
  if (!session) {
    return <p> You must be llogged in etc </p>;
  }

  return (
    <div className="dashboard-create">
      <h1> Test </h1>
    </div>
  );
}
