import { useEffect } from 'react';
import Header from '../components/header';

function Dashboard() {
  useEffect(() => {
    document.title = 'Notes';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <h1 className="text-center">Dashboard</h1>
    </div>
  );
}

export default Dashboard;
