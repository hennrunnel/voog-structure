
import { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DomainItem } from "./DomainItem";

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

interface DomainsListProps {
  onAddToCart: (domain: string) => void;
}

export const DomainsList = ({ onAddToCart }: DomainsListProps) => {
  const [domains, setDomains] = useState([
    {
      name: "creativeagency.com",
      type: "COM",
      sslActive: false,
      expiry: "€16.00 / year",
      expiryDate: "Expired (Mar 15'24)",
      notes: "Redirected to portfolio.voog.com",
      source: "Bought from Voog",
      isExternal: false
    },
    {
      name: "portfolio.voog.com",
      type: "Free Voog domain",
      sslActive: true,
      expiry: "Free forever",
      expiryDate: "",
      notes: "",
      source: "Free Voog domain",
      isExternal: false,
      isPrimary: true
    },
    {
      name: "designstudio.ee",
      type: "EE",
      sslActive: true,
      expiry: "€12.00 / year",
      expiryDate: "Expires Dec 20'25",
      notes: "",
      source: "Bought from Voog",
      isExternal: false
    },
    {
      name: "legacy-site.com",
      type: "COM",
      sslActive: false,
      expiry: "External",
      expiryDate: "Can't extend here",
      notes: "",
      source: "Imported",
      isExternal: true
    },
    {
      name: "mybusiness.org",
      type: "ORG",
      sslActive: true,
      expiry: "€18.00 / year",
      expiryDate: "Expires Sep 10'25",
      notes: "",
      source: "Bought from Voog",
      isExternal: false
    },
    {
      name: "demo-project.net",
      type: "NET",
      sslActive: false,
      expiry: "!",
      expiryDate: "Domain is not registered",
      notes: "",
      source: "",
      isExternal: false
    },
    {
      name: "consulting.biz",
      type: "BIZ",
      sslActive: true,
      expiry: "€22.00 / year",
      expiryDate: "Expires Jan 05'26",
      notes: "",
      source: "Bought from Voog",
      isExternal: false
    },
    {
      name: "personal.voog.com",
      type: "Free Voog domain",
      sslActive: true,
      expiry: "Free forever",
      expiryDate: "",
      notes: "",
      source: "Free Voog domain",
      isExternal: false
    }
  ]);

  const handleOpenSettings = (domain: Domain) => {
    // This function is kept for compatibility but not used anymore
    // Navigation is handled directly in DomainItem component
  };

  const handleRemoveDomain = (domainName: string) => {
    setDomains(prevDomains => prevDomains.filter(domain => domain.name !== domainName));
  };

  return (
    <div className="border border-gray-200 rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Domain</TableHead>
            <TableHead className="w-[10%]">Type</TableHead>
            <TableHead className="w-[15%]">Source</TableHead>
            <TableHead className="w-[15%] text-right">Expiry Price</TableHead>
            <TableHead className="w-[15%]">Status</TableHead>
            <TableHead className="w-[5%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {domains.map((domain, index) => (
            <DomainItem 
              key={domain.name} 
              domain={domain} 
              onAddToCart={onAddToCart}
              onOpenSettings={handleOpenSettings}
              onRemoveDomain={handleRemoveDomain}
              isFirst={index === 0}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
