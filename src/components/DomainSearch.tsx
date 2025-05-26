
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DomainSearchProps {
  onSearch: (term: string) => void;
}

export const DomainSearch = ({ onSearch }: DomainSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="domain-search" className="text-gray-900 font-medium">
            Search for a domain
          </Label>
          <div className="mt-2 flex gap-3">
            <Input
              id="domain-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter domain name"
              className="flex-1"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
