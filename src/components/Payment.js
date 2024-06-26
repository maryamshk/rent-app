import React, { useState } from 'react';
import '../payment.css';
import { useNavigate } from 'react-router-dom';
export default function Payment({ amount, onClose }) {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [error, setError] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    if (cardNumber && expiryDate && cvv && nameOnCard) {
      console.log('Payment processed');
      setPaymentSuccess(true);
    } else {
      setError('Please fill in all fields');
    }
  };

  let deliveryFee = 145;
  let TotalPayment = amount + deliveryFee;

  return (
    <div className="payment-modal">
      <div className="payment-container">
        {paymentSuccess ? (
          <div className="payment-success">
            <h3>Payment Successful</h3>
            <p>Thank you for your order!</p>
            <p>Your payment of ${TotalPayment} has been processed successfully.</p>
            <button className="btn" onClick={() => { onClose(); navigate('/home') }}>
              Back to Home
            </button>
          </div>
        ) : !showPaymentForm ? (
          <div className="payment-summary">
            <h3>Order Summary</h3>
            <p>Items Total: ${amount}</p>
            <p>Delivery Fee: ${deliveryFee}</p>
            <p>Total Payment: ${TotalPayment}</p>
            <button
              className="btn"
              onClick={() => setShowPaymentForm(true)}>
              Place Order
            </button>
          </div>
        ) : (
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
            {error && <div className="error-message">{error}</div>}
            <button className="btn confirm-payment-btn" onClick={handlePayment}>
              Confirm Payment
            </button>
          </div>
        )}
      </div>
    </div >
  );
}
