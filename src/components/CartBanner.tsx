
interface CartBannerProps {
  itemCount: number;
  onClearCart: () => void;
}

export const CartBanner = ({
  itemCount,
  onClearCart
}: CartBannerProps) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="text-blue-800 font-medium">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
        </div>
      </div>
      <button
        onClick={onClearCart}
        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
      >
        Clear cart
      </button>
    </div>
  );
};
