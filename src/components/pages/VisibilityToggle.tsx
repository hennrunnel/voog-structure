
import React from "react";
import { EyeVisibleIcon } from "@/components/icons/EyeVisibleIcon";
import { EyeHiddenIcon } from "@/components/icons/EyeHiddenIcon";

interface VisibilityToggleProps {
  isVisible: boolean;
  isUntranslated?: boolean;
  pageTitle: string;
  onToggle: () => void;
}

export const VisibilityToggle: React.FC<VisibilityToggleProps> = ({
  isVisible,
  isUntranslated,
  pageTitle,
  onToggle
}) => {
  if (isUntranslated) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        aria-label={isVisible ? `Hide ${pageTitle} from menu` : `Show ${pageTitle} in menu`}
        className="outline-none focus:outline-none focus:ring-0 rounded text-black"
      >
        {isVisible ? <EyeVisibleIcon /> : <EyeHiddenIcon />}
      </button>
    </div>
  );
};
