import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import { FaRobot } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (userInput) => {
    let responseText = 'I am not sure how to answer that. Can you ask something else?';

    // FAQs and conversational responses related to hostel management system
    const normalizedInput = userInput.toLowerCase();
    if (normalizedInput.includes('check-in')) {
      responseText = 'To check-in, please visit the front desk or use the online check-in system on our website.';
    } else if (normalizedInput.includes('check-out')) {
      responseText = 'Check-out is done by returning your room key to the front desk. Please make sure to settle any outstanding bills.';
    } else if (normalizedInput.includes('room availability')) {
      responseText = 'You can check room availability by visiting our website or contacting our reservations team.';
    } else if (normalizedInput.includes('booking cancellation')) {
      responseText = 'To cancel a booking, please contact our customer service or use the cancellation option in your online account.';
    } else if (normalizedInput.includes('payment methods')) {
      responseText = 'We accept various payment methods including credit cards, debit cards, and online payment platforms.';
    } else if (normalizedInput.includes('facilities')) {
      responseText = 'Our hostel provides facilities such as free Wi-Fi, breakfast, laundry services, and a common lounge area.';
    } else if (normalizedInput.includes('contact information')) {
      responseText = 'You can contact us via email at support@hostel.com or call us at +123-456-7890.';
    } else if (normalizedInput.includes('hello') || normalizedInput.includes('hi')) {
      responseText = 'Hello! How can I assist you today?';
    } else if (normalizedInput.includes('thank you') || normalizedInput.includes('thanks')) {
      responseText = 'You’re welcome! If you have any other questions, feel free to ask.';
    } else if (normalizedInput.includes('what is the hostel address')) {
      responseText = 'Our hostel is located at 123 Hostel Lane, Cityville, Country.';
    } else if (normalizedInput.includes('what time is breakfast')) {
      responseText = 'Breakfast is served from 7:00 AM to 10:00 AM daily.';
    } else if (normalizedInput.includes('how can I extend my stay')) {
      responseText = 'To extend your stay, please contact our front desk or update your booking through our website.';
    }

    return { text: responseText, sender: 'bot' };
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
