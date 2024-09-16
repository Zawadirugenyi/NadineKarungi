import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  Center,
  Spinner,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const RoomDescription = () => {
  const { roomNumber, hostelName } = useParams();
  const [loading, setLoading] = useState(true);
  const [roomDescription, setRoomDescription] = useState(null);
  const [error, setError] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [isRoomAvailable, setIsRoomAvailable] = useState(null); // Track availability of the room
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDescription = async () => {
      try {
        const token = '520dc5d1657a7b42d3b9ffb3592f9ba88692c1fc';
        const response = await axios.get('http://127.0.0.1:8000/api/rooms/', {
          params: {
            number: roomNumber,
            hostel_name: hostelName,
          },
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        console.log('Response:', response.data);

        // Find the room description for the given room number and hostel name
        const roomDesc = response.data.find(
          (desc) => desc.number === roomNumber && desc.hostel_name === hostelName
        );

        if (!roomDesc) {
          setError('Room description not found');
          setIsRoomAvailable(false); // Room not found means it’s not available
        } else {
          setRoomDescription(roomDesc);
          setIsRoomAvailable(roomDesc.status); // Check if the status is true
        }
      } catch (error) {
        console.error('Error fetching room description:', error);
        setError('Error fetching room description');
        setIsRoomAvailable(false); // If there's an error, assume room is not available
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDescription();
  }, [roomNumber, hostelName]);

  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const handleBookNowClick = () => {
    if (isRoomAvailable) {
      // Room is available, redirect to login
      navigate('/login', { state: { roomNumber, hostelName } });
    } else {
      // Room is not available, show alert dialog
      onOpen();
    }
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

  if (!roomDescription || !roomDescription.number) {
    return <Text>No room description found for Room {roomNumber}.</Text>;
  }

  return (
    <Box p={9} marginTop="25px">
      <Stack direction="row" spacing={10}>
        <Box shadow="md" borderWidth="1px" p={9}>
          <Stack direction="row" spacing={4} mb={4}>
            <Image
              src={`http://127.0.0.1:8000${roomDescription.image}`}
              alt={`Room ${roomDescription.number}`}
              boxSize="400px"
              cursor="pointer"
              onClick={() => handleImageClick(`http://127.0.0.1:8000${roomDescription.image}`)}
            />
          </Stack>
        </Box>
        <Box width="40%">
          <Box shadow="md" borderWidth="1px" p={9} h="500px">
            <Heading as="h2" size="lg" mb={4}>
              Room {roomDescription.number} Description
            </Heading>
            <Text mb={4}>
              Description: {roomDescription.description || 'No description available'}
            </Text>
            <Text mb={4} fontWeight="bold" fontSize="17px">
              Price: Ksh {roomDescription.price || 'Not available'}
            </Text>
            <Button
              bg="white"
              color="#0097b2"
              border="1px solid #0097b2"
              boxShadow="md"
              _hover={{ bg: "#0097b2", color: "white" }}
              onClick={handleBookNowClick}
              isDisabled={!isRoomAvailable} // Disable button if room is not available
            >
              {isRoomAvailable ? "Book Now" : "Room Not Available"}
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
                  <img src={`http://127.0.0.1:8000${roomDescription.image}`} alt={`Room ${roomDescription.number}`} />
                </div>
              </Carousel>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Alert Dialog for unavailable room */}
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Room Not Available</AlertDialogHeader>
          <AlertDialogBody>
            The selected room is not available for booking. Please choose another room.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default RoomDescription;
