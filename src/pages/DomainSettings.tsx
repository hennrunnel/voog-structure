
import { ArrowLeft } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

const DomainSettings = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const domainName = searchParams.get('domain') || 'example.com';

  const handleBackToDomains = () => {
    navigate('/');
  };

  const handleSaveSettings = () => {
    console.log(`Domain settings save functionality simplified for: ${domainName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center px-4 py-12">
        {/* Header Container - 992px width, centered */}
        <div className="w-full" style={{ maxWidth: '992px' }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              {/* Back link */}
              <div className="mb-6">
                <button 
                  onClick={handleBackToDomains} 
                  className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to all domains</span>
                </button>
              </div>
              
              <h1 className="text-gray-900 text-2xl font-medium">{domainName} settings</h1>
            </div>
            <div className="text-gray-900 font-medium text-xl">VOOG</div>
          </div>
        </div>

        {/* Main Content Card - 992px width, centered */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-full" style={{ maxWidth: '992px' }}>
          <div className="p-8">
            {/* Tab headers */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex space-x-12">
                <button className="pb-4 text-sm font-medium border-b-2 text-blue-600 border-blue-600">
                  General
                </button>
                <button className="pb-4 text-sm font-medium border-b-2 text-gray-500 border-transparent hover:text-gray-700">
                  DNS Settings
                </button>
              </div>
            </div>

            {/* Simplified Content */}
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-2">Domain Settings Simplified</h3>
                <p className="text-sm text-gray-700 mb-4">
                  The domain settings functionality has been simplified for demonstration purposes. 
                  Complex form handling, DNS management, and SSL configuration have been removed.
                </p>
                <p className="text-xs text-gray-500">
                  Click the button below to see a console log message instead of actual settings save.
                </p>
              </div>

              <button 
                onClick={handleSaveSettings}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Save settings (console log)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainSettings;
