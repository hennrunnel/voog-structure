
interface EmptyLanguageTabsHeaderProps {
  onAddLanguageClick: () => void;
}

export const EmptyLanguageTabsHeader = ({ onAddLanguageClick }: EmptyLanguageTabsHeaderProps) => {
  return (
    <div 
      className="flex items-center justify-between"
      style={{ 
        paddingTop: '24px',
        paddingBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        borderBottom: '1px solid #EFEFEF'
      }}
    >
      <div className="flex items-center">
        <div 
          className="text-sm text-gray-400"
          style={{ 
            marginLeft: '32px',
            paddingBottom: '16px',
            paddingTop: '0px'
          }}
        >
          No languages
        </div>
      </div>
      
      <button 
        onClick={onAddLanguageClick} 
        className="text-sm text-[#5A4FFF] hover:underline outline-none focus:outline-none"
        style={{ 
          marginRight: '32px',
          paddingBottom: '16px',
          paddingTop: '0px',
          fontWeight: 500
        }}
      >
        Add language
      </button>
    </div>
  );
};
