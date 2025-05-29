import { useState } from "react";
import { ChevronDown, ChevronRight, Trash, Plus, Pencil, Settings, MoreVertical, GripVertical, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageSettings } from "@/components/PageSettings";

interface PageItem {
  id: string;
  title: string;
  slug: string;
  pageType: string;
  seoScore: "Good" | "Medium" | "Poor";
  translationStatus?: "Not translated" | "Hidden";
  children?: PageItem[];
  isExpanded?: boolean;
}

interface LayoutOption {
  id: string;
  title: string;
  icon: string;
}

const layoutOptions: LayoutOption[] = [
  { id: "front-page", title: "Front Page", icon: "🏠" },
  { id: "common-page", title: "Common Page", icon: "📄" },
  { id: "shop", title: "Shop", icon: "🛒" },
  { id: "blog-news", title: "Blog & News", icon: "📰" },
  { id: "link-navigation", title: "Link in the navigation", icon: "🔗" }
];

const mockPages: PageItem[] = [
  {
    id: "1",
    title: "Home",
    slug: "/",
    pageType: "Front Page",
    seoScore: "Good",
    translationStatus: "Not translated"
  },
  {
    id: "2", 
    title: "Products",
    slug: "/products",
    pageType: "Product List",
    seoScore: "Good",
    isExpanded: true,
    children: []
  },
  {
    id: "3",
    title: "About",
    slug: "/about", 
    pageType: "Common Page",
    seoScore: "Poor",
    translationStatus: "Hidden"
  },
  {
    id: "4",
    title: "News",
    slug: "/news",
    pageType: "Blog & News", 
    seoScore: "Medium"
  },
  {
    id: "5",
    title: "Contact",
    slug: "/contact",
    pageType: "Common Page",
    seoScore: "Good",
    isExpanded: false,
    children: []
  }
];

