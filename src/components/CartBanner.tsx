
interface CartBannerProps {
  itemCount: number;
  onClearCart: () => void;
}

export const CartBanner = ({ itemCount, onClearCart }: CartBannerProps) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg flex justify-between items-center" style={{ maxWidth: '992px' }}>
      <div>
        <span className="font-medium text-sm">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
        </span>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onClearCart}
          className="px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm"
        >
          Clear cart
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors text-sm">
          Checkout
        </button>
      </div>
    </div>
  );
};
