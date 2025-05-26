
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DomainSettingsGeneral } from "@/components/DomainSettingsGeneral";
import { DomainSettingsDns } from "@/components/DomainSettingsDns";

const DomainSettings = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const domainName = searchParams.get('domain') || 'example.com';
  const [activeTab, setActiveTab] = useState("general");

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
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={handleBackToDomains}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Back to domains"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-gray-900 text-2xl font-medium">{domainName} settings</h1>
                <div className="p-2 text-gray-400">
                  <Settings className="w-5 h-5" />
                </div>
              </div>
              <div className="flex gap-1">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Domains
                </button>
                <button className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm transition-colors">
                  SSL certificates
                </button>
              </div>
            </div>
            <div className="text-gray-900 font-medium text-xl">VOOG</div>
          </div>
        </div>

        {/* Main Content Card - 992px width, centered */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-full" style={{ maxWidth: '992px' }}>
          <div className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="general" className="text-sm">GENERAL</TabsTrigger>
                <TabsTrigger value="dns" className="text-sm">DNS SETTINGS</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-0">
                <DomainSettingsGeneral domainName={domainName} />
              </TabsContent>

              <TabsContent value="dns" className="space-y-0">
                <DomainSettingsDns domainName={domainName} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainSettings;
