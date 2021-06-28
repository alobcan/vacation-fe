import React from 'react';
import { Bar } from 'react-chartjs-2';

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 80,
  },
  Normal: {
    min: 81,
    max: 150,
  },
  Expensive: {
    min: 150,
    max: 1000,
  },
};

// const labels = ['Cheap', 'Normal', 'Expensive'];

const bookingChart = (props) => {
  const chartData = { labels: ['test'], datasets: [] };
  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookings = props.bookings.reduce((prev, current) => {
      if (
        current.event.price < BOOKINGS_BUCKETS[bucket].max &&
        current.event.price > BOOKINGS_BUCKETS[bucket].min
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    chartData.datasets.push({
      label: bucket,
      data: [filteredBookings],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgb(255, 99, 132)'],
      borderWidth: 1,
    });
  }

  return <Bar data={chartData} />;
};

export default bookingChart;
