
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

const RegisterCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/register/', {
      username,
      password,
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    })
      .then((response) => {
        setMessage('Registration successful!');
        setUsername('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setTimeout(() => history.push('/login'), 2000);
      })
      .catch((error) => {
        setMessage('Registration failed: ' + error.response.data.error);
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
        <Heading as="h2" size="lg">Register</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="firstName" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </FormControl>
          <FormControl id="lastName" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </FormControl>
          <FormControl id="phoneNumber" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" mt="4" width="full">
            Register
          </Button>
        </form>
        {message && <Text color="red.500">{message}</Text>}
      </VStack>
    </Box>
  );
};

export default RegisterCard;
