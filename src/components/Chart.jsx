import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import Papa from 'papaparse';

const TemperatureChart = () => {
    const [data, setData] = useState([]);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&start_date=2023-02-01&end_date=2023-02-28&format=csv'
            );
            const csvData = await response.text();
            // console.log(csvData)
            const parsedData = Papa.parse(csvData, { header: true }).data;
            const slicedArray = parsedData.slice(3, -1);

            setData(slicedArray);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            if (chart) {
                chart.destroy();
            }
            // const labels = ['time', 'temp']
            const dates = data.map((item) => {
                return new Date(item.latitude);
            });

            const formattedDates = dates.map((date) => {
                const options = {
                    day: 'numeric',
                    month: 'short',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                const day = new Intl.DateTimeFormat('en-US', options).format(date);
                // if (day.includes("12:00 PM")) {
                //     console.log(day)
                //     return day.split(",")[1]
                // }
                // else if (day.includes("12:00 AM")) {
                //     return day.split(",")[0]
                // }
                // else {
                //     return ""
                // }
                return `${day}`
            });



            const temperatures = data.map((item) => {
                // console.log(item);
                return item.longitude !== undefined ? item.longitude : null;
            });
            const time = data.map((item) => {
                // console.log(item);
                return item.latitude !== undefined ? item.latitude : null;
            });
            console.log(time);
            const ctx = document.getElementById('temperature-chart');
            setChart(
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: formattedDates,
                        datasets: [{
                            label: 'Temperature',
                            data: temperatures,
                            borderColor: 'blue',
                            fill: false,
                            pointRadius: 0,
                            hoverRadius: 4
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    displayFormats: {
                                        day: 'DD.MMMM'
                                    }
                                },
                                ticks: {
                                    maxRotation: 0,
                                    autoSkipPadding: 30
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Temperature (°C)'
                                }
                            }]
                        },
                        elements: {
                            line: {
                                tension: 0,
                                radius: 0,
                                borderWidth: 2,
                                borderColor: 'blue',
                                hoverBorderWidth: 3,
                                hoverBorderColor: 'black',
                            }
                        },
                        legend: {
                            display: false
                        }
                    }


                })
            );
        }
    }, [data]);

    return <canvas id="temperature-chart" />;
};

export default TemperatureChart;
