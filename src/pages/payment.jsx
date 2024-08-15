import axios from 'axios';
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Center, VStack, Text, useToast } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const MpesaPayment = () => {
  const location = useLocation();
  const { phone_number, amount, account_reference, transaction_desc } = location.state || {};
  const [formData, setFormData] = useState({
    phone_number: phone_number || '',
    amount: amount || '',
    account_reference: account_reference || '',
    transaction_desc: transaction_desc || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Get token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found.');
      }

      // Make API request to process payment
      const response = await axios.post(
        'http://127.0.0.1:8000/api/payments/mpesa/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        }
      );

      // Handle successful response
      console.log('Response:', response.data);
      setSuccess('Payment processed successfully');
      setFormData({
        phone_number: '',
        amount: '',
        account_reference: '',
        transaction_desc: ''
      });
      toast({
        title: "Success",
        description: "Payment processed successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Handle error response
      console.error('Error during payment processing:', error);
      setError('Payment processing failed');
      toast({
        title: "Error",
        description: "Payment processing failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center minH="100vh" bg="gray.100">
      <Box
        marginTop="-100px"
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="phone_number" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </FormControl>
            <FormControl id="amount" isRequired>
              <FormLabel>Amount</FormLabel>
              <Input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
              />
            </FormControl>
            <FormControl id="account_reference" isRequired>
              <FormLabel>Account Reference</FormLabel>
              <Input
                type="text"
                name="account_reference"
                value={formData.account_reference}
                onChange={handleChange}
                placeholder="Account Reference"
              />
            </FormControl>
            <FormControl id="transaction_desc" isRequired>
              <FormLabel>Transaction Description</FormLabel>
              <Input
                type="text"
                name="transaction_desc"
                value={formData.transaction_desc}
                onChange={handleChange}
                placeholder="Transaction Description"
              />
            </FormControl>
            <Button
              type="submit"
              isLoading={loading}
              colorScheme="teal"
              width="full"
            >
              {loading ? 'Processing...' : 'Submit'}
            </Button>
            {error && <Text color="red.500">{error}</Text>}
            {success && <Text color="green.500">{success}</Text>}
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default MpesaPayment;
