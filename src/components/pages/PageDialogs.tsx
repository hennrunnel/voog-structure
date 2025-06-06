
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
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{pageToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Language Delete Dialog */}
      <AlertDialog open={languageDeleteDialogOpen} onOpenChange={setLanguageDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Language</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this language? This action cannot be undone and all content in this language will be permanently lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmLanguageDelete} className="bg-red-600 hover:bg-red-700">
              Delete Language
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Language Visibility Dialog */}
      <AlertDialog open={languageVisibilityDialogOpen} onOpenChange={setLanguageVisibilityDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {languageVisibilityAction === 'enable' ? 'Enable Language' : 'Disable Language'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {languageVisibilityAction === 'enable' 
                ? 'Are you sure you want to enable this language? It will become visible to visitors.'
                : 'Are you sure you want to disable this language? It will no longer be visible to visitors.'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmLanguageVisibilityToggle}>
              {languageVisibilityAction === 'enable' ? 'Enable' : 'Disable'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
