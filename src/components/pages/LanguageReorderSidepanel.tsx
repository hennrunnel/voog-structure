
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Language {
  id: string;
  name: string;
}

interface LanguageReorderSidepanelProps {
  open: boolean;
  onClose: () => void;
  languages: Language[];
  onSave: (reorderedLanguages: Language[]) => void;
}

interface LanguageCardProps {
  language: Language;
  isDragging?: boolean;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: language.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between h-14 rounded-2xl px-6 bg-muted shadow-sm transition cursor-grab active:cursor-grabbing ${
        isDragging || isSortableDragging
          ? "border-2 border-blue-500 bg-white/70 shadow-lg z-50"
          : "hover:shadow-md"
      }`}
      {...attributes}
      {...listeners}
    >
      <span className="text-lg font-medium">{language.name}</span>
      <Menu className="opacity-60 w-5 h-5" />
    </Card>
  );
};

export const LanguageReorderSidepanel: React.FC<LanguageReorderSidepanelProps> = ({
  open,
  onClose,
  languages,
  onSave,
}) => {
  const [items, setItems] = useState<Language[]>(languages);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleSave = () => {
    onSave(items);
    onClose();
  };

  const handleCancel = () => {
    setItems(languages);
    onClose();
  };

  const activeLanguage = activeId ? items.find((item) => item.id === activeId) : null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] max-w-full flex flex-col">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-left">Arrange languages</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col gap-6">
          <p className="text-sm text-muted-foreground">
            Change the order that languages appear in your site's language menu.
          </p>
          
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-4">
                {items.map((language) => (
                  <LanguageCard
                    key={language.id}
                    language={language}
                  />
                ))}
              </div>
            </SortableContext>
            
            <DragOverlay>
              {activeLanguage ? (
                <LanguageCard language={activeLanguage} isDragging />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        <div className="flex gap-3 pt-6 border-t">
          <Button onClick={handleSave} className="flex-1">
            Save
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
