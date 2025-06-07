
interface EyeHiddenIconProps {
  size?: number;
  className?: string;
}

export const EyeHiddenIcon = ({ size = 20, className = "" }: EyeHiddenIconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path 
      d="M19.2079 9.84839C20.3304 11.0179 21 12 21 12C21 12 16.9091 18 12 18C11.1894 18 10.3879 17.8865 9.59549 17.6609L19.2079 9.84839Z" 
      fill="currentColor"
    />
    <path 
      d="M14.505 6.49483L12 9C10.3431 9 9 10.3431 9 12L5.52661 15.4734C3.75006 13.8335 3 12 3 12C3 12 5.45455 6 12 6C12.8665 6 13.7076 6.18695 14.505 6.49483Z" 
      fill="currentColor"
    />
    <path 
      opacity="0.3" 
      d="M18.535 5.00003L5.09998 18.435L6.51498 19.85L19.95 6.41523L18.535 5.00003Z" 
      fill="currentColor"
    />
  </svg>
);
