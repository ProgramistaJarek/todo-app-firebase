import { useEffect } from 'react';
import Header from '../components/header';

function Dashboard() {
  useEffect(() => {
    document.title = 'Notes';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      Dashboard
    </div>
  );
}

export default Dashboard;
