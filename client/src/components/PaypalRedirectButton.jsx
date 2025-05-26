import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaPaypal } from "react-icons/fa";
import { toast } from "react-toastify";

const PaypalRedirectButton = () => {
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07;
  const totalAmount = (subtotal + shipping + tax).toFixed(2);

  const handleRedirect = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const data = await response.json();
      if (data && data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        toast.error("Failed to initiate PayPal payment.");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
      disabled={loading}
      onClick={handleRedirect}
    >
      <FaPaypal />
      {loading ? "Redirecting..." : `Continue with PayPal ($${totalAmount})`}
    </button>
  );
};

export default PaypalRedirectButton; 