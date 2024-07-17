import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function RoomCard({ number, roomType, image, hostelName }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="sm">
      <Image src={image} alt="room_image" borderRadius="md" mb={4} />
      <Text fontSize="xl" fontWeight="bold">Room Number: {number}</Text>
      <Text>Room Type: {roomType}</Text>
      <Text>Hostel: {hostelName}</Text>
      <Button as={Link} to={`/room_detail/${encodeURIComponent(number)}`} bg="#0097b2" color="white" _hover={{ bg: "#073d47" }} mt={4} textDecoration="none">
        View Description
      </Button>
    </Box>
  );
}

export default RoomCard;
