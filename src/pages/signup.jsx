import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading, Text, VStack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

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

      // Redirect to login page after successful registration
      navigate('/login');

    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <Box 
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box 
        maxW="sm"
        w="full"
        p={6}
        bg="white"
        boxShadow="lg"
        rounded="md"
      >
        <Heading mb={6}>Sign Up</Heading>
        {message.text && (
          <Alert status={message.type} mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>{message.type === 'success' ? 'Success' : 'Error'}!</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setMessage({ type: '', text: '' })} />
          </Alert>
        )}
        <form onSubmit={handleSignup}>
          <VStack spacing={4}>
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
              colorScheme="teal" 
              width="full"
            >
              Sign Up
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          Already have an account? <Link to="/login" color="teal.500">Login</Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Signup;
