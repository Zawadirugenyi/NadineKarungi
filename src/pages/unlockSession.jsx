import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, VStack, FormControl, FormLabel, Box, Heading, useToast } from '@chakra-ui/react';

const BypassCodePage = () => {
    const [tenantName, setTenantName] = useState('');
    const [bypassCode, setBypassCode] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        // Clear bypass code on component mount
        localStorage.removeItem('bypassCode');
    }, []);

    const generateBypassCode = () => {
        const code = Math.random().toString(36).substring(2, 12);
        localStorage.setItem('bypassCode', code);
        toast({
            title: 'Bypass Code Generated',
            description: `Your bypass code is ${code}.`,
            status: 'info',
            duration: 5000,
            isClosable: true,
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const token = 'cedba665f1e8857726164d0635b2c2ab493b9d81'; // Token for authentication

            // Check if the tenant exists
            const tenantResponse = await fetch('http://127.0.0.1:8000/api/tenants/check/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`, // Include the token in headers
                },
                body: JSON.stringify({ name: tenantName }),
            });

            if (!tenantResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const tenantResult = await tenantResponse.json();

            // Check if the tenant data is present
            if (tenantResult.exists) {
                const storedCode = localStorage.getItem('bypassCode');

                if (bypassCode === storedCode) {
                    // Redirect to dashboard with tenant data
                    navigate('/login');
                } else {
                    toast({
                        title: 'Invalid Bypass Code',
                        description: 'The bypass code you entered is incorrect.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            } else {
                toast({
                    title: 'Tenant Not Found',
                    description: 'The tenant with the provided name does not exist.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: 'Error',
                description: 'An error occurred while verifying your bypass code.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
            <Heading mb={6} textAlign="center">Bypass Code Verification</Heading>
            <VStack spacing={4} align="stretch">
                <FormControl>
                    <FormLabel>Tenant Name</FormLabel>
                    <Input
                        type="text"
                        value={tenantName}
                        onChange={(e) => setTenantName(e.target.value)}
                        placeholder="Enter tenant name"
                    />
                </FormControl>
                <Button colorScheme="blue" onClick={generateBypassCode}>Generate Bypass Code</Button>
                <FormControl>
                    <FormLabel>Enter Bypass Code</FormLabel>
                    <Input
                        type="text"
                        value={bypassCode}
                        onChange={(e) => setBypassCode(e.target.value)}
                        placeholder="Enter the bypass code"
                    />
                </FormControl>
                <Button
                    colorScheme="teal"
                    onClick={handleSubmit}
                    isLoading={loading}
                >
                    Submit
                </Button>
            </VStack>
        </Box>
    );
};

export default BypassCodePage;
