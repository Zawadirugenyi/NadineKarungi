import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image, Stack, Center, Spinner, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const RoomDescription = () => {
    const { roomNumber, hostelId } = useParams(); // Extract roomNumber and hostelId from params
    const [loading, setLoading] = useState(true);
    const [roomDescription, setRoomDescription] = useState(null);
    const [error, setError] = useState(null);
    const [zoomedImage, setZoomedImage] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation

    useEffect(() => {
        const fetchRoomDescription = async () => {
            try {
                const token = '520dc5d1657a7b42d3b9ffb3592f9ba88692c1fc'; 
                const response = await axios.get(`http://127.0.0.1:8000/api/room-descriptions/`, {
                    params: {
                        room__number: roomNumber,
                        hostel__id: hostelId
                    },
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                console.log('Response:', response.data); // Log the response data

                // Find the specific room description by room number and hostel ID
                const roomDesc = response.data.find(desc => desc.room_number === roomNumber && desc.hostel_id === hostelId);

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
    }, [roomNumber, hostelId]); // Add roomNumber and hostelId to the dependency array

    const handleImageClick = (imageSrc) => {
        setZoomedImage(imageSrc);
    };

    const closeZoom = () => {
        setZoomedImage(null);
    };

    const handleBookNowClick = () => {
        // Navigate to login with roomNumber and hostelId as state parameters
        navigate('/login', { state: { roomNumber, hostelId } });
    };

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
        <Box p={9} marginTop="25px">
            <Stack direction="row" spacing={10}>
                <Box shadow="md" borderWidth="1px" p={9}>
                    <Stack direction="row" spacing={4} mb={4}>
                        <Image
                            src={`http://127.0.0.1:8000${roomDescription.sitting_room_image}`}
                            alt="Sitting Room"
                            boxSize="400px"
                            w="800px"
                            cursor="pointer"
                            onClick={() => handleImageClick(`http://127.0.0.1:8000${roomDescription.sitting_room_image}`)}
                        />
                        <Stack direction="column" spacing={3} mb={4} h="400px">
                            <Image
                                src={`http://127.0.0.1:8000${roomDescription.bedroom_image}`}
                                alt="Bedroom"
                                boxSize="200px"
                                cursor="pointer"
                                onClick={() => handleImageClick(`http://127.0.0.1:8000${roomDescription.bedroom_image}`)}
                            />
                            <Image
                                src={`http://127.0.0.1:8000${roomDescription.kitchen_image}`}
                                alt="Kitchen"
                                boxSize="200px"
                                cursor="pointer"
                                onClick={() => handleImageClick(`http://127.0.0.1:8000${roomDescription.kitchen_image}`)}
                            />
                            <Image
                                src={`http://127.0.0.1:8000${roomDescription.bathroom_image}`}
                                alt="Bathroom"
                                boxSize="200px"
                                cursor="pointer"
                                onClick={() => handleImageClick(`http://127.0.0.1:8000${roomDescription.bathroom_image}`)}
                            />
                        </Stack>
                    </Stack>
                </Box>
                <Box width="40%">
                    <Box shadow="md" borderWidth="1px" p={9} h="500px">
                        <Heading as="h2" size="lg" mb={4}>
                            Room {roomDescription.room_number} Description
                        </Heading>
                        <Text mb={4}>
                            Description: {roomDescription.description}
                        </Text>
                        <Text mb={4} fontWeight="bold" fontSize="17px">
                            Price: Ksh {roomDescription.price}
                        </Text>
                        <Button
                            bg="white"
                            color="#0097b2"
                            border="1px solid #0097b2"
                            boxShadow="md"
                            _hover={{ bg: "#0097b2", color: "white" }}
                            onClick={handleBookNowClick} // Updated to use handleBookNowClick for redirection
                        >
                            Book Now
                        </Button>
                    </Box>
                </Box>
            </Stack>

            {zoomedImage && (
                <Modal isOpen={!!zoomedImage} onClose={closeZoom} isCentered>
                    <ModalOverlay />
                    <ModalContent maxWidth="57%">
                        <ModalCloseButton />
                        <ModalBody shadow="md">
                            <Carousel showThumbs={false}>
                                <div>
                                    <img src={`http://127.0.0.1:8000${roomDescription.sitting_room_image}`} alt="Sitting Room" />
                                </div>
                                <div>
                                    <img src={`http://127.0.0.1:8000${roomDescription.bedroom_image}`} alt="Bedroom" />
                                </div>
                                <div>
                                    <img src={`http://127.0.0.1:8000${roomDescription.kitchen_image}`} alt="Kitchen" />
                                </div>
                                <div>
                                    <img src={`http://127.0.0.1:8000${roomDescription.bathroom_image}`} alt="Bathroom" />
                                </div>
                            </Carousel>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
};

export default RoomDescription;
