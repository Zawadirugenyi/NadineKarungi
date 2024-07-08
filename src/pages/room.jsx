// RoomPage.js

import React, { useState, useEffect } from 'react';
import { Box, Heading, Grid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import RoomCard from '../Components/room_card';

function RoomPage() {
  const { hostelId, hostelName } = useParams();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = 'b17ecd1e7ab8b13a1c98c81fefad7c8839252b63'; // Replace with your actual token
        const url = `http://127.0.0.1:8000/api/rooms/?hostel=${hostelId}&hostel__name=${hostelName}`;
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
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [hostelId, hostelName]);

  return (
    <Box p={4}>
      <Heading mb={6}>Rooms for Hostel: {hostelName}</Heading>
      <Grid 
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} 
        gap={4}
      >
        {rooms.map((room) => (
          <RoomCard
            key={room.id} // Ensure each room has a unique key
            number={room.number}
            roomType={room.room_type}
            image={`http://127.0.0.1:8000${room.image}`} // Construct the correct URL
            hostelName={room.hostel_name}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default RoomPage;
