import CertificatesClient from '@/app/_components/dashboard/certificates/CertificatesClient';
import { fetchAccountCertificates } from '@/app/_lib/services/utilService';
import { currentUser } from '@clerk/nextjs/server';

export default async function CertificatesPage() {
  const user = await currentUser();
  if (!user) {
    return (
      <p className="text-red-500">Please sign in to see your certificates.</p>
    );
  }

  const certs = await fetchAccountCertificates(user.id);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Certificates</h1>
      {/* Pass the fetched certificates into the client component */}
      <CertificatesClient certificates={certs} />
    </div>
  );
}
