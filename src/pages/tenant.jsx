import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Grid, GridItem, Text, useToast } from '@chakra-ui/react';
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
        passport_photo: null,
        position: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const toast = useToast();

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

            setSuccess('Registration successful');
            setError('');
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
                passport_photo: null,
                phone_number: '',
                email: '',
                parent: '',
                position: ''
            });
        } catch (error) {
            setError('Registration failed');
            setSuccess('');
            console.error('Error during registration:', error);
            if (error.response && error.response.data) {
                console.log('Validation errors:', error.response.data);
            }
            toast({
                title: 'Registration failed.',
                description: 'There was an error with your registration.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box w="1200px" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
            <form onSubmit={handleSubmit}>
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem colSpan={1}>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="major">
                            <FormLabel>Major</FormLabel>
                            <Input type="text" name="major" value={formData.major} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="admin_number">
                            <FormLabel>Admin Number</FormLabel>
                            <Input type="text" name="admin_number" value={formData.admin_number} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="gender">
                            <FormLabel>Gender</FormLabel>
                            <Input type="text" name="gender" value={formData.gender} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="nationality">
                            <FormLabel>Nationality</FormLabel>
                            <Input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="passport">
                            <FormLabel>National ID/Passport</FormLabel>
                            <Input type="text" name="passport" value={formData.passport} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="passport_photo">
                            <FormLabel>Passport Photo</FormLabel>
                            <Input type="file" name="passport_photo" onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="phone_number">
                            <FormLabel>Phone Number</FormLabel>
                            <Input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="parent">
                            <FormLabel>Sponsor</FormLabel>
                            <Input type="text" name="parent" value={formData.parent} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl id="position">
                            <FormLabel>Position</FormLabel>
                            <Input type="text" name="position" value={formData.position} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                         <GridItem colSpan={1}>
                        <FormControl id="phone_number">
                            <FormLabel>Phone Number</FormLabel>
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

            {error && <Text color="red.500" mt={4}>{error}</Text>}
            {success && <Text color="green.500" mt={4}>{success}</Text>}
        </Box>
    );
};

export default Tenant;
