
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const SuccessModal = ({ 
  isOpen, 
  title, 
  description, 
  primaryAction, 
  secondaryAction 
}: SuccessModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="text-gray-900">{title}</DialogTitle>
          <DialogDescription className="text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={`flex ${secondaryAction ? 'flex-col-reverse sm:flex-row sm:justify-start sm:space-x-2' : 'justify-center'}`}>
          <Button 
            onClick={primaryAction.onClick}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {primaryAction.label}
          </Button>
          {secondaryAction && (
            <Button 
              variant="outline" 
              onClick={secondaryAction.onClick}
              className="mt-2 sm:mt-0 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            >
              {secondaryAction.label}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
