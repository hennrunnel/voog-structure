
interface TranslatePageSidebarHeaderProps {}

export const TranslatePageSidebarHeader = ({}: TranslatePageSidebarHeaderProps) => {
  return (
    <div className="px-6 py-6 border-b border-border">
      <h2 id="translate-page-title" className="text-xl font-semibold text-foreground">
        Translate a page
      </h2>
    </div>
  );
};
