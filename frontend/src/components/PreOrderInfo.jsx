import React, { useEffect, useState } from 'react';

const PreOrderInfo = ({ availableDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const target = new Date(availableDate);

    const updateCountdown = () => {
      const now = new Date();
      const distance = target - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Available now');
      }
    };

    updateCountdown(); // initial call
    const interval = setInterval(updateCountdown, 60000); // update every minute
    return () => clearInterval(interval); // cleanup
  }, [availableDate]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const startDate = new Date(availableDate);
  const endDate = new Date(availableDate);
  startDate.setDate(startDate.getDate() + 7);  // 1 week after available
  endDate.setDate(endDate.getDate() + 12);     // 5 days window

  return (
    <div className="mt-1">
      <p className="text-red-600 text-xs font-semibold">🛒 Pre-Order Product</p>
      
      <p className="text-xs text-orange-500 font-semibold mt-1">⏳ Available in: {timeLeft}</p>
      <p className="text-xs text-gray-600 mt-1">
        Estimated Delivery:{' '}
        <strong>{`${formatDate(startDate)} – ${formatDate(endDate)}, ${endDate.getFullYear()}`}</strong>
      </p>
    </div>
  );
};

export default PreOrderInfo;
