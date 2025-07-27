
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const navigateFallback = useNavigate();

  const {
    navigate: contextNavigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext);

  const goTo = contextNavigate || navigateFallback;

  useEffect(() => {
    if (!token) {
      toast.error("Please login to place an order");
      goTo("/login");
    }
  }, [token, goTo]);

  if (!token) return null;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: '',
  });

  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');

  
  const COUPONS = [
    {
      code: "VM07",
      discount_type: "flat",
      discount_value: 100,
    },
    {
      code: "JAY",
      discount_type: "flat",
      discount_value: 100,
    }
  ];

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  // const applyCoupon = () => {
  //   const orderAmount = getCartAmount();
  //   if (couponCode.trim().toUpperCase() === DEFAULT_COUPON.code) {
  //     const discount = DEFAULT_COUPON.discount_type === 'percentage'
  //       ? (orderAmount * DEFAULT_COUPON.discount_value) / 100
  //       : DEFAULT_COUPON.discount_value;

  //     setCouponData(DEFAULT_COUPON);
  //     setDiscountAmount(discount);
  //     setCouponError('');
  //     toast.success('Coupon applied successfully!');
  //   } else {
  //     setCouponData(null);
  //     setDiscountAmount(0);
  //     const msg = 'Invalid or expired coupon';
  //     setCouponError(msg);
  //     toast.error(msg);
  //   }
  // };
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    const orderAmount = getCartAmount();

    const matchedCoupon = COUPONS.find(c => c.code === code);

    if (matchedCoupon) {
      const discount = matchedCoupon.discount_type === 'percentage'
        ? Math.floor((orderAmount * matchedCoupon.discount_value) / 100)
        : matchedCoupon.discount_value;

      setCouponData(matchedCoupon);
      setDiscountAmount(discount);
      setCouponError('');
      toast.success(`Coupon ${matchedCoupon.code} applied successfully!`);
    } else {
      setCouponData(null);
      setDiscountAmount(0);
      setCouponError('Invalid or expired coupon');
      toast.error('Invalid or expired coupon');
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const res = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {
            headers: { token }
          });
          if (res.data.success) {
            setCartItems({});
            goTo('/orders');
          } else {
            toast.error("Payment verification failed");
            goTo('/cart');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
          toast.info("Payment cancelled");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const hasItems = Object.keys(cartItems).some(
      productId => Object.values(cartItems[productId]).some(qty => qty > 0)
    );

    if (!hasItems) {
      toast.error("Cart is empty. Add items before placing order.");
      return;
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const userId = localStorage.getItem('userId');
      const totalAmount = Math.max(0, getCartAmount() + delivery_fee - discountAmount);

      let orderData = {
        userId,
        address: formData,
        items: orderItems,
        amount: totalAmount,
        coupon: couponData?.code || null,
        discount: discountAmount
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            goTo('/orders');
            toast.success("Order Placed Successfully");
          } else {
            toast.error(response.data.message);
          }
          break;

        case 'razorpay':
          setLoading(true);
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          } else {
            toast.error("Razorpay order failed");
            setLoading(false);
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='pincode' value={formData.pincode} type="number" placeholder='Pin code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Contact' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80 border p-4 rounded shadow'>
          <h2 className='text-lg font-semibold mb-4'>Cart Summary</h2>
          <div className='flex justify-between mb-2'>
            <span>Subtotal</span>
            <span>₹{getCartAmount()}</span>
          </div>
          <div className='flex justify-between mb-2'>
            <span>Delivery Fee</span>
            <span>₹{delivery_fee}</span>
          </div>
          {couponData && (
            <div className='flex justify-between mb-2 text-green-600'>
              <span>Discount ({couponData.code})</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}
          <div className='flex justify-between font-bold text-xl border-t pt-2'>
            <span>Total</span>
            <span>₹{Math.max(0, getCartAmount() + delivery_fee - discountAmount)}</span>
          </div>
        </div>

        <div className='mt-10'>
          <Title text1={'COUPON'} text2={'CODE'} />
          <div className='flex gap-2 mt-2'>
            <input
              type='text'
              placeholder='Enter coupon code'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            />
            <button
              type='button'
              onClick={applyCoupon}
              className='bg-black text-white px-6 py-2 text-sm'
            >
              Apply
            </button>
          </div>
          {couponError && <p className='text-red-500 text-sm mt-1'>{couponError}</p>}
          {couponData && (
            <div className="mt-1">
              <p className='text-green-600 text-sm'>
                Coupon <strong>{couponData.code}</strong> applied: ₹{discountAmount} off
              </p>
              <button
                type="button"
                onClick={() => {
                  setCouponCode('');
                  setCouponData(null);
                  setDiscountAmount(0);
                  toast.info('Coupon removed');
                }}
                className='text-red-500 underline text-sm mt-1'
              >
                Remove coupon
              </button>
            </div>
          )}
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`} />
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="stripe" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`} />
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="razorpay" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`} />
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <p className='text-sm text-red-500 mt-5'>
            *To build <strong>trust</strong>, we are accepting only <strong className='text-black font-bold'>Cash On Delivery</strong> currently.
          </p>

          <div className='w-full text-end mt-8'>
            <button
              type='submit'
              className='bg-black text-white px-16 py-3 text-sm flex items-center justify-center gap-2'
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? 'Processing...' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

