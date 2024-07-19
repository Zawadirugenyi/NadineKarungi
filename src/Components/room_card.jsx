import React from 'react';
import { Box, Image, Text, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function RoomCard({ number, roomType, image, hostelName }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="sm">
      <Flex direction="column">
        <Image src={image} alt="room_image" borderRadius="md" mb={4} />
        <Text fontSize="xl" fontWeight="bold">Room Number: {number}</Text>
        <Text>Room Type: {roomType}</Text>
        <Text>Hostel: {hostelName}</Text>
      </Flex>
      <Flex justify="flex-end" mt={4} marginTop="-50px">
        <Button
          as={Link}
          to={`/room_detail/${encodeURIComponent(number)}`}
          bg="white"
          color="#0097b2"
          border="1px solid #0097b2"
          boxShadow="md"
          _hover={{ bg: "#0097b2", color: "white" }}
          textDecoration="none"
        >
          View Description
        </Button>
      </Flex>
    </Box>
  );
}

export default RoomCard;
