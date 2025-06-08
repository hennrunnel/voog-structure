
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
import { PageItem } from "@/types/pages";

interface PageDialogsProps {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  pageToDelete: PageItem | null;
  onConfirmDelete: () => void;
  languageDeleteDialogOpen: boolean;
  setLanguageDeleteDialogOpen: (open: boolean) => void;
  onConfirmLanguageDelete: () => void;
  languageVisibilityDialogOpen: boolean;
  setLanguageVisibilityDialogOpen: (open: boolean) => void;
  languageVisibilityAction: 'enable' | 'disable';
  onConfirmLanguageVisibilityToggle: () => void;
}

export const PageDialogs = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  pageToDelete,
  onConfirmDelete,
  languageDeleteDialogOpen,
  setLanguageDeleteDialogOpen,
  onConfirmLanguageDelete,
  languageVisibilityDialogOpen,
  setLanguageVisibilityDialogOpen,
  languageVisibilityAction,
  onConfirmLanguageVisibilityToggle
}: PageDialogsProps) => {
  return (
    <>
      {/* Page Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{pageToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-end space-x-2 space-y-0">
            <AlertDialogAction onClick={onConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
            <AlertDialogCancel className="border border-border bg-background hover:bg-accent hover:text-accent-foreground mt-0">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Language Delete Dialog */}
      <AlertDialog open={languageDeleteDialogOpen} onOpenChange={setLanguageDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete language</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this language? This action cannot be undone and all content in this language will be permanently lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-end space-x-2 space-y-0">
            <AlertDialogAction onClick={onConfirmLanguageDelete} className="bg-destructive hover:bg-destructive/90">
              Delete language
            </AlertDialogAction>
            <AlertDialogCancel className="border border-border bg-background hover:bg-accent hover:text-accent-foreground mt-0">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Language Visibility Dialog */}
      <AlertDialog open={languageVisibilityDialogOpen} onOpenChange={setLanguageVisibilityDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {languageVisibilityAction === 'enable' ? 'Enable language' : 'Disable language'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {languageVisibilityAction === 'enable' 
                ? 'Are you sure you want to enable this language? It will become visible to visitors.'
                : 'Are you sure you want to disable this language? It will no longer be visible to visitors.'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-end space-x-2 space-y-0">
            <AlertDialogAction 
              onClick={onConfirmLanguageVisibilityToggle}
              className={languageVisibilityAction === 'disable' 
                ? "bg-destructive hover:bg-destructive/90" 
                : "bg-primary hover:bg-primary/90"
              }
            >
              {languageVisibilityAction === 'enable' ? 'Enable' : 'Disable'}
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
