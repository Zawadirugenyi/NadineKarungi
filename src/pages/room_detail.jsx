import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image, Stack, Center, Spinner,Button, Link } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RoomDescription = () => {
    const { roomNumber } = useParams();
    const [loading, setLoading] = useState(true);
    const [roomDescription, setRoomDescription] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoomDescription = async () => {
            try {
                const token = 'b17ecd1e7ab8b13a1c98c81fefad7c8839252b63'; // Actual token
                const encodedRoomNumber = encodeURIComponent(roomNumber);
                const response = await axios.get(`http://127.0.0.1:8000/api/room-descriptions/?room__number=${encodedRoomNumber}`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                console.log('Response:', response.data); // Log the response data

                // Find the specific room description by room number
                const roomDesc = response.data.find(desc => desc.room_number === roomNumber);

                if (!roomDesc) {
                    setError('Room description not found');
                } else {
                    setRoomDescription(roomDesc);
                }
            } catch (error) {
                console.error('Error fetching room description:', error);
                setError('Error fetching room description');
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDescription();
    }, [roomNumber]);

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

    // Ensure roomDescription exists and has required properties
    if (!roomDescription || !roomDescription.room_number) {
        return <Text>No room description found for Room {roomNumber}.</Text>;
    }

    return (
        <Box p={9}>
            <Box p={9} shadow="md" borderWidth="1px">
                <Heading as="h2" size="lg" mb={4}>
                    Room {roomDescription.room_number} Description
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
