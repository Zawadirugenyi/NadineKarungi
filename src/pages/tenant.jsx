    import React, { useState } from 'react';
    import {
    Box, Button, FormControl, FormLabel, Input, Grid, GridItem, Heading, Alert,
    AlertIcon, AlertTitle, AlertDescription, CloseButton, useToast
    } from '@chakra-ui/react';
    import { useNavigate } from 'react-router-dom';
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
    sponsor_contact: '', // Added sponsor contact field
    passport_photo: null,
    position: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const toast = useToast();
  const navigate = useNavigate(); // Initialize navigate

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
      const token = localStorage.getItem('token');
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

      setMessage({ type: 'success', text: 'Registration successful' });
      toast({
        title: 'Registration successful.',
        description: 'You have successfully registered.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
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
        sponsor_contact: '', // Clear sponsor contact field
        passport_photo: null,
        position: ''
      });

      // Redirect to booking page
      navigate('/booking');
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
                            <Input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
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
                        <FormControl id="phone_number" isRequired>
                            <FormLabel>Sponsor Contact</FormLabel>
                            <Input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                </Grid>

                <Box textAlign="center" mt={6}>
                    <Button type="submit" bg="#0097b2" color="white" width="400px" _hover={{ bg: "#073d47" }}>
                        Register
                    </Button>
                </Box>
            </form>

            {message.text && (
                <Box mt={4} color={message.type === 'success' ? 'green.500' : 'red.500'}>
                    {message.text}
                </Box>
            )}
        </Box>
    );
};

export default Tenant;
