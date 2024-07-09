import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    // You might want to call an API endpoint to authenticate the user
    console.log('Logging in with:', { email, password });
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
        <Heading mb={6}>Login</Heading>
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
              type="submit" 
              colorScheme="teal" 
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
