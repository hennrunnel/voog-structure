
interface ExternalLinkIconProps {
  size?: number;
  className?: string;
}

export const ExternalLinkIcon = ({ size = 16, className = "" }: ExternalLinkIconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M11.0641 6.21207C11.3244 5.95172 11.3244 5.52961 11.0641 5.26926C10.8037 5.00891 10.3816 5.00891 10.1213 5.26926L4.46443 10.9261C4.20408 11.1865 4.20408 11.6086 4.46443 11.8689C4.72478 12.1293 5.14689 12.1293 5.40724 11.8689L11.0641 6.21207Z" 
      fill="currentColor"
    />
    <path 
      d="M5.40726 5.93587C5.03908 5.93587 4.74059 5.63739 4.74059 5.26921C4.74059 4.90102 5.03908 4.60254 5.40726 4.60254H11.0641C11.4211 4.60254 11.7147 4.88366 11.7301 5.24025L11.9659 10.6614C11.9819 11.0293 11.6966 11.3404 11.3288 11.3564C10.9609 11.3724 10.6498 11.0871 10.6338 10.7193L10.4258 5.93587H5.40726Z" 
      fill="currentColor"
    />
  </svg>
);
