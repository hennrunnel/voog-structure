
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PageSettingsDialogsProps {
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
  showDuplicateDialog: boolean;
  setShowDuplicateDialog: (show: boolean) => void;
  onConfirmDelete: () => void;
  onConfirmDuplicate: () => void;
}

export const PageSettingsDialogs = ({
  showDeleteDialog,
  setShowDeleteDialog,
  showDuplicateDialog,
  setShowDuplicateDialog,
  onConfirmDelete,
  onConfirmDuplicate,
}: PageSettingsDialogsProps) => {
  return (
    <>
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this page? This action cannot be undone and will remove all content for this page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-start space-x-2 space-y-0">
            <AlertDialogAction 
              onClick={onConfirmDelete} 
              style={{ backgroundColor: '#C5292A' }}
              className="hover:opacity-90"
            >
              Delete page
            </AlertDialogAction>
            <AlertDialogCancel className="border border-border bg-background hover:bg-accent hover:text-accent-foreground mt-0">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Duplicate Confirmation Dialog */}
      <AlertDialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Duplicate page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to duplicate this page? This will create a copy of the page with all its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-start space-x-2 space-y-0">
            <AlertDialogAction onClick={onConfirmDuplicate} className="bg-primary hover:bg-primary/90">
              Duplicate page
            </AlertDialogAction>
            <AlertDialogCancel className="border border-border bg-background hover:bg-accent hover:text-accent-foreground mt-0">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
