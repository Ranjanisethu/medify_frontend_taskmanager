import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = ({ tasks }) => {
    const counts = {
        Todo: 0,
        'In Progress': 0,
        Completed: 0,
    };

    tasks.forEach((task) => {
        if (counts[task.status] !== undefined) {
            counts[task.status]++;
        }
    });

    const data = {
        labels: ['Todo', 'In Progress', 'Completed'],
        datasets: [
            {
                data: [counts.Todo, counts['In Progress'], counts.Completed],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#374151', // Gray-700
                }
            },
        },
    };

    return <div className="w-full max-w-xs mx-auto"><Doughnut data={data} options={options} /></div>;
};

export default TaskChart;
