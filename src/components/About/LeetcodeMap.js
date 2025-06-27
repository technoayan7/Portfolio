import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Row, Col, Container } from 'react-bootstrap';
import './LeetcodeMap.css';

// Reuse cache
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

function LeetcodeMap() {
    const [state, setState] = useState({
        calendarData: [],
        loading: true,
        error: null,
        totalSubmissions: 0,
        currentStreak: 0,
        longestStreak: 0,
        activeDays: 0
    });

    const fetchCalendarData = useCallback(async () => {
        try {
            const cacheKey = 'leetcode-calendar';
            const cached = apiCache.get(cacheKey);

            if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
                const stats = calculateStats(cached.data);
                setState({
                    calendarData: cached.data,
                    loading: false,
                    error: null,
                    ...stats
                });
                return;
            }

            const response = await axios.get('https://techno-leetcode-api.vercel.app/technoayan/calendar');
            const parsedData = JSON.parse(response.data.submissionCalendar);
            const formattedData = Object.entries(parsedData).map(([timestamp, count]) => ({
                date: new Date(parseInt(timestamp) * 1000),
                count: count,
            }));

            apiCache.set(cacheKey, { data: formattedData, timestamp: Date.now() });
            const stats = calculateStats(formattedData);

            setState({
                calendarData: formattedData,
                loading: false,
                error: null,
                ...stats
            });
        } catch (error) {
            console.error('Error fetching calendar data:', error);
            setState({
                calendarData: [],
                loading: false,
                error: error.message,
                totalSubmissions: 0,
                currentStreak: 0,
                longestStreak: 0,
                activeDays: 0
            });
        }
    }, []);

    const calculateStats = useCallback((data) => {
        if (!data || data.length === 0) {
            return { totalSubmissions: 0, currentStreak: 0, longestStreak: 0, activeDays: 0 };
        }

        const totalSubmissions = data.reduce((sum, day) => sum + day.count, 0);
        const activeDays = data.filter(day => day.count > 0).length;

        // Calculate streaks
        const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = sortedData.length - 1; i >= 0; i--) {
            const dayDate = new Date(sortedData[i].date);
            dayDate.setHours(0, 0, 0, 0);

            if (sortedData[i].count > 0) {
                tempStreak++;
                if (dayDate.getTime() === today.getTime() ||
                    dayDate.getTime() === today.getTime() - 24 * 60 * 60 * 1000) {
                    currentStreak = tempStreak;
                }
            } else {
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 0;
            }
        }
        longestStreak = Math.max(longestStreak, tempStreak);

        return { totalSubmissions, currentStreak, longestStreak, activeDays };
    }, []);

    useEffect(() => {
        fetchCalendarData();
    }, [fetchCalendarData]);

    const classForValue = useCallback((value) => {
        if (!value || value.count === 0) {
            return 'color-empty';
        }
        if (value.count >= 10) {
            return 'color-scale-4';
        }
        if (value.count >= 7) {
            return 'color-scale-3';
        }
        if (value.count >= 4) {
            return 'color-scale-2';
        }
        return 'color-scale-1';
    }, []);

    const dateRange = useMemo(() => ({
        startDate: new Date('2024-06-01'),
        endDate: new Date('2025-7-31')
    }), []);

    const getTooltipDataAttrs = useCallback((value) => {
        if (!value || !value.date) {
            return {};
        }

        const dateStr = value.date.toLocaleDateString();
        const count = value.count || 0;
        const tooltip = count === 0
            ? `No submissions on ${dateStr}`
            : `${count} submission${count > 1 ? 's' : ''} on ${dateStr}`;

        return {
            'data-tip': tooltip,
            'data-for': 'calendar-tooltip'
        };
    }, []);

    if (state.loading) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} className="text-center">
                        <div className="leetcode-map-loading">
                            <div className="loading-grid">
                                {[...Array(91)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="loading-cell"
                                        style={{ animationDelay: `${i * 0.01}s` }}
                                    ></div>
                                ))}
                            </div>
                            <p className="loading-text">Loading coding activity...</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (state.error) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} className="text-center">
                        <div className="leetcode-map-error">
                            <div className="error-icon">⚠️</div>
                            <p>Error loading activity: {state.error}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container>
            <Row className="justify-content-center leetcode-map-container">
                <Col xs={12}>
                    <div className="leetcode-map-header">
                        <h1 className="project-heading map-title">
                            Days I <strong className="purple">Code</strong> LeetCode
                        </h1>
                        <p className="map-subtitle">
                            Tracking my journey through algorithmic challenges
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    <Row className="stats-overview">
                        <Col xs={6} md={3} className="stat-card-container">
                            <div className="stat-card">
                                <div className="stat-number">{state.totalSubmissions}</div>
                                <div className="stat-label">Total Submissions</div>
                                <div className="stat-icon">📊</div>
                            </div>
                        </Col>
                        <Col xs={6} md={3} className="stat-card-container">
                            <div className="stat-card">
                                <div className="stat-number">{state.activeDays}</div>
                                <div className="stat-label">Active Days</div>
                                <div className="stat-icon">📅</div>
                            </div>
                        </Col>
                        <Col xs={6} md={3} className="stat-card-container">
                            <div className="stat-card">
                                <div className="stat-number">{state.currentStreak}</div>
                                <div className="stat-label">Current Streak</div>
                                <div className="stat-icon">🔥</div>
                            </div>
                        </Col>
                        <Col xs={6} md={3} className="stat-card-container">
                            <div className="stat-card">
                                <div className="stat-number">{state.longestStreak}</div>
                                <div className="stat-label">Longest Streak</div>
                                <div className="stat-icon">🏆</div>
                            </div>
                        </Col>
                    </Row>

                    {/* Calendar Heatmap */}
                    <div className="calendar-container">
                        <div className="calendar-wrapper">
                            <ReactCalendarHeatmap
                                startDate={dateRange.startDate}
                                endDate={dateRange.endDate}
                                values={state.calendarData}
                                classForValue={classForValue}
                                tooltipDataAttrs={getTooltipDataAttrs}
                                showWeekdayLabels={true}
                                onClick={(value) => {
                                    if (value && value.count > 0) {
                                        console.log(`Clicked on ${value.date.toLocaleDateString()} with ${value.count} submissions`);
                                    }
                                }}
                            />
                        </div>

                        {/* Legend */}
                    </div>

                    {/* Motivational Message */}
                    <div className="motivation-card">
                        <div className="motivation-content">
                            <h3>Keep coding, keep growing! 🚀</h3>
                            <p>Every problem solved is a step towards mastery.</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default React.memo(LeetcodeMap);
