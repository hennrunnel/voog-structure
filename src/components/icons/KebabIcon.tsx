
interface KebabIconProps {
  size?: number;
  className?: string;
}

export const KebabIcon = ({ size = 16, className = "" }: KebabIconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`opacity-100 hover:opacity-50 transition-opacity ${className}`}
  >
    <path 
      d="M8 4.66667C8.73638 4.66667 9.33333 4.06971 9.33333 3.33333C9.33333 2.59695 8.73638 2 8 2C7.26362 2 6.66667 2.59695 6.66667 3.33333C6.66667 4.06971 7.26362 4.66667 8 4.66667Z" 
      fill="currentColor"
    />
    <path 
      d="M8 9.33333C8.73638 9.33333 9.33333 8.73638 9.33333 8C9.33333 7.26362 8.73638 6.66667 8 6.66667C7.26362 6.66667 6.66667 7.26362 6.66667 8C6.66667 8.73638 7.26362 9.33333 8 9.33333Z" 
      fill="currentColor"
    />
    <path 
      d="M8 14C8.73638 14 9.33333 13.4031 9.33333 12.6667C9.33333 11.9303 8.73638 11.3333 8 11.3333C7.26362 11.3333 6.66667 11.9303 6.66667 12.6667C6.66667 13.4031 7.26362 14 8 14Z" 
      fill="currentColor"
    />
  </svg>
);
