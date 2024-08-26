import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UnlockSession = () => {
  const [username, setUsername] = useState('');
  const [bypassCode, setBypassCode] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setMessage({ type: 'error', text: 'Please enter a username.' });
      return;
    }

    try {
      // Check if the user exists and generate a bypass code
      const response = await axios.post('http://127.0.0.1:8000/api/generate_bypass_code/', { username });
      const { exists, code } = response.data;

      if (exists && code) {
        setBypassCode(code);
        setMessage({ type: 'success', text: 'Bypass code generated. Please use it on the next page to access the dashboard.' });
      } else {
        setMessage({ type: 'error', text: 'User not found or error generating bypass code.' });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Error checking user existence.';
      setMessage({ type: 'error', text: errorMessage });
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={10}>
      <Box w="400px" p={6} bg="white" boxShadow="lg" rounded="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Heading mb={6}>Unlock Session</Heading>
        {message.text && (
          <Alert status={message.type} mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>{message.type === 'success' ? 'Success' : 'Error'}!</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setMessage({ type: '', text: '' })} />
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            {bypassCode && (
              <FormControl id="bypass_code" isRequired>
                <FormLabel>Bypass Code</FormLabel>
                <Input
                  type="text"
                  value={bypassCode}
                  isReadOnly
                />
              </FormControl>
            )}
            <Button
              type="submit"
              bg="#0097b2"
              color="white"
              _hover={{ bg: "#073d47" }}
              width="full"
            >
              Generate Bypass Code
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default UnlockSession;
