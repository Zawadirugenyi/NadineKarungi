import React, { useState, useEffect } from 'react';
import {
  Box, FormControl, FormLabel, Input, Button, Heading, Alert, AlertIcon,
  AlertTitle, AlertDescription, CloseButton, VStack
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const [tenantName, setTenantName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [tenantId, setTenantId] = useState(null);
  const [roomId, setRoomId] = useState(null);

  // Fetch tenant ID and room ID based on provided tenant name and room number
  useEffect(() => {
    if (location.state) {
      const { roomNumber, tenantName } = location.state;
      if (roomNumber) setRoomNumber(roomNumber);
      if (tenantName) setTenantName(tenantName);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchTenantId = async () => {
      if (tenantName) {
        try {
          const token = localStorage.getItem('authToken');
          if (!token) {
            setMessage({ type: 'error', text: 'No authentication token found. Please log in.' });
            return;
          }

          const response = await axios.get(`http://127.0.0.1:8000/api/tenants/?name=${tenantName}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          console.log('Tenant Fetch Response:', response.data);

          if (response.data && response.data.length > 0) {
            const tenant = response.data.find(t => t.name === tenantName);
            if (tenant) {
              setTenantId(tenant.id);
            } else {
              setMessage({ type: 'error', text: 'Tenant not found.' });
            }
          } else {
            setMessage({ type: 'error', text: 'Tenant not found.' });
          }
        } catch (error) {
          console.error('Error fetching tenant ID:', error);
          setMessage({ type: 'error', text: 'Error fetching tenant ID.' });
        }
      }
    };

    const fetchRoomId = async () => {
      if (roomNumber) {
        try {
          const token = localStorage.getItem('authToken');
          if (!token) {
            setMessage({ type: 'error', text: 'No authentication token found. Please log in.' });
            return;
          }

          const response = await axios.get(`http://127.0.0.1:8000/api/rooms/?number=${roomNumber}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          console.log('Room Fetch Response:', response.data);

          if (response.data && response.data.length > 0) {
            const room = response.data.find(r => r.number === roomNumber);
            if (room) {
              setRoomId(room.id);
            } else {
              setMessage({ type: 'error', text: 'Room not found.' });
            }
          } else {
            setMessage({ type: 'error', text: 'Room not found.' });
          }
        } catch (error) {
          console.error('Error fetching room ID:', error);
          setMessage({ type: 'error', text: 'Error fetching room ID.' });
        }
      }
    };

    fetchTenantId();
    fetchRoomId();
  }, [tenantName, roomNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomId || !tenantId) {
      setMessage({ type: 'error', text: 'Room or tenant not selected correctly.' });
      return;
    }

    if (!checkInDate || !checkOutDate) {
      setMessage({ type: 'error', text: 'Both check-in and check-out dates are required.' });
      return;
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setMessage({ type: 'error', text: 'Check-out date must be after check-in date.' });
      return;
    }

    console.log('Submitting Booking:', { roomId, tenantId, checkInDate, checkOutDate });

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage({ type: 'error', text: 'No authentication token found. Please log in.' });
        return;
      }

      const bookingResponse = await axios.post(
        'http://127.0.0.1:8000/api/bookings/',
        {
          room: roomId,
          tenant: tenantId,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log('Booking Response:', bookingResponse.data);

      if (bookingResponse.status === 201) {
        setMessage({ type: 'success', text: 'Booking successful!' });
        navigate('/payment');
      } else {
        setMessage({ type: 'error', text: 'Booking failed. Please try again.' });
      }
    } catch (error) {
      console.error('Error booking the room:', error.response ? error.response.data : error.message);
      setMessage({ type: 'error', text: `Booking failed. ${error.response?.data?.detail || error.message}` });
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto">
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Booking
      </Heading>
      {message.text && (
        <Alert status={message.type} mb={4}>
          <AlertIcon />
          <AlertTitle mr={2}>{message.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setMessage({ type: '', text: '' })} />
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="roomNumber">
            <FormLabel>Room Number</FormLabel>
            <Input value={roomNumber} isReadOnly />
          </FormControl>
          <FormControl id="tenantName">
            <FormLabel>Tenant Name</FormLabel>
            <Input value={tenantName} isReadOnly />
          </FormControl>
          <FormControl id="checkInDate">
            <FormLabel>Check-In Date</FormLabel>
            <Input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
          </FormControl>
          <FormControl id="checkOutDate">
            <FormLabel>Check-Out Date</FormLabel>
            <Input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
          </FormControl>
          <Button colorScheme="teal" type="submit">Book Now</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Booking;
