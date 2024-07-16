import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading, Text, VStack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

import backgroundImage from '../Components/Assets/superior-room-1.jpeg'; // Replace with your actual image path

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/users/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      console.log('User registered:', data);

      setMessage({ type: 'success', text: 'User registered successfully!' });

      // Clear the form inputs
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');

      // Log in the user after successful registration
      const loginResponse = await fetch('http://127.0.0.1:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error('Failed to log in');
      }

      const loginData = await loginResponse.json();
      console.log('User logged in:', loginData);

      // Store the token (assuming the login response contains a token)
      localStorage.setItem('token', loginData.token);

      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <Box display="flex" justifyContent="center"  marginTop="60px">
      <Box
        w="800px"
        p={6}
        bg="gray.200"
        boxShadow="lg"
        rounded="md"
        bgSize="cover"
        bgPosition="center"
        mr={3} // Margin right to create space between image and form
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <Box
        w="500px"
        p={3}
        bgPosition="center"
        bg="white"
        boxShadow="lg"
        rounded="md"
      >
        <Heading mb={1} >Sign Up</Heading>
        {message.text && (
          <Alert status={message.type} mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>{message.type === 'success' ? 'Success' : 'Error'}!</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setMessage({ type: '', text: '' })} />
          </Alert>
        )}
        <form onSubmit={handleSignup}>
          <VStack spacing={1}>
            <FormControl id="first-name" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
              />
            </FormControl>
            <FormControl id="last-name" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </FormControl>
            <FormControl id="phone-number" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input 
                type="text" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </FormControl>
            <Button 
              type="submit" 
              bg="#0097b2"
              _hover={{ bg: "#073d47" }}
              color="white"
              width="full"
            >
              Sign Up
            </Button>
          </VStack>
        </form>
        <Text mt={3} textAlign="center">
          Already have an account? <Link to="/login" color="teal.500">Login</Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Signup;
