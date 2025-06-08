
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Language = 'en' | 'et';
type NavigationState = 'normal' | 'empty';

interface DevControlsProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  navigationState: NavigationState;
  onNavigationChange: (state: NavigationState) => void;
  currentPageName?: string;
}

const DEV_CONTROLS_STORAGE_KEY = 'dev-controls-state';

interface StoredState {
  language: Language;
  navigationState: NavigationState;
}

export const DevControls: React.FC<DevControlsProps> = ({
  language,
  onLanguageChange,
  navigationState,
  onNavigationChange,
  currentPageName = 'Site structure'
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(DEV_CONTROLS_STORAGE_KEY);
    if (stored) {
      try {
        const parsedState: StoredState = JSON.parse(stored);
        onLanguageChange(parsedState.language);
        onNavigationChange(parsedState.navigationState);
      } catch (error) {
        console.error('Failed to parse dev controls state:', error);
      }
    }
  }, [onLanguageChange, onNavigationChange]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state: StoredState = {
      language,
      navigationState
    };
    localStorage.setItem(DEV_CONTROLS_STORAGE_KEY, JSON.stringify(state));
  }, [language, navigationState]);

  const handleDestroy = () => {
    setIsVisible(false);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    onLanguageChange(newLanguage);
  };

  const handleNavigationChange = (newState: NavigationState) => {
    onNavigationChange(newState);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <label className="text-orange-600 text-xs min-w-0 flex-shrink-0">
            Language:
          </label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="h-8 bg-white border-orange-200 text-orange-800 text-xs font-mono flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="et">Estonian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Navigation State */}
        <div className="flex items-center gap-2">
          <label className="text-orange-600 text-xs min-w-0 flex-shrink-0">
            Navigation:
          </label>
          <Select value={navigationState} onValueChange={handleNavigationChange}>
            <SelectTrigger className="h-8 bg-white border-orange-200 text-orange-800 text-xs font-mono flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{currentPageName}</span>
                </div>
              </SelectItem>
              <SelectItem value="empty">Empty state</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
