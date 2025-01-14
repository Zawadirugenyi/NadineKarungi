import React from 'react';
import { Card, CardBody, Image, Heading, Text } from '@chakra-ui/react';

function PromotionCard({ title, description, image }) {
  return (
    <Card borderRadius="md" boxShadow="sm" overflow="hidden" bg="white">
      <CardBody>
        {/* Conditionally render the image if URL is provided */}
        {image && (
          <Image
            src={image}
            alt={title}
            borderRadius="md"
            mb={4}
            objectFit="cover"
            width="100%"
            height={{ base: "200px", md: "250px" }} // Adjust height for responsive design
            fallbackSrc="https://via.placeholder.com/150" // Use a fallback image in case of broken URL or loading failure
          />
        )}

        {/* Title */}
        <Heading as="h3" size="md" mb={2} textAlign="center">
          {title}
        </Heading>

        {/* Description */}
        <Text fontSize="sm" color="gray.600" mb={4}>
          {description}
        </Text>
      </CardBody>
    </Card>
  );
}

export default PromotionCard;
