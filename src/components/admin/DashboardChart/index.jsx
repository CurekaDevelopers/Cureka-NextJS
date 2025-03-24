import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = (Bdata) => {
  const { barData } = Bdata;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };
  const labels = barData && barData.map((item) => item.month);
  const totalSalesData =
    barData && barData.map((item) => parseFloat(item.sales));
  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: totalSalesData,
        backgroundColor: "rgb(53, 162, 235)",
      },
      // {
      //   label: 'Profit',
      //   data: [300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410],
      //   backgroundColor: 'rgb(255, 99, 132)',
      // },
    ],
  };

  return (
    <div className="container">
      <Bar options={options} data={data} />
    </div>
  );
};
export default DashboardChart;
