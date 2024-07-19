import React from 'react';
import { Box, Heading, Stack, FormControl, FormLabel, Input, Textarea, Button, useBreakpointValue } from '@chakra-ui/react';
import backgroundImage from '../Components/Assets/photo_6010393430800317782_y.jpg'; // Adjusted the path

const ContactUs = () => {
    const imageWidth = useBreakpointValue({ base: '100%', md: '50%' });
    const contentWidth = useBreakpointValue({ base: '100%', md: '50%' });

    return (
        <Box p={8} mt={6}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={8} mb={10}>
                <Box
                    w={imageWidth}
                    p={6}
                    bg="gray.200"
                    boxShadow="lg"
                    rounded="md"
                    bgSize="cover"
                    bgPosition="center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                    display={{ base: 'none', md: 'block' }} // Hide image on small screens
                />
                <Box shadow="md" borderWidth="1px" p={9} h="auto" w={contentWidth}>
                    <Heading as="h1" mb={6}>Contact Us</Heading>
                    <Stack spacing={4}>
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Your Name" />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="Your Email" />
                        </FormControl>
                        <FormControl id="message" isRequired>
                            <FormLabel>Message</FormLabel>
                            <Textarea placeholder="Your Message" />
                        </FormControl>
                        <Button type="submit" bg="#0097b2" color="white" _hover={{ bg: "#073d47" }}>Send Message</Button>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default ContactUs;
