import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "@fontsource/rubik/400.css";

// Reuse cache
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

const fetchWithCache = async (url, cacheKey) => {
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`CodeChef data fetch failed: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
        throw new Error("Failed to retrieve CodeChef profile");
    }

    apiCache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
};

function CodeChefStats() {
    const [state, setState] = useState({
        profileData: null,
        loading: true,
        error: null
    });

    const fetchData = useCallback(async () => {
        try {
            const data = await fetchWithCache("https://codechef-api.vercel.app/handle/techno_ayan", "codechef-profile");
            setState({
                profileData: data,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error("Error fetching CodeChef data:", error);
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

    const { ratingData, starColor } = useMemo(() => {
        if (!state.profileData) return { ratingData: null, starColor: "#FFFFFF" };

        const { currentRating, highestRating, stars } = state.profileData;

        const getStarColor = (stars) => {
            if (stars.includes("1★")) return "#666666";
            if (stars.includes("2★")) return "#1E7D22";
            if (stars.includes("3★")) return "#3366CC";
            if (stars.includes("4★")) return "#684273";
            if (stars.includes("5★")) return "#FFD819";
            if (stars.includes("6★")) return "#FF9900";
            if (stars.includes("7★")) return "#FF5500";
            return "#FFFFFF";
        };

        const ratingCategories = [
            {
                title: "Current",
                value: currentRating,
                pathColor: "#1cbaba",
                trailColor: "#264545",
            },
            {
                title: "Highest",
                value: highestRating,
                pathColor: "#ffb700",
                trailColor: "#534520"
            },
            {
                title: "Target",
                value: Math.min(currentRating + 200, 3000),
                pathColor: "#f63737",
                trailColor: "#512b2b"
            }
        ];

        return {
            ratingData: ratingCategories,
            starColor: getStarColor(stars)
        };
    }, [state.profileData]);

    if (state.loading) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4} className="text-center">
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p style={{ color: "white", marginTop: "10px" }}>Loading CodeChef Stats...</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (state.error || !state.profileData) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4} className="text-center">
                        <div className="error-card">
                            <p style={{ color: "#ff6b6b" }}>
                                {state.error || "Failed to load CodeChef profile data."}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    const { profile, currentRating, countryRank, stars } = state.profileData;
    const ratingPercentage = Math.min(Math.round((currentRating / 3000) * 100), 100);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12}>
                    <div className="stats-card codechef-card">
                        <div className="card-header">
                            <div className="platform-logo codechef-logo">
                                <span>CC</span>
                            </div>
                            <h4 className="platform-title">CodeChef</h4>
                        </div>

                        <Row className="align-items-center mb-4">
                            <Col xs={12} md={6} className="text-center profile-section">
                                <div className="avatar-container">
                                    <img
                                        src={profile}
                                        alt="Profile Avatar"
                                        className="profile-avatar"
                                        loading="lazy"
                                    />
                                    <div className="avatar-ring codechef-ring"></div>
                                </div>
                                <h5 className="username">techno_ayan</h5>
                                <div className="rank-badge codechef-badge">
                                    <span className="rank-icon">🌍</span>
                                    <span>Country Rank: {countryRank}</span>
                                </div>
                            </Col>
                            <Col xs={12} md={6} className="text-center progress-section">
                                <h5 className="section-title">Rating</h5>
                                <div className="main-progress-container">
                                    <CircularProgressbar
                                        value={ratingPercentage}
                                        text={`${currentRating}`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: starColor,
                                            trailColor: "#303030",
                                            textSize: "14px",
                                            pathTransitionDuration: 2,
                                        })}
                                    />
                                </div>
                                <div className="star-rating">
                                    <span style={{ color: starColor, fontSize: "18px" }}>
                                        {stars.includes("1★") && "★"}
                                        {stars.includes("2★") && "★★"}
                                        {stars.includes("3★") && "★★★"}
                                        {stars.includes("4★") && "★★★★"}
                                        {stars.includes("5★") && "★★★★★"}
                                        {stars.includes("6★") && "★★★★★★"}
                                        {stars.includes("7★") && "★★★★★★★"}
                                    </span>
                                </div>
                            </Col>
                        </Row>

                        <div className="difficulty-section">
                            <h5 className="section-title">Rating Progress</h5>
                            <Row className="difficulty-stats">
                                {ratingData?.map((category, index) => (
                                    <Col key={index} xs={4} className="text-center difficulty-item">
                                        <div className="difficulty-header">
                                            <span className="difficulty-icon">
                                                {category.title === "Current" ? "📊" :
                                                 category.title === "Highest" ? "🔥" : "🎯"}
                                            </span>
                                            <h6 className="difficulty-title">{category.title}</h6>
                                        </div>
                                        <div className="difficulty-progress" style={{ animationDelay: `${index * 0.2}s` }}>
                                            <CircularProgressbar
                                                value={Math.min(Math.round((category.value / 3000) * 100), 100)}
                                                text={`${category.value}`}
                                                styles={buildStyles({
                                                    textColor: "white",
                                                    pathColor: category.pathColor,
                                                    trailColor: category.trailColor,
                                                    textSize: "16px",
                                                    pathTransitionDuration: 2,
                                                })}
                                            />
                                        </div>
                                        <div className="difficulty-stats">
                                            <span className="solved-count">
                                                {category.title === "Target" ? "Next Goal" : `${category.title} Rating`}
                                            </span>
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

export default React.memo(CodeChefStats);
