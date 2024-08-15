import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, FormControl, FormLabel, Text,Heading, Flex, Card, CardBody, useBreakpointValue } from '@chakra-ui/react';
import backgroundImage from '../Components/Assets/superior-room-1.jpeg';

const MpesaPayment = () => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setResponseMessage('');

    try {
      // Send a request to your Django backend to initiate the STK push
      const response = await axios.post('http://127.0.0.1:8000/lipa_na_mpesa/', {
        amount: parseFloat(amount),
        phone_number: phoneNumber,
      });

      // Check response from the backend
      if (response.data && response.data.ResponseCode === '0') {
        setResponseMessage('Payment initiated successfully. Please check your phone for further instructions.');
      } else {
        setResponseMessage('Failed to initiate payment. Response Code: ' + response.data.ResponseCode);
      }
    } catch (error) {
      setResponseMessage('Error: ' + error.message);
    }

    setLoading(false);
  };

  // Use responsive layouts for different screen sizes
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Flex
      direction={flexDirection}
      align="center"
      justify="center"
      p={5}
      gap={4}
    >
      {/* Card for background image */}
      <Card
        w={{ base: 'full', md: '700px' }}  // Adjust width for larger screens
        h={{ base: '300px', md: '570px' }}  // Adjust height for larger screens
        p={0}
        marginRight="90px"
        boxShadow="lg"
        rounded="md"
        bgPosition="center"
        bgSize="cover"
        bgImage={`url(${backgroundImage})`}
      >
        {/* The image is used as a background */}
      </Card>

      {/* Card for payment form */}
      <Card
        maxW={{ base: 'full', md: 'md' }}
        borderRadius="lg"
        boxShadow="lg"
        p={5}
        bg="white"
        w={{ base: 'full', md: '700px' }}  // Adjust width for larger screens
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
              placeholder="Enter phone number"
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
          {responseMessage && <Text mt={4}>{responseMessage}</Text>}
        </CardBody>
      </Card>
    </Flex>
  );
};

export default MpesaPayment;
