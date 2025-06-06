
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const FreeDomain = () => {
  const [subdomain, setSubdomain] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Free domain functionality simplified. Subdomain: ${subdomain}.voog.com`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center px-4 py-12">
        {/* Header Container - 992px width, centered */}
        <div className="w-full" style={{ maxWidth: '992px' }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-gray-900 text-2xl font-medium">Add free .voog.com domain</h1>
            </div>
            <div className="text-gray-900 font-medium text-xl">VOOG</div>
          </div>
        </div>

        {/* Main Content Card - 992px width, centered */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-full" style={{ maxWidth: '992px' }}>
          <div className="p-8">
            {/* Tabs with back navigation */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-12">
                <Link to="/" className="pb-4 text-sm font-medium border-b-2 text-gray-900 border-gray-900 flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Domains
                </Link>
              </div>
            </div>

            {/* Simplified Form */}
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input 
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="yourdomain"
                    className="pr-20"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                    .voog.com
                  </span>
                </div>
                <button 
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Take it!
                </button>
              </div>
            </form>

            {/* Placeholder Message */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-gray-700 mb-2">Free domain functionality has been simplified.</p>
              <p className="text-sm text-gray-500">Enter a subdomain and click "Take it!" to see a console log message.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeDomain;
