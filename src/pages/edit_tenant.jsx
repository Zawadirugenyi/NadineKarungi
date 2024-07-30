// src/Components/EditTenant.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const EditTenant = () => {
  const [tenant, setTenant] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { tenantId } = location.state || {};

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = { 'Authorization': `Token ${token}` };
        const response = await axios.get(`http://127.0.0.1:8000/api/tenants/${tenantId}/`, { headers });
        setTenant(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tenant:', error);
        toast({
          title: 'Error fetching tenant data.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    };

    fetchTenant();
  }, [tenantId, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenant({ ...tenant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Authorization': `Token ${token}` };
      await axios.put(`http://127.0.0.1:8000/api/tenants/${tenantId}/`, tenant, { headers });
      toast({
        title: 'Tenant updated.',
        description: 'Tenant details updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/dashboard'); // Redirect after update
    } catch (error) {
      console.error('Error updating tenant:', error);
      toast({
        title: 'Error updating tenant.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={tenant.name || ''} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Major</FormLabel>
          <Input name="major" value={tenant.major || ''} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Admin Number</FormLabel>
          <Input name="admin_number" value={tenant.admin_number || ''} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Gender</FormLabel>
          <Input name="gender" value={tenant.gender || ''} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Nationality</FormLabel>
          <Input name="nationality" value={tenant.nationality || ''} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Passport</FormLabel>
          <Input name="passport" value={tenant.passport || ''} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input name="phone_number" value={tenant.phone_number || ''} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" value={tenant.email || ''} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Parent</FormLabel>
          <Input name="parent" value={tenant.parent || ''} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Position</FormLabel>
          <Input name="position" value={tenant.position || ''} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="teal" type="submit">Save Changes</Button>
      </form>
    </Box>
  );
};

export default EditTenant;
