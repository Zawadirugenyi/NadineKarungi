

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/login/', { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful!');
        setTimeout(() => history.push('/dashboard'), 2000);
      })
      .catch((error) => {
        setMessage('Login failed: ' + error.response.data.error);
      });
  };

  return (
    <Box
      w="400px"
      p="8"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <VStack spacing="4">
        <Heading as="h2" size="lg">Login</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" mt="4" width="full">
            Login
          </Button>
        </form>
        {message && <Text color="red.500">{message}</Text>}
      </VStack>
    </Box>
  );
};

export default LoginForm;
