
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface DomainSettingsProps {
  domain: Domain | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DomainSettings = ({ domain, isOpen, onClose }: DomainSettingsProps) => {
  const handleSaveSettings = () => {
    console.log("Domain settings save functionality has been simplified");
  };

  if (!domain) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-2xl bg-white p-0 border-l border-gray-200 shadow-sm rounded-none h-full overflow-y-auto">
        <SheetHeader className="p-8 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-medium text-gray-900">
              {domain.name} settings
            </SheetTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </SheetHeader>

        <div className="p-8 pt-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="general" className="text-sm">GENERAL</TabsTrigger>
              <TabsTrigger value="dns" className="text-sm">DNS SETTINGS</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  Domain management functionality has been simplified for demonstration purposes.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  General settings forms have been removed from this interface.
                </p>
              </div>
              
              <Button onClick={handleSaveSettings} className="w-full bg-green-600 hover:bg-green-700 text-white">
                Save settings (console log)
              </Button>
            </TabsContent>

            <TabsContent value="dns" className="space-y-0">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  DNS management functionality has been simplified for demonstration purposes.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  DNS settings interface has been removed from this view.
                </p>
              </div>
              
              <Button onClick={handleSaveSettings} className="w-full bg-green-600 hover:bg-green-700 text-white">
                Save settings (console log)
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
