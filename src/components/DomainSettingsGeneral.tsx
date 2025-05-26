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
    <div className="space-y-8">
      {/* Default domain form row */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label htmlFor="default-domain-form" className="text-sm font-medium text-gray-900 block mb-3">
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
        <div className="text-xs text-gray-600 pt-7">
          <p>Choose whether your domain should always redirect to www or non-www version.</p>
        </div>
      </div>

      {/* Redirecting row */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label htmlFor="redirecting" className="text-sm font-medium text-gray-900 block mb-3">
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
        <div className="text-xs text-gray-600 pt-7">
          <p>Set up automatic redirecting to another website or specific page.</p>
        </div>
      </div>

      {/* Redirect address row - conditionally shown */}
      {redirecting === "to-specific-address" && (
        <div className="grid grid-cols-2 gap-8">
          <div>
            <Label htmlFor="redirect-url" className="text-sm font-medium text-gray-900 block mb-3">
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
          <div className="text-xs text-gray-600 pt-7">
            <p>Enter the full URL where you want to redirect visitors.</p>
          </div>
        </div>
      )}

      {/* Keep subpage path row */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label htmlFor="keep-subpage-path" className="text-sm font-medium text-gray-900 block mb-3">
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
        <div className="text-xs text-gray-600 pt-7">
          <p>When redirecting, preserve the original page path in the destination URL.</p>
        </div>
      </div>

      {/* Force SSL row */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label htmlFor="force-ssl" className="text-sm font-medium text-gray-900 block mb-3">
            Force SSL
            <div className="inline-block w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center ml-2">
              <span className="text-xs text-white font-bold">i</span>
            </div>
          </Label>
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
        <div className="text-xs text-gray-600 pt-7">
          <p>Force all visitors to use HTTPS. Requires an active SSL certificate.</p>
        </div>
      </div>

      {/* Need to transfer row - conditional */}
      {isExternal && (
        <div className="grid grid-cols-2 gap-8">
          <div>
            <Label className="text-sm font-medium text-gray-900 block mb-3">
              Need to transfer?
            </Label>
            <Button variant="outline" className="text-sm">
              Request code
            </Button>
          </div>
          <div className="text-xs text-gray-600 pt-7">
            <p>Request authorization code to transfer domain to another registrar.</p>
          </div>
        </div>
      )}

      {/* Allow embedding in IFrame row */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label htmlFor="iframe-permissions" className="text-sm font-medium text-gray-900 block mb-3">
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
        <div className="text-xs text-gray-600 pt-7">
          <p>Control whether your site can be embedded in frames on other websites.</p>
        </div>
      </div>

      {/* Save and Cancel buttons */}
      <div className="pt-8">
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm font-medium rounded-lg">
            Save
          </Button>
          <Button variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 px-6 py-2 text-sm font-medium rounded-lg">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
