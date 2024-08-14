import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  useToast,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [tenantName, setTenantName] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          Authorization: `Token ${token}`,
        };

        const response = await axios.get('http://127.0.0.1:8000/api/notifications/', { headers });
        console.log('All Notifications:', response.data);

        setNotifications(response.data);

        // Filter notifications based on tenant name
        const tenantName = 'Fina Mwayuma';
        setTenantName(tenantName);
        const filtered = response.data.filter(notification => notification.tenant_name === tenantName);
        setFilteredNotifications(filtered);

        console.log('Filtered Notifications:', filtered);
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

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  // Truncate the message if it hasn't been expanded
  const truncateMessage = (message, maxLength = 50) => {
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  // Color mode values
  const headerBgColor = useColorModeValue('white', '#1A202C');
  const headerTextColor = useColorModeValue('black', 'white');
  const cardBgColor = useColorModeValue('white', '#2D3748');

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
        <Text fontSize="xl">Notifications</Text>
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
          <CardBody>
            <VStack spacing={4} align="stretch">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <Box
                    key={notification.id}
                    p={4}
                    bg={cardBgColor}
                    borderRadius="md"
                    boxShadow="sm"
                    cursor="pointer"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      {notification.tenant_name}
                    </Text>
                    <Text fontSize="md">
                      {truncateMessage(notification.message)}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {formatDate(notification.date)}
                    </Text>
                  </Box>
                ))
              ) : (
                <Text>No notifications available.</Text>
              )}
            </VStack>
          </CardBody>
        </Card>
      </Flex>

      {/* Modal for showing full notification */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedNotification?.tenant_name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">
              {selectedNotification?.message}
            </Text>
            <Text fontSize="sm" color="gray.500" mt={2}>
              {selectedNotification && formatDate(selectedNotification.date)}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Notifications;
