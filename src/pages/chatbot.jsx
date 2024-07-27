import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, IconButton, useDisclosure } from '@chakra-ui/react';
import { FaRobot } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      try {
        const response = await getBotResponse(input);
        setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
      } catch (error) {
        console.error('Error fetching response:', error);
        setMessages(prevMessages => [...prevMessages, { text: 'Error fetching response. Please try again.', sender: 'bot' }]);
      }
    }
  };

  const getBotResponse = async (userInput) => {
    const API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: userInput,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.9,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      console.log('API response:', response.data);

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].text.trim();
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('API request error:', error.response ? error.response.data : error.message);
      throw error;
    }
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
            {messages.map((msg, index) => (
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
            ))}
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
          >
            Send
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Chatbot;
