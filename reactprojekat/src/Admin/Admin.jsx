import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { FaUser, FaCar, FaCalendarAlt } from 'react-icons/fa';
import './Admin.css';
const Admin = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://127.0.0.1:8000/api/stats', config);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  const reservationsPerAutoChart = stats ? {
    labels: stats.reservations_per_auto.map(item => `Auto ID: ${item.automobil_id}`),
    datasets: [{
      label: 'Total Reservations',
      data: stats.reservations_per_auto.map(item => item.total),
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }]
  } : {};

  const reservationsPerMonthChart = stats ? {
    labels: stats.reservations_per_month.map(item => `${item.month}/${item.year}`),
    datasets: [{
      label: 'Total Reservations',
      data: stats.reservations_per_month.map(item => item.total),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  } : {};

  return (
    <div className="admin-container">
      <h2>Admin Statistics</h2>
      {stats ? (
        <div >
          <div className="stat-item">
            <FaUser /> <span>Total Users: {stats.total_users}</span>
          </div>
          <div className="stat-item">
            <FaCar /> <span>Total Autos: {stats.total_autos}</span>
          </div>
          <div className="stat-item">
            <FaCalendarAlt /> <span>Total Reservations: {stats.total_reservations}</span>
          </div>
          <div className="chart-container">
            <h3>Reservations per cuto:</h3>
            <Bar data={reservationsPerAutoChart} />
            <h3>Reservations per month:</h3>
            <Line data={reservationsPerMonthChart} />
          </div>
        </div>
      ) : (
        <p>Loading statistics...</p>
      )}
    </div>
  );
};

export default Admin;
