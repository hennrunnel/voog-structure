
import { useState } from "react";
import { Shield, Upload, Info } from "lucide-react";
import { AutoActivateSidebar } from "./AutoActivateSidebar";
import { UploadSslSidebar } from "./UploadSslSidebar";

interface SslCertificate {
  domain: string;
  provider: string;
  active: boolean;
  validTo: string;
}

export const SslCertificatesView = () => {
  const [certificates, setCertificates] = useState<SslCertificate[]>([]);
  const [isAutoActivateOpen, setIsAutoActivateOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleAutoActivateSave = (selectedDomains: string[]) => {
    const newCertificates = selectedDomains.map(domain => ({
      domain,
      provider: "Let's Encrypt",
      active: true,
      validTo: "Mar 15, 2025"
    }));
    setCertificates(prev => [...prev, ...newCertificates]);
  };

  return (
    <div>
      {/* Action Buttons */}
      <div className="flex space-x-3 mb-6">
        <button 
          onClick={() => setIsAutoActivateOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm font-medium rounded-lg px-4 transition-colors"
        >
          Auto-activate
        </button>
        <button 
          onClick={() => setIsUploadOpen(true)}
          className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 py-3 text-sm font-medium rounded-lg px-4 transition-colors flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Upload...</span>
        </button>
      </div>

      {/* Info Block */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-700">
          <p className="mb-2">
            Secure any of your domains with free, auto-renewing Let's Encrypt SSL.
          </p>
          <p>
            Premium users can upload custom certificates or email them to support@voog.com for setup.
          </p>
        </div>
      </div>

      {/* Certificates Table or Empty State */}
      {certificates.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-sm">You haven't added any SSL certificates to your domains yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Domain</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Provider</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Active</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Valid to</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert, index) => (
                <tr key={cert.domain} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{cert.domain}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{cert.provider}</td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center space-x-2">
                      {cert.active ? (
                        <>
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Yes</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400">No</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{cert.validTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AutoActivateSidebar 
        isOpen={isAutoActivateOpen} 
        onClose={() => setIsAutoActivateOpen(false)}
        onSave={handleAutoActivateSave}
      />
      
      <UploadSslSidebar 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
      />
    </div>
  );
};
