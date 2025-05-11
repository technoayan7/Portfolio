import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "@fontsource/rubik/400.css";

function CodeChefStats() {
    const [state, setState] = useState({
        profileData: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://codechef-api.vercel.app/handle/techno_ayan");

                if (!response.ok) {
                    throw new Error(`CodeChef data fetch failed: ${response.status}`);
                }

                const data = await response.json();

                if (!data.success) {
                    throw new Error("Failed to retrieve CodeChef profile");
                }

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
        };

        fetchData();
    }, []);

    const { profileData, loading, error } = state;

    if (loading) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4} className="text-center">
                        <p style={{ color: "white" }}>Loading...</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (error || !profileData) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4} className="text-center">
                        <p style={{ color: "red" }}>
                            {error || "Failed to load CodeChef profile data."}
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    }

    const {
        profile,
        currentRating,
        highestRating,
        countryRank,
        stars
    } = profileData;

    // Calculate rating percentage out of 3000 (which is considered very high rating)
    const ratingPercentage = Math.min(Math.round((currentRating / 3000) * 100), 100);

    // Get star color based on CodeChef's star system
    const getStarColor = (stars) => {
        if (stars.includes("1★")) return "#666666"; // Gray
        if (stars.includes("2★")) return "#1E7D22"; // Green
        if (stars.includes("3★")) return "#3366CC"; // Blue
        if (stars.includes("4★")) return "#684273"; // Purple
        if (stars.includes("5★")) return "#FFD819"; // Yellow
        if (stars.includes("6★")) return "#FF9900"; // Orange
        if (stars.includes("7★")) return "#FF5500"; // Red
        return "#FFFFFF"; // Default white
    };

    const starColor = getStarColor(stars);

    // Define rating categories similar to LeetCode/GFG difficulty levels
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

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12}>
                    <div
                        style={{
                            backgroundColor: "#1a1a1a",
                            padding: "20px",
                            borderRadius: "10px",
                            color: "white",
                        }}
                    >
                        <Row className="align-items-center mb-4">
                            <Col xs={12} md={6} className="text-center">
                                <img
                                    src={profile}
                                    alt="Profile Avatar"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                    }}
                                />
                                <h5 style={{ marginTop: "10px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    techno_ayan
                                </h5>
                                <p style={{ fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    Country Rank: {countryRank}
                                </p>
                            </Col>
                            <Col xs={12} md={6} className="text-center">
                                <h5>Rating</h5>
                                <div style={{ width: "120px", margin: "0 auto", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    <CircularProgressbar
                                        value={ratingPercentage}
                                        text={`${currentRating}`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: starColor,
                                            trailColor: "#303030",
                                        })}
                                    />
                                </div>
                                <p style={{ marginTop: "5px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    <span style={{ color: starColor }}>
                                        {stars.includes("1★") && "★"}
                                        {stars.includes("2★") && "★★"}
                                        {stars.includes("3★") && "★★★"}
                                        {stars.includes("4★") && "★★★★"}
                                        {stars.includes("5★") && "★★★★★"}
                                        {stars.includes("6★") && "★★★★★★"}
                                        {stars.includes("7★") && "★★★★★★★"}
                                    </span>
                                </p>
                            </Col>
                        </Row>

                        <Row>
                            {ratingCategories.map((category, index) => (
                                <Col key={index} xs={4} className="text-center">
                                    <h6>{category.title}</h6>
                                    <div style={{ width: "80px", margin: "0 auto", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                        <CircularProgressbar
                                            value={Math.min(Math.round((category.value / 3000) * 100), 100)}
                                            text={`${category.value}`}
                                            styles={buildStyles({
                                                textColor: "white",
                                                pathColor: category.pathColor,
                                                trailColor: category.trailColor,
                                            })}
                                        />
                                    </div>
                                    <p style={{ marginTop: "5px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                        {category.title === "Target" ? "Next Goal" : `${category.title} Rating`}
                                    </p>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CodeChefStats;
