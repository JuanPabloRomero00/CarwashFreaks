import React, { useEffect, useState } from 'react';
import DataVisualizer from '../components/DataVisualizer';
import Header from '../components/Header';
import { fetchData } from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div>
      <Header />
      <main>
        <DataVisualizer data={data} />
      </main>
    </div>
  );
};

export default Dashboard;
