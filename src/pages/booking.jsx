import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button, useToast, Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../Components/Assets/Room2.webp';

const Booking = () => {
  const [formData, setFormData] = useState({
    room: '', // This will hold the room ID
    tenant: '', // This will hold the tenant ID
    check_in_date: '',
    check_out_date: ''
  });
  const [roomNumber, setRoomNumber] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found.');
        }

        // Function to fetch tenant data
        const fetchTenantData = async () => {
          const response = await axios.get('http://127.0.0.1:8000/api/tenants/${encodeURIComponent(name)}', {
            headers: { 'Authorization': `Token ${token}` }
          });
          return response.data;
        };

        // Function to fetch room data with retry mechanism
        const fetchRoomDataWithRetry = async (attempt = 1) => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/rooms/${encodeURIComponent(number)}', {
              headers: { 'Authorization': `Token ${token}` }
            });
            return response.data;
          } catch (error) {
            if (attempt <= 3) { // Retry up to 3 times
              console.warn(`Attempt ${attempt} failed. Retrying...`);
              return fetchRoomDataWithRetry(attempt + 1);
            } else {
              throw error; // If all retries fail, throw the error
            }
          }
        };

        const tenantResponse = await fetchTenantData();
        const roomResponse = await fetchRoomDataWithRetry();

        if (tenantResponse.length === 0 || roomResponse.length === 0) {
          throw new Error('No tenant or room data available.');
        }

        const tenant = tenantResponse[0]; // Assuming you want the first tenant
        const room = roomResponse[0]; // Assuming you want the first room

        setTenantName(tenant.name);
        setRoomNumber(room.number);
        setFormData({
          ...formData,
          tenant: tenant.id, // Set tenant ID
          room: room.id // Set room ID
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
        toast({
          title: 'Data Fetch Error',
          description: 'There was an error fetching tenant or room data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found.');
      }

      const response = await axios.post('http://127.0.0.1:8000/api/bookings/', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });

      setSuccess('Booking created successfully');
      setError('');
      toast({
        title: 'Booking created successfully.',
        description: 'The booking has been successfully created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form fields after successful submission
      setFormData({
        room: '',
        tenant: '',
        check_in_date: '',
        check_out_date: ''
      });

      navigate('/payment');
    } catch (error) {
      setError('Booking creation failed');
      setSuccess('');
      console.error('Error during booking creation:', error);
      toast({
        title: 'Booking creation failed.',
        description: 'There was an error creating the booking.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} w="800px" mx="auto" mt={10} p={5} marginLeft="80px">
      <GridItem>
        <Box borderWidth={1} borderRadius="lg" p={5} w="450px">
          <form onSubmit={handleSubmit}>
            {/* Display room and tenant as read-only */}
            <FormControl id="room" mb={4}>
              <FormLabel>Room</FormLabel>
              <Input type="text" name="room" value={formData.room} readOnly />
            </FormControl>

            <FormControl id="tenant" mb={4}>
              <FormLabel>Tenant</FormLabel>
              <Input type="text" name="tenant" value={formData.tenant} readOnly />
            </FormControl>

            {/* Allow editing check-in and check-out dates */}
            <FormControl id="check_in_date" mb={4}>
              <FormLabel>Check-in Date</FormLabel>
              <Input type="date" name="check_in_date" value={formData.check_in_date} onChange={handleChange} />
            </FormControl>

            <FormControl id="check_out_date" mb={4}>
              <FormLabel>Check-out Date</FormLabel>
              <Input type="date" name="check_out_date" value={formData.check_out_date} onChange={handleChange} />
            </FormControl>

            <Button type="submit" bg="#0097b2" color="white" _hover={{ bg: "#073d47" }} width="full" mt={4}>
              Create Booking
            </Button>
          </form>

          {error && <Box color="red.500" mt={4}>{error}</Box>}
          {success && <Box color="green.500" mt={4}>{success}</Box>}
        </Box>
      </GridItem>
      
      {/* Display image and promotional text */}
      <GridItem>
        <Box borderWidth={1} borderRadius="lg" p={5} textAlign="center">
          <Box 
            w="700px"
            p={6}
            height="340px"
            bg="gray.100"
            boxShadow="lg"
            bgSize="cover"
            bgPosition="center"
            mr={6} 
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <Box mt={4} fontWeight="bold">
            Book Your Stay
          </Box>
          <Box mt={2} color="gray.500">
            Find the perfect room and enjoy your stay at our SmartHostelPro.
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Booking;
