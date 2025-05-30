import { useState } from "react";
import { ChevronDown, ChevronRight, Trash, Plus, ExternalLink, Eye, EyeOff, MoreVertical, GripVertical, Settings, Copy, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PageSettings } from "@/components/PageSettings";
import { AddPageSidebar } from "@/components/AddPageSidebar";

interface PageItem {
  id: string;
  title: string;
  slug: string;
  pageType: string;
  seoScore: "Good" | "Medium" | "Poor";
  translationStatus?: "Untranslated" | "Hidden";
  isVisible: boolean;
  children?: PageItem[];
  isExpanded?: boolean;
}
interface LayoutOption {
  id: string;
  title: string;
  icon: string;
}
interface DragState {
  isDragging: boolean;
  draggedPageId: string | null;
  dropZone: {
    pageId: string;
    position: 'before' | 'after' | 'nested';
  } | null;
}
const layoutOptions: LayoutOption[] = [{
  id: "front-page",
  title: "Front Page",
  icon: "🏠"
}, {
  id: "common-page",
  title: "Common Page",
  icon: "📄"
}, {
  id: "shop",
  title: "Shop",
  icon: "🛒"
}, {
  id: "blog-news",
  title: "Blog & News",
  icon: "📰"
}, {
  id: "link-navigation",
  title: "Link in the navigation",
  icon: "🔗"
}];
const mockPages: PageItem[] = [{
  id: "1",
  title: "Home",
  slug: "/",
  pageType: "Front Page",
  seoScore: "Good",
  isVisible: true
}, {
  id: "2",
  title: "Products",
  slug: "/products",
  pageType: "Product List",
  seoScore: "Good",
  isVisible: true,
  isExpanded: true,
  children: []
}, {
  id: "3",
  title: "About",
  slug: "/about",
  pageType: "Common Page",
  seoScore: "Poor",
  translationStatus: "Untranslated",
  isVisible: false
}, {
  id: "4",
  title: "News",
  slug: "/news",
  pageType: "Blog & News",
  seoScore: "Medium",
  isVisible: true
}, {
  id: "5",
  title: "Contact",
  slug: "/contact",
  pageType: "Common Page",
  seoScore: "Good",
  isVisible: true,
  isExpanded: true,
  children: [{
    id: "5-1",
    title: "Support",
    slug: "/contact/support",
    pageType: "Common Page",
    seoScore: "Good",
    isVisible: true
  }, {
    id: "5-2",
    title: "Sales",
    slug: "/contact/sales",
    pageType: "Common Page",
    seoScore: "Medium",
    isVisible: true
  }, {
    id: "5-3",
    title: "Technical Support",
    slug: "/contact/technical",
    pageType: "Common Page",
    seoScore: "Good",
    translationStatus: "Untranslated",
    isVisible: true
  }]
}];
export const Pages = () => {
  const [activeTab, setActiveTab] = useState("english");
  const [pages, setPages] = useState<PageItem[]>(mockPages);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<PageItem | null>(null);
  const [homeVisibilityDialogOpen, setHomeVisibilityDialogOpen] = useState(false);
  const [homeVisibilityAction, setHomeVisibilityAction] = useState<'show' | 'hide'>('hide');
  const [languageDeleteDialogOpen, setLanguageDeleteDialogOpen] = useState(false);
  const [languageVisibilityDialogOpen, setLanguageVisibilityDialogOpen] = useState(false);
  const [languageVisibilityAction, setLanguageVisibilityAction] = useState<'enable' | 'disable'>('disable');
  const [addPagePopoverOpen, setAddPagePopoverOpen] = useState(false);
  const [addPageSidebarOpen, setAddPageSidebarOpen] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [pageSettingsOpen, setPageSettingsOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageItem | null>(null);
  const [websiteTitle, setWebsiteTitle] = useState("Finn & Cross");
  const [nameInMenu, setNameInMenu] = useState("Eng");
  const [languageVisible, setLanguageVisible] = useState(true);
  const [availableTabs, setAvailableTabs] = useState(["english", "estonian"]);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedPageId: null,
    dropZone: null
  });
  const togglePageExpansion = (pageId: string) => {
    setPages(prevPages => prevPages.map(page => page.id === pageId ? {
      ...page,
      isExpanded: !page.isExpanded
    } : page));
  };
  const togglePageVisibility = (pageId: string) => {
    // Check if it's the home page
    if (pageId === "1") {
      const homePage = pages.find(p => p.id === "1");
      setHomeVisibilityAction(homePage?.isVisible ? 'hide' : 'show');
      setHomeVisibilityDialogOpen(true);
      return;
    }
    const updatePageVisibility = (pages: PageItem[]): PageItem[] => {
      return pages.map(page => {
        if (page.id === pageId) {
          return {
            ...page,
            isVisible: !page.isVisible
          };
        }
        if (page.children) {
          return {
            ...page,
            children: updatePageVisibility(page.children)
          };
        }
        return page;
      });
    };
    setPages(prevPages => updatePageVisibility(prevPages));
  };
  const handleDeletePage = (page: PageItem) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };
  const confirmDeletePage = () => {
    if (pageToDelete) {
      const deletePageRecursive = (pages: PageItem[]): PageItem[] => {
        return pages.filter(page => page.id !== pageToDelete.id).map(page => ({
          ...page,
          children: page.children ? deletePageRecursive(page.children) : undefined
        }));
      };
      setPages(prevPages => deletePageRecursive(prevPages));
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };
  const confirmHomeVisibilityToggle = () => {
    const updatePageVisibility = (pages: PageItem[]): PageItem[] => {
      return pages.map(page => {
        if (page.id === "1") {
          return {
            ...page,
            isVisible: !page.isVisible
          };
        }
        return page;
      });
    };
    setPages(prevPages => updatePageVisibility(prevPages));
    setHomeVisibilityDialogOpen(false);
  };
  const handleDuplicatePage = (page: PageItem) => {
    const newPage = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      isVisible: true
    };
    setPages(prevPages => [...prevPages, newPage]);
  };
  const handleAddNestedPage = (parentPage: PageItem) => {
    setSelectedLayout("common-page");
    setAddPageSidebarOpen(true);
  };
  const handleLayoutSelect = (layoutId: string) => {
    if (layoutId === "link-navigation") {
      setAddPagePopoverOpen(false);
      return;
    }
    setSelectedLayout(layoutId);
    setAddPagePopoverOpen(false);
    setAddPageSidebarOpen(true);
  };
  const handlePageSettings = (page: PageItem) => {
    setSelectedPage(page);
    setPageSettingsOpen(true);
  };
  const handleEditPage = (page: PageItem) => {
    console.log(`Edit page: ${page.title}`);
  };
  const handleClosePageSettings = () => {
    setPageSettingsOpen(false);
    setSelectedPage(null);
  };
  const handleCloseAddPageSidebar = () => {
    setAddPageSidebarOpen(false);
    setSelectedLayout(null);
  };
  const handleCreatePage = (pageData: {
    title: string;
    slug: string;
  }) => {
    if (pageData.title && pageData.slug && selectedLayout) {
      const layoutOption = layoutOptions.find(opt => opt.id === selectedLayout);
      const newPage = {
        id: Date.now().toString(),
        title: pageData.title,
        slug: pageData.slug.startsWith('/') ? pageData.slug : `/${pageData.slug}`,
        pageType: layoutOption?.title || "Common Page",
        seoScore: "Good" as const,
        isVisible: true
      };
      setPages(prevPages => [...prevPages, newPage]);
      setAddPageSidebarOpen(false);
      setSelectedLayout(null);
    }
  };
  const handleLanguageDelete = () => {
    setLanguageDeleteDialogOpen(true);
  };
  const confirmLanguageDelete = () => {
    const currentTabIndex = availableTabs.indexOf(activeTab);
    const newTabs = availableTabs.filter(tab => tab !== activeTab);
    setAvailableTabs(newTabs);
    if (newTabs.length > 0) {
      const nextTab = newTabs[Math.max(0, currentTabIndex - 1)];
      setActiveTab(nextTab);
    }
    setLanguageDeleteDialogOpen(false);
  };
  const handleLanguageVisibilityToggle = (newValue: boolean) => {
    setLanguageVisibilityAction(newValue ? 'enable' : 'disable');
    setLanguageVisibilityDialogOpen(true);
  };
  const confirmLanguageVisibilityToggle = () => {
    setLanguageVisible(languageVisibilityAction === 'enable');
    setLanguageVisibilityDialogOpen(false);
  };

  // Drag and drop functionality
  const handleDragStart = (e: React.DragEvent, pageId: string) => {
    if (pageId === "1") return; // Prevent dragging Home page

    setDragState({
      isDragging: true,
      draggedPageId: pageId,
      dropZone: null
    });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", pageId);
  };

  const handleDragOver = (e: React.DragEvent, targetPageId: string, position: 'before' | 'after' | 'nested') => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    
    if (dragState.draggedPageId && dragState.draggedPageId !== targetPageId) {
      setDragState(prev => ({
        ...prev,
        dropZone: {
          pageId: targetPageId,
          position
        }
      }));
    }
  };

  const handleDragEnd = () => {
    setDragState({
      isDragging: false,
      draggedPageId: null,
      dropZone: null
    });
  };

  const handleDrop = (e: React.DragEvent, targetPageId: string, position: 'before' | 'after' | 'nested') => {
    e.preventDefault();
    
    if (dragState.draggedPageId && dragState.draggedPageId !== targetPageId) {
      // Here you would implement the actual page reordering logic
      console.log(`Moving page ${dragState.draggedPageId} ${position} page ${targetPageId}`);
    }
    
    handleDragEnd();
  };

  const renderSeoScore = (score: "Good" | "Medium" | "Poor") => {
    const color = score === "Good" ? "bg-green-500" : score === "Medium" ? "bg-yellow-500" : "bg-red-500";
    return <div className="flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full ${color}`} />
      </div>;
  };

  const renderDropZone = (pageId: string, position: 'before' | 'after' | 'nested') => {
    const isActive = dragState.dropZone?.pageId === pageId && dragState.dropZone?.position === position;
    if (!dragState.isDragging) return null;

    const baseClasses = "w-full transition-all duration-200";
    
    if (position === 'nested') {
      return <div 
        className={`${baseClasses} h-8 ml-8 ${isActive ? 'bg-blue-100 border-2 border-dashed border-blue-400' : 'bg-gray-50 border-2 border-dashed border-gray-300'} rounded-md flex items-center justify-center`} 
        onDragOver={e => handleDragOver(e, pageId, position)} 
        onDrop={e => handleDrop(e, pageId, position)}
      >
        <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
          Drop here to add as subpage
        </span>
      </div>;
    }
    
    return <div 
      className={`${baseClasses} h-1 ${isActive ? 'bg-blue-500' : 'bg-gray-300'} rounded-full`} 
      onDragOver={e => handleDragOver(e, pageId, position)} 
      onDrop={e => handleDrop(e, pageId, position)} 
    />;
  };

  const renderPageRow = (page: PageItem, level: number = 0) => {
    const hasChildren = page.children && page.children.length > 0;
    const paddingLeft = level * 24;
    const isDraggedPage = dragState.draggedPageId === page.id;
    const isHomePage = page.id === "1";
    const isUntranslated = page.translationStatus === "Untranslated";

    return <div key={page.id}>
        {renderDropZone(page.id, 'before')}
        
        <div 
          className={`group flex items-center border-b border-gray-200 py-3 hover:bg-gray-50 transition-colors ${isDraggedPage ? 'opacity-50' : ''} ${!isHomePage ? 'cursor-move' : 'cursor-pointer'}`} 
          style={{ paddingLeft: `${paddingLeft + 12}px`, paddingRight: '12px' }} 
          draggable={!isHomePage} 
          onDragStart={e => handleDragStart(e, page.id)} 
          onDragEnd={handleDragEnd} 
          onClick={() => handleEditPage(page)} 
          role="row" 
          tabIndex={0} 
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleEditPage(page);
            }
          }} 
          aria-label={`Edit ${page.title} page`}
        >
          {/* Drag handle */}
          <div className={`mr-3 ${isHomePage ? 'opacity-30 cursor-not-allowed' : 'cursor-move'}`} onClick={e => e.stopPropagation()}>
            <GripVertical className="w-4 h-4 text-gray-400" aria-hidden="true" />
          </div>
          
          {/* Expand/collapse button for pages with children */}
          <div className="w-5 flex justify-center mr-2">
            {hasChildren && <button onClick={e => {
            e.stopPropagation();
            togglePageExpansion(page.id);
          }} className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded" aria-label={page.isExpanded ? `Collapse ${page.title}` : `Expand ${page.title}`} aria-expanded={page.isExpanded}>
                {page.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>}
          </div>

          {/* Title - matching header width */}
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-sm font-medium ${isUntranslated ? 'italic text-gray-400' : page.isVisible ? 'text-gray-900' : 'text-gray-500'}`}>
                {page.title}
              </span>
              {isUntranslated && <Badge variant="secondary" className="text-xs px-2 py-0 bg-gray-100 text-gray-600 border-0">
                  Untranslated
                </Badge>}
            </div>
          </div>

          {/* Slug - matching header width */}
          <div className="w-48 px-4">
            {!isUntranslated ? <button onClick={e => {
            e.stopPropagation();
            window.open(page.slug, '_blank');
          }} className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded" aria-label={`Open ${page.slug} in new tab`}>
                <span className="truncate">{page.slug}</span>
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </button> : <span className="text-xs text-gray-400">-</span>}
          </div>

          {/* Page Type - matching header width */}
          <div className="w-32 px-4">
            {!isUntranslated ? <span className="text-sm text-gray-600">{page.pageType}</span> : <span className="text-sm text-gray-400">-</span>}
          </div>

          {/* SEO Score - matching header width */}
          <div className="w-24 px-4">
            {!isUntranslated ? <div aria-label={`SEO Score: ${page.seoScore}`}>
                {renderSeoScore(page.seoScore)}
              </div> : <div className="flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
              </div>}
          </div>

          {/* Visibility - matching header width */}
          <div className="w-24 px-4">
            {!isUntranslated ? <button onClick={e => {
            e.stopPropagation();
            togglePageVisibility(page.id);
          }} className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-1" aria-label={page.isVisible ? `Hide ${page.title}` : `Show ${page.title}`}>
                {page.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-red-500" />}
              </button> : null}
          </div>

          {/* Actions - matching header spacing */}
          <div className="w-16 flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-auto hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" aria-label={`More options for ${page.title}`} onClick={e => e.stopPropagation()}>
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white shadow-md border">
                <DropdownMenuItem onClick={e => {
                e.stopPropagation();
                handlePageSettings(page);
              }} className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Page settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={e => {
                e.stopPropagation();
                handleDuplicatePage(page);
              }} className="cursor-pointer">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate page
                </DropdownMenuItem>
                <DropdownMenuItem onClick={e => {
                e.stopPropagation();
                handleAddNestedPage(page);
              }} className="cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  Add subpage
                </DropdownMenuItem>
                <DropdownMenuItem onClick={e => {
                e.stopPropagation();
                handleDeletePage(page);
              }} className="cursor-pointer text-red-600 focus:text-red-600">
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {renderDropZone(page.id, 'nested')}

        {/* Render children if expanded */}
        {hasChildren && page.isExpanded && page.children?.map(child => renderPageRow(child, level + 1))}

        {renderDropZone(page.id, 'after')}
      </div>;
  };

  return <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12">
      <div className="w-full" style={{ maxWidth: '992px' }}>
        {/* Header outside the card */}
        <h1 className="text-[28px] font-semibold text-[#1A1A1A] mb-6">Pages</h1>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Language Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6 px-6 pt-6">
              <TabsList className="bg-transparent h-auto p-0 border-b border-gray-200 rounded-none">
                {availableTabs.includes("english") && <TabsTrigger value="english" className="text-base px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent">
                    English
                  </TabsTrigger>}
                {availableTabs.includes("estonian") && <TabsTrigger value="estonian" className="text-base px-4 py-3 text-[#666] data-[state=active]:text-[#5A4FFF] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#5A4FFF] data-[state=active]:shadow-none rounded-none border-b-2 border-transparent">
                    Estonian
                  </TabsTrigger>}
              </TabsList>
              
              <button className="text-[#5A4FFF] text-base font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2">
                Add language
              </button>
            </div>

            {/* Border line that spans full width */}
            <div className="border-b border-gray-200 -mx-6"></div>

            <TabsContent value="english" className="mt-0 px-6">
              {/* Language Settings Accordion */}
              <Accordion type="single" collapsible className="w-full mb-6">
                <AccordionItem value="language-settings" className="border-b-0">
                  <div className="flex items-center justify-between">
                    <AccordionTrigger className="text-base font-medium text-[#1A1A1A] hover:no-underline py-3 px-0 flex-1">
                      Language settings
                    </AccordionTrigger>
                    <Popover open={addPagePopoverOpen} onOpenChange={setAddPagePopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button className="bg-[#5A4FFF] hover:bg-[#4A3FFF] text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Add page
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-3" align="end">
                        <div className="space-y-2">
                          {layoutOptions.map(option => <button key={option.id} onClick={() => handleLayoutSelect(option.id)} className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" aria-label={`Create ${option.title} page`}>
                              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm">
                                {option.icon}
                              </div>
                              <span className="text-sm font-medium text-gray-900">{option.title}</span>
                            </button>)}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <AccordionContent className="pb-4 pt-2">
                    <div className="relative">
                      {/* Trash icon in top-right */}
                      <div className="absolute top-0 right-0">
                        <Button variant="ghost" size="sm" onClick={handleLanguageDelete} className="text-gray-400 hover:text-gray-600 p-2" aria-label="Delete language">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Form fields in two-column layout */}
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4 pr-12">
                        {/* Website title */}
                        <div className="flex items-center">
                          <label htmlFor="website-title" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                            Website title
                          </label>
                          <Input id="website-title" value={websiteTitle} onChange={e => setWebsiteTitle(e.target.value)} className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1" />
                        </div>

                        {/* Language name */}
                        <div className="flex items-center">
                          <label htmlFor="language-name" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                            Language name
                          </label>
                          <Select defaultValue="english">
                            <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1" id="language-name">
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
                          <label htmlFor="region" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                            Region
                          </label>
                          <Select defaultValue="global">
                            <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1" id="region">
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
                          <label htmlFor="name-in-menu" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                            Name in menu
                          </label>
                          <Input id="name-in-menu" value={nameInMenu} onChange={e => setNameInMenu(e.target.value)} className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1" />
                        </div>

                        {/* Is this language publicly visible */}
                        <div className="flex items-center">
                          <label htmlFor="publicly-visible" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                            Is this language publicly visible?
                          </label>
                          <div className="flex-shrink-0">
                            <Switch id="publicly-visible" checked={languageVisible} onCheckedChange={handleLanguageVisibilityToggle} />
                          </div>
                        </div>

                        {/* Which language visitors see */}
                        <div className="flex items-center">
                          <label htmlFor="visitor-language" className="text-sm text-[#1A1A1A] font-medium w-32 flex-shrink-0">
                            Which language visitors see?
                          </label>
                          <Select defaultValue="detect-location">
                            <SelectTrigger className="bg-[#F8F9FB] border-[#E2E2E2] rounded-lg text-sm h-10 flex-1" id="visitor-language">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="detect-location">Detect by location</SelectItem>
                              <SelectItem value="browser-language">Browser language</SelectItem>
                              <SelectItem value="default">Default language</SelectItem>
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
                {/* Table Header - Fixed column widths to match content */}
                <div className="bg-gray-50 px-3 py-3 border-b border-gray-200">
                  <div className="flex items-center text-sm font-medium text-gray-700" style={{ paddingLeft: '52px' }}>
                    <div className="flex-1 min-w-0 mr-4">Menu title</div>
                    <div className="w-48 px-4">Slug</div>
                    <div className="w-32 px-4">Page type</div>
                    <div className="w-24 px-4 text-center">SEO</div>
                    <div className="w-24 px-4 text-center">Visibility</div>
                    <div className="w-16"></div>
                  </div>
                </div>

                {/* Page Rows */}
                <div role="table" aria-label="Pages list">
                  {pages.map(page => renderPageRow(page))}
                  
                  {/* Download entire site link */}
                  <div className="px-3 py-4 border-t border-gray-200">
                    <div className="flex justify-end" style={{ paddingRight: '12px' }}>
                      <button className="text-[#5A4FFF] text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded">
                        Download entire site
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="estonian" className="mt-0 px-6">
              <div className="text-[#666]">
                Estonian tab content will be displayed here.
              </div>
            </TabsContent>
          </Tabs>
        </div>

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
              <AlertDialogAction onClick={confirmDeletePage} className="bg-red-600 hover:bg-red-700">
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
                {homeVisibilityAction === 'hide' ? 'This will disable visitors from seeing the entire site in this language. Are you sure you want to continue?' : 'This will make the home page and all its subpages visible to visitors. Are you sure you want to continue?'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setHomeVisibilityDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmHomeVisibilityToggle} className={homeVisibilityAction === 'hide' ? 'bg-red-600 hover:bg-red-700' : ''}>
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
              <AlertDialogAction onClick={confirmLanguageDelete} className="bg-red-600 hover:bg-red-700">
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
                {languageVisibilityAction === 'disable' ? 'This will make the entire language not accessible to the public/visitors. Are you sure you want to continue?' : 'This will make the entire language accessible to the public/visitors. Are you sure you want to continue?'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setLanguageVisibilityDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmLanguageVisibilityToggle} className={languageVisibilityAction === 'disable' ? 'bg-red-600 hover:bg-red-700' : ''}>
                {languageVisibilityAction === 'disable' ? 'Make Private' : 'Make Public'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Page Settings Side Panel */}
        <PageSettings isOpen={pageSettingsOpen} onClose={handleClosePageSettings} />

        {/* Add Page Sidebar */}
        <AddPageSidebar isOpen={addPageSidebarOpen} onClose={handleCloseAddPageSidebar} onCreatePage={handleCreatePage} selectedLayout={selectedLayout} />
      </div>
    </div>;
};
