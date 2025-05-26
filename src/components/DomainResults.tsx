
import { Trash2 } from "lucide-react";
import { DomainResult } from "@/pages/BuyDomain";

interface DomainResultsProps {
  results: DomainResult[];
  onAddToCart: (domain: string) => void;
  onRemoveFromCart: (domain: string) => void;
}

export const DomainResults = ({ results, onAddToCart, onRemoveFromCart }: DomainResultsProps) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Search Results</h3>
      
      {results.map((result, index) => (
        <div key={index} className="flex items-center justify-between py-4 px-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4">
            {/* Price first */}
            <div className="font-medium text-gray-900 text-sm">
              {result.price}
            </div>
            
            {/* Domain Icon - Dark grey circle with white text */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm bg-gray-600">
              {result.tld.substring(0, 3).toUpperCase()}
            </div>
            
            {/* Domain status description */}
            <div className={`text-sm ${result.status === 'taken' ? 'text-gray-300' : 'text-gray-900'}`}>
              {result.status === 'available' && `${result.name} is available.`}
              {result.status === 'in-cart' && `${result.name} is in shopping cart.`}
              {result.status === 'taken' && (
                <span>{result.name} is taken.</span>
              )}
              {result.status === 'error' && (
                <span className="text-red-600">{result.errorMessage}</span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {result.status === 'available' && (
              <button
                onClick={() => onAddToCart(result.name)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm"
              >
                Add to cart
              </button>
            )}
            
            {result.status === 'in-cart' && (
              <button
                onClick={() => onRemoveFromCart(result.name)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Remove from cart"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
