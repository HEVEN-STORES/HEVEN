import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, name, image, price, actualPrice, isPreOrder }) => {
  // 🔻 Calculate discount percentage
  const discountPercentage = actualPrice && price
    ? Math.round(((actualPrice - price) / actualPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${id}`} className="relative block group">
      {/* Pre-Order Badge */}
      {isPreOrder && (
        <div className="absolute top-2 left-2 bg-black text-white text-[10px] sm:text-xs px-2 py-1 rounded uppercase z-10">
          Pre-Order
        </div>
      )}

      <img
        src={image[0]}
        alt={name}
        className="w-full h-64 object-cover rounded-md group-hover:opacity-90 transition"
      />

      <div className="mt-2 text-sm sm:text-base">
        <p className="font-medium truncate">{name}</p>
        <p className="text-red-500 font-semibold">
          ₹{price}
          {discountPercentage > 0 && (
            <span className="ml-2 text-green-600 text-xs font-medium">
              ({discountPercentage}% OFF)
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
