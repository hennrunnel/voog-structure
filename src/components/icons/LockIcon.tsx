
interface LockIconProps {
  size?: number;
  className?: string;
}

export const LockIcon = ({ size = 16, className = "" }: LockIconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      opacity="0.3" 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M5.24399 6.88167L1.00003 11L1.00003 13L2.66669 13L2.66669 11.6667L4.29455 11.6667L4.29455 10.3333H5.66669L7.12299 8.76067L5.24399 6.88167Z" 
      fill="currentColor"
    />
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M5.49509 8.48527C3.93299 6.92317 3.93299 4.39053 5.49509 2.82843C7.05719 1.26633 9.58984 1.26633 11.1519 2.82843C12.714 4.39053 12.714 6.92317 11.1519 8.48527C9.58984 10.0474 7.05719 10.0474 5.49509 8.48527ZM8.37378 5.78799C8.76431 6.17851 9.39747 6.17851 9.78799 5.78799C10.1785 5.39747 10.1785 4.7643 9.78799 4.37378C9.39747 3.98325 8.76431 3.98325 8.37378 4.37378C7.98326 4.7643 7.98326 5.39747 8.37378 5.78799Z" 
      fill="currentColor"
    />
  </svg>
);
