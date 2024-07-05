import { useState, useEffect } from 'react';
import axios from 'axios';

const useMaintenanceTasks = () => {
  const [maintenanceTasks, setMaintenanceTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/maintenance/');
        setMaintenanceTasks(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMaintenanceTasks();
  }, []);

  const addMaintenanceTask = async (newTask) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/maintenance/', newTask);
      setMaintenanceTasks([...maintenanceTasks, response.data]);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const updateMaintenanceTask = async (taskId, updatedTask) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://127.0.0.1:8000/maintenance/${taskId}/`, updatedTask);
      const updatedTasks = maintenanceTasks.map(task => {
        if (task.id === taskId) {
          return response.data;
        }
        return task;
      });
      setMaintenanceTasks(updatedTasks);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteMaintenanceTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/maintenance/${taskId}/`);
      const updatedTasks = maintenanceTasks.filter(task => task.id !== taskId);
      setMaintenanceTasks(updatedTasks);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {
    maintenanceTasks,
    loading,
    error,
    addMaintenanceTask,
    updateMaintenanceTask,
    deleteMaintenanceTask,
  };
};

export default useMaintenanceTasks;
