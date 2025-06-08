
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

interface DevControlsProps {
  emptyState: boolean;
  onEmptyStateChange: (emptyState: boolean) => void;
  currentPageName?: string;
  onDestroy: () => void;
}

const DEV_CONTROLS_STORAGE_KEY = 'dev-controls-state';

interface StoredState {
  emptyState: boolean;
}

export const DevControls: React.FC<DevControlsProps> = ({
  emptyState,
  onEmptyStateChange,
  currentPageName = 'Site structure',
  onDestroy
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(DEV_CONTROLS_STORAGE_KEY);
    if (stored) {
      try {
        const parsedState: StoredState = JSON.parse(stored);
        onEmptyStateChange(parsedState.emptyState);
      } catch (error) {
        console.error('Failed to parse dev controls state:', error);
      }
    }
  }, [onEmptyStateChange]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state: StoredState = {
      emptyState
    };
    localStorage.setItem(DEV_CONTROLS_STORAGE_KEY, JSON.stringify(state));
  }, [emptyState]);

  const handleDestroy = () => {
    onDestroy();
  };

  const handleEmptyStateToggle = (pressed: boolean) => {
    onEmptyStateChange(pressed);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="w-full bg-orange-50 border-2 border-dashed border-orange-400 rounded-lg p-4 font-mono text-sm mb-6"
      style={{
        borderRadius: '10px',
        background: 'rgb(255 247 237)',
        border: '2px dashed rgb(251 146 60)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-orange-600 font-bold text-xs tracking-wider">DEV ONLY</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-orange-600 hover:text-orange-800 hover:bg-orange-100"
          onClick={handleDestroy}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <label className="text-orange-600 text-xs min-w-0 flex-shrink-0">
            Empty state:
          </label>
          <Toggle 
            pressed={emptyState}
            onPressedChange={handleEmptyStateToggle}
            className="h-8 px-3 bg-white border border-orange-200 text-orange-800 text-xs font-mono data-[state=on]:bg-orange-100 data-[state=on]:text-orange-900"
          >
            {emptyState ? 'ON' : 'OFF'}
          </Toggle>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-orange-600 text-xs min-w-0 flex-shrink-0">
              Figma:
            </label>
            <a 
              href="https://www.figma.com/design/FGonQ6GxSYt1fCuIPZ7Zep/Voog--Site-structure?node-id=1-1349&t=aTY9mOK5JexRbsJT-1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 text-xs hover:underline"
            >
              Site structure 2.0
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-orange-600 text-xs min-w-0 flex-shrink-0">
              Linear:
            </label>
            <span className="text-orange-600 text-xs">
              Refactor "Site structure" view
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
