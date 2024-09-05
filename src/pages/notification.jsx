import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, useToast, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [tenant, setTenant] = useState(null);
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

        // Fetch tenant details
        console.log('Fetching tenant...');
        const tenantResponse = await axios.get('http://127.0.0.1:8000/api/tenants/', { headers });
        const loggedInTenant = tenantResponse.data[0]; // Adjust if needed
        console.log('Logged in tenant:', loggedInTenant);
        setTenant(loggedInTenant);

        // Fetch notifications
        console.log('Fetching notifications...');
        const notificationResponse = await axios.get('http://127.0.0.1:8000/api/notifications/', { headers });
        const notifications = notificationResponse.data || [];
        console.log('Notifications fetched:', notifications);

        // Filter notifications based on the logged-in tenant
        const filteredNotifications = loggedInTenant
          ? notifications.filter(notification => {
              // Log the values being compared
              console.log('Notification tenant_name:', notification.tenant_name);
              console.log('Logged in tenant name:', loggedInTenant.name);

              // Normalize and trim names before comparison
              return notification.tenant_name.trim().toLowerCase() === loggedInTenant.name.trim().toLowerCase();
            })
          : [];
        console.log('Filtered notifications:', filteredNotifications);
        setNotifications(filteredNotifications);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error fetching data.',
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
  }, [toast]);

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
      <Text fontSize="xl" mb={4}>Notifications</Text>
      <VStack spacing={4}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Box key={notification.id || notification.date} p={4} shadow="md" borderWidth="1px" width="380px">
              <Text fontWeight="bold">
                {notification.tenant_name || 'Unknown Tenant'}
              </Text>
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
