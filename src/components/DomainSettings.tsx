import { useState } from "react";
import { X, Trash2 } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface DnsRecord {
  id: string;
  subdomain: string;
  type: string;
  value: string;
  isEditable: boolean;
}

interface DomainSettingsProps {
  domain: Domain | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DomainSettings = ({ domain, isOpen, onClose }: DomainSettingsProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [defaultDomainForm, setDefaultDomainForm] = useState("not-specified");
  const [redirecting, setRedirecting] = useState("to-specific-address");
  const [redirectUrl, setRedirectUrl] = useState("http://edicy.voog.com/redirection");
  const [keepSubpagePath, setKeepSubpagePath] = useState(false);
  const [forceSSL, setForceSSL] = useState("allow-non-ssl");
  const [iframePermissions, setIframePermissions] = useState("allow-origin-only");

  const [dnsRecords, setDnsRecords] = useState<DnsRecord[]>([
    { id: '1', subdomain: '@', type: 'SOA', value: '▶ ns1.voog.com.', isEditable: false },
    { id: '2', subdomain: '', type: 'NS', value: 'ns1.voog.com.', isEditable: false },
    { id: '3', subdomain: '', type: 'NS', value: 'ns2.voog.com.', isEditable: false },
    { id: '4', subdomain: '', type: 'NS', value: 'ns.voog.in.', isEditable: false },
    { id: '5', subdomain: '', type: 'A', value: '85.222.234.11', isEditable: true },
    { id: '6', subdomain: 'www', type: 'CNAME', value: 'clients.edicy.net.', isEditable: true },
    { id: '7', subdomain: '', type: 'MX', value: '1 ASPMX.L.GOOGLE.COM.', isEditable: true },
    { id: '8', subdomain: '', type: 'MX', value: '5 ALT1.ASPMX.L.GOOGLE.COM.', isEditable: true },
    { id: '9', subdomain: '', type: 'MX', value: '5 ALT2.ASPMX.L.GOOGLE.COM.', isEditable: true },
    { id: '10', subdomain: '', type: 'MX', value: '10 ASPMX2.GOOGLEMAIL.COM.', isEditable: true },
    { id: '11', subdomain: '', type: 'MX', value: '10 ASPMX3.GOOGLEMAIL.COM.', isEditable: true },
    { id: '12', subdomain: 'mail', type: 'CNAME', value: 'ghs.GOOGLE.COM.', isEditable: true },
    { id: '13', subdomain: '@', type: 'A', value: '', isEditable: true },
  ]);

  const updateDnsRecord = (id: string, field: keyof DnsRecord, value: string) => {
    setDnsRecords(prev => 
      prev.map(record => 
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const deleteDnsRecord = (id: string) => {
    setDnsRecords(prev => prev.filter(record => record.id !== id));
  };

  const addDnsRecord = () => {
    const newRecord: DnsRecord = {
      id: Date.now().toString(),
      subdomain: '',
      type: 'A',
      value: '',
      isEditable: true
    };
    setDnsRecords(prev => [...prev, newRecord]);
  };

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
        </SheetHeader>

        <div className="p-8 pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="general" className="text-sm">GENERAL</TabsTrigger>
              <TabsTrigger value="dns" className="text-sm">DNS SETTINGS</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="dns" className="space-y-0">
              {/* DNS Table Container with blue gradient background */}
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-8">
                {/* Back to domains link */}
                <div className="mb-6">
                  <button className="text-white/80 hover:text-white text-sm flex items-center space-x-2 transition-colors">
                    <span>←</span>
                    <span>Back to all domains</span>
                  </button>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                  <h2 className="text-white text-2xl font-medium mb-4">{domain.name} settings</h2>
                  <div className="flex justify-center space-x-8">
                    <button 
                      onClick={() => setActiveTab("general")}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      GENERAL
                    </button>
                    <button className="text-white text-sm border-b-2 border-white pb-1">
                      DNS SETTINGS
                    </button>
                  </div>
                </div>

                {/* DNS Table */}
                <div className="bg-white/10 rounded border border-white/20">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/20 text-white font-medium text-sm">
                    <div className="col-span-3">Subdomain</div>
                    <div className="col-span-3">Type</div>
                    <div className="col-span-5">Location</div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-white/20">
                    {dnsRecords.map((record) => (
                      <div key={record.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                        <div className="col-span-3">
                          {record.isEditable ? (
                            <Input
                              value={record.subdomain}
                              onChange={(e) => updateDnsRecord(record.id, 'subdomain', e.target.value)}
                              placeholder="Type here..."
                              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm"
                            />
                          ) : (
                            <span className="text-white text-sm">{record.subdomain}</span>
                          )}
                        </div>
                        <div className="col-span-3">
                          {record.isEditable ? (
                            <Select value={record.type} onValueChange={(value) => updateDnsRecord(record.id, 'type', value)}>
                              <SelectTrigger className="bg-white/20 border-white/30 text-white text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A">A</SelectItem>
                                <SelectItem value="CNAME">CNAME</SelectItem>
                                <SelectItem value="MX">MX</SelectItem>
                                <SelectItem value="TXT">TXT</SelectItem>
                                <SelectItem value="SRV">SRV</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <span className="text-white text-sm">{record.type}</span>
                          )}
                        </div>
                        <div className="col-span-5">
                          {record.isEditable ? (
                            <Input
                              value={record.value}
                              onChange={(e) => updateDnsRecord(record.id, 'value', e.target.value)}
                              placeholder="Type here..."
                              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm"
                            />
                          ) : (
                            <span className="text-white text-sm">{record.value}</span>
                          )}
                        </div>
                        <div className="col-span-1">
                          {record.isEditable && (
                            <button
                              onClick={() => deleteDnsRecord(record.id)}
                              className="text-white/60 hover:text-white transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add new record */}
                  <div className="p-4 border-t border-white/20">
                    <button
                      onClick={addDnsRecord}
                      className="text-white/80 hover:text-white text-sm transition-colors"
                    >
                      Add another DNS record...
                    </button>
                  </div>
                </div>

                {/* Save button */}
                <div className="mt-8 flex justify-start">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                    Save settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
