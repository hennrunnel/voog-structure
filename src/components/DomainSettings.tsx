import { useState } from "react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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

interface Domain {
  name: string;
  type: string;
  sslActive: boolean;
  expiry: string;
  expiryDate: string;
  notes: string;
  source: string;
  isExternal: boolean;
  isPrimary?: boolean;
}

interface DomainSettingsProps {
  domain: Domain | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DomainSettings = ({ domain, isOpen, onClose }: DomainSettingsProps) => {
  const [defaultDomainForm, setDefaultDomainForm] = useState("not-specified");
  const [redirecting, setRedirecting] = useState("to-specific-address");
  const [redirectUrl, setRedirectUrl] = useState("http://edicy.voog.com/redirection");
  const [keepSubpagePath, setKeepSubpagePath] = useState(false);
  const [forceSSL, setForceSSL] = useState("allow-non-ssl");
  const [iframePermissions, setIframePermissions] = useState("allow-origin-only");

  if (!domain) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-2xl bg-white p-0 border-l border-gray-200 shadow-sm rounded-none h-full overflow-y-auto">
        <SheetHeader className="p-8 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-medium text-gray-900">
              {domain.name} settings
            </SheetTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="mt-4">
            <div className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded border border-blue-200 inline-block font-medium">
              GENERAL
            </div>
          </div>
        </SheetHeader>

        <div className="p-8 pt-6 space-y-6">
          {/* Default domain form */}
          <div className="py-4">
            <Label htmlFor="default-domain-form" className="text-sm font-medium text-gray-900 block mb-2">
              Default domain form
            </Label>
            <Select value={defaultDomainForm} onValueChange={setDefaultDomainForm}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-specified">Not specified</SelectItem>
                <SelectItem value="with-www">www.{domain.name}</SelectItem>
                <SelectItem value="without-www">{domain.name}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Redirecting */}
          <div className="py-4">
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
            <div className="py-4">
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
          <div className="py-4">
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
          <div className="py-4">
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
                disabled={!domain.sslActive}
              >
                <SelectTrigger className={`w-48 ${!domain.sslActive ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
          {domain.isExternal && (
            <div className="py-4">
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
          <div className="py-4">
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
          <div className="pt-8">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Save settings
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
