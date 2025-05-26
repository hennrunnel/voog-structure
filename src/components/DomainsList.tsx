
import { DomainItem } from "./DomainItem";

interface DomainsListProps {
  onAddToCart: (domain: string) => void;
}

export const DomainsList = ({ onAddToCart }: DomainsListProps) => {
  const domains = [
    {
      name: "kasitis-ostetud.com",
      type: "COM",
      sslActive: false,
      expiry: "€16.00 / year",
      expiryDate: "Expired (Aug 19'16)",
      notes: "Redirected to http://edicy.voog.com/redirection",
      source: "Bought from Voog",
      isExternal: false
    },
    {
      name: "minuipva.voog.construction",
      type: "Free Voog domain",
      sslActive: true,
      expiry: "Free forever",
      expiryDate: "",
      notes: "",
      source: "",
      isExternal: false
    },
    {
      name: "t.voog.construction",
      type: "Free Voog domain",
      sslActive: true,
      expiry: "Free forever",
      expiryDate: "",
      notes: "",
      source: "",
      isExternal: false
    },
    {
      name: "tanel-cert-test-2019-2.voog.construction",
      type: "Free Voog domain",
      sslActive: true,
      expiry: "Free forever",
      expiryDate: "",
      notes: "",
      source: "",
      isExternal: false
    },
    {
      name: "tanel-ctr-test.edicy.com",
      type: "COM",
      sslActive: false,
      expiry: "External",
      expiryDate: "Can't extend here",
      notes: "Imported",
      source: "",
      isExternal: true
    },
    {
      name: "tanel-test-dev.voog.construction",
      type: "Free Voog domain",
      sslActive: true,
      expiry: "",
      expiryDate: "",
      notes: "Technical address, can't remove",
      source: "",
      isExternal: false,
      isPrimary: true
    },
    {
      name: "tanel-test-test.ee",
      type: "EE",
      sslActive: false,
      expiry: "!",
      expiryDate: "Domain is not registered",
      notes: "",
      source: "",
      isExternal: false
    },
    {
      name: "test.test.com",
      type: "COM",
      sslActive: false,
      expiry: "External",
      expiryDate: "Can't extend here",
      notes: "Imported",
      source: "",
      isExternal: true
    }
  ];

  return (
    <div className="space-y-3">
      {domains.map((domain, index) => (
        <DomainItem 
          key={index} 
          domain={domain} 
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
