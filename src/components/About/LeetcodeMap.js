import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Row } from 'react-bootstrap';
import './LeetcodeMap.css'; // Import the CSS file

function LeetcodeMap() {
    const [calendarData, setCalendarData] = useState([]);

    useEffect(() => {
        async function fetchCalendarData() {
            try {
                const response = await axios.get('https://techno-leetcode-api.vercel.app/technoayan/calendar');
                const parsedData = JSON.parse(response.data.submissionCalendar);
                const formattedData = Object.entries(parsedData).map(([timestamp, count]) => ({
                    date: new Date(parseInt(timestamp) * 1000),
                    count: count,
                }));
                console.log("Formatted Data:", formattedData);
                setCalendarData(formattedData);
            } catch (error) {
                console.error('Error fetching calendar data:', error);
            }
        }

        fetchCalendarData();
    }, []);

    return (
        <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
            <h1 className="project-heading" style={{ paddingBottom: '20px' }}>
                Days I <strong className="purple">Code</strong> LeetCode
            </h1>
            <div style={{ maxWidth: '1050px', width: '100%', overflowX: 'auto', paddingBottom: '20px' }}>
                <ReactCalendarHeatmap
                    startDate={new Date('2023-12-31')}
                    endDate={new Date('2024-11-31')}
                    values={calendarData}
                    classForValue={(value) => {
                        if (!value) {
                            return 'color-empty';
                        }
                        if (value.count >= 10) {
                            return 'color-scale-red';
                        }
                        if (value.count >= 5) {
                            return 'color-scale-yellow';
                        }
                        return 'color-scale-green';
                    }}
                />
            </div>
        </Row>
    );
}

export default LeetcodeMap;
