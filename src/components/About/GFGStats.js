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
                    <Col xs={12} md={6} lg={4} className="text-center">
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
                    <Col xs={12} md={6} lg={4} className="text-center">
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
        totalProblemsSolved,
    } = info;

    // Calculate the stats for easy (basic + easy), medium, and hard
    const easyCount = solvedStats.basic.count + solvedStats.easy.count;
    const mediumCount = solvedStats.medium.count;
    const hardCount = solvedStats.hard.count;

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
                                <p style={{ marginTop: "5px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>Total Solved: {totalProblemsSolved}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={4} className="text-center">
                                <h6>Easy</h6>
                                <div style={{ width: "80px", margin: "0 auto", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    <CircularProgressbar
                                        value={easyCount}
                                        text={`${easyCount}`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#1cbaba",
                                            trailColor: "#264545",
                                        })}
                                    />
                                </div>
                                <p style={{ marginTop: "5px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>{easyCount} problems</p>
                            </Col>
                            <Col xs={4} className="text-center">
                                <h6>Medium</h6>
                                <div style={{ width: "80px", margin: "0 auto", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    <CircularProgressbar
                                        value={mediumCount}
                                        text={`${mediumCount}`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#ffb700",
                                            trailColor: "#534520",
                                        })}
                                    />
                                </div>
                                <p style={{ marginTop: "5px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>{mediumCount} problems</p>
                            </Col>
                            <Col xs={4} className="text-center">
                                <h6>Hard</h6>
                                <div style={{ width: "80px", margin: "0 auto", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>
                                    <CircularProgressbar
                                        value={hardCount}
                                        text={`${hardCount}`}
                                        styles={buildStyles({
                                            textColor: "white",
                                            pathColor: "#f63737",
                                            trailColor: "#512b2b",
                                        })}
                                    />
                                </div>
                                <p style={{ marginTop: "5px", fontFamily: "Rubik, sans-serif", fontWeight: 400 }}>{hardCount} problems</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default GFGProfile;
