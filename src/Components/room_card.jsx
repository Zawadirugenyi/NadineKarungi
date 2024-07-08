import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

function RoomCard({ number, roomType, image, hostelName }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="sm">
      <Image src={image} alt="room_image" borderRadius="md" mb={4} />
      <Text fontSize="xl" fontWeight="bold">Room Number: {number}</Text>
      <Text>Room Type: {roomType}</Text>
      <Text>Hostel: {hostelName}</Text>
    </Box>
  );
}

export default RoomCard;
