import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, Text, IconButton, useDisclosure } from '@chakra-ui/react';
import { FaRobot } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch('/api/get-openai-api-key/')
      .then(response => response.json())
      .then(data => {
        setApiKey(data.apiKey);
      })
      .catch(error => {
        console.error('Error fetching API key:', error);
        setError('Failed to retrieve API key. Please try again later.');
      });
  }, []);

  const handleSend = async () => {
    if (!apiKey) {
      setError('API key is required to send messages.');
      return;
    }

    if (input.trim() && !isLoading) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      setIsLoading(true);
      setError(null);

      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Add a delay to prevent rate limiting
        
        const response = await getBotResponse(input);
        setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
      } catch (error) {
        console.error('Error fetching response:', error);
        setError('Error fetching response. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getBotResponse = async (userInput) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userInput }],
        max_tokens: 150,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

      console.log('Full API response:', JSON.stringify(response.data, null, 2));

      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content.trim();
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('API request error details:', error.response ? error.response : error);
      
      if (error.response && error.response.status === 429) {
        throw new Error('Rate limit exceeded. Try again later.');
      } else if (error.response && error.response.status === 401) {
        throw new Error('Unauthorized access. Check your API key.');
      }
      
      throw error;
    }
  };

  const renderMessages = () => {
    return messages.slice(-10).map((msg, index) => (
      <Box
        key={index}
        alignSelf={msg.sender === 'bot' ? 'flex-start' : 'flex-end'}
        p={2}
        borderRadius="md"
        bg={msg.sender === 'bot' ? 'gray.200' : 'blue.200'}
        maxWidth="80%"
      >
        <Text>{msg.text}</Text>
      </Box>
    ));
  };

  return (
    <Box>
      <IconButton
        icon={<FaRobot />}
        aria-label="Chatbot"
        position="fixed"
        bottom="4"
        right="4"
        onClick={isOpen ? onClose : onOpen}
        variant="outline"
        colorScheme="teal"
      />
      {isOpen && (
        <Box
          position="fixed"
          bottom="4"
          right="4"
          width="300px"
          borderRadius="md"
          boxShadow="md"
          bg="white"
          borderWidth="1px"
          p={4}
        >
          <IconButton
            icon={<CloseIcon />}
            aria-label="Close Chatbot"
            onClick={onClose}
            position="absolute"
            top="2"
            right="2"
            size="sm"
            variant="ghost"
            colorScheme="teal"
          />
          <VStack spacing={3} align="stretch" h="400px" overflowY="scroll">
            {renderMessages()}
            {error && <Text color="red.500">{error}</Text>}
          </VStack>
          <Input
            mt={3}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            mt={2}
            colorScheme="teal"
            onClick={handleSend}
            width="full"
            isLoading={isLoading}
            loadingText="Sending..."
            disabled={isLoading || !!error}
          >
            Send
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Chatbot;
