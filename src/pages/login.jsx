import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading, Text, VStack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../Components/Assets/Room2.webp'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Incorrect email or password');
      }

      const data = await response.json();
      console.log('User logged in:', data);

      // Store the token (assuming the login response contains a token)
      localStorage.setItem('token', data.token);

      setMessage({ type: 'success', text: 'User logged in successfully!' });

      // Clear the form inputs
      setEmail('');
      setPassword('');

      // Check if tenant exists and redirect accordingly
      const tenantResponse = await fetch('http://127.0.0.1:8000/api/tenants/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${data.token}`,
        },
      });

      if (!tenantResponse.ok) {
        throw new Error('Error fetching tenant status');
      }

      const tenantData = await tenantResponse.json();
      const tenantExists = tenantData.some(tenant => tenant.email === email);

      if (tenantExists) {
        // Redirect to booking page if tenant exists
        navigate('/booking');
      } else {
        // Redirect to tenant creation page if tenant does not exist
        navigate('/tenant');
      }

      // Hide message after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000); // 5000 milliseconds (5 seconds)

    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="50px"> 
      <Box
        w="800px"
        p={6}
        height="500px"
        bg="gray.100"
        boxShadow="lg"
        bgSize="cover"
        bgPosition="center"
        mr={6} // Margin right to create space between image and form
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <Box
        w="500px"
        p={6}
        bg="white"
        boxShadow="lg"
        rounded="md"
      >
        <Heading mb={6}>Login</Heading>
        {message.text && (
          <Alert status={message.type} mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>{message.type === 'success' ? 'Success' : 'Error'}!</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setMessage({ type: '', text: '' })} />
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
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
              marginTop="12px"
              type="submit" 
              bg="#0097b2"
              color="white"
              _hover={{ bg: "#073d47" }}
              width="full"
            >
              Login
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          Don't have an account? <Link to="/signup" color="teal.500">Sign Up</Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Login;
