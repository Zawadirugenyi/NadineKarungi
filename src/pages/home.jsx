import React, { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Box, Button, Heading, Grid, Text, Card,Stack, CardBody,CardHeader, SimpleGrid, Divider, Link, Icon, Image, Flex, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import aboutImage from '../Components/Assetes/Gerante1.jpeg';
import profilePic from '../Components/Assetes/Gerante1.jpeg';
import { MdLanguage } from "react-icons/md";
import { MdBusiness, MdSchool, MdPeople, MdSupervisedUserCircle, MdDescription, MdAccountBalance, MdWork } from "react-icons/md";

import { FaFacebook, FaInstagram, FaTwitter, FaSnapchat, FaLinkedin, FaPhoneAlt, FaEnvelope, FaAddressBook, FaClipboardList, FaBullhorn, FaChartBar, FaUsers } from 'react-icons/fa'; // Corrected import for icons

import contactImage from '../Components/Assetes/moioi.jpg';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  return (
    <>
      {/* Hero Section */}
      <section id="home">
        <Box   id="home"p={8} idbg="#c0cdd4" minH="50vh" display="flex" alignItems="center" justifyContent="center">
        <Grid
          templateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gap={8}
          alignItems="center"
          w="100%"
          maxW="1200px"
        >
          {/* Content with Typewriter */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start" // Align items to the left
            justifyContent="center"
            textAlign="left" // Set text alignment to left
          >
            <Heading as="h2" size="xl" mb={4} color="#0097b2" borderRadius="md">
            Nadine Karungi Rugenyi
            </Heading>

            <Heading as="h3" size="lg" mb={4} color="black">
              <Typewriter
                words={[
                  'Economiste par formation et Experte en Microfinance',
                  'Directrice Générale de JUDE ASBL',
                  'Fondatrice et Directrice Gérante de MICROTOUS',
                  'Consultante, Formatrice, Coach et Entrepreneur',
                  'Formatrice chez REHEMA HUB',
                  'Gérante chez Ets. VIP WATU PRO',
                ]}
                loop={0} // Infinite loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </Heading>

            <Button
              bg="black"
              color="#c0cdd4"
              size="lg"
              _hover={{ bg: '#0097b2', color: 'white' }}
              mt={4}
            >
              Contactez Moi
            </Button>
          </Box>

       
          <Box>
            <Image src={aboutImage} alt="About Us" borderRadius="md" maxW="100%" />
          </Box>
        </Grid>
      </Box>
      </section>
      



      {/* About Us Section */}
      <section id="about">
          <Box
      id="abouUs"
      as="section"
      bg="gray.100"
      py={16}
      px={{ base: 6, md: 12 }}
      textAlign="center"
    >
      {/* About Header */}
      <Heading as="h2" size="2xl" mb={8}>
        À propos de moi
      </Heading>

      {/* Profile Image and Divider */}
      <Box mb={8}>
        <Divider />
        <Box mt={-7} display="flex" justifyContent="center" position="relative">
          <Image 
            borderRadius="full" 
            boxSize="150px" 
            src={profilePic} 
            alt="Votre Photo" 
            border="5px solid white" 
            zIndex="1"
          />
        </Box>
        <Divider />
      </Box>

      {/* Cards Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {/* About Me Card */}
        <Card>
          <CardHeader>
            <Heading  as="h3" size="md" mb={4} textAlign="center">
              À propos de moi
            </Heading>
          </CardHeader>
          <CardBody textAlign="left">
            <Divider mb={4} />
            <Stack spacing={6}></Stack>
            <Text fontSize="md">
              Dotée d’une capacité managériale, dynamique, rigoureuse dans le travail 
              et motivée, je suis capable entretenir de bonnes relations avec les parties 
              prenantes d’une organisation et jouer un rôle important dans la motivation 
              des entrepreneurs pour atteinte de leurs objectifs.
            </Text>

      
          </CardBody>
        </Card>

        {/* Personal Info Card */}
        <Card>
          <CardHeader>
            <Heading  as="h3" size="md" mb={4} textAlign="center">
              Mes Informations
            </Heading>
          </CardHeader>
          <CardBody textAlign="left">
            <Divider mb={4} />
            <Stack spacing={6}></Stack>
            <Text fontSize="md" mb={4}>
              Je suis un(e) économiste, formatrice et entrepreneure, avec une expertise en microfinance. Actuellement Directrice 
              Générale de JUDE ASBL et Fondatrice de MICROTOUS.
            </Text>
            <Text fontSize="md" mb={4}>
              Vous pouvez me contacter via les moyens suivants :
            </Text>

            {/* Contact Information with Icons */}
            <Stack spacing={4}>
              <Flex align="center">
                <Icon as={FaPhoneAlt} boxSize={6} color="teal.500" mr={4} />
                <Text fontSize="md">
                  <strong>Téléphone:</strong> +243 820 937 002
                </Text>
              </Flex>

              <Flex align="center">
                <Icon as={FaEnvelope} boxSize={6} color="teal.500" mr={4} />
                <Text fontSize="md">
                  <strong>Email:</strong> nadinekarungi@gmail.com
                </Text>
              </Flex>

              <Flex align="center">
                <Icon as={FaAddressBook} boxSize={6} color="teal.500" mr={4} />
                <Text fontSize="md">
                  <strong>Adresse:</strong> Bunia Ituri RD Congo
                </Text>
              </Flex>

              {/* Social Media Links */}
              <Text fontSize="md" mb={2}>
                <strong>Suivez-moi:</strong>
              </Text>
          <Stack direction="row" spacing={4} justify="center">
                <Link href="https://www.facebook.com" isExternal>
                  <Icon as={FaFacebook} boxSize={6} color="teal.500" />
                </Link>
                <Link href="https://www.instagram.com" isExternal>
                  <Icon as={FaInstagram} boxSize={6} color="teal.500" />
                </Link>
                <Link href="https://www.twitter.com" isExternal>
                  <Icon as={FaTwitter} boxSize={6} color="teal.500" />
                </Link>
                <Link href="https://www.snapchat.com" isExternal>
                  <Icon as={FaSnapchat} boxSize={6} color="teal.500" />
                </Link>
                <Link href="https://www.linkedin.com" isExternal>
                  <Icon as={FaLinkedin} boxSize={6} color="teal.500" />
                </Link>
              </Stack>
            </Stack>
          </CardBody>
        </Card>

        {/* Expertise Card */}
        <Card>
          <CardHeader>
            <Heading  as="h3" size="md" mb={4} textAlign="center">
              Mes Expertises
            </Heading>
          </CardHeader>
          <CardBody textAlign="left">
            {/* Divider before expertise section */}
            <Divider mb={4} />
            <Stack spacing={6}>
              {/* Expertise Items */}
              <Flex align="center">
                <Icon as={FaClipboardList} boxSize={6} color="teal.500" mr={4} />
                <Text fontSize="md">
                  Expertise en gestion d'organisations et accompagnement entrepreneurial.
                </Text>
              </Flex>

              <Flex align="center">
                <Icon as={FaBullhorn} boxSize={6} color="teal.500" mr={4} />
                <Text fontSize="md">
                  Formation et coaching dans le domaine de la microfinance.
                </Text>
              </Flex>

              <Flex align="center">
                <Icon as={FaChartBar} boxSize={6} color="teal.500" mr={4} />
                <Text fontSize="md">
                  Gestion des finances et développement des petites entreprises.
                </Text>
              </Flex>

              <Flex align="center">
                <Icon as={FaUsers} boxSize={6} color="teal.500" mr={4} />
                <Text fontSize="md">
                  Formatrice chez REHEMA HUB pour les jeunes entrepreneurs.
                </Text>
              </Flex>
            </Stack>
            {/* Divider after expertise section */}
            <Divider mt={4} />
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>


 <Box id="AboutUs" p={8} bg="grey" color="white">
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="white">
        Mon Parcours, Compétences et Langues
      </Heading>

      {/* 2x3 Grid Layout for Education, Skills, Languages, and Experience */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
      >
        {/* Education Card */}
        <Card bg="white" color="black" boxShadow="md" borderRadius="md">
          <CardBody display="flex" flexDirection="column" alignItems="flex-start">
            <Icon as={MdSchool} w={12} h={12} color="#0097b2" mb={4} aria-label="Education" />
            <Heading as="h3" size="md" mb={4}>
              Education
            </Heading>

            {/* Education Details */}
            <Box w="100%" p={4} mb={4} borderBottom="2px" borderColor="gray.300">
              <Grid templateColumns="1fr 2fr" gap={4}>
                <Text fontWeight="bold">
                  <strong>Oct 2016 - Oct 2018</strong>
                </Text>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    <strong> License en MicroFinance </strong>
                  </Text>
                  <Text fontWeight="bold"> Université Protestante du Congo UPC/ CCAM</Text>
                  <Text>
                   Un diplôme axé sur la gestion financière et les opérations commerciales, couvrant la finance d'entreprise, la comptabilité, la stratégie d'entreprise et la gestion organisationnelle. Il prépare les diplômés avec des compétences en analyse financière, gestion budgétaire et prise de décision pour des carrières dans les secteurs bancaires, du conseil et des entreprises.
                  </Text>
                </Box>
              </Grid>
            </Box>

             <Box w="100%" p={4} mb={4} borderBottom="2px" borderColor="gray.300">
              <Grid templateColumns="1fr 2fr" gap={4}>
                <Text fontWeight="bold">
                  <strong>Août 2014 - Sept 2014</strong>
                </Text>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    <strong>SyscOHADA</strong>
                  </Text>
                  <Text fontWeight="bold">Université Protestante du Congo UPC</Text>
                  <Text>
                    Un programme axé sur l'économie, la gestion et les pratiques administratives, offrant des connaissances en gestion des ressources, opérations commerciales et administration publique. Il prépare les diplômés avec des compétences analytiques et organisationnelles pour des rôles dans les secteurs public et privé.
                  </Text>
                </Box>
              </Grid>
            </Box>


            <Box w="100%" p={4} mb={4} borderBottom="2px" borderColor="gray.300">
              <Grid templateColumns="1fr 2fr" gap={4}>
                <Text fontWeight="bold">
                  <strong>Août 2013 - Déc 2016</strong>
                </Text>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    <strong>Graduant en Economie de Gestion et Admistration</strong>
                  </Text>
                  <Text fontWeight="bold">Université Protestante du Congo UPC</Text>
                  <Text>
                    Un programme axé sur l'économie, la gestion et les pratiques administratives, offrant des connaissances en gestion des ressources, opérations commerciales et administration publique. Il prépare les diplômés avec des compétences analytiques et organisationnelles pour des rôles dans les secteurs public et privé.
                  </Text>
                </Box>
              </Grid>
            </Box>



            <Box w="100%" p={4}>
              <Grid templateColumns="1fr 2fr" gap={4}>
                <Text fontWeight="bold">
                  <strong>Sep 2006 - Juin 2013</strong>
                </Text>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    <strong>Diplome d'Etat en  Commerciale Administrtive</strong>
                  </Text>
                  <Text fontWeight="bold">Institut UJIWO LA HERI</Text>
                  <Text>
                    Un diplôme axé sur la gestion commerciale et administrative, offrant des compétences dans la gestion des opérations commerciales, la relation client, la gestion de stocks et la comptabilité. Il prépare les diplômés à des rôles clés dans les départements commerciaux et administratifs des entreprises, leur permettant de gérer efficacement les processus commerciaux et les ressources organisationnelles.
                  </Text>
                </Box>
              </Grid>
            </Box>
          </CardBody>
        </Card>

        {/* Experience Card */}
        <Card bg="white" color="black" boxShadow="md" borderRadius="md">
          <CardBody display="flex" flexDirection="column" alignItems="flex-start">
            <Icon as={MdWork} w={12} h={12} color="yellow.500" mb={4} aria-label="Experience" />
            <Heading as="h3" size="md" mb={4}>
              Expérience Professionnelle
            </Heading>

            {/* Experience Details */}
            <Box w="100%" p={4} mb={4} borderBottom="2px" borderColor="gray.300">
              <Grid templateColumns="1fr 2fr" gap={4}>
                <Text fontWeight="bold">
                  <strong>Jan 2021 - Présent</strong>
                </Text>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    <strong>Directrice et Gerante </strong>
                  </Text>
                  <Text fontWeight="bold">Microtous</Text>
                  <Text>
                    En tant que Directrice et Gérante de Microtous, j'ai supervisé les opérations quotidiennes, dirigé une équipe dynamique et assuré la croissance de l'entreprise. Mon rôle consistait à élaborer et mettre en œuvre des stratégies efficaces, optimiser les processus et maintenir de solides relations avec les clients et partenaires. Grâce à mon leadership, j'ai contribué à la rentabilité et à l'innovation, tout en veillant à une gestion optimale des ressources humaines et financières.    </Text>
                </Box>
              </Grid>
            </Box>


        <Box w="100%" p={4} mb={4} borderBottom="2px" borderColor="gray.300">
              <Grid templateColumns="1fr 2fr" gap={4}>
                <Text fontWeight="bold">
                  <strong>Jan 2022 - Présent</strong>
                </Text>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    <strong>Formatrice</strong>
                  </Text>
                  <Text fontWeight="bold">Herema Hub</Text>
                  <Text>
                  En tant que Formatrice en Finance et Élaboration de Business Plan chez Herema Hub, j'ai formé des entrepreneurs sur les principes financiers essentiels et la création de business plans efficaces. J'ai accompagné les participants dans la gestion des budgets, l'analyse des flux de trésorerie et la mise en place de stratégies financières. Mon approche pratique visait à fournir des outils concrets pour réussir leur planification financière et stratégique.
     </Text>
                </Box>
              </Grid>
            </Box>  

            <Box w="100%" p={4} mb={4} borderBottom="2px" borderColor="gray.300">
              <Grid templateColumns="1fr 2fr" gap={4}>
                <Text fontWeight="bold">
                  <strong>Août 2020 - Présent</strong>
                </Text>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    <strong>Gerante</strong>
                  </Text>
                  <Text fontWeight="bold">Ets. VIP WATU PRO</Text>
                  <Text>
                   En tant que Gérante chez Ets. VIP WATU PRO, une entreprise spécialisée dans le branding et l'imprimerie, j'ai dirigé l'orientation stratégique de l'entreprise en définissant des objectifs clairs pour renforcer notre position sur le marché. J'ai supervisé la mise en œuvre de stratégies innovantes pour développer nos services, optimiser la satisfaction client et accroître la visibilité de la marque. Grâce à une gestion axée sur l'efficacité et l'innovation, j'ai assuré une croissance durable tout en adaptant l'entreprise aux tendances du marché.    </Text>
                </Box>
              </Grid>
            </Box>

            <Box w="100%" p={4}>
              <Grid templateColumns="1fr 2fr" gap={4}>
                <Text fontWeight="bold">
                  <strong>Jan 2017 - Présent</strong>
                </Text>
                <Box>
                  <Text fontWeight="bold" mb={1}>
                    <strong>Directrice Générale</strong>
                  </Text>
                  <Text fontWeight="bold"> JUDE ASBL</Text>
                  <Text>
                 En tant que Directrice Générale de JUDE ASBL, j'ai piloté la stratégie organisationnelle et veillé à la mise en œuvre de projets à fort impact social. Ma mission a été de diriger les équipes vers une gestion efficace des ressources, d’assurer la coordination des actions en faveur du développement communautaire et de garantir l'atteinte des objectifs à long terme de l'association. Grâce à une vision claire et à un leadership collaboratif, j'ai contribué à renforcer l'impact de l'ASBL tout en assurant une gestion transparente et responsable.  </Text>
                </Box>
              </Grid>
            </Box>
          </CardBody>
        </Card>

        {/* Skills Card */}
         <Card id="contactUs" bg="white" color="black" boxShadow="md" borderRadius="md">
      <CardBody display="flex" flexDirection="column" alignItems="flex-start">
        <Icon as={MdWork} w={12} h={12} color="green.500" mb={4} aria-label="Compétences" />
        <Heading as="h3" size="md" mb={4}>
          Connaissance
        </Heading>

        {/* Section Compétences Douces */}
        <Heading as="h4" size="sm" color="gray.700" mb={2}>
          Compétences Douces
        </Heading>
        <Text mb={2}>Communication</Text>
        <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
          <Box position="absolute" top="0" left="0" height="100%" width="80%" bg="blue.500" borderRadius="md" />
        </Box>
             <Text mb={2}>Leadership</Text>
        <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
          <Box position="absolute" top="0" left="0" height="100%" width="90%" bg="red.500" borderRadius="md" />
        </Box>
             <Text mb={2}>Travail en équipe</Text>
        <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
          <Box position="absolute" top="0" left="0" height="100%" width="87%" bg="yellow.500" borderRadius="md" />
        </Box>
             <Text mb={2}>Respect des délais</Text>
        <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
          <Box position="absolute" top="0" left="0" height="100%" width="99%" bg="purple.500" borderRadius="md" />
        </Box>
        <Divider mb={4} />
        {/* Section Compétences Techniques */}
        <Heading as="h4" size="sm" color="gray.700" mb={2}>
          Compétences Techniques
        </Heading>

        <Text mb={2}>GRETEL</Text>
        <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
          <Box position="absolute" top="0" left="0" height="100%" width="60%" bg="blue.500" borderRadius="md" />
        </Box>

        <Text mb={2}>EPIDATA</Text>
       <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
          <Box position="absolute" top="0" left="0" height="100%" width="60%" bg="yellow.300" borderRadius="md" />
        </Box>

        <Text mb={2}>SPSS</Text>
        <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
          <Box position="absolute" top="0" left="0" height="100%" width="50%" bg="green.500" borderRadius="md" />
        </Box>

        <Text mb={2}>Microsoft Office</Text>
        <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
          <Box position="absolute" top="0" left="0" height="100%" width="75%" bg="orange.500" borderRadius="md" />
        </Box>

        <Text mb={2}>Design</Text>
        <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300">
          <Box position="absolute" top="0" left="0" height="100%" width="65%" bg="pink.500" borderRadius="md" />
        </Box>
      </CardBody>
    </Card>

        {/* Languages Card */}
        <Card bg="white" color="black" boxShadow="md" borderRadius="md">
          <CardBody display="flex" flexDirection="column" alignItems="flex-start">
            <Icon as={MdLanguage} w={12} h={12} color="purple.500" mb={4} aria-label="Languages" />
            <Heading as="h3" size="md" mb={4}>
              Langues
            </Heading>

            {/* Language Level Bars */}
            <Text mb={2}>Français</Text>
            <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
              <Box position="absolute" top="0" left="0" height="100%" width="90%" bg="orange.500" borderRadius="md" />
            </Box>

          
            <Text mb={2}>Anglais</Text>
            <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
              <Box position="absolute" top="0" left="0" height="100%" width="45%" bg="green.500" borderRadius="md" />
            </Box>
           
            <Text mb={2}>Lingala</Text>
            <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
              <Box position="absolute" top="0" left="0" height="100%" width="90%" bg="purple.500" borderRadius="md" />
            </Box>

            <Text mb={2}>Swahili</Text>
            <Box position="relative" width="100%" height="8px" borderRadius="md" bg="gray.300" mb={4}>
              <Box position="absolute" top="0" left="0" height="100%" width="60%" bg="blue.500" borderRadius="md" />
            </Box>

    
          </CardBody>
        </Card>
      </Grid>
    </Box>
      </section>
 

      {/* cv Section*/}

    
    
{/* Services Section */}
    <section id="services">
       <Box p={8} bg="black" color="white" id="services">
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="white">
        Mes Services
      </Heading>
      {/* Responsive Grid for Services */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {/* Service 1: Consultance */}
        <Card bg="white" color="black" boxShadow="md" borderRadius="md">
          <CardBody display="flex" flexDirection="column" alignItems="center">
            <Icon as={MdBusiness} w={12} h={12} color="teal.500" mb={4} aria-label="Consultance" />
            <Heading as="h3" size="md" mb={4} textAlign="center">
              Consultance
            </Heading>
            <Text textAlign="left">
              J'offre des conseils stratégiques approfondis et personnalisés pour analyser et comprendre les spécificités de votre projet. Mon approche consiste à élaborer des stratégies sur mesure, adaptées à vos besoins uniques, afin d'optimiser vos ressources, résoudre les défis auxquels vous êtes confrontés et saisir les opportunités.
            </Text>
          </CardBody>
        </Card>

        {/* Service 2: Formation */}
        <Card bg="white" color="black" boxShadow="md" borderRadius="md">
          <CardBody display="flex" flexDirection="column" alignItems="center">
            <Icon as={MdSchool} w={12} h={12} color="purple.500" mb={4} aria-label="Formation" />
            <Heading as="h3" size="md" mb={4} textAlign="center">
              Formation
            </Heading>
            <Text textAlign="left">
              Je propose des formations spécialisées et adaptées à vos besoins spécifiques, visant à vous fournir les compétences nécessaires pour exceller dans votre domaine. Ces formations couvrent une large gamme de sujets, allant des compétences techniques aux compétences en gestion, et sont conçues pour vous offrir une compréhension approfondie des concepts clés. 
            </Text>
          </CardBody>
        </Card>

        {/* Service 3: Coaching */}
        <Card bg="white" color="black" boxShadow="md" borderRadius="md">
          <CardBody display="flex" flexDirection="column" alignItems="center">
            <Icon as={MdPeople} w={12} h={12} color="blue.500" mb={4} aria-label="Coaching" />
            <Heading as="h3" size="md" mb={4} textAlign="center">
              Coaching
            </Heading>
            <Text textAlign="left">
              J'accompagne individuellement chaque personne pour atteindre ses objectifs professionnels en offrant des conseils pratiques et des stratégies adaptées à ses besoins. Mon approche personnalisée vous aide à surmonter les défis et à progresser dans votre carrière, avec un plan d'action clair pour atteindre vos ambitions avec confiance et efficacité.
            </Text>
          </CardBody>
        </Card>

        {/* Service 4: Mentorant */}
        <Card bg="white" color="black" boxShadow="md" borderRadius="md">
          <CardBody display="flex" flexDirection="column" alignItems="center">
            <Icon as={MdSupervisedUserCircle} w={12} h={12} color="green.500" mb={4} aria-label="Mentorant" />
            <Heading as="h3" size="md" mb={4} textAlign="center">
              Mentorant
            </Heading>
            <Text textAlign="left">
             Je guide les entrepreneurs en leur offrant un mentorat personnalisé, conçu pour répondre à leurs besoins spécifiques. Grâce à des échanges réguliers et des conseils stratégiques, je les aide à surmonter les obstacles, à prendre des décisions éclairées et à développer leur entreprise de manière durable. Mon rôle est de les accompagner tout au long de leur parcours entrepreneurial, en les soutenant dans la mise en œuvre de leurs idées et la gestion des défis quotidiens.
            </Text>
          </CardBody>
        </Card>

        {/* Service 5: Élaboration de Business Plan */}
        <Card bg="white" color="black" boxShadow="md" borderRadius="md">
          <CardBody display="flex" flexDirection="column" alignItems="center">
            <Icon as={MdDescription} w={12} h={12} color="orange.500" mb={4} aria-label="Élaboration de Business Plan" />
            <Heading as="h3" size="md" mb={4} textAlign="center">
              Élaboration de Business Plan
            </Heading>
            <Text textAlign="left">
              J'élabore des plans d'affaires solides et bien structurés pour soutenir vos initiatives et assurer leur succès à long terme. Ces plans sont conçus pour offrir une vision claire de vos objectifs, définir les stratégies nécessaires pour les atteindre, et anticiper les défis à venir. En tenant compte de vos ressources, du marché cible et des tendances actuelles, je vous aide à créer un document stratégique qui servira de feuille de route pour la croissance et la rentabilité de votre entreprise.
            </Text>
          </CardBody>
        </Card>

        {/* Service 6: Inclusion Financière */}
        <Card bg="white" color="black" boxShadow="md" borderRadius="md">
          <CardBody display="flex" flexDirection="column" alignItems="center">
            <Icon as={MdAccountBalance} w={12} h={12} color="red.500" mb={4} aria-label="Inclusion Financière" />
            <Heading as="h3" size="md" mb={4} textAlign="center">
              Inclusion Financière
            </Heading>
            <Text textAlign="left">
              Je développe des solutions innovantes et accessibles pour améliorer l'accès aux services financiers, en particulier pour les populations sous-desservies. En tenant compte des besoins spécifiques de chaque individu ou entreprise, j'intègre des technologies adaptées et des approches inclusives pour faciliter l'accès à des produits financiers tels que les prêts, l'épargne, et l'assurance.
            </Text>
          </CardBody>
        </Card>

        {/* Service 7: Autonomiser les Femmes Entrepreneurs */}
        <Card bg="white" color="black" boxShadow="md" borderRadius="md">
          <CardBody display="flex" flexDirection="column" alignItems="center">
            <Icon as={MdWork} w={12} h={12} color="pink.500" mb={4} aria-label="Autonomiser les Femmes Entrepreneurs" />
            <Heading as="h3" size="md" mb={4} textAlign="center">
              Autonomiser les Femmes Entrepreneurs
            </Heading>
            <Text textAlign="left">
              J'encourage et soutiens activement les femmes entrepreneures en les accompagnant à chaque étape de leur parcours. Je les aide à surmonter les défis uniques auxquels elles sont confrontées dans le monde des affaires en leur fournissant des conseils stratégiques, des ressources financières et des opportunités de développement personnel. 
            </Text>
          </CardBody>
        </Card>
      </Grid>
    </Box>
      </section>        
    



      {/* Contact Section */}

  <section id="contact">
            <Box p={8} bg="white" textAlign="center" id="contactMe" >
  <Flex
    p={8}
    bg="gray.100"
    justifyContent="center"
    alignItems="center"
    flexDirection={{ base: 'column', md: 'row' }}
    minHeight="80vh"
  >
    {/* Contact Form */}
    <Box bg="white" borderRadius="md" boxShadow="lg" p={8} width={{ base: '100%', md: '50%' }}>
      <Heading as="h2" size="xl" mb={4}>
        Contactez-nous
      </Heading>
      <form>
        <FormControl id="full-name" mb={4} isRequired>
          <FormLabel>Nom complet</FormLabel>
          <Input type="text" placeholder="Entrez votre nom complet" />
        </FormControl>
        <FormControl id="email" mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Entrez votre email" />
        </FormControl>
        <FormControl id="message" mb={4} isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea placeholder="Écrivez votre message ici" />
        </FormControl>
        <Button
          bg="black"
              color="#c0cdd4"
              size="lg"
              _hover={{ bg: '#0097b2', color: 'white' }}
              mt={4}
        >
          Envoyer
        </Button>
      </form>
    </Box>

    {/* Contact Image */}

  </Flex>
    </Box>

      </section>
  

    </>
  );
};

export default HomePage;
