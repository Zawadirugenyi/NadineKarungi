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
  Image, // Import Image component
} from '@chakra-ui/react';
import { FaBell, FaUserCircle, FaComments } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../Components/Assets/logo.png'; // Adjust the path to your logo

const Dashboard = () => {
  const [tenant, setTenant] = useState(null);
  const [room, setRoom] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchTenantAndRoomData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Adjust based on where you store the token
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

  if (!tenant || !room) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex h="100vh">
      {/* Sidebar */}
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
        <Button
          colorScheme="teal"
          variant="solid"
          w="full"
          onClick={() => setShowCards(!showCards)}
        >
          {showCards ? 'Hide Dashboard' : 'Show Dashboard'}
        </Button>
      </VStack>

      {/* Main Content */}
      <Flex flex={1} direction="column" p={4} position="relative">
        {/* Logo */}
        <HStack mb={4} align="center" justify="space-between">
          <Image src={logo} alt="Logo" boxSize="50px" />
          <Text fontSize="2xl" fontWeight="bold">Dashboard</Text>
          <Box></Box> {/* Empty box to center text */}
        </HStack>

        {/* Notification and Profile Icons */}
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
        </HStack>

        {/* Conditionally Render Cards */}
        {showCards && (
          <HStack spacing={4}>
            {/* Tenant Card */}
            <Card width="100%" maxW="sm" borderWidth="1px" borderRadius="md" boxShadow="md">
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold">Tenant Information</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize="md">Name: {tenant.name}</Text>
                <Text fontSize="md">Email: {tenant.email}</Text>
                {/* Add other tenant details here */}
              </CardBody>
              <CardFooter>
                <Button colorScheme="teal" variant="outline">
                  View More
                </Button>
              </CardFooter>
            </Card>

            {/* Room Card */}
            <Card width="100%" maxW="sm" borderWidth="1px" borderRadius="md" boxShadow="md">
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold">Room Information</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize="md">Room Number: {room.number}</Text>
                <Text fontSize="md">Room Type: {room.type}</Text>
                {/* Add other room details here */}
              </CardBody>
              <CardFooter>
                <Button colorScheme="teal" variant="outline">
                  View More
                </Button>
              </CardFooter>
            </Card>
          </HStack>
        )}

        {/* Chatbot Icon at Bottom Right */}
        <IconButton
          icon={<FaComments />}
          variant="solid"
          aria-label="Chatbot"
          position="absolute"
          bottom="4"
          right="4"
        />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
