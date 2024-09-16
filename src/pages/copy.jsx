import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  IconButton,
  SimpleGrid,
  Spinner,
  Center,
  Flex,
  VStack,
  HStack,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaHeart, FaDownload, FaMoon, FaSun } from "react-icons/fa";
import { MdOutlineNotifications, MdOutlineNotificationsNone } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";

// Define logo or import it if it's a local file
const logo = "/path/to/logo.png"; // Update this path accordingly
const sidebarBgColor = "teal.600";
const buttonHoverColor = "teal.500";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCards, setShowCards] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [colorMode, setColorMode] = useState("light");
  const [tenant, setTenant] = useState({ passport_photo: "" });
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios.get("http://127.0.0.1:8000/api/events/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      setEvents(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      setError("An error occurred while fetching events.");
      setLoading(false);
    });
  }, []);

  const handleLike = (id) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id ? { ...event, liked: !event.liked } : event
      )
    );
  };

  const handleDownloadRVP = (rvpFile) => {
    if (rvpFile) {
      window.open(`http://127.0.0.1:8000${rvpFile}`, "_blank");
    } else {
      toast({
        title: "No RVP File",
        description: "No RVP file available for download.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const toggleColorMode = () => {
    setColorMode(prevMode => (prevMode === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Flex h="100vh">
      <VStack
        w="20%"
        h="100vh"
        bg={sidebarBgColor}
        color="white"
        spacing={4}
        align="stretch"
        p={4}
      >
        <Image src={logo} alt="Logo" boxSize="100px" mb={4} />
        <Button
          colorScheme="white"
          variant="outline"
          _hover={{ bg: buttonHoverColor, color: "white" }}
          w="full"
          onClick={() => setShowCards(!showCards)}
        >
          {showCards ? 'Hide Dashboard' : 'Show Dashboard'}
        </Button>
        <Link to="/">
          <Button
            colorScheme="white"
            variant="outline"
            _hover={{ bg: buttonHoverColor, color: "white" }}
            w="full"
          >
            Home
          </Button>
        </Link>
        <Link to="/event">
          <Button
            colorScheme="white"
            variant="outline"
            _hover={{ bg: buttonHoverColor, color: "white" }}
            w="full"
          >
            Events
          </Button>
        </Link>
        <Link to="/facilities">
          <Button
            colorScheme="white"
            variant="outline"
            _hover={{ bg: buttonHoverColor, color: "white" }}
            w="full"
          >
            Facilities
          </Button>
        </Link>
        <Button
          colorScheme="white"
          variant="outline"
          _hover={{ bg: buttonHoverColor, color: "white" }}
          w="full"
          onClick={() => {/* Add your requisition logic here */}}
        >
          Requisition
        </Button>
        <Button
          colorScheme="white"
          variant="outline"
          _hover={{ bg: buttonHoverColor, color: "white" }}
          w="full"
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          {colorMode === 'light' ? ' Dark' : ' Light'}
        </Button>
      </VStack>

      <Flex w="80%" p={4} direction="column">
        <HStack spacing={4} align="center" ml="auto">
          <IconButton
            icon={unreadNotificationsCount > 0 ? <MdOutlineNotifications /> : <MdOutlineNotificationsNone />}
            aria-label="Notifications"
            color={unreadNotificationsCount > 0 ? 'black' : 'inherit'}
            onClick={() => setShowNotifications(!showNotifications)}
          />
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="white"
              color="black"
              _hover={{ bg: 'white', color: 'black' }}
            >
              <HStack spacing={2} align="center">
                {tenant.passport_photo && (
                  <Image
                    src={`http://127.0.0.1:8000${tenant.passport_photo}`}
                    alt="Profile Photo"
                    boxSize="50px"
                    borderRadius="full"
                    border="2px solid white"
                  />
                )}
              </HStack>
            </MenuButton>
            <MenuList
              bg="white"
              border="1px solid teal.500"
              boxShadow="md"
              borderRadius="md"
              py={2}
            >
              <MenuItem
                onClick={handleLogout}
                color="black"
                fontWeight="bold"
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <Box bg="gray.100" minH="100vh" p={10}>
          <Text as="h1" fontSize="3xl" mb={8} textAlign="center" color="teal.500">
            Upcoming Events
          </Text>
          <SimpleGrid columns={[1, 2, 3]} spacing={10}>
            {events.map((event) => (
              <Box
                key={event.id}
                bg="white"
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
              >
                <Image
                  src={event.image ? `http://127.0.0.1:8000${event.image}` : "/path/to/placeholder.jpg"}
                  alt={event.title}
                  borderRadius="md"
                  objectFit="cover"
                  width="100%"
                  height="200px"
                />
                <Text mt={4} fontWeight="bold" fontSize="xl">
                  {event.title}
                </Text>
                <Text mt={2}> Location: {event.location}</Text>
                <Text color="gray.500">{new Date(event.date).toLocaleDateString()}</Text>
                <Flex justify="space-between" align="center" mt={4}>
                  <Button
                    colorScheme="teal"
                    onClick={() => handleDownloadRVP(event.rvp_file)}
                    leftIcon={<FaDownload />}
                    disabled={!event.rvp_file}
                  >
                    {event.rvp_file ? "Download RVP" : "No RVP File"}
                  </Button>
                  <IconButton
                    icon={<FaHeart />}
                    colorScheme={event.liked ? "red" : "gray"}
                    onClick={() => handleLike(event.id)}
                    aria-label="Like Event"
                  />
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Flex>
  );
};

export default EventPage;
