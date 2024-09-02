import React, { useEffect, useState } from 'react';

import {
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
  Box,
  useColorModeValue,
  useColorMode,
  Grid,
  Menu, 
  MenuButton,
   MenuList, MenuItem,
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
import { ChevronDownIcon } from '@chakra-ui/icons';

import { FaMoon, FaSun } from 'react-icons/fa';
import { MdOutlineNotifications, MdOutlineNotificationsNone } from 'react-icons/md';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../Components/Assets/logo.png';
import Notifications from './notification';
import Chatbot from './chatbot'; // Import Chatbot component

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
  const [showCards, setShowCards] = useState(true);
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

  const { tenantName, roomNumber } = location.state || JSON.parse(localStorage.getItem('lastSessionData')) || {};
  const sidebarBgColor = useColorModeValue('#0097b2', '#005b7f');
  const buttonHoverColor = useColorModeValue('black', '#003b57');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Starting data fetch...');

        const token = localStorage.getItem('authToken');
        console.log('Token:', token);
        if (!token) {
          console.log('No token found, redirecting to login.');
          navigate('/login');
          return;
        }

        const headers = {
          Authorization: `Token ${token}`,
        };

        // Fetch tenants
        console.log('Fetching tenants...');
        const tenantResponse = await axios.get('http://127.0.0.1:8000/api/tenants/', { headers });
        const tenants = tenantResponse.data || [];
        console.log('Tenants fetched:', tenants);

        const loggedInTenant = tenantName
          ? tenants.find((t) => t.name === tenantName)
          : null;
        console.log('Logged in tenant:', loggedInTenant);
        setTenant(loggedInTenant);

        // Fetch rooms
        console.log('Fetching rooms...');
        const roomResponse = await axios.get('http://127.0.0.1:8000/api/rooms/', { headers });
        const rooms = roomResponse.data || [];
        console.log('Rooms fetched:', rooms);

        const room = roomNumber
          ? rooms.find((r) => r.number === roomNumber)
          : null;
        console.log('Room found:', room);
        setRoom(room);

        // Fetch hostels if room exists
        if (room) {
          console.log('Fetching hostels...');
          const hostelResponse = await axios.get('http://127.0.0.1:8000/api/hostels/', { headers });
          const hostels = hostelResponse.data || [];
          console.log('Hostels fetched:', hostels);

          const hostel = hostels.find((h) => h.id === room.hostel);
          console.log('Hostel found:', hostel);
          setHostel(hostel);
        }

        // Fetch bookings if tenant exists
        if (loggedInTenant) {
          console.log('Fetching bookings...');
          const bookingResponse = await axios.get('http://127.0.0.1:8000/api/bookings/', { headers });
          const bookings = bookingResponse.data || [];
          console.log('Bookings fetched:', bookings);

          const booking = bookings.find((b) => b.tenant === loggedInTenant.id);
          console.log('Booking found:', booking);
          setBooking(booking);

          // Find the room related to the booking
          if (booking) {
            const bookedRoom = rooms.find((r) => r.id === booking.room);
            console.log('Booked room found:', bookedRoom);
            setRoom(bookedRoom);
          }
        }

        // Fetch notifications
        console.log('Fetching notifications...');
        const notificationsResponse = await axios.get('http://127.0.0.1:8000/api/notifications/', { headers });
        const notifications = notificationsResponse.data || [];
        console.log('Notifications fetched:', notifications);

        const filteredNotifications = loggedInTenant
          ? notifications.filter(
              (notification) => notification.tenant_name === loggedInTenant.name
            )
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
      }
    };

    fetchData();
  }, [tenantName, roomNumber, toast, navigate]);

  const handleEditClick = () => {
    setEditTenant(tenant);
    onEditOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTenant((prevState) => ({
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
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      };

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

      if (editTenant.passport_photo instanceof File) {
        formData.append('passport_photo', editTenant.passport_photo);
      } else {
        console.warn('passport_photo is not a file.');
      }

      await axios.put(`http://127.0.0.1:8000/api/tenants/${editTenant.id}/`, formData, { headers });

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
        description: error.response?.data?.detail || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRequisitionChange = (e) => {
    const { name, value } = e.target;
    setRequisition((prevRequisition) => ({
      ...prevRequisition,
      [name]: value,
    }));
  };

  const handleRequisitionSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      };

      const requisitionData = {
        room_number: requisition.roomNumber || roomNumber,
        type: requisition.type || '',
        description: requisition.description || '',
        otherType: requisition.type === 'other' ? requisition.otherType : '',
        completed: requisition.completed || false,
      };

      console.log('Submitting requisition with data:', requisitionData);

      const response = await axios.post('http://127.0.0.1:8000/api/maintenance/', requisitionData, { headers });

      console.log('Response from server:', response.data);

      onRequisitionClose();
      toast({
        title: 'Requisition submitted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error submitting requisition:', error.response?.data || error);

      toast({
        title: 'Error submitting requisition.',
        description: error.response?.data?.error || 'An error occurred. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

const handleLogout = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No token found for logout');
      return;
    }

    console.log('Sending logout request with token:', token);
    const response = await fetch('http://127.0.0.1:8000/users/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Logout failed: ${errorText}`);
    }

    console.log('Logout successful');
    localStorage.removeItem('authToken');
    console.log('Token removed from localStorage');

    // Optionally clear other session data
    localStorage.removeItem('tenantId');
    localStorage.removeItem('lastSessionData');
    console.log('Session data removed from localStorage');

       navigate('/unlockSession', {
          state: { roomNumber, tenantName: tenant.name },
        });
  } catch (error) {
    console.error('Error during logout:', error);
  }
};




  const unreadNotificationsCount = notifications.filter((notification) => !notification.read).length;

  if (!tenant ||!room || !room.number|| !booking) {
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

<Flex w="80%" p={4} direction="column">

   
<HStack spacing={4} align="center" marginLeft="83%">
  <IconButton
    icon={unreadNotificationsCount > 0 ? <MdOutlineNotifications /> : <MdOutlineNotificationsNone />}
    aria-label="Notifications"
    color={unreadNotificationsCount > 0 ? 'black' : 'inherit'}
    onClick={() => setShowNotifications(!showNotifications)}
  />


<Menu>
  <MenuButton
    as={Button}
    rightIcon={<ChevronDownIcon />}
    bg="white"
    color="black"
    _hover={{ bg: 'white', color: 'black' }} // Override hover effect
   
  >
    <HStack spacing={2} align="center">
      {tenant.passport_photo && (
        <Image
          src={`http://127.0.0.1:8000${tenant.passport_photo}`}
          alt="Profile Photo"
          boxSize="50px"
          borderRadius="full"
          border="2px solid white"
        />
      )}
  
    </HStack>
  </MenuButton>
  <MenuList
    bg="white"
    border="1px solid teal.500"
    boxShadow="md"
    borderRadius="md"
    py={2}
  >
    <MenuItem
      onClick={handleLogout}
      color="black"
      fontWeight="bold"
    >
      Logout
    </MenuItem>
  </MenuList>
</Menu>

</HStack > 
  <Text fontWeight="bold" fontSize="25px" marginBottom="40px"> Welcome {tenant.name}!!</Text>

        {showCards && (
          <Grid templateColumns="repeat(3, 1fr)" gap={6} marginTop="40px">
            <GridItem>
              <Card>
                <CardHeader>
                  <Text fontSize="lg">Tenant</Text>
                </CardHeader>
                <CardBody>
                  <Text>FullName: {tenant.name}</Text>
                  <Text>Admin Number: {tenant.admin_number}</Text>
                  <Text>Email: {tenant.email}</Text>
                  <Text>Phone: {tenant.phone_number}</Text>
                  <Text>Major: {tenant.major}</Text>
                  <Text>Gender: {tenant.gender}</Text>
                  <Text>Position: {tenant.position}</Text>
                  <Text>Nationality: {tenant.nationality}</Text>
                  <Text>Parent: {tenant.parent}</Text> 
                </CardBody>
                <CardFooter>
                  <Button
                    colorScheme="teal"
                    onClick={handleEditClick}
                  >
                    Edit Tenant
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
    <GridItem>
            <Card>
              <CardHeader>
                <Text fontSize="lg">Room</Text>
              </CardHeader>
              <CardBody>
                {room ? (
                  <>
                   <Text>Number: {room.number}</Text>
                   <Text>Type: {room.room_type}</Text>
                   <Text>Hostel: {room?.hostel_name || 'Loading...'}</Text>
                  </>
                ) : (
                  <Text>Loading room details...</Text>
                )}
              </CardBody>
          
            </Card>
          </GridItem>
            <GridItem>
              <Card>
                <CardHeader>
                  <Text fontSize="lg">Booking</Text>
                </CardHeader>
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
  <ModalContent
    height="690px"    
    display="flex"
    flexDirection="column"
  >
 
    <ModalCloseButton />
    <ModalBody flex="1" overflow="hidden">
      <Notifications notifications={notifications} />
    </ModalBody>
  
  </ModalContent>
</Modal>

        {/* Edit Tenant Modal */}
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Tenant</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={editTenant.name || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="email" mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={editTenant.email || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="phone_number" mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phone_number"
                  value={editTenant.phone_number || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="major" mt={4}>
                <FormLabel>Major</FormLabel>
                <Input
                  name="major"
                  value={editTenant.major || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="gender" mt={4}>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  value={editTenant.gender || ''}
                  onChange={handleInputChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </FormControl>
              <FormControl id="position" mt={4}>
                <FormLabel>Position</FormLabel>
                <Input
                  name="position"
                  value={editTenant.position || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="admin_number" mt={4}>
                <FormLabel>Admin Number</FormLabel>
                <Input
                  name="admin_number"
                  value={editTenant.admin_number || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="nationality" mt={4}>
                <FormLabel>Nationality</FormLabel>
                <Input
                  name="nationality"
                  value={editTenant.nationality || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="parent" mt={4}>
                <FormLabel>Parent</FormLabel>
                <Input
                  name="parent"
                  value={editTenant.parent || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="passport_photo" mt={4}>
                <FormLabel>Passport Photo</FormLabel>
                <Input
                  type="file"
                  name="passport_photo"
                  onChange={(e) => setEditTenant({ ...editTenant, passport_photo: e.target.files[0] })}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button   bg="#0097b2"
              color="white"
              _hover={{ bg: "#073d47" }} mr={3} onClick={handleSave}>
                Save
              </Button>
              <Button variant="ghost" onClick={onEditClose}>
                Cancel
              </Button>
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
        <FormLabel>Room Number</FormLabel>
        <Input
          name="roomNumber"
          value={requisition.roomNumber || room.number || ''}
          onChange={handleRequisitionChange}
          isReadOnly // Room number is read-only
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Type</FormLabel>
        <Select
          name="type"
          value={requisition.type || ''}
          onChange={handleRequisitionChange}
          placeholder="Select Type"
        >
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
            value={requisition.otherType || ''}
            onChange={handleRequisitionChange}
          />
        </FormControl>
      )}

      <FormControl mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={requisition.description || ''}
          onChange={handleRequisitionChange}
        />
      </FormControl>
    </ModalBody>
    <ModalFooter>
      <Button   bg="#0097b2"
              color="white"
              _hover={{ bg: "#073d47" }}onClick={handleRequisitionSubmit}>
        Submit
      </Button>
      <Button colorScheme="gray" onClick={onRequisitionClose} ml={3}>
        Cancel
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

   {/* Chatbot Component */}
        <Box position="absolute" bottom="4" right="4">
          <Chatbot />
        </Box>

      </Flex>
    </Flex>
  );
};

export default Dashboard;
