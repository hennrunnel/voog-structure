
interface ChevronIconProps {
  isExpanded?: boolean;
  size?: number;
  className?: string;
}

export const ChevronIcon = ({ isExpanded = false, size = 16, className = "" }: ChevronIconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
    className={`transition-transform duration-200 ${className}`}
  >
    <path 
      d="M5.52859 11.5286C5.26824 11.7889 5.26824 12.2111 5.52859 12.4714C5.78894 12.7317 6.21106 12.7317 6.47141 12.4714L10.4714 8.47141C10.7238 8.219 10.7326 7.81264 10.4915 7.54953L6.8248 3.54953C6.57597 3.27811 6.15426 3.25977 5.88284 3.5086C5.61143 3.75743 5.59309 4.17914 5.84192 4.45055L9.07726 7.97993L5.52859 11.5286Z" 
      fill="currentColor"
    />
  </svg>
);
