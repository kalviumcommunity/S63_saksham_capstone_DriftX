import React from "react";

const PaypalRedirectButton = ({ amount = "49.99" }) => {
  const handleRedirect = async () => {
    // Call backend to create PayPal order and get approval URL
    const response = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await response.json();
    if (data && data.approvalUrl) {
      window.location.href = data.approvalUrl;
    } else {
      alert("Failed to initiate PayPal payment.");
    }
  };

  return (
    <button
      style={{
        margin: "24px 0",
        padding: "12px 24px",
        background: "#ffc439",
        border: "none",
        borderRadius: 4,
        fontWeight: "bold",
        cursor: "pointer",
      }}
      onClick={handleRedirect}
    >
      Pay with PayPal (Redirect)
    </button>
  );
};

export default PaypalRedirectButton; 