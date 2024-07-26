import React, { useState, useEffect } from 'react';
import { Box, Heading, Grid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import RoomCard from '../Components/room_card'; // Adjust the path as necessary

function RoomPage() {
  const { hostelName } = useParams();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (!hostelName) {
          return; // Exit early if hostelName is not defined
        }

        const token = localStorage.getItem('authToken'); // Replace with your actual token retrieval
        const url = `http://127.0.0.1:8000/api/rooms/?hostel__name=${encodeURIComponent(hostelName)}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log('API Response:', data); // Log API response for debugging

        // Check if data is an array and filter out booked rooms
        if (Array.isArray(data)) {
          const availableRooms = data.filter(room => !room.is_booked);
          setRooms(availableRooms);
        } else {
          console.error('Unexpected data structure:', data);
          setError('Unexpected data structure');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [hostelName]);

  if (isLoading) {
    return <Box p={4}>Loading...</Box>;
  }

  if (error) {
    return <Box p={4}>Error: {error}</Box>;
  }

  return (
    <Box p={4}>
      <Heading mb={6}>{hostelName} Available Rooms</Heading>
      <Grid 
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} 
        gap={4}
      >
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            number={room.number}
            roomType={room.room_type}
            image={`http://127.0.0.1:8000${room.image}`} // Adjust URL construction
            hostelName={hostelName} // Adjust prop names as per your RoomCard component
            isBooked={room.is_booked} // Pass the booking status to RoomCard
          />
        ))}
      </Grid>
    </Box>
  );
}

export default RoomPage;
