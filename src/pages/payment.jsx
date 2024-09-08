import React, { useState } from 'react';
import {
  Button, Input, FormControl, FormLabel, Text, Heading, Flex, Card, CardBody,
  useBreakpointValue
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../Components/Assets/Blue-and-White-Bedroom-Ideas-12-jpg.webp';

const MpesaPayment = () => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('254'); // Start with 254
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract tenantName and roomNumber from location state
  const { tenantName, roomNumber } = location.state || {};

  // Validation for phone number and amount
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^254\d{9}$/; // Validates phone numbers starting with 254 and 9 more digits
    return phoneRegex.test(number);
  };

  const validateAmount = (amt) => parseFloat(amt) > 0;

  const handlePayment = async () => {
    setResponseMessage('');
    if (!validatePhoneNumber(phoneNumber)) {
      setResponseMessage('Invalid phone number. It should start with 254 and have 12 digits total.');
      return;
    }

    if (!validateAmount(amount)) {
      setResponseMessage('Amount must be greater than 0.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/lipa_na_mpesa/', {
        amount: parseFloat(amount),
        phone_number: phoneNumber,
      });

      if (response.data && response.data.ResponseCode === '0') {
        setResponseMessage('Payment initiated successfully. Please check your phone for further instructions.');
        
        // Redirect to dashboard after successful payment
        setTimeout(() => {
          navigate('/dashboard', { state: { tenantName, roomNumber } });
        }, 2000);
      } else {
        setResponseMessage('Failed to initiate payment. Response Code: ' + response.data.ResponseCode);
      }
    } catch (error) {
      setResponseMessage('Error: ' + error.message);
    }

    setLoading(false);
  };

  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Flex direction={flexDirection} align="center" justify="center" p={5} gap={4}>
      <Card
        w={{ base: 'full', md: '700px' }}
        h={{ base: '300px', md: '570px' }}
        p={0}
        marginRight="90px"
        boxShadow="lg"
        rounded="md"
        bgPosition="center"
        bgSize="cover"
        bgImage={`url(${backgroundImage})`}
      />
      <Card
        maxW={{ base: 'full', md: 'md' }}
        borderRadius="lg"
        boxShadow="lg"
        p={5}
        bg="white"
        w={{ base: 'full', md: '700px' }}
        h={{ base: '300px', md: '500px' }}
      >
        <CardBody marginBottom="50px">
          <Heading mb={6}>Make Your Payment</Heading>
   
          <FormControl id="amount" mb={4} marginBottom="20px">
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </FormControl>
          <FormControl id="phoneNumber" mb={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number starting with 254"
            />
          </FormControl>
          <Button
            colorScheme="teal"
            onClick={handlePayment}
            isLoading={loading}
            width="full"
          >
            Initiate Payment
          </Button>
          {responseMessage && <Text mt={4} color={responseMessage.includes('Error') ? 'red.500' : 'green.500'}>{responseMessage}</Text>}
        </CardBody>
      </Card>
    </Flex>
  );
};

export default MpesaPayment;
