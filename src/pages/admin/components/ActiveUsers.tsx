import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ActiveUsersProps = {
  isLoggedIn: boolean;
};

const ActiveUsers = ({ isLoggedIn }: ActiveUsersProps) => {
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    // Update active users count based on isLoggedIn property
    setActiveUsers((prevActiveUsers) =>
      isLoggedIn ? prevActiveUsers + 1 : Math.max(prevActiveUsers - 1, 0)
    );
  }, [isLoggedIn]);

  const activeUsersData = {
    labels: ["Active Users"],
    datasets: [
      {
        label: "Active Users",
        data: [activeUsers],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="w-full">
        <h2>Active Users {activeUsers}</h2>
        <Bar data={activeUsersData} />
      </div>
    </div>
  );
};

export default ActiveUsers;
