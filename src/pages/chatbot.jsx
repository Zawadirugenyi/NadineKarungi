import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, IconButton, useDisclosure } from '@chakra-ui/react';
import { FaRobot } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Hostel-specific FAQs and responses
  const responses = {
    'hello': 'Hi there! How can I help you today?',
    'hey': 'Hello! What can I assist you with?',
    'what are the hostel requirements': 'To apply for a hostel, you need to provide a valid ID, proof of enrollment in the institution, and a deposit payment.',
    'how much is the hostel fee': 'The hostel fee varies depending on the room type. Single rooms are $200/month, shared rooms are $150/month.',
    'what facilities are available': 'Our hostel offers free Wi-Fi, laundry services, a study area, and 24/7 security.',
    'are visitors allowed': 'Yes, visitors are allowed between 9 AM and 9 PM. Overnight stays are not permitted.',
    'what can I do if i wanna change the room or a hostel': 'It is simple for you to check a room or a hostel the only thing you have to do is to make a request, click on the requisition button on your right and make a request and you will receive a notification.',
    'can i book a hostel online': 'Yes, you can book a hostel online through our website. Visit the "SmartHostelPro" section to get started.',
    'what is the check-in time': 'Check-in time is from 2 PM to 6 PM. Early check-in can be arranged upon request.',
    'default': 'Sorry, For more information, please contact smarthostelpro@gmail.com.'
  };

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      setIsLoading(true);
      setError(null);

      // Determine the response based on user input
      const lowercasedInput = input.toLowerCase();
      const response = responses[lowercasedInput] || responses['default'];
      setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
      
      setIsLoading(false);
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
