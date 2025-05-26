
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload } from "lucide-react";

const SslCertificatesView = () => {
  // Mock data for SSL certificates
  const certificates = [
    {
      domain: "taneltestib.edicy.co",
      provider: "Let's Encrypt",
      active: "Yes",
      validTo: "Aug 01, 2025"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-md">
          Auto-activate...
        </Button>
        <Button variant="outline" className="font-medium rounded-md">
          <Upload className="w-4 h-4 mr-2" />
          Upload...
        </Button>
      </div>

      {/* Info Block */}
      <div className="bg-purple-50 rounded-lg p-4">
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            You can add <span className="font-medium">Let's Encrypt</span> SSL certificates to one or several of your domains. 
            They come free of charge and will be renewed automatically in every three months.
          </p>
          <div className="flex items-center gap-2 my-3">
            <div className="w-px h-6 bg-gray-300"></div>
            <span className="text-gray-500">OR</span>
            <div className="w-px h-6 bg-gray-300"></div>
          </div>
          <p>
            Our <span className="font-medium">Premium plan</span> allows you to use SSL certificates from alternative 
            providers. All you have to do is to click and upload the certificate files or 
            send them via e-mail to <span className="font-medium">support@voog.com</span>. We'll set them up for you.
          </p>
        </div>
      </div>

      {/* SSL Certificates Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600 font-medium">DOMAIN</TableHead>
              <TableHead className="text-gray-600 font-medium">PROVIDER</TableHead>
              <TableHead className="text-gray-600 font-medium">ACTIVE</TableHead>
              <TableHead className="text-gray-600 font-medium">VALID TO</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.map((cert, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{cert.domain}</TableCell>
                <TableCell>{cert.provider}</TableCell>
                <TableCell>{cert.active}</TableCell>
                <TableCell>{cert.validTo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export { SslCertificatesView };
