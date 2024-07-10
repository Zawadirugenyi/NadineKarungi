import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@chakra-ui/react';
import RoomDetail from '../Components/room_detail_card';
import HostelCard from '../Components/hostel_card'; // Assuming you have a HostelCard component

const RoomDetails = () => {
  const { roomId } = useParams();
  const [roomDescription, setRoomDescription] = useState(null);

  useEffect(() => {
    const fetchRoomDescription = async () => {
      try {
        const token = 'b17ecd1e7ab8b13a1c98c81fefad7c8839252b63'; 
       
        const response = await fetch(`http://127.0.0.1:8000/api/room-descriptions/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch room description');
        }
        const data = await response.json();
        setRoomDescription(data);
      } catch (error) {
        console.error('Error fetching room description:', error);
      }
    };

    if (roomId) {
      fetchRoomDescription();
    }
  }, [roomId]);

  return (
    <div>
      {roomDescription ? (
        <RoomDetail roomDescription={roomDescription} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RoomDetails;
