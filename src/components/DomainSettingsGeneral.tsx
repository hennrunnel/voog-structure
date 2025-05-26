import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DomainSettingsGeneralProps {
  domainName: string;
}

export const DomainSettingsGeneral = ({ domainName }: DomainSettingsGeneralProps) => {
  const [defaultDomainForm, setDefaultDomainForm] = useState("not-specified");
  const [redirecting, setRedirecting] = useState("to-specific-address");
  const [redirectUrl, setRedirectUrl] = useState("http://edicy.voog.com/redirection");
  const [keepSubpagePath, setKeepSubpagePath] = useState(false);
  const [forceSSL, setForceSSL] = useState("allow-non-ssl");
  const [iframePermissions, setIframePermissions] = useState("allow-origin-only");

  // Mock SSL active state - in real app this would come from props
  const sslActive = false;
  const isExternal = true;

  return (
    <div className="grid grid-cols-2 gap-12">
      {/* Left Column - Inputs */}
      <div className="space-y-6">
        {/* Default domain form */}
        <div>
          <Label htmlFor="default-domain-form" className="text-sm font-medium text-gray-900 block mb-2">
            Default domain form
          </Label>
          <Select value={defaultDomainForm} onValueChange={setDefaultDomainForm}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-specified">Not specified</SelectItem>
              <SelectItem value="with-www">www.{domainName}</SelectItem>
              <SelectItem value="without-www">{domainName}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Redirecting */}
        <div>
          <Label htmlFor="redirecting" className="text-sm font-medium text-gray-900 block mb-2">
            Redirecting
          </Label>
          <Select value={redirecting} onValueChange={setRedirecting}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="do-not-redirect">Do not redirect</SelectItem>
              <SelectItem value="to-specific-address">To a specific address</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Redirect address - conditionally shown */}
        {redirecting === "to-specific-address" && (
          <div>
            <Label htmlFor="redirect-url" className="text-sm font-medium text-gray-900 block mb-2">
              Redirect address
            </Label>
            <Input
              id="redirect-url"
              type="url"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              className="w-full"
            />
          </div>
        )}

        {/* Keep subpage path */}
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="keep-subpage-path" className="text-sm font-medium text-gray-900">
              Keep subpage path
            </Label>
            <Select value={keepSubpagePath ? "yes" : "no"} onValueChange={(value) => setKeepSubpagePath(value === "yes")}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Force SSL */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label htmlFor="force-ssl" className="text-sm font-medium text-gray-900">
                Force SSL
              </Label>
              <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xs text-white font-bold">i</span>
              </div>
            </div>
            <Select 
              value={forceSSL} 
              onValueChange={setForceSSL}
              disabled={!sslActive}
            >
              <SelectTrigger className={`w-48 ${!sslActive ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="always-use-ssl">Always use SSL</SelectItem>
                <SelectItem value="allow-non-ssl">Allow non-SSL requests</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Need to transfer - conditional */}
        {isExternal && (
          <div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-900">
                Need to transfer?
              </Label>
              <Button variant="outline" className="text-sm">
                Request code
              </Button>
            </div>
          </div>
        )}

        {/* Allow embedding in IFrame */}
        <div>
          <Label htmlFor="iframe-permissions" className="text-sm font-medium text-gray-900 block mb-2">
            Allow embedding in IFrame
          </Label>
          <Select value={iframePermissions} onValueChange={setIframePermissions}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="allow-origin-only">Allow origin only</SelectItem>
              <SelectItem value="allow-everywhere">Allow everywhere</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Save button */}
        <div className="pt-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Save settings
          </Button>
        </div>
      </div>

      {/* Right Column - Descriptions */}
      <div className="space-y-6 text-xs text-gray-600">
        <div>
          <p>Choose whether your domain should always redirect to www or non-www version.</p>
        </div>
        
        <div>
          <p>Set up automatic redirecting to another website or specific page.</p>
        </div>

        {redirecting === "to-specific-address" && (
          <div>
            <p>Enter the full URL where you want to redirect visitors.</p>
          </div>
        )}

        <div>
          <p>When redirecting, preserve the original page path in the destination URL.</p>
        </div>

        <div>
          <p>Force all visitors to use HTTPS. Requires an active SSL certificate.</p>
        </div>

        {isExternal && (
          <div>
            <p>Request authorization code to transfer domain to another registrar.</p>
          </div>
        )}

        <div>
          <p>Control whether your site can be embedded in frames on other websites.</p>
        </div>
      </div>
    </div>
  );
};
