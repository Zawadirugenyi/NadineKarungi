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
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdOutlineNotifications, MdOutlineNotificationsNone } from 'react-icons/md';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../Components/Assets/logo.png';
import Notifications from './notification'; // Ensure this component handles notification display

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
  const [notifications, setNotifications] = useState([]);
  const [editTenant, setEditTenant] = useState({});
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
    otherType: '',
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

        if (room) {
          const hostelResponse = await axios.get('http://127.0.0.1:8000/api/hostels/', { headers });
          const hostel = hostelResponse.data.find(h => h.id === room.hostel);
          setHostel(hostel);
        }

        if (tenant) {
          const bookingResponse = await axios.get('http://127.0.0.1:8000/api/bookings/', { headers });
          const booking = bookingResponse.data.find(b => b.tenant === tenant.id);
          setBooking(booking);
        }

        // Fetch notifications
        const notificationsResponse = await axios.get('http://127.0.0.1:8000/api/notifications/', { headers });
        setNotifications(notificationsResponse.data);

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
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    const headers = {
      'Authorization': `Token ${token}`
    };

    // Prepare FormData
    const formData = new FormData();
    formData.append('name', editTenant.name);
    formData.append('email', editTenant.email);
    formData.append('phone_number', editTenant.phone_number);
    formData.append('major', editTenant.major);
    formData.append('gender', editTenant.gender);
    formData.append('position', editTenant.position);
    formData.append('admin_number', editTenant.admin_number);
    formData.append('nationality', editTenant.nationality);
    formData.append('parent', editTenant.parent);

    // Check if passport_photo is a file before appending
    if (editTenant.passport_photo instanceof File) {
      formData.append('passport_photo', editTenant.passport_photo);
    } else {
      console.warn('passport_photo is not a file.');
    }

    // Log the FormData to inspect it
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    await axios.put(`http://127.0.0.1:8000/api/tenants/${editTenant.id}/`, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      }
    });
    
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
    console.log('Error Response Data:', error.response?.data);

    toast({
      title: 'Error updating tenant details.',
      description: error.response?.data?.detail || error.message,
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

    // Check the structure of requisition data
    console.log('Requisition data:', requisition);

    // Ensure the requisition data is correctly formatted
    if (!requisition.type || !requisition.description) {
      throw new Error('Type and Description are required fields.');
    }

    const response = await axios.post('http://127.0.0.1:8000/api/maintenance/', requisition, { headers });
    
    console.log('Response:', response.data);

    onRequisitionClose();
    toast({
      title: 'Requisition submitted successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  } catch (error) {
    console.error('Error submitting requisition:', error.response || error.message);
    toast({
      title: 'Error submitting requisition.',
      description: error.response?.data?.detail || error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};


  const unreadNotificationsCount = notifications.filter(notification => !notification.is_read).length;

  if (!tenant || !room || !booking) {
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
        <Button
          colorScheme="white" variant="outline"
          _hover={{ bg: buttonHoverColor, color: "white" }}
          w="full"
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          {colorMode === 'light' ? ' Dark' : ' Light'}
        </Button>
      </VStack>

      <Flex flex={1} direction="column" p={4} position="relative">
        <HStack mb={4} align="center" justify="space-between">
          <Button  colorScheme="white">
           
          </Button>
          <HStack spacing={4} align="center">
            <IconButton
              icon={unreadNotificationsCount > 0 ? <MdOutlineNotifications /> : <MdOutlineNotificationsNone />}
              aria-label="Notifications"
              color={unreadNotificationsCount > 0 ? 'black' : 'inherit'}
              onClick={() => setShowNotifications(!showNotifications)}
            />
            <HStack spacing={2} align="center">
              {tenant.passport_photo && (
                <Image
                  src={`http://127.0.0.1:8000${tenant.passport_photo}`}
                  alt="Profile Photo"
                  boxSize="50px"
                  borderRadius="full"
                />
              )}
              <Text>{tenant.name}</Text>
            </HStack>
          </HStack>
        </HStack>

        {showCards && (
          <Grid templateColumns="repeat(3, 1fr)" gap={4} marginTop="25px">
            <GridItem>
              <Card>
                <CardHeader fontWeight="bold" fontSize="lg">Tenant Info</CardHeader>
                <CardBody>
                            <Text>Name: {tenant.name}</Text>
                  <Text>Major: {tenant.major}</Text>
                  <Text>Admin Number: {tenant.admin_number}</Text>
                  <Text>Gender: {tenant.gender}</Text>
                  <Text>Nationality: {tenant.nationality}</Text>
                  <Text>Passport: {tenant.passport}</Text>
                  <Text>Phone Number: {tenant.phone_number}</Text>
                  <Text>Email: {tenant.email}</Text>
                  <Text>Parent: {tenant.parent}</Text>
                  <Text>Position: {tenant.position}</Text>
                  
                </CardBody>
                <CardFooter>
                  <Button colorScheme="teal" onClick={handleEditClick}>Edit</Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem>
              <Card>
                <CardHeader fontWeight="bold" fontSize="lg">Room Details</CardHeader>
                <CardBody>
                  <Text>Hostel: {hostel.name}</Text>
                  <Text>Room Number: {room.number}</Text>
                  <Text>Room Type: {ROOM_TYPE_LABELS[room.room_type]}</Text>
                 
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card>
                <CardHeader fontWeight="bold" fontSize="lg">Booking Details</CardHeader>
                <CardBody>
                  <Text>Check-in: {booking.check_in_date}</Text>
                  <Text>Check-out: {booking.check_out_date}</Text>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        )}

        {/* Notifications Modal */}
        <Modal isOpen={showNotifications} onClose={() => setShowNotifications(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Notifications</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Notifications notifications={notifications} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={() => setShowNotifications(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Edit Tenant Modal */}
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Tenant Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={editTenant.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Major</FormLabel>
              <Input
                name="major"
                value={editTenant.major}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Admin Number</FormLabel>
              <Input
                name="admin_number"
                value={editTenant.admin_number}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Input
                name="gender"
                value={editTenant.gender}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Nationality</FormLabel>
              <Input
                name="nationality"
                value={editTenant.nationality}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Passport</FormLabel>
              <Input
                name="passport"
                value={editTenant.passport}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phone_number"
                value={editTenant.phone_number}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={editTenant.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Parent</FormLabel>
              <Input
                name="parent"
                value={editTenant.parent}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Position</FormLabel>
              <Input
                name="position"
                value={editTenant.position}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onEditClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

        {/* Requisition Modal */}
        <Modal isOpen={isRequisitionOpen} onClose={onRequisitionClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Submit Requisition</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Type</FormLabel>
                <Select
                  name="type"
                  value={requisition.type}
                  onChange={handleRequisitionChange}
                >
                  <option value="">Select Type</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="facility">Facility</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              {requisition.type === 'other' && (
                <FormControl mb={4}>
                  <FormLabel>Other Type</FormLabel>
                  <Input
                    name="otherType"
                    value={requisition.otherType}
                    onChange={handleRequisitionChange}
                  />
                </FormControl>
              )}
              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={requisition.description}
                  onChange={handleRequisitionChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleRequisitionSubmit}>Submit</Button>
              <Button colorScheme="gray" onClick={onRequisitionClose} ml={3}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
