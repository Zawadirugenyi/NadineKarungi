import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomDetail from './RoomDetail';

const RoomDetailPage = () => {
  const { roomId } = useParams(); // Assuming you use React Router for routing
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/rooms/${roomId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch room');
        }
        const roomData = await response.json();
        setRoom(roomData);
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    fetchRoom();
  }, [roomId]);

  return (
    <div>
      {room ? (
        <RoomDetail room={room} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RoomDetailPage;
