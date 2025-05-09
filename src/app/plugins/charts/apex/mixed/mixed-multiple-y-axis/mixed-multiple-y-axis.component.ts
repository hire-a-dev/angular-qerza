import { Component } from '@angular/core';
import { BarChartApexComponent } from '../../../../../elements/chart-config/bar-chart-apex/bar-chart-apex.component';

@Component({
  selector: 'app-mixed-multiple-y-axis',
  standalone: true,
  imports: [BarChartApexComponent],
  templateUrl: './mixed-multiple-y-axis.component.html',
  styleUrl: './mixed-multiple-y-axis.component.css'
})
export class MixedMultipleYAxisComponent {

  chartOptions = {
    series: [
      {
        name: "Income",
        type: "column",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
      },
      {
        name: "Cashflow",
        type: "column",
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
      },
      {
        name: "Revenue",
        type: "line",
        data: [20, 29, 37, 36, 44, 45, 50, 58]
      }
    ],
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: ['var(--primary)', '#787878', '#00e396'],

    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [1, 1, 4]
    },
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#008FFB"
        },
        labels: {
          style: {
            colors: [] = "#008FFB"
          }
        },
        title: {
          text: "Income (thousand crores)",
          style: {
            color: "#008FFB"
          }
        },
        tooltip: {
          enabled: true
        }
      },
      {
        seriesName: "Income",
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#00E396"
        },
        labels: {
          style: {
            colors: "#00E396"
          }
        },
        title: {
          text: "Operating Cashflow (thousand crores)",
          style: {
            color: "#00E396"
          }
        }
      },
      {
        seriesName: "Revenue",
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#FEB019"
        },
        labels: {
          style: {
            colors: "#FEB019"
          }
        },
        title: {
          text: "Revenue (thousand crores)",
          style: {
            color: "#FEB019"
          }
        }
      }
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60
      }
    },
    legend: {
      show: false,
      horizontalAlign: "left",
      offsetX: 40
    }
  };
}