import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, VStack, FormControl, FormLabel, Box, Heading, useToast, Text } from '@chakra-ui/react';
import backgroundImage from '../Components/Assets/a-contemporary-master-bedroom-design-with-a-modular-wardrobe.jpg'; 

const BypassCodePage = () => {
    const [tenantName, setTenantName] = useState('');
    const [bypassCode, setBypassCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [codeGenerated, setCodeGenerated] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        localStorage.removeItem('bypassCode');
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let interval = null;
        if (codeGenerated && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(interval);
                        setCodeGenerated(false);
                        toast({
                            title: 'Bypass Code Expired',
                            description: 'The bypass code has expired. Please generate a new one.',
                            status: 'warning',
                            duration: 5000,
                            isClosable: true,
                            position: 'top',
                            variant: 'subtle'
                        });
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        } else if (!codeGenerated) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer, codeGenerated, toast]);

    const generateBypassCode = () => {
        const code = Math.random().toString(36).substring(2, 12);
        localStorage.setItem('bypassCode', code);
        setTimer(60);
        setCodeGenerated(true);
        toast({
            title: 'Bypass Code Generated',
            description: `Your bypass code is ${code}. It will expire in 1 minute.`,
            status: 'info',
            duration: 5000,
            isClosable: true,
            position: 'top',
            variant: 'subtle'
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const token = '9d9c701809388c23bbb1be95b32ee2612261d668';

            const tenantResponse = await fetch('http://127.0.0.1:8000/api/tenants/check/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({ name: tenantName }),
            });

            if (!tenantResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const tenantResult = await tenantResponse.json();

            if (tenantResult.exists) {
                const storedCode = localStorage.getItem('bypassCode');

                if (bypassCode === storedCode) {
                    navigate('/login', {
                      state: { tenantName },
                    });
                } else {
                    toast({
                        title: 'Invalid Bypass Code',
                        description: 'The bypass code you entered is incorrect.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'top',
                        variant: 'subtle'
                    });
                }
            } else {
                toast({
                    title: 'Tenant Not Found',
                    description: 'The tenant with the provided name does not exist.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                    variant: 'subtle'
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
                position: 'top',
                variant: 'subtle'
            });
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
    };

    return (
        <Box
            w="100vw"
            h="100vh"
            position="relative" // Position relative for overlay positioning
            backgroundImage={`url(${backgroundImage})`} // Use imported image
            backgroundSize="cover"
            backgroundPosition="center"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
        >
            {/* Overlay with opacity */}
            <Box
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                bg="rgba(0, 0, 0, 0.5)" // Semi-transparent black
                zIndex={1} // Ensure overlay is above the background image
            />
            {/* Content */}
            <Box
                w={{ base: '100%', md: '80%' }}
                maxW="md"
                p={6}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="md"
                bg="white" // White background for the form
                zIndex={2} // Ensure form is above the overlay
            >
                <Heading mb={6} textAlign="center" fontSize="30px" marginBottom="30px">Bypass Code Verification</Heading>
                <VStack spacing={4} align="stretch">
                    <FormControl>
                        <FormLabel>Tenant</FormLabel>
                        <Input
                            type="text"
                            value={tenantName}
                            onChange={(e) => setTenantName(e.target.value)}
                            placeholder="Enter tenant name"
                        />
                    </FormControl>
                    <Button 
                          marginTop="12px"
              type="submit" 
              bg="#073d47"
              color="white"
              _hover={{ bg: "#0097b2" }}
              width="full"
                        onClick={generateBypassCode}
                        isDisabled={codeGenerated}
                    >
                        Generate Bypass Code
                    </Button>
                    {codeGenerated && (
                        <Text textAlign="center" color="teal.500" fontWeight="bold">
                            Bypass Code valid for: {formatTime(timer)}
                        </Text>
                    )}
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

                          marginTop="12px"
              type="submit" 
              bg="#0097b2"
              color="white"
              _hover={{ bg: "#073d47" }}
              width="full"
                        onClick={handleSubmit}
                        isLoading={loading}
                    >
                        Submit
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default BypassCodePage;
