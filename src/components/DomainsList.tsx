
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
  const domains = [
    {
      name: "myawesomeblog.com",
      type: "COM",
      sslActive: false,
      expiry: "€16.00 / year",
      expiryDate: "Expired (Mar 15'24)",
      notes: "Redirected to http://edicy.voog.com/redirection",
      source: "Bought from Voog",
      isExternal: false
    },
    {
      name: "creativestudio.voog.com",
      type: "Free Voog domain",
      sslActive: true,
      expiry: "Free forever",
      expiryDate: "",
      notes: "",
      source: "",
      isExternal: false
    },
    {
      name: "portfolio.voog.com",
      type: "Free Voog domain",
      sslActive: true,
      expiry: "Free forever",
      expiryDate: "",
      notes: "",
      source: "",
      isExternal: false,
      isPrimary: true
    },
    {
      name: "designagency.ee",
      type: "EE",
      sslActive: true,
      expiry: "€12.00 / year",
      expiryDate: "Expires Dec 20'25",
      notes: "",
      source: "Bought from Voog",
      isExternal: false
    },
    {
      name: "oldcompany.com",
      type: "COM",
      sslActive: false,
      expiry: "External",
      expiryDate: "Can't extend here",
      notes: "Imported",
      source: "",
      isExternal: true
    },
    {
      name: "marketing-site.org",
      type: "ORG",
      sslActive: true,
      expiry: "€18.00 / year",
      expiryDate: "Expires Sep 10'25",
      notes: "",
      source: "Bought from Voog",
      isExternal: false
    },
    {
      name: "startup-demo.net",
      type: "NET",
      sslActive: false,
      expiry: "!",
      expiryDate: "Domain is not registered",
      notes: "",
      source: "",
      isExternal: false
    },
    {
      name: "consultancy.biz",
      type: "BIZ",
      sslActive: true,
      expiry: "€22.00 / year",
      expiryDate: "Expires Jan 05'26",
      notes: "",
      source: "Bought from Voog",
      isExternal: false
    }
  ];

  const handleOpenSettings = (domain: Domain) => {
    // This function is kept for compatibility but not used anymore
    // Navigation is handled directly in DomainItem component
  };

  return (
    <div className="divide-y divide-gray-100">
      {domains.map((domain, index) => (
        <DomainItem 
          key={index} 
          domain={domain} 
          onAddToCart={onAddToCart}
          onOpenSettings={handleOpenSettings}
        />
      ))}
    </div>
  );
};
