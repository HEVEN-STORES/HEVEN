import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const AdminCouponPanel = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount_type: 'flat',
    discount_value: '',
    min_order_amount: '',
    expiry_date: ''
  });

  const token = localStorage.getItem('token');

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/coupon`, {
        headers: { token },
      });
      setCoupons(res.data);
    } catch (error) {
      toast.error('Failed to fetch coupons');
    }
  };

  const createCoupon = async () => {
    try {
      await axios.post(`${backendUrl}/api/coupon`, newCoupon);
      toast.success('Coupon created successfully!');
      fetchCoupons();
      setNewCoupon({
        code: '',
        discount_type: 'flat',
        discount_value: '',
        min_order_amount: '',
        expiry_date: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create coupon');
    }
  };

  const deleteCoupon = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/coupon/${id}`);
      toast.success('Coupon deleted');
      fetchCoupons();
    } catch (error) {
      toast.error('Failed to delete coupon');
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Coupon</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          placeholder="Code"
          className="border p-2"
          value={newCoupon.code}
          onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
        />
        <select
          className="border p-2"
          value={newCoupon.discount_type}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, discount_type: e.target.value })
          }
        >
          <option value="flat">Flat</option>
          <option value="percentage">Percentage</option>
        </select>
        <input
          type="number"
          placeholder="Discount Value"
          className="border p-2"
          value={newCoupon.discount_value}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, discount_value: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Min Order Amount"
          className="border p-2"
          value={newCoupon.min_order_amount}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, min_order_amount: e.target.value })
          }
        />
        <input
          type="date"
          className="border p-2"
          value={newCoupon.expiry_date}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, expiry_date: e.target.value })
          }
        />
        <button className="bg-black text-white p-2" onClick={createCoupon}>
          Create Coupon
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">Existing Coupons</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Code</th>
            <th className="p-2">Type</th>
            <th className="p-2">Value</th>
            <th className="p-2">Min</th>
            <th className="p-2">Expires</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id} className="border-b">
              <td className="p-2">{coupon.code}</td>
              <td className="p-2">{coupon.discount_type}</td>
              <td className="p-2">{coupon.discount_value}</td>
              <td className="p-2">{coupon.min_order_amount}</td>
              <td className="p-2">
                {new Date(coupon.expiry_date).toLocaleDateString()}
              </td>
              <td className="p-2">
                <button
                  onClick={() => deleteCoupon(coupon._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCouponPanel;
