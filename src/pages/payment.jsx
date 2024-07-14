import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Payment = () => {
  const [formData, setFormData] = useState({
    phone_number: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found.');
      }

      const response = await axios.post('http://127.0.0.1:8000/api/payments/mpesa/', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      setLoading(false);
      setSuccess('Payment processed successfully');
      setError('');
      toast({
        title: 'Payment processed successfully.',
        description: 'Your payment has been successfully processed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        phone_number: '',
        amount: '',
      });
    } catch (error) {
      setLoading(false);
      setError('Payment processing failed');
      setSuccess('');
      console.error('Error during payment processing:', error);
      toast({
        title: 'Payment processing failed.',
        description: 'There was an error processing your payment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="400px" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <FormControl id="phone_number" mb={4} isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            name="phone_number"
            placeholder="Enter your phone number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="amount" mb={4} isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            name="amount"
            placeholder="Enter amount to pay"
            value={formData.amount}
            onChange={handleChange}
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full" mt={4} isLoading={loading}>
          Pay with Mpesa
        </Button>
      </form>

      {error && <Box color="red.500" mt={4}>{error}</Box>}
      {success && <Box color="green.500" mt={4}>{success}</Box>}
    </Box>
  );
};

export default Payment;
