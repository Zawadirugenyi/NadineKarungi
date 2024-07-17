import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image, Stack, Center, Spinner, Button } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const RoomDescription = () => {
  const { roomNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [roomDescription, setRoomDescription] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDescription = async () => {
      try {
        const token = 'b17ecd1e7ab8b13a1c98c81fefad7c8839252b63'; 
        const config = {
          headers: {
            Authorization: `Token ${token}`,
          },
        };

        const url = `http://127.0.0.1:8000/api/room-descriptions/?room__number=${encodeURIComponent(roomNumber)}`;
        const response = await axios.get(url, config);
        
        console.log('API Response:', response.data); // Log API response

        if (response.data.length === 0) {
          throw new Error(`No room description found for Room ${roomNumber}`);
        }

        setRoomDescription(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room descriptions:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRoomDescription();
  }, [roomNumber]);

  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Room Description:', roomDescription);

  if (loading) {
    return (
      <Center height="300px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!roomDescription) {
    return <Text>No room description found for Room {roomNumber}.</Text>;
  }

  return (
    <Box p={9}>
      <Box p={9} shadow="md" borderWidth="1px">
        <Heading as="h2" size="lg" mb={4}>
          Room {roomDescription.room.number} Description
        </Heading>

        <Stack direction="row" spacing={4} mb={4}>
          <Image src={`http://127.0.0.1:8000${roomDescription.sitting_room_image}`} alt="Sitting Room" boxSize="630px" w="900px" />
          <Stack direction="column" spacing={3} mb={4}>
            <Image src={`http://127.0.0.1:8000${roomDescription.bedroom_image}`} alt="Bedroom" boxSize="200px" />
            <Image src={`http://127.0.0.1:8000${roomDescription.kitchen_image}`} alt="Kitchen" boxSize="200px" />
            <Image src={`http://127.0.0.1:8000${roomDescription.bathroom_image}`} alt="Bathroom" boxSize="200px" />
          </Stack>
        </Stack>

        <Text mb={4}>
          Description: {roomDescription.description}
        </Text>
        <Text>
          Price: Ksh {roomDescription.price}
        </Text>
        <Button
          as={Link}
          to="/login"
          mt={4}
          width="400px"
          bg="#0097b2"
          color="white"
          _hover={{ bg: "#073d47" }}
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

export default RoomDescription;
