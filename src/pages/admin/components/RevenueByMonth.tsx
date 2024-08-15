import React from "react";
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

type Order = {
  _id: string;
  createdAt: string;
  totalPrice: number;
};

type RevenueByMonthProps = {
  orders: Order[];
};

const RevenueByMonth: React.FC<RevenueByMonthProps> = ({ orders }) => {
  // Generate all months for the current year
  const currentYear = new Date().getFullYear();
  const allMonths = Array.from({ length: 12 }, (_, i) =>
    new Date(currentYear, i).toLocaleString("default", {
      month: "long",
      year: "numeric",
    })
  );

  // Process orders data to calculate revenue by month
  const revenueByMonth = orders.reduce(
    (acc, order) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += order.totalPrice;
      return acc;
    },
    {} as Record<string, number>
  );

  // Ensure all months are included in the labels
  const labels = allMonths;
  const data = labels.map((month) => revenueByMonth[month] || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue by Month",
        data,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Revenue",
      },
    },
  };

  return (
    <div className="w-1/2 p-4 bg-white rounded-lg shadow-lg ">
      <h2 className="mb-4 text-2xl font-bold">Revenue by Month </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueByMonth;
