
import { Shield, Info } from "lucide-react";

export const SslCertificatesView = () => {
  const handleAutoActivateClick = () => {
    console.log("Auto-activate SSL functionality has been removed");
  };

  const handleUploadClick = () => {
    console.log("Upload SSL functionality has been removed");
  };

  return (
    <div>
      {/* Action Buttons */}
      <div className="flex space-x-3 mb-6">
        <button 
          onClick={handleAutoActivateClick}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm font-medium rounded-lg px-4 transition-colors"
        >
          Auto-activate
        </button>
        <button 
          onClick={handleUploadClick}
          className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 py-3 text-sm font-medium rounded-lg px-4 transition-colors flex items-center space-x-2"
        >
          <span>Upload...</span>
        </button>
      </div>

      {/* Info Block */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-700">
          <p className="mb-2">
            SSL certificate management functionality has been simplified for demonstration purposes.
          </p>
          <p>
            The auto-activate and upload features have been removed from this interface.
          </p>
        </div>
      </div>

      {/* Simplified Empty State */}
      <div className="text-center py-12 text-gray-500">
        <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-sm">SSL certificate management has been removed from this view.</p>
        <p className="text-xs text-gray-400 mt-2">Click the buttons above to see console logs.</p>
      </div>
    </div>
  );
};
