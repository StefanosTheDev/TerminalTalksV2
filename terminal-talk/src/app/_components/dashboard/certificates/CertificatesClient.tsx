'use client';

import React from 'react';
import { Certificate } from '@prisma/client';
import { Star } from 'lucide-react';

interface CertificatesClientProps {
  certificates: (Certificate & { course: { title: string } })[];
}

export const CertificatesClient: React.FC<CertificatesClientProps> = ({
  certificates,
}) => {
  const handleDownload = async (certId: number, title: string) => {
    try {
      const res = await fetch(`/api/certificates/${certId}/download`);
      if (!res.ok) throw new Error('Network response was not ok');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}-certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certificates.map((cert) => (
        <div
          key={cert.id}
          className="overflow-hidden rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm flex flex-col"
        >
          {/* Badge Row */}
          <div className="flex items-center justify-between p-4">
            <span className="rounded bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-400">
              CERTIFICATE
            </span>
            <span className="text-xs font-semibold text-gray-300">
              Completed {new Date(cert.issuedAt).toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <div className="px-6 pb-6 flex-1">
            <h3 className="mb-2 text-lg font-semibold text-white">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              {cert.course.title}
            </h3>
          </div>

          {/* Download Button */}
          {/* <div className="px-6 pb-6">
            <button
              onClick={() => handleDownload(cert.id, cert.course.title)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            ></button>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default CertificatesClient;
