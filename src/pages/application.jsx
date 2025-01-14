import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Select, useToast, Grid, Text, Flex, Image } from '@chakra-ui/react';
import axios from 'axios';
import aboutImage from '../Components/Assetes/Gerante1.jpeg'; // Image import

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    place: '',
    nationality: '',
    sex: '',
    cv: null,
    cover_letter: null,
    other_documents: null,
    years_of_experience: '',
    starting_date: '',
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post('https://microtousadmin.onrender.com/api/applications/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: 'Application submitted.',
        description: "Your application has been successfully submitted!",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setFormData({
        full_name: '',
        email: '',
        place: '',
        nationality: '',
        sex: '',
        cv: null,
        cover_letter: null,
        other_documents: null,
        years_of_experience: '',
        starting_date: '',
      });
    } catch (error) {
      toast({
        title: 'Submission failed.',
        description: error.response?.data?.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex p={6} maxW="1200px" mx="auto" mt={10} borderRadius="md" boxShadow="lg" bg="white" height="650px" marginTop="20px">
      <Box flex="1" p={6} marginTop="-50px">
        <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
          Application Form
        </Text>
        <form onSubmit={handleSubmit}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <FormControl isRequired>
              <FormLabel htmlFor="full_name">Full Name</FormLabel>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
          
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="place">Place</FormLabel>
              <Input
                id="place"
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="Bunia, RDC"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="nationality">Nationality</FormLabel>
              <Select
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="Congolese"
              >
                <option value="african">African</option>
                <option value="algerian">Algerian</option>
                <option value="angolan">Angolan</option>
                <option value="beninese">Beninese</option>
                <option value="botswanan">Botswanan</option>
                <option value="burundian">Burundian</option>
                <option value="cape_verdean">Cape Verdean</option>
                <option value="cameroonian">Cameroonian</option>
                <option value="chadian">Chadian</option>
                <option value="comorian">Comorian</option>
                <option value="congolese">Congolese</option>
                <option value="djiboutian">Djiboutian</option>
                <option value="egyptian">Egyptian</option>
                <option value="equatorial_guinean">Equatorial Guinean</option>
                <option value="eritrean">Eritrean</option>
                <option value="eswatini">Eswatini</option>
                <option value="ethiopian">Ethiopian</option>
                <option value="gabonian">Gabonian</option>
                <option value="gambian">Gambian</option>
                <option value="ghanian">Ghanian</option>
                <option value="guinean">Guinean</option>
                <option value="guinean_bissauan">Guinean Bissauan</option>
                <option value="ivorian">Ivorian</option>
                <option value="kenyan">Kenyan</option>
                <option value="lesothan">Lesothan</option>
                <option value="liberian">Liberian</option>
                <option value="libyan">Libyan</option>
                <option value="madagascan">Madagascan</option>
                <option value="malawian">Malawian</option>
                <option value="malian">Malian</option>
                <option value="mauritanian">Mauritanian</option>
                <option value="mauritian">Mauritian</option>
                <option value="moroccan">Moroccan</option>
                <option value="mozambican">Mozambican</option>
                <option value="namibian">Namibian</option>
                <option value="nigerian">Nigerian</option>
                <option value="rwandan">Rwandan</option>
                <option value="senegalese">Senegalese</option>
                <option value="seychellois">Seychellois</option>
                <option value="sierra_leonean">Sierra Leonean</option>
                <option value="somali">Somali</option>
                <option value="south_african">South African</option>
                <option value="south_sudanese">South Sudanese</option>
                <option value="sudanese">Sudanese</option>
                <option value="tanzanian">Tanzanian</option>
                <option value="togoese">Togoese</option>
                <option value="tunisian">Tunisian</option>
                <option value="ugandan">Ugandan</option>
                <option value="zambian">Zambian</option>
                <option value="zimbabwean">Zimbabwean</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="sex">Gender</FormLabel>
              <Select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                placeholder="Select gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="cv">CV</FormLabel>
              <Input
                id="cv"
                name="cv"
                type="file"
                onChange={handleFileChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="cover_letter">Cover Letter</FormLabel>
              <Input
                id="cover_letter"
                name="cover_letter"
                type="file"
                onChange={handleFileChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="other_documents">Other Documents</FormLabel>
              <Input
                id="other_documents"
                name="other_documents"
                type="file"
                onChange={handleFileChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="years_of_experience">Years of Experience</FormLabel>
              <Select
                id="years_of_experience"
                name="years_of_experience"
                value={formData.years_of_experience}
                onChange={handleChange}
                placeholder="Select experience level"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="starting_date">Starting Date</FormLabel>
              <Input
                id="starting_date"
                name="starting_date"
                type="date"
                value={formData.starting_date}
                onChange={handleChange}
              />
            </FormControl>

          </Grid>
       <Button
        marginBottom="-70px" 
        marginLeft="150px"                     
        color="#2a8fc1"
        size="lg"
        _hover={{ bg: 'yellow.200' }}
        px={8}
        as="a"
        href="home"
        mt="10px"
                           
                           >
            Submit Application
          </Button>
        </form>
      </Box>
      <Box flex="1" marginTop="-70px">
        <Image src={aboutImage} alt="About Image" width="100%" height="100%" objectFit="cover" />
      </Box>
    </Flex>
  );
};

export default ApplicationForm;
