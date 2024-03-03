import { ApexOptions } from 'apexcharts';

export default function UserOption(): ApexOptions {
  return {
    chart: {
      fontFamily: 'ChalaOne, sans-serif',
      type: 'donut',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          enabled: true,
          speed: 2,
        },
        animateGradually: {
          delay: 2,
          enabled: true,
        },
      },
    },

    colors: ['#69b1ff', '#adc6ff', '#d3adf7', '#fffb8f'],
    labels: ['Desktop', 'Tablet', 'Mobile', 'Other'],
    legend: {
      show: false,
      position: 'bottom',
    },

    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
}
