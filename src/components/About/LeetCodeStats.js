import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "@fontsource/rubik/400.css";

// Cache for API responses
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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

function LeetCodeStats() {
    const [state, setState] = useState({
        profileData: null,
        totalQuestions: { all: 0, easy: 0, medium: 0, hard: 0 },
        loading: true,
        avatarData: null,
        ranking: null,
        error: null
    });

    const fetchData = useCallback(async () => {
        try {
            const [profileResponse, avatarResponse, questionsResponse] = await Promise.all([
                fetchWithCache("https://techno-leetcode-api.vercel.app/technoayan/solved", "profile"),
                fetchWithCache("https://techno-leetcode-api.vercel.app/technoayan", "avatar"),
                fetchWithCache("https://techno-leetcode-api.vercel.app/problemList", "questions")
            ]);

            const counts = questionsResponse.data.allQuestionsCount.reduce((acc, item) => {
                acc[item.difficulty.toLowerCase()] = item.count;
                return acc;
            }, {});

            setState({
                profileData: profileResponse,
                avatarData: avatarResponse.avatar,
                ranking: avatarResponse.ranking,
                totalQuestions: {
                    all: counts.all || 0,
                    easy: counts.easy || 0,
                    medium: counts.medium || 0,
                    hard: counts.hard || 0,
                },
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Error fetching profile data:", error);
            setState(prev => ({ ...prev, loading: false, error: error.message }));
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const progressData = useMemo(() => {
        if (!state.profileData || !state.totalQuestions.all) return null;

        const { solvedProblem, easySolved, mediumSolved, hardSolved } = state.profileData;
        const { all, easy, medium, hard } = state.totalQuestions;

        return {
            overall: {
                percentage: Math.round((solvedProblem / all) * 100),
                solved: solvedProblem,
                total: all
            },
            easy: {
                percentage: Math.round((easySolved / easy) * 100),
                solved: easySolved,
                total: easy
            },
            medium: {
                percentage: Math.round((mediumSolved / medium) * 100),
                solved: mediumSolved,
                total: medium
            },
            hard: {
                percentage: Math.round((hardSolved / hard) * 100),
                solved: hardSolved,
                total: hard
            }
        };
    }, [state.profileData, state.totalQuestions]);

    if (state.loading) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4} className="text-center">
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p style={{ color: "white", marginTop: "10px" }}>Loading LeetCode Stats...</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (state.error || !progressData) {
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

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12}>
                    <div className="stats-card leetcode-card">
                        <div className="card-header">
                            <div className="platform-logo">
                                <span className="leetcode-logo">LC</span>
                            </div>
                            <h4 className="platform-title">LeetCode</h4>
                        </div>

                        <Row className="align-items-center mb-4">
                            <Col xs={12} md={6} className="text-center profile-section">
                                <div className="avatar-container">
                                    <img
                                        src={state.avatarData}
                                        alt="Profile Avatar"
                                        className="profile-avatar"
                                        loading="lazy"
                                    />
                                    <div className="avatar-ring"></div>
                                </div>
                                <h5 className="username">technoayan</h5>
                                <div className="rank-badge">
                                    <span className="rank-icon">🏆</span>
                                    <span>Rank: {state.ranking}</span>
                                </div>
                            </Col>
                            <Col xs={12} md={6} className="text-center progress-section">
                                <h5 className="section-title">Overall Progress</h5>
                                <div className="main-progress-container">
                                    <CircularProgressbar
                                        value={progressData.overall.percentage}
                                        text={`${progressData.overall.percentage}%`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#FFD700",
                                            trailColor: "#303030",
                                            textSize: "14px",
                                            pathTransitionDuration: 2,
                                        })}
                                    />
                                </div>
                                <p className="progress-stats">
                                    {progressData.overall.solved} / {progressData.overall.total} solved
                                </p>
                            </Col>
                        </Row>

                        <div className="difficulty-section">
                            <h5 className="section-title">Problem Breakdown</h5>
                            <Row className="difficulty-stats">
                                {[
                                    {
                                        title: "Easy",
                                        data: progressData.easy,
                                        pathColor: "#00b894",
                                        trailColor: "#264545",
                                        icon: "🟢"
                                    },
                                    {
                                        title: "Medium",
                                        data: progressData.medium,
                                        pathColor: "#fdcb6e",
                                        trailColor: "#534520",
                                        icon: "🟡"
                                    },
                                    {
                                        title: "Hard",
                                        data: progressData.hard,
                                        pathColor: "#e17055",
                                        trailColor: "#512b2b",
                                        icon: "🔴"
                                    }
                                ].map(({ title, data, pathColor, trailColor, icon }, index) => (
                                    <Col key={title} xs={4} className="text-center difficulty-item">
                                        <div className="difficulty-header">
                                            <span className="difficulty-icon">{icon}</span>
                                            <h6 className="difficulty-title">{title}</h6>
                                        </div>
                                        <div className="difficulty-progress" style={{ animationDelay: `${index * 0.2}s` }}>
                                            <CircularProgressbar
                                                value={data.percentage}
                                                text={`${data.percentage}%`}
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
                                            <span className="solved-count">{data.solved}</span>
                                            <span className="total-count">/ {data.total}</span>
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

export default React.memo(LeetCodeStats);
