// hooks/useFetchDashboardData.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const useFetchDashboardData = (tenantName, roomNumber) => {
  const [tenant, setTenant] = useState(null);
  const [room, setRoom] = useState(null);
  const [hostel, setHostel] = useState(null);
  const [booking, setBooking] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          'Authorization': `Token ${token}`,
        };

        // Fetch tenants
        const tenantResponse = await axios.get('http://127.0.0.1:8000/api/tenants/', { headers });
        const tenants = tenantResponse.data;
        const loggedInTenant = tenants.find(t => t.name === tenantName);
        setTenant(loggedInTenant);

        // Fetch rooms
        const roomResponse = await axios.get('http://127.0.0.1:8000/api/rooms/', { headers });
        const room = roomResponse.data.find(r => r.number === roomNumber);
        setRoom(room);

        // Fetch hostels if room exists
        if (room) {
          const hostelResponse = await axios.get('http://127.0.0.1:8000/api/hostels/', { headers });
          const hostel = hostelResponse.data.find(h => h.id === room.hostel);
          setHostel(hostel);
        }

        // Fetch bookings if tenant exists
        if (loggedInTenant) {
          const bookingResponse = await axios.get('http://127.0.0.1:8000/api/bookings/', { headers });
          const booking = bookingResponse.data.find(b => b.tenant === loggedInTenant.id);
          setBooking(booking);
        }

        // Fetch notifications
        const notificationsResponse = await axios.get('http://127.0.0.1:8000/api/notifications/', { headers });
        const notifications = notificationsResponse.data;

        // Filter notifications based on the logged-in tenant's name
        const filteredNotifications = notifications.filter(notification => notification.tenant_name === loggedInTenant.name);

        // Separate notifications into read and unread
        const unreadNotifications = filteredNotifications.filter(notification => !notification.read);
        const readNotifications = filteredNotifications.filter(notification => notification.read);

        // Sort notifications by date
        const sortedNotifications = [...unreadNotifications, ...readNotifications].sort((a, b) => new Date(b.date) - new Date(a.date));

        setNotifications(sortedNotifications);

        // Notify user of new notifications
        if (unreadNotifications.length > 0) {
          toast({
            title: 'You have new notifications!',
            description: `You have ${unreadNotifications.length} new notifications.`,
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error fetching data.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tenantName, roomNumber, toast]);

  return { tenant, room, hostel, booking, notifications, loading };
};

export default useFetchDashboardData;
