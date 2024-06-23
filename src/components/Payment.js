import React, { useState } from 'react';

export default function Payment({ amount }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [error, setError] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handlePayment = () => {
    if (cardNumber && expiryDate && cvv && nameOnCard) {
      console.log('Payment processed');
      // onClose();
    } else {
      setError('Please fill in all fields');
    }
  };

  console.log("payment amount", amount)

  let deliveryFee = 145;
  let TotalPayment = amount + deliveryFee;

  return (
    <div className="payment-modal">
      <h2 className="payment-title">Payment Information</h2>
      {!showPaymentForm && (
        <div className="payment-summary">
          <h3>Order Summary</h3>
          <p>Items Total: ${amount}</p>
          <p>Delivery Fee: Rs. {deliveryFee}</p>
          <p>Total Payment: Rs. {TotalPayment}</p>
          <p>VAT included, where applicable</p>
          <button
            className="btn"
            onClick={() => setShowPaymentForm(true)}
            style={{ backgroundColor: "#feb47b", color: 'white' }}>
            Place Order
          </button>
        </div>
      )}
      {showPaymentForm && (
        <div className="payment-form">
          <div className="form-group">
            <label htmlFor="nameOnCard">Name on Card</label>
            <input
              type="text"
              id="nameOnCard"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              placeholder="Enter name on card"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter card number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="Enter CVV"
              required
            />
          </div>
          {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
          <button className="btn" onClick={handlePayment} style={{ backgroundColor: "#feb47b", color: 'white' }}>
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
}
