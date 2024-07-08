import React, { useState, useEffect } from 'react';
import { Box, Heading, Grid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import RoomCard from '../Components/room_card';

function RoomPage() {
  const { hostelId } = useParams();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = 'b17ecd1e7ab8b13a1c98c81fefad7c8839252b63'; // Replace with your actual token
        const response = await fetch(`http://127.0.0.1:8000/api/rooms/?hostel=${hostelId}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log('Fetched rooms:', data); // Add this line
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    console.log('hostelId:', hostelId); // Add this line
    fetchRooms();
  }, [hostelId]);

  return (
    <Box p={4}>
      <Heading mb={6}>Rooms</Heading>
      <Grid 
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} 
        gap={4}
      >
        {rooms.map((room, index) => (
          <RoomCard
            key={index}
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
