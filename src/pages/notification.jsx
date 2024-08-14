import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Card,
  CardHeader,
  CardBody,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [tenantName, setTenantName] = useState(''); // Initialize tenantName
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
        const tenantName = 'Fina Mwayuma'; // Example: set this to the actual tenant name
        setTenantName(tenantName); // Set tenantName state
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
  }, [toast]); // No need for tenantName as dependency

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
                filteredNotifications.map((notification, index) => (
                  <Box
                    key={`${notification.date}-${notification.message}-${index}`} // Unique key based on date, message, and index
                    p={4}
                    bg={cardBgColor}
                    borderRadius="md"
                    boxShadow="sm"
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      {notification.tenant_name}
                    </Text>
                    <Text fontSize="md">{notification.message}</Text>
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
    </Flex>
  );
};

export default Dashboard;
