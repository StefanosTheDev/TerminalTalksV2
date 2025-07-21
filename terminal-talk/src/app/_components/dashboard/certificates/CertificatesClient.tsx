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
        </div>
      ))}
    </div>
  );
};

export default CertificatesClient;
