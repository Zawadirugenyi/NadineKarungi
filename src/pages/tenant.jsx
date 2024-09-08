import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Grid, GridItem, Heading, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, useToast } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Tenant = () => {
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    admin_number: '',
    gender: '',
    nationality: '',
    passport: '',
    phone_number: '',
    email: '',
    parent: '',
    sponsor_contact: '',
    passport_photo: null,
    position: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract roomNumber from location state
  const roomNumber = location.state?.roomNumber || '';

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'passport_photo') {
      setFormData({
        ...formData,
        passport_photo: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token not found.');
      }

      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post('http://127.0.0.1:8000/api/tenants/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        }
      });

      const tenant = response.data;
      setMessage({ type: 'success', text: 'Registration successful' });
      toast({
        title: 'Registration successful.',
        description: 'You have successfully registered.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Clear form data
      setFormData({
        name: '',
        major: '',
        admin_number: '',
        gender: '',
        nationality: '',
        passport: '',
        phone_number: '',
        email: '',
        parent: '',
        sponsor_contact: '',
        passport_photo: null,
        position: ''
      });

      // Navigate to booking page with room number and tenant name
      navigate('/booking', { state: { roomNumber, tenantName: tenant.name } });

    } catch (error) {
      const errorMsg = error.response?.data || 'Registration failed';
      const errorText = typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg);
      setMessage({ type: 'error', text: errorText });
      console.error('Error during registration:', error);
      toast({
        title: 'Registration failed.',
        description: errorText,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="1200px" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
      <Heading mb={6}>Tenant Registration</Heading>
      {message.text && (
        <Alert status={message.type} mb={4}>
          <AlertIcon />
          <AlertTitle mr={2}>{message.type === 'success' ? 'Success' : 'Error'}!</AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setMessage({ type: '', text: '' })} />
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem colSpan={1}>
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="major" isRequired>
                            <FormLabel>Major</FormLabel>
                            <Input type="text" name="major" value={formData.major} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="admin_number" isRequired>
                            <FormLabel>Admin Number</FormLabel>
                            <Input type="text" name="admin_number" value={formData.admin_number} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="gender" isRequired>
                            <FormLabel>Gender</FormLabel>
                            <Input type="text" name="gender" value={formData.gender} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="nationality" isRequired>
                            <FormLabel>Nationality</FormLabel>
                            <Input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="passport" isRequired>
                            <FormLabel>National ID/Passport</FormLabel>
                            <Input type="text" name="passport" value={formData.passport} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="passport_photo" isRequired>
                            <FormLabel>Passport Photo</FormLabel>
                            <Input type="file" name="passport_photo" onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="phone_number" isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <Input type="number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="parent" isRequired>
                            <FormLabel>Sponsor</FormLabel>
                            <Input type="text" name="parent" value={formData.parent} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="position" isRequired>
                            <FormLabel>Position</FormLabel>
                            <Input type="text" name="position" value={formData.position} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="sponsor_contact" isRequired>
                            <FormLabel>Sponsor Contact</FormLabel>
                            <Input type="number" name="sponsor_contact" value={formData.sponsor_contact} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                </Grid>
        <Box textAlign="center" mt={6}>
          <Button type="submit" bg="#0097b2" color="white" width="400px" _hover={{ bg: "#073d47" }}>
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Tenant;
