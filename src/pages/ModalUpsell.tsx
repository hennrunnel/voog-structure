import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="p-8">
          <DialogHeader className="text-left mb-6">
            <DialogTitle className="text-2xl font-medium text-foreground mb-4">
              Upgrade required
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Your Voog Standard plan allows 3 languages. For just €22 per month you'll get 20 GB of storage, unlimited pages, users, languages, and access to developer tools for deep customization of your website.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                onClick={() => {
                  console.log("Subscribe to Voog Plus clicked");
                  handleClose();
                }}
              >
                Subscribe to Voog Plus
              </Button>
              
              <button 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                onClick={() => {
                  console.log("Pay ahead one year clicked");
                  handleClose();
                }}
              >
                save 22%, pay ahead one year
              </button>
            </div>
            
            <div className="pt-4 border-t border-border">
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  console.log("Contact site admin clicked");
                  handleClose();
                }}
              >
                Contact site admin
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpsell;