import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "@fontsource/rubik/400.css";

function LeetCodeStats() {
    const [profileData, setProfileData] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState({ all: 0, easy: 0, medium: 0, hard: 0 });
    const [loading, setLoading] = useState(true);
    const [avatarData, setAvatarData] = useState(null);
    const [avatarLoading, setAvatarLoading] = useState(true);
    const [ranking, setRanking] = useState(null);

    useEffect(() => {
        // Fetch profile data
        const fetchProfileData = async () => {
            try {
                const response = await fetch("https://techno-leetcode-api.vercel.app/technoayan/solved");
                const data = await response.json();
                setProfileData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setLoading(false);
            }
        };

        // Fetch avatar and ranking data
        const fetchAvatarAndRanking = async () => {
            try {
                const response = await fetch("https://techno-leetcode-api.vercel.app/technoayan");
                const data = await response.json();
                setAvatarData(data.avatar);
                setRanking(data.ranking);
                setAvatarLoading(false);
            } catch (error) {
                console.error("Error fetching avatar and ranking data:", error);
                setAvatarLoading(false);
            }
        };

        // Fetch total questions count
        const fetchTotalQuestions = async () => {
            try {
                const response = await fetch("https://techno-leetcode-api.vercel.app/problemList");
                const data = await response.json();
                const counts = data.data.allQuestionsCount.reduce((acc, item) => {
                    acc[item.difficulty.toLowerCase()] = item.count;
                    return acc;
                }, {});
                setTotalQuestions({
                    all: counts.all || 0,
                    easy: counts.easy || 0,
                    medium: counts.medium || 0,
                    hard: counts.hard || 0,
                });
            } catch (error) {
                console.error("Error fetching total questions:", error);
            }
        };

        fetchAvatarAndRanking();
        fetchProfileData();
        fetchTotalQuestions();
    }, []);

    if (loading || avatarLoading) {
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

    if (!profileData || !avatarData || ranking === null) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={4} className="text-center">
                        <p style={{ color: "red" }}>Failed to load profile data.</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    const {
        solvedProblem,
        easySolved,
        mediumSolved,
        hardSolved,
    } = profileData;

    const { all, easy, medium, hard } = totalQuestions;

    const overallPercentage = Math.round((solvedProblem / all) * 100);
    const easyPercentage = Math.round((easySolved / easy) * 100);
    const mediumPercentage = Math.round((mediumSolved / medium) * 100);
    const hardPercentage = Math.round((hardSolved / hard) * 100);

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
                                    src={avatarData}
                                    alt="Profile Avatar"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                    }}
                                />
                                <h5 style={{ marginTop: "10px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>technoayan</h5>
                                <p style={{ fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>Global Rank: {ranking}</p>
                            </Col>
                            <Col xs={12} md={6} className="text-center">
                                <h5>Overall Progress</h5>
                                <div style={{ width: "120px", margin: "0 auto", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    <CircularProgressbar
                                        value={overallPercentage}
                                        text={`${overallPercentage}%`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#FFD700",
                                            trailColor: "#303030",
                                        })}
                                    />
                                </div>
                                <p style={{ marginTop: "5px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>{solvedProblem} / {all}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={4} className="text-center">
                                <h6>Easy</h6>
                                <div style={{ width: "80px", margin: "0 auto", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    <CircularProgressbar
                                        value={easyPercentage}
                                        text={`${easyPercentage}%`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#1cbaba",
                                            trailColor: "#264545",
                                        })}
                                    />
                                </div>
                                <p style={{ marginTop: "5px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>{easySolved} / {easy}</p>
                            </Col>
                            <Col xs={4} className="text-center">
                                <h6>Medium</h6>
                                <div style={{ width: "80px", margin: "0 auto", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    <CircularProgressbar
                                        value={mediumPercentage}
                                        text={`${mediumPercentage}%`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#ffb700",
                                            trailColor: "#534520",
                                        })}
                                    />
                                </div>
                                <p style={{ marginTop: "5px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>{mediumSolved} / {medium}</p>
                            </Col>
                            <Col xs={4} className="text-center">
                                <h6>Hard</h6>
                                <div style={{ width: "80px", margin: "0 auto", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    <CircularProgressbar
                                        value={hardPercentage}
                                        text={`${hardPercentage}%`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#f63737",
                                            trailColor: "#512b2b",
                                        })}
                                    />
                                </div>
                                <p style={{ marginTop: "5px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>{hardSolved} / {hard}</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LeetCodeStats;
