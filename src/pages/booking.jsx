import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading, VStack, Alert, Text, AlertIcon, AlertTitle, AlertDescription, CloseButton, Flex, Image, useToast } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import backgroundImage from '../Components/Assets/Room2.webp'; // Replace with your image path

const Booking = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const [tenantName, setTenantName] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast(); // Import useToast to display toast notifications

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const roomNumberFromQuery = query.get('roomNumber');
        const tenantNameFromState = location.state?.tenantName;

        if (roomNumberFromQuery) {
            setRoomNumber(roomNumberFromQuery);
        }
        if (tenantNameFromState) {
            setTenantName(tenantNameFromState);
        }
    }, [location.search, location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            room: roomNumber,
            tenant: tenantName,
            check_in_date: checkInDate,
            check_out_date: checkOutDate,
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found.');

            await axios.post('http://127.0.0.1:8000/api/bookings/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            setSuccess('Booking created successfully');
            toast({
                title: 'Booking Created',
                description: 'Your booking was successful.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            navigate('/payment'); // Redirect to payment page after successful booking
        } catch (error) {
            setError('Failed to create booking.');
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction={{ base: 'column', md: 'row' }} p={4} maxWidth="1200px" mx="auto" gap={6}>
            <Box
                w={{ base: 'full', md: '50%' }}
                p={6}
                bg="white"
                boxShadow="xl"
                rounded="lg"
                borderWidth={1}
                borderColor="gray.200"
            >
                <Heading mb={6} textAlign="center" fontSize="2xl" color="teal.600">Booking</Heading>
                {error && (
                    <Alert status="error" mb={4} borderRadius="md" variant="subtle">
                        <AlertIcon />
                        <AlertTitle mr={2}>Error!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                        <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError('')} />
                    </Alert>
                )}
                {success && (
                    <Alert status="success" mb={4} borderRadius="md" variant="subtle">
                        <AlertIcon />
                        <AlertTitle mr={2}>Success!</AlertTitle>
                        <AlertDescription>{success}</AlertDescription>
                        <CloseButton position="absolute" right="8px" top="8px" onClick={() => setSuccess('')} />
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl id="roomNumber" isRequired>
                            <FormLabel>Room Number</FormLabel>
                            <Input type="text" value={roomNumber} isReadOnly bg="gray.50" />
                        </FormControl>
                        <FormControl id="tenantName" isRequired>
                            <FormLabel>Tenant Name</FormLabel>
                            <Input
                                type="text"
                                value={tenantName}
                                onChange={(e) => setTenantName(e.target.value)}
                                bg="gray.50"
                            />
                        </FormControl>
                        <FormControl id="checkInDate" isRequired>
                            <FormLabel>Check-In Date</FormLabel>
                            <Input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                bg="gray.50"
                            />
                        </FormControl>
                        <FormControl id="checkOutDate" isRequired>
                            <FormLabel>Check-Out Date</FormLabel>
                            <Input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                bg="gray.50"
                            />
                        </FormControl>
                        <Button
                            marginTop="12px"
                            type="submit"
                            bg="teal.500"
                            color="white"
                            _hover={{ bg: "teal.600" }}
                            width="full"
                        >
                            Book Now
                        </Button>
                    </VStack>
                </form>
            </Box>
            <Box
                w={{ base: 'full', md: '50%' }}
                p={6}
                bg="gray.100"
                boxShadow="lg"
                rounded="md"
            >
                <Image
                    src={backgroundImage}
                    alt="Booking"
                    borderRadius="md"
                    boxSize="100%"
                    objectFit="cover"
                    h="450px"
                />
                <Text mt={2} color="gray.600">
                    Find the perfect room and enjoy your stay at our SmartHostelPro.
                </Text>
            </Box>
        </Flex>
    );
};

export default Booking;
