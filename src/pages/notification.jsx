import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, useToast, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const NotificationPage = ({ tenant }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching notifications...');
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          console.log('No token found, redirecting to login.');
          // Redirect to login if no token (could use navigate from react-router if applicable)
          return;
        }

        const headers = { Authorization: `Token ${token}` };

        // Fetch notifications
        const notificationResponse = await axios.get('http://127.0.0.1:8000/api/notifications/', { headers });
        const allNotifications = notificationResponse.data || [];
        console.log('All notifications fetched:', allNotifications);

        // Filter notifications based on the logged-in tenant
        const filteredNotifications = tenant
          ? allNotifications.filter(notification => 
              notification.tenant_name === tenant.name
            )
          : [];
        console.log('Filtered notifications:', filteredNotifications);
        setNotifications(filteredNotifications);

      } catch (error) {
        console.error('Error fetching notifications:', error);
        toast({
          title: 'Error fetching notifications.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tenant]);

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <Spinner size="xl" />
        <Text mt={4}>Loading notifications...</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text fontSize="xl" mb={4}>Your Notifications</Text>
      <VStack spacing={4}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Box key={notification.id || notification.date} p={4} shadow="md" borderWidth="1px" width="380px">
              <Text fontWeight="bold">{notification.title}</Text>
              <Text>{notification.message}</Text>
              <Text color="gray.500">
                {new Date(notification.date).toLocaleString()}
              </Text>
            </Box>
          ))
        ) : (
          <Text>No notifications available.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default NotificationPage;
