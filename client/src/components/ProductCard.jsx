import { assets } from "../assets/assets";
import { useAppContext } from "../context/appContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/product/${product.category.toLowerCase()}/${product?._id}`);
          scrollTo(0, 0);
        }}
        className="border border-gray-300 rounded-lg p-3 md:p-4 bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-xs shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div className="group cursor-pointer flex items-center justify-center">
          <img
            className="group-hover:scale-105 transition-transform duration-300 w-full h-40 object-contain"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        <div className="text-gray-500 text-sm mt-3 space-y-1">
          <p className="capitalize">{product.category}</p>

          <p className="text-gray-800 font-semibold text-base sm:text-lg truncate">
            {product.name}
          </p>

          <div className="flex items-center gap-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="rating"
                  className="w-3.5 sm:w-4"
                />
              ))}
            <p className="text-xs">(4)</p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <p className="text-indigo-500 font-medium text-base sm:text-lg">
              ${product.offerPrice}{" "}
              <span className="line-through text-gray-400 text-xs sm:text-sm">
                ${product.price}
              </span>
            </p>

            <div
              onClick={(e) => e.stopPropagation()}
              className="text-indigo-500"
            >
              {!cartItems?.[product?._id] ? (
                <button
                  onClick={() => addToCart(product?._id)}
                  className="flex items-center gap-1 bg-indigo-100 border border-indigo-300 px-2 sm:px-3 py-1 rounded text-indigo-600 text-xs sm:text-sm font-medium"
                >
                  <img src={assets.cart_icon} alt="cart icon" className="w-4 h-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-indigo-500/10 px-2 py-1 rounded text-sm">
                  <button
                    onClick={() => removeFromCart(product?._id)}
                    className="px-2 text-indigo-600 font-bold"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-black font-medium">
                    {cartItems[product?._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product?._id)}
                    className="px-2 text-indigo-600 font-bold"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
