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
  Image,
  useColorModeValue,
  useColorMode,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Select
} from '@chakra-ui/react';
import { FaBell, FaMoon, FaSun } from 'react-icons/fa';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../Components/Assets/logo.png';
import Chatbot from './chatbot';
import Notifications from './notification';

const ROOM_TYPE_LABELS = {
  bedsitter: 'Bedsitter',
  one_bedroom: 'One Bedroom',
  two_bedrooms: 'Two Bedrooms',
  three_bedrooms: 'Three Bedrooms',
};

const Dashboard = () => {
  const [tenant, setTenant] = useState(null);
  const [room, setRoom] = useState(null);
  const [hostel, setHostel] = useState(null);
  const [booking, setBooking] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [editTenant, setEditTenant] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isRequisitionOpen,
    onOpen: onRequisitionOpen,
    onClose: onRequisitionClose,
  } = useDisclosure();
  const [requisition, setRequisition] = useState({
    type: '',
    description: '',
    otherType: '', // Add state for 'Other' type specification
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const { tenantName, roomNumber } = location.state || {};

  const sidebarBgColor = useColorModeValue('#0097b2', '#005b7f');
  const buttonHoverColor = useColorModeValue('black', '#003b57');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'Authorization': `Token ${token}`,
        };

        const tenantResponse = await axios.get('http://127.0.0.1:8000/api/tenants/', { headers });
        const tenant = tenantResponse.data.find(t => t.name === tenantName);
        setTenant(tenant);

        const roomResponse = await axios.get('http://127.0.0.1:8000/api/rooms/', { headers });
        const room = roomResponse.data.find(r => r.number === roomNumber);
        setRoom(room);

        const hostelResponse = await axios.get('http://127.0.0.1:8000/api/hostels/', { headers });
        const hostel = hostelResponse.data.find(h => h.id === room.hostel);
        setHostel(hostel);

        const bookingResponse = await axios.get('http://127.0.0.1:8000/api/bookings/', { headers });
        const booking = bookingResponse.data.find(b => b.tenant === tenant.id);
        setBooking(booking);

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

    fetchData();
  }, [tenantName, roomNumber, toast]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'Authorization': `Token ${token}`,
        };

        const response = await axios.get('http://127.0.0.1:8000/api/notifications/', { headers });
        setNotifications(response.data);
        setHasNewNotification(response.data.some(notification => !notification.read));
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
    const interval = setInterval(fetchNotifications, 60000); // Fetch notifications every minute

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [toast]);

  const handleEditClick = () => {
    setEditTenant(tenant);
    onEditOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTenant(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Authorization': `Token ${token}`,
      };

      await axios.put(`http://127.0.0.1:8000/api/tenants/${editTenant.id}/`, editTenant, { headers });
      setTenant(editTenant);
      onEditClose();
      toast({
        title: 'Tenant details updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating tenant details:', error);
      toast({
        title: 'Error updating tenant details.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRequisitionChange = (e) => {
    const { name, value } = e.target;
    setRequisition(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRequisitionSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Authorization': `Token ${token}`,
      };

      await axios.post('http://127.0.0.1:8000/api/requisitions/', requisition, { headers });
      onRequisitionClose();
      toast({
        title: 'Requisition submitted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error submitting requisition:', error);
      toast({
        title: 'Error submitting requisition.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!tenant || !room || !hostel || !booking) {
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
        <Button
          colorScheme="white" variant="outline"
          _hover={{ bg: buttonHoverColor, color: "white" }}
          w="full"
          onClick={onRequisitionOpen}
        >
          Requisition
        </Button>
      </VStack>

      <Flex flex={1} direction="column" p={4} position="relative">
        <HStack mb={4} align="center" justify="space-between">
          <Button onClick={toggleColorMode} colorScheme="teal">
            {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
          <HStack spacing={4} align="center">
            <IconButton
              icon={<FaBell />}
              colorScheme={hasNewNotification ? 'red' : 'gray'}
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            />
            <Text>{tenant.name}</Text>
          </HStack>
        </HStack>

        {showCards && (
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Card>
              <CardHeader>Hostel Details</CardHeader>
              <CardBody>
                <Text>Name: {hostel.name}</Text>
                <Text>Location: {hostel.location}</Text>
                <Text>Manager: {hostel.manager}</Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Room Details</CardHeader>
              <CardBody>
                <Text>Room Number: {room.number}</Text>
                <Text>Room Type: {ROOM_TYPE_LABELS[room.room_type]}</Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Tenant Details</CardHeader>
              <CardBody>
                <Text>Name: {tenant.name}</Text>
                <Text>Gender: {tenant.gender}</Text>
                <Text>Registration Number: {tenant.registration_number}</Text>
                <Text>Email: {tenant.email}</Text>
                <Text>Phone Number: {tenant.phone_number}</Text>
                <Button colorScheme="teal" onClick={handleEditClick}>Edit</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Booking Details</CardHeader>
              <CardBody>
                <Text>Check-in Date: {booking.check_in_date}</Text>
                <Text>Check-out Date: {booking.check_out_date}</Text>
              </CardBody>
            </Card>
          </Grid>
        )}

        {showNotifications && (
          <Box position="absolute" top="10" right="10" bg="white" p={4} shadow="md">
            <Notifications notifications={notifications} />
          </Box>
        )}

        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Tenant Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input name="name" value={editTenant.name} onChange={handleInputChange} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Gender</FormLabel>
                <Select name="gender" value={editTenant.gender} onChange={handleInputChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Registration Number</FormLabel>
                <Input name="registration_number" value={editTenant.registration_number} onChange={handleInputChange} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input name="email" value={editTenant.email} onChange={handleInputChange} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input name="phone_number" value={editTenant.phone_number} onChange={handleInputChange} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>Save</Button>
              <Button onClick={onEditClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isRequisitionOpen} onClose={onRequisitionClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Submit Requisition</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select name="type" value={requisition.type} onChange={handleRequisitionChange}>
                  <option value="repair">Repair</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              {requisition.type === 'other' && (
                <FormControl mt={4}>
                  <FormLabel>Specify Type</FormLabel>
                  <Input name="otherType" value={requisition.otherType} onChange={handleRequisitionChange} />
                </FormControl>
              )}
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={requisition.description} onChange={handleRequisitionChange} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleRequisitionSubmit}>Submit</Button>
              <Button onClick={onRequisitionClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>

      <Chatbot />
    </Flex>
  );
};

export default Dashboard;
