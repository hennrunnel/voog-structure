
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DomainSettingsGeneral } from "@/components/DomainSettingsGeneral";
import { DomainSettingsDns } from "@/components/DomainSettingsDns";

const DomainSettings = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const domainName = searchParams.get('domain') || 'example.com';
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam === 'dns' ? 'dns' : 'general');

  useEffect(() => {
    if (tabParam === 'dns') {
      setActiveTab('dns');
    }
  }, [tabParam]);

  const handleBackToDomains = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center px-4 py-12">
        {/* Header Container - 992px width, centered */}
        <div className="w-full" style={{ maxWidth: '992px' }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              {/* More prominent back link */}
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
            {/* Custom Tab styling to match screenshot */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex space-x-12">
                <button 
                  onClick={() => setActiveTab("general")} 
                  className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "general" 
                      ? "text-blue-600 border-blue-600" 
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  }`}
                >
                  General
                </button>
                <button 
                  onClick={() => setActiveTab("dns")} 
                  className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "dns" 
                      ? "text-blue-600 border-blue-600" 
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  }`}
                >
                  DNS Settings
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "general" && (
              <div className="space-y-0">
                <DomainSettingsGeneral domainName={domainName} />
              </div>
            )}

            {activeTab === "dns" && (
              <div className="space-y-0">
                <DomainSettingsDns domainName={domainName} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainSettings;
