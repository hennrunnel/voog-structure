
import { useState } from "react";
import { Shield, Upload, Info } from "lucide-react";
import { AutoActivateSidebar } from "./AutoActivateSidebar";
import { UploadSslSidebar } from "./UploadSslSidebar";

export const SslCertificatesView = () => {
  const [certificates] = useState([
    {
      domain: "creativeagency.com",
      provider: "Let's Encrypt",
      active: true,
      validTo: "Mar 15, 2025"
    },
    {
      domain: "portfolio.voog.com",
      provider: "Voog SSL",
      active: true,
      validTo: "Dec 20, 2025"
    },
    {
      domain: "designstudio.ee",
      provider: "Let's Encrypt",
      active: true,
      validTo: "Jan 10, 2026"
    },
    {
      domain: "legacy-site.com",
      provider: "External",
      active: false,
      validTo: "Expired"
    },
    {
      domain: "mybusiness.org",
      provider: "Let's Encrypt",
      active: true,
      validTo: "Sep 10, 2025"
    }
  ]);

  const [isAutoActivateOpen, setIsAutoActivateOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div>
      {/* Action Buttons */}
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setIsAutoActivateOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
        >
          Auto-activate
        </button>
        <button 
          onClick={() => setIsUploadOpen(true)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center space-x-2"
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
            You can add Let's Encrypt SSL certificates to one or several of your domains. They come free of charge and will be renewed automatically every three months.
          </p>
          <p>
            Our Premium plan allows you to use SSL certificates from alternative providers. All you have to do is click and upload the certificate files or send them via e-mail to support@voog.com. We'll set them up for you.
          </p>
        </div>
      </div>

      {/* Certificates Table */}
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
                        <span className="text-green-600">Active</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">Inactive</span>
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

      <AutoActivateSidebar 
        isOpen={isAutoActivateOpen} 
        onClose={() => setIsAutoActivateOpen(false)} 
      />
      
      <UploadSslSidebar 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
      />
    </div>
  );
};
