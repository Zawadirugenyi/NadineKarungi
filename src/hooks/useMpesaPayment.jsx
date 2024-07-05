import { useState } from 'react';
import axios from 'axios';

const useMpesaPayment = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [paymentReference, setPaymentReference] = useState('');

  const initiatePayment = async () => {
    setIsSubmitting(true);
    try {
      // Replace with your backend API endpoint for initiating M-Pesa payment
      const response = await axios.post('http://your-backend-api/mpesa/initiate-payment', {
        phoneNumber,
        amount,
      });
      // Assuming the backend generates a payment reference or URL for initiating payment
      setPaymentReference(response.data.paymentReference);
      setIsSubmitting(false);
      setError(null);
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError('Error initiating payment');
      setIsSubmitting(false);
    }
  };

  const confirmPayment = async (transactionId) => {
    setIsSubmitting(true);
    try {
      // Replace with your backend API endpoint for confirming M-Pesa payment
      const response = await axios.post('http://your-backend-api/mpesa/confirm-payment', {
        transactionId,
      });
      console.log('Payment confirmed!', response.data);
      // Handle successful payment confirmation (e.g., update UI)
      setIsSubmitting(false);
      setError(null);
    } catch (error) {
      console.error('Error confirming payment:', error);
      setError('Error confirming payment');
      setIsSubmitting(false);
    }
  };

  return {
    phoneNumber,
    setPhoneNumber,
    amount,
    setAmount,
    initiatePayment,
    confirmPayment,
    paymentReference,
    isSubmitting,
    error,
  };
};

export default useMpesaPayment;
