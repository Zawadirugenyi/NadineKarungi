import React, { useState, useEffect } from 'react';
import { Box, Heading, Grid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import RoomCard from '../Components/room_card'; // Adjust import as per your actual file structure

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

        const token = 'b17ecd1e7ab8b13a1c98c81fefad7c8839252b63'; // Replace with your actual token management
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
        setRooms(data);
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
      <Heading mb={6}> {hostelName} Available Rooms </Heading>
      <Grid 
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} 
        gap={4}
      >
        {rooms.map((room) => (
          <RoomCard
            key={room.id} // Ensure each room has a unique key
            number={room.number}
            roomType={room.room_type}
            image={`http://127.0.0.1:8000${room.image}`} // Adjust URL construction
            hostelName={hostelName} // Adjust prop names as per your RoomCard component
          />
        ))}
      </Grid>
    </Box>
  );
}

export default RoomPage;
