
interface CartBannerProps {
  itemCount: number;
  onClearCart: () => void;
}

export const CartBanner = ({
  itemCount,
  onClearCart
}: CartBannerProps) => {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 font-medium">
          {itemCount} {itemCount === 1 ? 'domain' : 'domains'} in cart
        </span>
      </div>
      <button
        onClick={onClearCart}
        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
      >
        Clear cart
      </button>
    </div>
  );
};
