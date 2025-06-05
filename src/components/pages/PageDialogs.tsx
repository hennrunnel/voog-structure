
import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PageItem } from "@/types/pages";

interface PageDialogsProps {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  pageToDelete: PageItem | null;
  onConfirmDelete: () => void;
  homeVisibilityDialogOpen: boolean;
  setHomeVisibilityDialogOpen: (open: boolean) => void;
  homeVisibilityAction: 'show' | 'hide';
  onConfirmHomeVisibilityToggle: () => void;
  languageDeleteDialogOpen: boolean;
  setLanguageDeleteDialogOpen: (open: boolean) => void;
  onConfirmLanguageDelete: () => void;
  languageVisibilityDialogOpen: boolean;
  setLanguageVisibilityDialogOpen: (open: boolean) => void;
  languageVisibilityAction: 'enable' | 'disable';
  onConfirmLanguageVisibilityToggle: () => void;
}

export const PageDialogs: React.FC<PageDialogsProps> = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  pageToDelete,
  onConfirmDelete,
  homeVisibilityDialogOpen,
  setHomeVisibilityDialogOpen,
  homeVisibilityAction,
  onConfirmHomeVisibilityToggle,
  languageDeleteDialogOpen,
  setLanguageDeleteDialogOpen,
  onConfirmLanguageDelete,
  languageVisibilityDialogOpen,
  setLanguageVisibilityDialogOpen,
  languageVisibilityAction,
  onConfirmLanguageVisibilityToggle
}) => {
  return (
    <>
      {/* Delete Page Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{pageToDelete?.title}" and its subpages? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Home Page Visibility Confirmation Dialog */}
      <AlertDialog open={homeVisibilityDialogOpen} onOpenChange={setHomeVisibilityDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {homeVisibilityAction === 'hide' ? 'Hide Home Page' : 'Show Home Page'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {homeVisibilityAction === 'hide' 
                ? 'This will disable visitors from seeing the entire site in this language. Are you sure you want to continue?' 
                : 'This will make the home page and all its subpages visible to visitors. Are you sure you want to continue?'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setHomeVisibilityDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={onConfirmHomeVisibilityToggle} 
              className={homeVisibilityAction === 'hide' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              {homeVisibilityAction === 'hide' ? 'Hide Home Page' : 'Show Home Page'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Language Delete Confirmation Dialog */}
      <AlertDialog open={languageDeleteDialogOpen} onOpenChange={setLanguageDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Language</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the entire language and all its content. Are you sure you want to continue? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLanguageDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmLanguageDelete} className="bg-red-600 hover:bg-red-700">
              Delete Language
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Language Visibility Confirmation Dialog */}
      <AlertDialog open={languageVisibilityDialogOpen} onOpenChange={setLanguageVisibilityDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {languageVisibilityAction === 'disable' ? 'Make Language Private' : 'Make Language Public'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {languageVisibilityAction === 'disable' 
                ? 'This will make the entire language not accessible to the public/visitors. Are you sure you want to continue?' 
                : 'This will make the entire language accessible to the public/visitors. Are you sure you want to continue?'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLanguageVisibilityDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={onConfirmLanguageVisibilityToggle} 
              className={languageVisibilityAction === 'disable' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              {languageVisibilityAction === 'disable' ? 'Make Private' : 'Make Public'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
