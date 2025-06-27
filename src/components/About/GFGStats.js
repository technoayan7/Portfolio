import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "@fontsource/rubik/400.css";

// Reuse cache from LeetCodeStats
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

const fetchWithCache = async (url, cacheKey) => {
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    const response = await fetch(url);
    const data = await response.json();
    apiCache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
};

function GFGProfile() {
    const [state, setState] = useState({
        profileData: null,
        loading: true,
        error: null
    });

    const fetchData = useCallback(async () => {
        try {
            const data = await fetchWithCache("https://techno-gfg-api.vercel.app/technoayan7", "gfg-profile");
            setState({
                profileData: data,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setState({
                profileData: null,
                loading: false,
                error: error.message
            });
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const statsData = useMemo(() => {
        if (!state.profileData) return null;

        const { info, solvedStats } = state.profileData;
        const easyCount = solvedStats.basic.count + solvedStats.easy.count;
        const mediumCount = solvedStats.medium.count;
        const hardCount = solvedStats.hard.count;

        return {
            info,
            categories: [
                { title: "Easy", count: easyCount, pathColor: "#1cbaba", trailColor: "#264545" },
                { title: "Medium", count: mediumCount, pathColor: "#ffb700", trailColor: "#534520" },
                { title: "Hard", count: hardCount, pathColor: "#f63737", trailColor: "#512b2b" }
            ]
        };
    }, [state.profileData]);

    if (state.loading) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4} className="text-center">
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p style={{ color: "white", marginTop: "10px" }}>Loading GFG Stats...</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (state.error || !statsData) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4} className="text-center">
                        <div className="error-card">
                            <p style={{ color: "#ff6b6b" }}>
                                {state.error || "Failed to load profile data."}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    const { info, categories } = statsData;

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12}>
                    <div className="stats-card gfg-card">
                        <div className="card-header">
                            <div className="platform-logo gfg-logo">
                                <span>GFG</span>
                            </div>
                            <h4 className="platform-title">GeeksforGeeks</h4>
                        </div>

                        <Row className="align-items-center mb-4">
                            <Col xs={12} md={6} className="text-center profile-section">
                                <div className="avatar-container">
                                    <img
                                        src={info.profilePicture}
                                        alt="Profile Avatar"
                                        className="profile-avatar"
                                        loading="lazy"
                                    />
                                    <div className="avatar-ring gfg-ring"></div>
                                </div>
                                <h5 className="username">{info.userName}</h5>
                                <div className="rank-badge gfg-badge">
                                    <span className="rank-icon">🎓</span>
                                    <span>Institute Rank: {info.instituteRank}</span>
                                </div>
                            </Col>
                            <Col xs={12} md={6} className="text-center progress-section">
                                <h5 className="section-title">Total Solved</h5>
                                <div className="main-progress-container">
                                    <CircularProgressbar
                                        value={Math.min(info.totalProblemsSolved, 100)}
                                        text={`${info.totalProblemsSolved}`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#2f8d46",
                                            trailColor: "#303030",
                                            textSize: "14px",
                                            pathTransitionDuration: 2,
                                        })}
                                    />
                                </div>
                                <p className="progress-stats">Problems Solved</p>
                            </Col>
                        </Row>

                        <div className="difficulty-section">
                            <h5 className="section-title">Problem Categories</h5>
                            <Row className="difficulty-stats">
                                {categories.map(({ title, count, pathColor, trailColor }, index) => (
                                    <Col key={title} xs={4} className="text-center difficulty-item">
                                        <div className="difficulty-header">
                                            <span className="difficulty-icon">
                                                {title === "Easy" ? "🟢" : title === "Medium" ? "🟡" : "🔴"}
                                            </span>
                                            <h6 className="difficulty-title">{title}</h6>
                                        </div>
                                        <div className="difficulty-progress" style={{ animationDelay: `${index * 0.2}s` }}>
                                            <CircularProgressbar
                                                value={Math.min(count, 100)}
                                                text={`${count}`}
                                                styles={buildStyles({
                                                    textColor: "white",
                                                    pathColor,
                                                    trailColor,
                                                    textSize: "16px",
                                                    pathTransitionDuration: 2,
                                                })}
                                            />
                                        </div>
                                        <div className="difficulty-stats">
                                            <span className="solved-count">{count} problems</span>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default React.memo(GFGProfile);
