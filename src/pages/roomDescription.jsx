import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Center, Button } from '@chakra-ui/react';
import axios from 'axios';

const RoomDetail = ({ roomDescription }) => {
  const { room, sitting_room_image, bedroom_image, kitchen_image, bathroom_image, description, price } = roomDescription;

  return (
    <Box p={6} bg="gray.100" boxShadow="lg" borderRadius="md">
      <VStack align="start" spacing={4} direction={{ base: 'column', md: 'row' }}>
        <Box flex="1">
          {sitting_room_image && (
            <img src={`http://127.0.0.1:8000${sitting_room_image}`} alt={`Sitting room of ${room.number}`} style={{ maxHeight: '300px', objectFit: 'cover', borderRadius: 'md' }} />
          )}
          {bedroom_image && (
            <img src={`http://127.0.0.1:8000${bedroom_image}`} alt={`Bedroom of ${room.number}`} style={{ maxHeight: '300px', objectFit: 'cover', borderRadius: 'md', marginTop: '4px' }} />
          )}
          {kitchen_image && (
            <img src={`http://127.0.0.1:8000${kitchen_image}`} alt={`Kitchen of ${room.number}`} style={{ maxHeight: '300px', objectFit: 'cover', borderRadius: 'md', marginTop: '4px' }} />
          )}
          {bathroom_image && (
            <img src={`http://127.0.0.1:8000${bathroom_image}`} alt={`Bathroom of ${room.number}`} style={{ maxHeight: '300px', objectFit: 'cover', borderRadius: 'md', marginTop: '4px' }} />
          )}
        </Box>
        <Box flex="1" ml={{ base: 0, md: 4 }}>
          <Text mb={4}>Room Number: {room.number}</Text>
          <Text mb={4}>Room Type: {room.room_type}</Text>
          <Text mb={4}>Hostel: {room.hostel.name}</Text>
          <Text mb={4}>Price: ${price} per night</Text>
          <Text mb={4}>Description: {description}</Text>
          <Center>
            <Button colorScheme="teal" mt={4} width="full">
              Book Now
            </Button>
          </Center>
        </Box>
      </VStack>
    </Box>
  );
};

const RoomDetails = () => {
  const [roomDescriptions, setRoomDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDescriptions = async () => {
      try {
        const token = 'b17ecd1e7ab8b13a1c98c81fefad7c8839252b63';
        const response = await axios.get(`http://127.0.0.1:8000/api/room-descriptions/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setRoomDescriptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room descriptions:', error);
        setError(error.message || 'Failed to fetch room descriptions');
        setLoading(false);
      }
    };

    fetchRoomDescriptions();
  }, []);

  useEffect(() => {
    console.log('Room Descriptions:', roomDescriptions);
  }, [roomDescriptions]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {roomDescriptions.map((roomDescription) => (
        <RoomDetail key={roomDescription.room.id} roomDescription={roomDescription} />
      ))}
    </div>
  );
};

export default RoomDetails;
