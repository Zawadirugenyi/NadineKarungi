import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  IconButton,
  Text,
  Card,
  CardHeader,
  CardBody,
  useToast,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { FaBell, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import axios from 'axios';
import Chatbot from './chatbot'; // Import Chatbot component

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          Authorization: `Token ${token}`,
        };

        const response = await axios.get('http://127.0.0.1:8000/api/notifications/', { headers });

        console.log('Notifications Data:', response.data);

        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        toast({
          title: 'Error fetching notifications.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchNotifications();
  }, [toast]);

  // Use color mode value hooks outside of conditionals
  const headerBgColor = useColorModeValue('white', '#1A202C');
  const headerTextColor = useColorModeValue('black', 'white');
  const cardBgColor = useColorModeValue('white', '#2D3748');
  const buttonHoverColor = useColorModeValue('gray.100', 'gray.600');
  const iconColor = useColorModeValue('gray.600', 'gray.300'); // Color for icons

  return (
    <Flex direction="column" h="100vh">
      {/* Header */}
      <HStack
        w="100%"
        p={4}
        bg={headerBgColor}
        color={headerTextColor}
        justify="space-between"
        boxShadow="sm"
      >
    
      </HStack>

      {/* Main Content */}
      <Flex flex={1} direction="column" p={4} align="center">
        <Card
          w="full"
          maxW="md"
          bg={cardBgColor}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
        >
          <CardHeader>
            <Text fontSize="2xl" fontWeight="bold">
              Notifications
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Box key={notification.id} p={4} bg={cardBgColor} borderRadius="md" boxShadow="sm">
                    <Text fontSize="lg" fontWeight="bold">
                      {notification.title}
                    </Text>
                    <Text fontSize="md">{notification.message}</Text>
                  </Box>
                ))
              ) : (
                <Text>No notifications available.</Text>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Chatbot Component */}
        <Box position="absolute" bottom="4" right="4">
          <Chatbot />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Notifications;
