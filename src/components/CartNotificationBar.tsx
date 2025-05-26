
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface CartNotificationBarProps {
  show: boolean;
  itemCount: number;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartNotificationBar = ({ show, itemCount, onClose, onCheckout }: CartNotificationBarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    }
  }, [show]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-black text-white px-4 py-3 flex items-center justify-between z-50">
      <div className="flex items-center space-x-4">
        <span className="text-sm">
          There are items in your shopping cart
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={onCheckout}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Check out
        </button>
        
        <button
          onClick={handleClose}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