export const Pages = () => {
  const [activeTab, setActiveTab] = useState("estonian");
  const [pages, setPages] = useState<PageItem[]>(mockPages);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<PageItem | null>(null);
  const [newPageModalOpen, setNewPageModalOpen] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [showPageForm, setShowPageForm] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");
  const [pageSettingsOpen, setPageSettingsOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageItem | null>(null);

  const togglePageExpansion = (pageId: string) => {
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === pageId 
          ? { ...page, isExpanded: !page.isExpanded }
          : page
      )
    );
  };

  const handleDeletePage = (page: PageItem) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  const confirmDeletePage = () => {
    if (pageToDelete) {
      setPages(prevPages => prevPages.filter(page => page.id !== pageToDelete.id));
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  const handleDuplicatePage = (page: PageItem) => {
    const newPage = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`
    };
    setPages(prevPages => [...prevPages, newPage]);
  };

  const handleAddNestedPage = (parentPage: PageItem) => {
    const newPage = {
      id: Date.now().toString(),
      title: "New Page",
      slug: `${parentPage.slug}/new-page`,
      pageType: "Common Page",
      seoScore: "Good" as const
    };
    
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === parentPage.id 
          ? { 
              ...page, 
              children: [...(page.children || []), newPage],
              isExpanded: true
            }
          : page
      )
    );
  };

  const handleNewPageClick = () => {
    setNewPageModalOpen(true);
    setSelectedLayout(null);
    setShowPageForm(false);
    setNewPageTitle("");
    setNewPageSlug("");
  };

  const handleLayoutSelect = (layoutId: string) => {
    setSelectedLayout(layoutId);
    setShowPageForm(true);
  };

  const handleCreatePage = () => {
    if (newPageTitle && newPageSlug && selectedLayout) {
      const layoutOption = layoutOptions.find(opt => opt.id === selectedLayout);
      const newPage = {
        id: Date.now().toString(),
        title: newPageTitle,
        slug: newPageSlug.startsWith('/') ? newPageSlug : `/${newPageSlug}`,
        pageType: layoutOption?.title || "Common Page",
        seoScore: "Good" as const
      };
      
      setPages(prevPages => [...prevPages, newPage]);
      setNewPageModalOpen(false);
      setSelectedLayout(null);
      setShowPageForm(false);
      setNewPageTitle("");
      setNewPageSlug("");
    }
  };

  const handlePageSettings = (page: PageItem) => {
    setSelectedPage(page);
    setPageSettingsOpen(true);
  };

  const handleClosePageSettings = () => {
    setPageSettingsOpen(false);
    setSelectedPage(null);
  };

  const renderSeoScore = (score: "Good" | "Medium" | "Poor") => {
    const color = score === "Good" ? "bg-green-500" : score === "Medium" ? "bg-yellow-500" : "bg-red-500";
    
    return (
      <div className="flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full ${color}`} />
      </div>
    );
  };

  const renderPageRow = (page: PageItem, level: number = 0) => {
    const hasChildren = page.children && page.children.length > 0;
    const paddingLeft = level * 24;

    return (
      <div key={page.id}>
        <div 
          className="group flex items-center border-b border-gray-200 py-3 hover:bg-gray-50 transition-colors"
          style={{ paddingLeft: `${paddingLeft + 12}px`, paddingRight: '12px' }}
        >
          {/* Drag handle */}
          <GripVertical className="w-4 h-4 text-gray-400 mr-3 cursor-move" />
          
          {/* Expand/collapse button for pages with children */}
          <div className="w-5 flex justify-center mr-2">
            {hasChildren && (
              <button
                onClick={() => togglePageExpansion(page.id)}
                className="text-gray-400 hover:text-gray-600"
                aria-label={page.isExpanded ? "Collapse" : "Expand"}
              >
                {page.isExpanded ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </button>
            )}
          </div>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-gray-900">{page.title}</span>
          </div>

          {/* Slug */}
          <div className="w-32 px-4">
            <span className="text-sm text-gray-600">{page.slug}</span>
          </div>

          {/* Page Type */}
          <div className="w-32 px-4">
            <span className="text-sm text-gray-600">{page.pageType}</span>
          </div>

          {/* SEO Score */}
          <div className="w-24 px-4">
            {renderSeoScore(page.seoScore)}
          </div>

          {/* Translation Status */}
          <div className="w-32 px-4">
            {page.translationStatus && (
              <span className="text-sm text-gray-500">{page.translationStatus}</span>
            )}
          </div>

          {/* Actions - Show on hover */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto hover:bg-gray-200"
              aria-label="Edit page content"
            >
              <Pencil className="w-4 h-4 text-gray-400" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto hover:bg-gray-200"
              aria-label="Page settings"
              onClick={() => handlePageSettings(page)}
            >
              <Settings className="w-4 h-4 text-gray-400" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 h-auto hover:bg-gray-200"
                  aria-label="More options"
                >
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white shadow-md border">
                <DropdownMenuItem 
                  onClick={() => handleDuplicatePage(page)}
                  className="cursor-pointer"
                >
                  Duplicate page
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleAddNestedPage(page)}
                  className="cursor-pointer"
                >
                  Add nested page
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleDeletePage(page)}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Render children if expanded */}
        {hasChildren && page.isExpanded && page.children?.map(child => 
          renderPageRow(child, level + 1)
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12">
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-6" style={{ maxWidth: '992px' }}>
        {/* Header */}
        <h1 className="text-[28px] font-semibold text-[#1A1A1A] mb-6">Pages</h1>
        
        {/* Language Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent h-auto p-0 mb-6 border-b border-gray-200 rounded-none w-full justify-start">
            <TabsTrigger 
              value="estonian" 
              className="text-base px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none"
            >
              Estonian
            </TabsTrigger>
            <TabsTrigger 
              value="general" 
              className="text-base px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none"
            >
              General
            </TabsTrigger>
          </TabsList>

          <TabsContent value="estonian" className="mt-0">
            {/* Language Settings Accordion */}
            <Accordion type="single" collapsible className="w-full mb-6">
              <AccordionItem value="language-settings" className="border-b-0">
                <div className="flex items-center justify-between">
                  <AccordionTrigger className="text-base font-medium text-[#1A1A1A] hover:no-underline py-3 px-0 flex-1">
                    Language settings
                  </AccordionTrigger>
                  <Button
                    onClick={handleNewPageClick}
                    className="bg-[#5A4FFF] hover:bg-[#4A3FFF] text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    New page
                  </Button>
                </div>
                <AccordionContent className="pb-4 pt-2">
                  {/* ... keep existing code (language settings form) */}
                  <div className="relative">
                    {/* Trash icon in top-right */}
                    <div className="absolute top-0 right-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={true} // Disabled as it's the last remaining language
                        className="text-gray-400 hover:text-gray-600 p-2"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Form fields in two-column layout */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 pr-12">
                      {/* Language name */}
                      <div className="flex items-center">
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Language name</label>
                        <Select defaultValue="english">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="estonian">Estonian</SelectItem>
                            <SelectItem value="finnish">Finnish</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Region */}
                      <div className="flex items-center">
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Region</label>
                        <Select defaultValue="global">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="global">Global</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="north-america">North America</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Name in menu */}
                      <div className="flex items-center">
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Name in menu</label>
                        <Select defaultValue="eng">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eng">Eng</SelectItem>
                            <SelectItem value="est">Est</SelectItem>
                            <SelectItem value="fin">Fin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Is this language publicly visible */}
                      <div className="flex items-center">
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Is this language publicly visible?</label>
                        <Select defaultValue="yes">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Which language visitors see */}
                      <div className="flex items-center">
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Which language visitors see?</label>
                        <Select defaultValue="detect-location">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="detect-location">Detect by location</SelectItem>
                            <SelectItem value="browser-language">Browser language</SelectItem>
                            <SelectItem value="default">Default language</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Website title */}
                      <div className="flex items-center">
                        <label className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">Website title</label>
                        <Select defaultValue="finn-cross">
                          <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="finn-cross">Finn & Cross</SelectItem>
                            <SelectItem value="custom">Custom Title</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Page Structure Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 px-3 py-3 border-b border-gray-200">
                <div className="flex items-center text-sm font-medium text-gray-700" style={{ paddingLeft: '52px' }}>
                  <div className="flex-1">Title in the menu</div>
                  <div className="w-32 px-4">Slug</div>
                  <div className="w-32 px-4">Page type</div>
                  <div className="w-24 px-4">SEO Score</div>
                  <div className="w-32 px-4"></div>
                  <div className="w-24"></div>
                </div>
              </div>

              {/* Page Rows */}
              <div>
                {pages.map(page => renderPageRow(page))}
                
                {/* Download entire site link */}
                <div className="px-3 py-4 border-t border-gray-200">
                  <div className="flex justify-end" style={{ paddingRight: '12px' }}>
                    <button className="text-[#5A4FFF] text-sm font-medium hover:underline">
                      Download entire site
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="general" className="mt-0">
            <div className="text-[#666]">
              General tab content will be displayed here.
            </div>
          </TabsContent>
        </Tabs>

        {/* New Page Modal */}
        <Dialog open={newPageModalOpen} onOpenChange={setNewPageModalOpen}>
          <DialogContent className="max-w-2xl" hideCloseButton>
            <div className="absolute right-4 top-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNewPageModalOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-white text-center">
                Add a new page
              </DialogTitle>
            </DialogHeader>
            
            {!showPageForm ? (
              <div className="grid grid-cols-2 gap-4 mt-6">
                {layoutOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleLayoutSelect(option.id)}
                    className="w-40 h-24 border border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#5A4FFF] transition-colors bg-gray-100"
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{option.title}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Page title
                  </label>
                  <Input
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    placeholder="Type here..."
                    className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Address
                  </label>
                  <Input
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value)}
                    placeholder="/newpage"
                    className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Page layout
                  </label>
                  <Select defaultValue="2023-front-page">
                    <SelectTrigger className="bg-transparent border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023-front-page">2023 front page</SelectItem>
                      <SelectItem value="common-page">Common page</SelectItem>
                      <SelectItem value="blog-layout">Blog layout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Visibility
                  </label>
                  <Select defaultValue="visible-in-menu">
                    <SelectTrigger className="bg-transparent border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visible-in-menu">Visible in menu</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                      <SelectItem value="visible-not-in-menu">Visible but not in menu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  onClick={handleCreatePage}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                  disabled={!newPageTitle || !newPageSlug}
                >
                  Create this page
                </Button>
                
                <div className="text-center">
                  <button className="text-gray-400 text-sm hover:underline">
                    Add a link instead
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
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
              <AlertDialogAction
                onClick={confirmDeletePage}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Page Settings Side Panel */}
        <PageSettings 
          isOpen={pageSettingsOpen}
          onClose={handleClosePageSettings}
        />
      </div>
    </div>
  );
};
