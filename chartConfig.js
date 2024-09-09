// chartConfig.js
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    ArcElement,
    PointElement,
    CategoryScale,
    LinearScale,
    TimeScale,

    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

// Register all necessary components globally
ChartJS.register(
    LineElement,  // For line charts
    BarElement,   // For bar charts
    ArcElement,   // For pie/doughnut charts
    PointElement, // For point elements in line charts
    CategoryScale, // For X-axis (categories)
    LinearScale,  // For Y-axis (linear values)
    TimeScale,    // For time-based charts (optional)
    Filler,       // For area filling in line charts
    Tooltip,      // Tooltip for hover info
    Legend        // Legend for displaying datasets info
);

