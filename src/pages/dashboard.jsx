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
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    const fetchTenantAndRoomData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'Authorization': `Token ${token}`,
        };

        const tenantResponse = await axios.get('http://127.0.0.1:8000/api/tenants/', { headers });
        const roomResponse = await axios.get('http://127.0.0.1:8000/api/rooms/', { headers });

        console.log('Tenant Data:', tenantResponse.data);
        console.log('Room Data:', roomResponse.data);

        setTenant(tenantResponse.data);
        setRoom(roomResponse.data);
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
  }, [toast]);

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
          <Box></Box>
          <HStack spacing={4}>
            <IconButton
              icon={<FaBell />}
              aria-label="Notifications"
              variant="ghost"
              color={iconColor}
              onClick={() => setShowNotifications(!showNotifications)}
            />
            <IconButton
              icon={<FaUserCircle />}
              aria-label="Profile"
              variant="ghost"
              color={iconColor}
            />
            <IconButton
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              aria-label="Toggle Dark Mode"
              onClick={toggleColorMode}
              variant="ghost"
              color={iconColor}
            />
          </HStack>
        </HStack>

        {showNotifications && <Notifications />}

        {showCards && (
          <HStack spacing={4}>
            <Card width="100%" maxW="sm" borderWidth="1px" borderRadius="md" boxShadow="md">
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold">Tenant Information</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize="md">Name: {tenant.name}</Text>
                <Text fontSize="md">Email: {tenant.email}</Text>
              </CardBody>
              <CardFooter>
                <Button colorScheme="teal" variant="outline">
                  View More
                </Button>
              </CardFooter>
            </Card>

            <Card width="100%" maxW="sm" borderWidth="1px" borderRadius="md" boxShadow="md">
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold">Room Information</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize="md">Room Number: {room.number}</Text>
                <Text fontSize="md">Room Type: {room.type}</Text>
              </CardBody>
              <CardFooter>
                <Button colorScheme="teal" variant="outline">
                  View More
                </Button>
              </CardFooter>
            </Card>
          </HStack>
        )}

        <Box position="absolute" bottom="4" right="4">
          <Chatbot />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
