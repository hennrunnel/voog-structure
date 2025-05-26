
import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DnsRecord {
  id: string;
  subdomain: string;
  type: string;
  value: string;
  isEditable: boolean;
}

interface DomainSettingsDnsProps {
  domainName: string;
}

export const DomainSettingsDns = ({ domainName }: DomainSettingsDnsProps) => {
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

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">DNS Zone for {domainName}</h3>
        <p className="text-sm text-gray-600">
          Manage DNS records for your domain. Changes may take up to 24 hours to propagate globally.
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-sm font-medium text-gray-900">Subdomain</TableHead>
              <TableHead className="text-sm font-medium text-gray-900">Type</TableHead>
              <TableHead className="text-sm font-medium text-gray-900">Value</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dnsRecords.map((record) => (
              <TableRow key={record.id} className="hover:bg-gray-50">
                <TableCell className="py-3">
                  {record.isEditable ? (
                    <Input
                      value={record.subdomain}
                      onChange={(e) => updateDnsRecord(record.id, 'subdomain', e.target.value)}
                      placeholder="@"
                      className="text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">{record.subdomain}</span>
                  )}
                </TableCell>
                <TableCell className="py-3">
                  {record.isEditable ? (
                    <Select value={record.type} onValueChange={(value) => updateDnsRecord(record.id, 'type', value)}>
                      <SelectTrigger className="text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500">
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
                    <span className="text-sm text-gray-900 font-mono">{record.type}</span>
                  )}
                </TableCell>
                <TableCell className="py-3">
                  {record.isEditable ? (
                    <Input
                      value={record.value}
                      onChange={(e) => updateDnsRecord(record.id, 'value', e.target.value)}
                      placeholder="Enter value..."
                      className="text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-sm text-gray-900 font-mono">{record.value}</span>
                  )}
                </TableCell>
                <TableCell className="py-3">
                  {record.isEditable && (
                    <button
                      onClick={() => deleteDnsRecord(record.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={addDnsRecord}
          className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
        >
          + Add DNS record
        </button>
        
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
          Save settings
        </Button>
      </div>
    </div>
  );
};
