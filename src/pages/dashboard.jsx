// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Button,
  Text,
  IconButton,
  useToast,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { FaBell, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import logo from '../Components/Assets/logo.png';
import Chatbot from './chatbot';
import Notifications from './notification'; // Import Notifications component

const Dashboard = () => {
  const [tenant, setTenant] = useState(null);
  const [room, setRoom] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const { tenantName, roomNumber } = location.state || {};

  useEffect(() => {
    const fetchTenantAndRoomData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'Authorization': `Token ${token}`,
        };

        // Fetch tenant information for the logged-in user
        const tenantResponse = await axios.get('http://127.0.0.1:8000/api/tenants/', { headers });
        const tenant = tenantResponse.data.find(t => t.name === tenantName);
        setTenant(tenant);

        // Fetch room information
        const roomResponse = await axios.get('http://127.0.0.1:8000/api/rooms/', { headers });
        const room = roomResponse.data.find(r => r.number === roomNumber);
        setRoom(room);

      } catch (error) {
        console.error('Error fetching data:', error);
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
  }, [tenantName, roomNumber, toast]);

  const sidebarBgColor = useColorModeValue('#0097b2', '#005b7f');
  const buttonBgColor = useColorModeValue('white', '#004d6e');
  const buttonHoverColor = useColorModeValue('black', '#003b57');
  const iconColor = '#0097b2';

  if (!tenant || !room) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex h="100vh">
      <VStack
        w="20%"
        h="100vh"
        bg={sidebarBgColor}
        color="white"
        spacing={4}
        align="stretch"
        p={4}
      >
        <Image src={logo} alt="Logo" boxSize="100px" mb={4} />
        <Button
          colorScheme="white" variant="outline"
          _hover={{ bg: buttonHoverColor, color: "white" }}
          w="full"
          onClick={() => setShowCards(!showCards)}
        >
          {showCards ? 'Hide Dashboard' : 'Show Dashboard'}
        </Button>
        <Link to="/">
          <Button
            colorScheme="white" variant="outline"
            _hover={{ bg: buttonHoverColor, color: "white" }}
            w="full"
          >
            Home
          </Button>
        </Link>
        <Link to="/requisition">
          <Button
            colorScheme="white" variant="outline"
            _hover={{ bg: buttonHoverColor, color: "white" }}
            w="full"
          >
            Requisition
          </Button>
        </Link>
      </VStack>

      <Flex flex={1} direction="column" p={4} position="relative">
        <HStack mb={4} align="center" justify="space-between">
          <Button onClick={toggleColorMode} colorScheme="teal">
            {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
          <Text fontSize="xl" fontWeight="bold">Welcome, {tenant.name}</Text>
          <HStack spacing={4}>
            <IconButton
              icon={<FaBell />}
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            <IconButton
              icon={<FaUserCircle />}
              aria-label="User Profile"
              onClick={() => {}}
            />
          </HStack>
        </HStack>

        {showNotifications && <Notifications />}

        {showCards && (
          <VStack spacing={4}>
            <Card>
              <CardHeader>Tenant Details</CardHeader>
              <CardBody>
                {tenant.passport_photo && (
                  <Image
                    src={`http://127.0.0.1:8000${tenant.passport_photo}`}
                    alt="Passport Photo"
                    boxSize="150px"
                    borderRadius="full"
                    mb={4}
                  />
                )}
                <Text>Name: {tenant.name}</Text>
                <Text>Email: {tenant.email}</Text>
                <Text>Phone: {tenant.phone}</Text>
                <Text>Address: {tenant.address}</Text>
                <Text>Date of Birth: {tenant.date_of_birth}</Text>
                {/* Add more fields if needed */}
              </CardBody>
              <CardFooter>
                <Button colorScheme="teal" variant="outline">Edit</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>Room Details</CardHeader>
              <CardBody>
                <Text>Room Number: {room.number}</Text>
                <Text>Type: {room.type}</Text>
                <Text>Status: {room.status}</Text>
                <Image src={`http://127.0.0.1:8000${room.image}`} alt="Room Image" boxSize="200px" />
              </CardBody>
              <CardFooter>
                <Button colorScheme="teal" variant="outline">More Info</Button>
              </CardFooter>
            </Card>
          </VStack>
        )}
        <Box position="absolute" bottom="4" right="4">
          <Chatbot />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
