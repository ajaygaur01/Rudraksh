"use client";

import React, { useState } from "react";

function Checkout() {
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    const { customer_name, customer_email, customer_phone, amount } = customerInfo;

    if (!customer_name || !customer_email || !customer_phone || !amount) {
      setError("Please fill all the fields.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "9921a34d-1115-479c-8acb-3d6177d0c910",
          customer_name,
          customer_email,
          customer_phone,
          amount: parsedAmount,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      if (data.payment_session_id) {
        // Use the correct format for Cashfree redirect URL
        // For sandbox:
        const paymentUrl = `https://sandbox.cashfree.com/pg/orders/${data.payment_session_id}`;
        console.log("Redirecting to:", paymentUrl);
        window.location.href = paymentUrl;
      } else {
        throw new Error("Invalid payment session ID. Please try again.");
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
      setError(error.message || "Error initiating payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label className="block mb-1">
            Name:
            <input
              type="text"
              name="customer_name"
              value={customerInfo.customer_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </label>
        </div>
        <div>
          <label className="block mb-1">
            Email:
            <input
              type="email"
              name="customer_email"
              value={customerInfo.customer_email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </label>
        </div>
        <div>
          <label className="block mb-1">
            Phone:
            <input
              type="tel"
              name="customer_phone"
              value={customerInfo.customer_phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </label>
        </div>
        <div>
          <label className="block mb-1">
            Amount (₹):
            <input
              type="number"
              name="amount"
              value={customerInfo.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </label>
        </div>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;