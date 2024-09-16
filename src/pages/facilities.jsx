import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Image,
  Text,
  Badge,
  SimpleGrid,
  Button,
  useToast,
  VStack,
  Flex,
  IconButton,
  useColorMode,
  Link,
} from '@chakra-ui/react';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../Components/Assets/logo.png';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [error, setError] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    facilityId: null,
    tenantName: '',
  });
  const [token, setToken] = useState(null);
  const [showCards, setShowCards] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const sidebarBgColor = '#0097b2'; // Assuming colors are defined
  const buttonHoverColor = 'black';

  const authToken = localStorage.getItem('authToken');

  const query = new URLSearchParams(useLocation().search);
  const tenantNameFromQuery = query.get('tenantName') || '';

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/facilities/?tenantName=${encodeURIComponent(
            tenantNameFromQuery
          )}`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
        setFacilities(response.data);
      } catch (err) {
        console.error('Error fetching facilities:', err.message);
        setError(err.message);
      }
    };

    fetchFacilities();
    setRegistrationData((prevState) => ({
      ...prevState,
      tenantName: tenantNameFromQuery,
    }));
  }, [authToken, tenantNameFromQuery]);

  const fetchTenantId = async (tenantName) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tenants/?name=${encodeURIComponent(
          tenantName
        )}`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      if (response.data.length > 0) {
        return response.data[0].id;
      } else {
        throw new Error('Tenant not found');
      }
    } catch (err) {
      console.error('Error fetching tenant ID:', err.message);
      throw err;
    }
  };

  const handleRegister = async (facilityId) => {
    if (!registrationData.tenantName) {
      toast({
        title: 'Tenant name is required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const tenantId = await fetchTenantId(registrationData.tenantName);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/register_facility/`,
        {
          facility: facilityId,
          tenant: tenantId,
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      setToken(response.data.registration_token);
      toast({
        title: 'Registration successful.',
        description: `Your registration token: ${response.data.registration_token}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setRegistrationData({ facilityId: null, tenantName: '' });
    } catch (err) {
      console.error(
        'Registration failed:',
        err.response ? err.response.data : err.message
      );
      const errorMessage = err.response?.data?.non_field_errors?.[0] || err.message;

      toast({
        title: 'Registration failed.',
        description: `Error: ${errorMessage}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
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
        p={3} // Reduced padding
      >
        <Image src={logo} alt="Logo" boxSize="80px" mb={3} /> {/* Reduced logo size */}
        <Button
          colorScheme="white"
          variant="outline"
          _hover={{ bg: buttonHoverColor, color: 'white' }}
          w="full"
          onClick={() => setShowCards(!showCards)}
        >
          {showCards ? 'Hide Dashboard' : 'Show Dashboard'}
        </Button>
        <IconButton
          icon={<FaArrowLeft />}
          colorScheme="white"
          variant="outline"
          _hover={{ bg: buttonHoverColor, color: 'white' }}
          w="full"
          onClick={() => navigate(-1)} // Go back to the previous page
          aria-label="Go Back"
        />
    
        <Button
          colorScheme="white"
          variant="outline"
          _hover={{ bg: buttonHoverColor, color: 'white' }}
          w="full"
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          {colorMode === 'light' ? ' Dark' : ' Light'}
        </Button>
        <Button
          colorScheme="white"
          variant="outline"
          _hover={{ bg: buttonHoverColor, color: 'white' }}
          w="full"
          onClick={() => {
            // handle logout logic
          }}
        >
          Logout
        </Button>
      </VStack>

    
         <Box bg="gray.100" minH="100vh"  w="80%" overflowY="auto" p={10}>
          <Text as="h1" fontSize="3xl" mb={8} textAlign="center" color="teal.500">
            Our Facilities
          </Text>{/* Reduced padding */}
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={3}> {/* Reduced spacing */}
          {facilities.map((facility) => (
            <Box
              key={facility.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              h="auto" // Adjusted height to auto
              bg="white"
              shadow="md"
            >
              {facility.image && (
                <Image
                  src={`http://127.0.0.1:8000${facility.image}`}
                  alt={facility.name}
                  boxSize="100%"
                  objectFit="cover"
                  maxH="200px" // Adjusted max height for the image
                />
              )}
              <Box p="3" flex="1"> {/* Reduced padding */}
                <Box display="flex" alignItems="baseline" mb={2}>
                  <Badge
                    borderRadius="full"
                    px="2"
                    colorScheme={facility.interaction_type === 'register' ? 'green' : 'teal'}
                  >
                    {facility.interaction_type === 'register' ? 'Register' : 'Contact'}
                  </Badge>
                </Box>

                <Box mb={2} fontWeight="semibold" as="h4" lineHeight="tight">
                  {facility.name}
                </Box>

                <Text mb={3}>{facility.description}</Text> {/* Reduced margin-bottom */}

                {/* Flex container to align the Register button and Contact Info to the left */}
                <Flex direction="column" align="flex-start">
                  {facility.interaction_type === 'register' ? (
                    <Button
                      colorScheme="teal"
                      size="sm" // Reduced button size
                      onClick={() => handleRegister(facility.id)}
                    >
                      Register
                    </Button>
                  ) : (
                    <Box>
                      <Text fontWeight="bold">Contact Info:</Text>
                      <Text>Name: {facility.contact_name}</Text>
                      <Text>Email: {facility.contact_email}</Text>
                      <Text>Phone: {facility.contact_phone}</Text>
                    </Box>
                  )}
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default Facilities;
