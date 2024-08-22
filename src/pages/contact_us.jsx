import React, { useRef, useState } from 'react';
import { Box,
     Heading, 
     Stack, 
     FormControl,
      FormLabel,
       Input,
        Textarea, Button, useBreakpointValue, Alert, AlertIcon } from '@chakra-ui/react';
import backgroundImage from '../Components/Assets/premium_photo-1661765778256-169bf5e561a6.jpeg';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
    const imageWidth = useBreakpointValue({ base: '100%', md: '50%' });
    const contentWidth = useBreakpointValue({ base: '100%', md: '50%' });

    const form = useRef();
    const [formData, setFormData] = useState({ from_name: '', user_email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        emailjs
            .sendForm('service_u9qc6b4', 'template_0axtb2o', form.current, 'Im7QNWjfrkPY1WTFK')
            .then(
                () => {
                    setIsSubmitting(false);
                    setIsSubmitted(true);
                    setFormData({ from_name: '', user_email: '', message: '' });
                    setTimeout(() => setIsSubmitted(false), 5000); // Hide success message after 5 seconds
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    setIsSubmitting(false);
                }
            );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                    display={{ base: 'none', md: 'block' }}
                />
                <Box shadow="md" borderWidth="1px" p={9} h="auto" w={contentWidth}>
                    <Heading as="h1" mb={6}>Contact Us</Heading>
                    {isSubmitted && (
                        <Alert status="success" mb={6}>
                            <AlertIcon />
                            Your message has been sent successfully!
                        </Alert>
                    )}
                    <form ref={form} onSubmit={sendEmail}>
                        <Stack spacing={4}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    name="from_name"
                                    placeholder="Your Name"
                                    value={formData.from_name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="user_email"
                                    placeholder="Your Email"
                                    value={formData.user_email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="message" isRequired>
                                <FormLabel>Message</FormLabel>
                                <Textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                bg="#0097b2"
                                color="white"
                                _hover={{ bg: "#073d47" }}
                                isLoading={isSubmitting}
                            >
                                Send Message
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Box>
    );
};

export default ContactUs;
