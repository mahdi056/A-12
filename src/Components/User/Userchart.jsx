import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Authprovider/Authprovider";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserChart = () => {
    const { user } = useContext(AuthContext);
    const [appliedScholarships, setAppliedScholarships] = useState([]);
    const [reviews, setReviews] = useState([]);
    const userEmail = user?.email;

    useEffect(() => {
        if (userEmail) {
            // Fetch applied scholarships
            axios
                .get(`https://a-12-server-side-gold.vercel.app/apply-scholarship-by-email?email=${userEmail}`)
                .then((res) => setAppliedScholarships(res.data))
                .catch((err) => console.error(err));

            // Fetch reviews
            axios
                .get(`https://a-12-server-side-gold.vercel.app/reviews-by-email?email=${userEmail}`)
                .then((res) => setReviews(res.data))
                .catch((err) => console.error(err));
        }
    }, [userEmail]);

    // Chart Data
    const chartData = {
        labels: ['Applied Scholarships', 'Reviews'],
        datasets: [
            {
                label: 'Counts',
                data: [appliedScholarships.length, reviews.length], // Counts of applied scholarships and reviews
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Applied Scholarships and Reviews',
            },
        },
    };

    return (
        <div className="my-8">
            <h3 className="text-center text-xl font-semibold">Scholarships and Reviews Count</h3>
            <div className="mt-6">
                <Chart type="bar" data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default UserChart;
