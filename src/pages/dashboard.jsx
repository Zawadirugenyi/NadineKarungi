// pages/dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Button,
  Avatar,
  Text,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FaBell, FaUserCircle, FaComments } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tenant, setTenant] = useState({});
  const [room, setRoom] = useState({});
  const toast = useToast();

  useEffect(() => {
    // Fetch tenant credentials and room booked data from backend
    const fetchTenantAndRoomData = async () => {
      try {
        const tenantResponse = await axios.get('http://127.0.0.1:8000/api/tenants/');
        const roomResponse = await axios.get('http://127.0.0.1:8000/api/rooms/');
        
        setTenant(tenantResponse.data);
        setRoom(roomResponse.data);
      } catch (error) {
        toast({
          title: 'Error fetching data.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchTenantAndRoomData();
  }, [toast]);

  return (
    <Flex h="100vh">
      <VStack
        w="20%"
        h="100vh"
        bg="gray.800"
        color="white"
        spacing={4}
        align="stretch"
        p={4}
      >
        <Link to="/">
          <Button colorScheme="teal" variant="solid" w="full">
            Home
          </Button>
        </Link>
        <Link to="/requisition">
          <Button colorScheme="teal" variant="solid" w="full">
            Requisition
          </Button>
        </Link>
      </VStack>
      <Flex flex={1} direction="column" p={4}>
        <HStack justifyContent="flex-end" mb={4}>
          <IconButton
            icon={<FaBell />}
            variant="ghost"
            aria-label="Notifications"
          />
          <IconButton
            icon={<FaUserCircle />}
            variant="ghost"
            aria-label="Profile"
          />
          <IconButton
            icon={<FaComments />}
            variant="ghost"
            aria-label="Chatbot"
          />
        </HStack>
        <Box>
          <Text fontSize="xl" mb={4}>
            Tenant: {tenant.name}
          </Text>
          <Text fontSize="xl" mb={4}>
            Room: {room.number}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
