import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "@fontsource/rubik/400.css";

function GFGProfile() {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://techno-gfg-api.vercel.app/technoayan7");
                const data = await response.json();
                setProfileData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={12} className="text-center">
                        <p style={{ color: "white" }}>Loading...</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!profileData) {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={12} className="text-center">
                        <p style={{ color: "red" }}>Failed to load profile data.</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    const { info, solvedStats } = profileData;
    const {
        userName,
        profilePicture,
        instituteRank,
        currentStreak,
        maxStreak,
        institution,
        totalProblemsSolved,
    } = info;

    const problemStats = [
        { label: "School", count: solvedStats.school.count },
        { label: "Basic", count: solvedStats.basic.count },
        { label: "Easy", count: solvedStats.easy.count },
        { label: "Medium", count: solvedStats.medium.count },
        { label: "Hard", count: solvedStats.hard.count },
    ];

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12}>
                    {/* Main Box */}
                    <div
                        style={{
                            backgroundColor: "#1a1a1a",
                            padding: "20px",
                            borderRadius: "10px",
                            color: "white",
                        }}
                    >
                        {/* First Row: Profile Picture and User Info */}
                        <Row className="align-items-center mb-4">
                            <Col xs={12} md={6} className="text-center">
                                <img
                                    src={profilePicture}
                                    alt="Profile Avatar"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                    }}
                                />
                                <h5 style={{ marginTop: "10px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>{userName}</h5>
                                <p style={{ fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>Institute Rank: {instituteRank}</p>
                            </Col>
                            <Col xs={12} md={6} className="text-center">
                                <h5>Overall Progress</h5>
                                <div style={{ width: "120px", margin: "0 auto", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    <CircularProgressbar
                                        value={totalProblemsSolved}
                                        text={`${totalProblemsSolved}`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#FFD700",
                                            trailColor: "#303030",
                                        })}
                                    />
                                </div>
                                {/* <h5>Stats</h5> */}
                                <p style={{ fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>Total Solved: {totalProblemsSolved}</p>
                            </Col>
                        </Row>

                        {/* Second Row: Problem Stats */}
                        <Row>
                            {[
                                {
                                    label: "Easy",
                                    count: solvedStats.school.count + solvedStats.basic.count + solvedStats.easy.count,
                                },
                                {
                                    label: "Medium",
                                    count: solvedStats.medium.count,
                                },
                                {
                                    label: "Hard",
                                    count: solvedStats.hard.count,
                                },
                            ].map((stat, index) => (
                                <Col key={index} xs={6} md={4} className="text-center">
                                    <h6>{stat.label}</h6>
                                    <div style={{ width: "80px", margin: "0 auto", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                        <CircularProgressbar
                                            value={stat.count}
                                            text={`${stat.count}`}
                                            styles={buildStyles({
                                                textColor: "white",
                                                pathColor: "#1cbaba",
                                                trailColor: "#303030",
                                            })}
                                        />
                                    </div>
                                    <p style={{ marginTop: "5px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>{stat.count} problems</p>
                                </Col>
                            ))}
                        </Row>

                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default GFGProfile;
