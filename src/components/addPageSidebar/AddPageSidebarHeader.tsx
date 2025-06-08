
interface AddPageSidebarHeaderProps {
  isLinkMode: boolean;
}

export const AddPageSidebarHeader = ({ isLinkMode }: AddPageSidebarHeaderProps) => {
  return (
    <div className="px-6 py-6 border-b border-border">
      <h2 id="add-page-title" className="text-xl font-semibold text-foreground">
        {isLinkMode ? "Add a custom link" : "Add new page"}
      </h2>
    </div>
  );
};
