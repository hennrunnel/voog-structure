import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface DomainSettingsGeneralProps {
  domainName: string;
}

export const DomainSettingsGeneral = ({
  domainName
}: DomainSettingsGeneralProps) => {
  const [defaultDomainForm, setDefaultDomainForm] = useState("not-specified");
  const [redirecting, setRedirecting] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("http://edicy.voog.com/redirection");
  const [keepSubpagePath, setKeepSubpagePath] = useState(false);
  const [forceSSL, setForceSSL] = useState("allow-non-ssl");
  const [allowIframeEmbedding, setAllowIframeEmbedding] = useState(false);

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

      {/* Redirecting row - now with toggle */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label htmlFor="redirecting" className="text-sm font-medium text-gray-900 block mb-3">
            Redirecting
          </Label>
          <Switch
            id="redirecting"
            checked={redirecting}
            onCheckedChange={setRedirecting}
          />
        </div>
        <div className="text-xs text-gray-600 pt-7">
          <p>Set up automatic redirecting to another website or specific page.</p>
        </div>
      </div>

      {/* Redirect address row - conditionally shown */}
      {redirecting && (
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

      {/* Keep subpage path row - now with toggle */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label htmlFor="keep-subpage-path" className="text-sm font-medium text-gray-900 block mb-3">
            Keep subpage path
          </Label>
          <Switch
            id="keep-subpage-path"
            checked={keepSubpagePath}
            onCheckedChange={setKeepSubpagePath}
          />
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
          </Label>
          <Select value={forceSSL} onValueChange={setForceSSL} disabled={!sslActive}>
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
          <p>This domain does not have an SSL certificate. You can upload your own or auto-activate a free certificate in SSL certificates.</p>
        </div>
      </div>

      {/* Allow embedding in IFrame row - now with toggle */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <Label htmlFor="iframe-embedding" className="text-sm font-medium text-gray-900 block mb-3">
            Allow embedding in iframe
          </Label>
          <Switch
            id="iframe-embedding"
            checked={allowIframeEmbedding}
            onCheckedChange={setAllowIframeEmbedding}
          />
        </div>
        <div className="text-xs text-gray-600 pt-7">
          <p>Control whether your site can be embedded in frames on other websites.</p>
        </div>
      </div>

      {/* Need to transfer row - conditional with blue text link */}
      {isExternal && (
        <div className="grid grid-cols-2 gap-8">
          <div>
            <Label className="text-sm font-medium text-gray-900 block mb-3">
              Need to transfer?
            </Label>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium underline">
              Request code
            </button>
          </div>
          <div className="text-xs text-gray-600 pt-7">
            <p>Request authorization code to transfer domain to another registrar. Contact our support team for assistance.</p>
          </div>
        </div>
      )}

      {/* Save and Cancel buttons - Narrow inline style */}
      <div className="pt-8 flex space-x-3">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm font-medium rounded-lg px-4">
          Save
        </Button>
        <Button variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 py-3 text-sm font-medium rounded-lg px-4">
          Cancel
        </Button>
      </div>
    </div>
  );
};
