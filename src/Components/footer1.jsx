import { Flex, Box, Heading, Text, Link, Image } from "@chakra-ui/react";
import logo from '../Components/Assetes/microtous-removebg-preview.png'; // Adjust the path based on your structure

const Footer1 = () => {
  return (
    <Flex 
      as="footer" 
      bg="black" 
      color="white" 
      py={12} 
      px={{ base: 4, md: 15 }} 
      justifyContent="space-between" 
      flexWrap="wrap"
    >
      {/* Logo and Description */}
      <Box 
        flex="1" 
        minW={{ base: "100%", md: "350px" }} 
        mb={6} 
        textAlign="left"  // Ensuring text aligns to the left
        px={{ base: 4, md: 8 }} 
      >
        <Heading as="h3" size="lg" mb={4}>
          <Flex align="center" justify="left">
            <Image src={logo} alt="Logo de la société" boxSize="60px" mr={3} />
            CoopecMicrotous
          </Flex>
        </Heading>
        <Text fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.8" align="left" px={{ base: 4, md: 8 }}>
          Nous offrons des services exceptionnels de gestion de logements. Notre système simplifie vos opérations et garantit une expérience utilisateur fluide.
        </Text>
      </Box>

      {/* Links */}
      <Box 
        flex="1" 
        minW={{ base: "100%", md: "250px" }} 
        mb={6} 
        textAlign="left"  // Ensuring text aligns to the left
        px={{ base: 4, md: 8 }}
      >
        <Heading as="h4" size="md" mb={4}>
          Liens
        </Heading>
        <Flex direction="column" align="left">
          <Link href="#" mb={2}>Accueil</Link>
          <Link href="#" mb={2}>À propos</Link>
          <Link href="#" mb={2}>Services</Link>
          <Link href="#" mb={2}>Contact</Link>
          <Link href="#" mb={2}>Autres</Link>
        </Flex>
      </Box>

      {/* Products */}
      <Box 
        flex="1" 
        minW={{ base: "100%", md: "200px" }} 
        mb={6} 
        textAlign="left"  // Ensuring text aligns to the left
        px={{ base: 4, md: 8 }}
      >
        <Heading as="h4" size="md" mb={4}>
          Produits
        </Heading>
        <Flex direction="column" align="left">
          <Link href="#" mb={2}>Epargne</Link>
          <Link href="#" mb={2}>Crédit</Link>
          <Link href="#" mb={2}>Assurance Santé</Link>
        </Flex>
      </Box>

      {/* Contact and Timetable */}
      <Box 
        flex="1" 
        minW={{ base: "100%", md: "450px" }} 
        mb={6} 
        textAlign="left"  // Ensuring text aligns to the left on smaller screens
        px={{ base: 4, md: 8 }}
      >
        <Heading as="h4" size="md" mb={4}>
          Contactez-nous et Horaire
        </Heading>
        <Text fontSize="md" mb={2}>
          018 Avenue de l'Église, Quartier Ngezi, Commune Mbunya, Bunia, Ituri, RDC
        </Text>
        <Text fontSize="md" mb={2}>Email : coopecmicrotous@gmail.com</Text>
        <Text fontSize="md" mb={2}>Téléphone : +243 820 937 002</Text>
        <Text fontSize="md" mb={2}>Lundi au Vendredi : 08h00 - 17h00</Text>
        <Text fontSize="md">Samedi : 08h00 - 12h00</Text>
      </Box>
    </Flex>
  );
};

export default Footer1;
