import { Flex, Box, Heading, Text, Link, Image, Stack } from "@chakra-ui/react";
import logo from '../Components/Assetes/Nadine.png'; // Adjust the path based on your structure

const Footer1 = () => {
  return (
    <Flex
      as="footer"
      bg="gray.800"
      color="white"
      py={2} 
      px={{ base: 4, md: 8 }} 
      direction="column"
      justify="center"
      align="center"
      textAlign="center"
    >
      {/* Logo and Professional Bio Section */}
      <Box mb={6}> {/* Reduced margin bottom */}
        <Image src={logo} alt="Logo" boxSize="80px" mb={4} />
        <Heading as="h3" size="lg" mb={4}>
          Profil Professionnel
        </Heading>
        <Text fontSize="md" maxWidth="600px" mx="auto" mb={6}>
          Économiste, experte en microfinance, entrepreneure et consultante. Directrice générale de JUDE ASBL, fondatrice et gérante de MICROTOUS, et formatrice chez REHEMA HUB.
        </Text>
      </Box>

      {/* Roles and Expertise Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8} 
      >
        {/* Roles */}
        <Box mb={{ base: 6, md: 0 }} textAlign="left" px={{ base: 4, md: 6 }}> {/* Reduced padding */}
          <Heading as="h4" size="md" mb={3}>
            Mes Rôles
          </Heading>
          <Stack spacing={1} align="left">
            <Text>Directrice Générale de JUDE ASBL</Text>
            <Text>Fondatrice Directrice Gérante de MICROTOUS</Text>
            <Text>Consultante, Formatrice, Coach et Entrepreneur</Text>
            <Text>Formatrice chez REHEMA HUB</Text>
            <Text>Gérante chez Ets. VIP WATU PRO</Text>
          </Stack>
        </Box>

        {/* Social Media Section */}
        <Box mb={{ base: 6, md: 0 }} textAlign="left" px={{ base: 4, md: 6 }}> {/* Reduced padding */}
          <Heading as="h4" size="md" mb={3}>
            Suivez-moi
          </Heading>
          <Stack spacing={1} align="left">
            <Link href="https://www.linkedin.com" isExternal>
              LinkedIn
            </Link>
            <Link href="https://www.facebook.com" isExternal>
              Facebook
            </Link>
            <Link href="https://twitter.com" isExternal>
              Twitter
            </Link>
            <Link href="https://www.instagram.com" isExternal>
              Instagram
            </Link>
          </Stack>
        </Box>

        {/* Contact Section */}
        <Box textAlign="left" px={{ base: 4, md: 6 }}> {/* Reduced padding */}
          <Heading as="h4" size="md" mb={3}>
            Contact
          </Heading>
          <Text fontSize="md" mb={1}>
            Email: karunadine@gmail.com
          </Text>
          <Text fontSize="md" mb={1}>Téléphone: +243 820 937 002</Text>
          <Text fontSize="md">Basée à: Bunia Ituri, République Démocratique du Congo</Text>
        </Box>
      </Flex>

      {/* Footer Copyright */}
      <Box w="100%" mt={6}> {/* Reduced margin top */}
        <Text fontSize="sm" color="gray.400">
          &copy; {new Date().getFullYear()} Nadine Karungi Rugenyi. Tous droits réservés.
        </Text>
      </Box>
    </Flex>
  );
};

export default Footer1;
