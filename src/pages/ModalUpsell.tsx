import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ModalUpsell = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0" hideCloseButton>
        <div className="relative p-8">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-2xl font-semibold text-[#1B2124] mb-4">
              Upgrade required
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-6">
            <p className="text-[#1B2124] leading-relaxed">
              Your Voog Standard plan allows 3 languages. For just €22 per month you'll get 20 GB of storage, unlimited pages, users, languages, and access to developer tools for deep customization of your website.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button 
                className="bg-[#5A4FFF] text-white hover:bg-[#4a3fee]"
                onClick={() => {
                  console.log("Subscribe to Voog Plus clicked");
                  handleClose();
                }}
              >
                Subscribe to Voog Plus
              </Button>
              
              <p className="text-sm text-[#1B2124]">
                save 22%, pay ahead one year
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpsell;