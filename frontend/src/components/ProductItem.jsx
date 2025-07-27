import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, name, image, price, actualPrice, isPreOrder }) => {
  const discountPercent = actualPrice
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

      {/* Discount badge */}
      {discountPercent > 0 && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded z-10">
          -{discountPercent}%
        </div>
      )}

      <img
        src={image[0]}
        alt={name}
        className="w-full h-64 object-cover rounded-md group-hover:opacity-90 transition"
      />

      <div className="mt-2 text-sm sm:text-base">
        <p className="font-medium truncate">{name}</p>
        <p className="text-red-500 font-semibold">₹{price}</p>
        {actualPrice && actualPrice > price && (
          <p className="text-xs line-through text-gray-500">₹{actualPrice}</p>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;
