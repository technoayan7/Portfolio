import React, { Suspense, lazy } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Type from "./Type";
import Particle from "../Particle";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import "./StatsCard.css";

// Lazy load heavy components
const Github = lazy(() => import("./Github"));
const LeetCodeStats = lazy(() => import("./LeetCodeStats"));
const GFGProfile = lazy(() => import("./GFGStats"));
const LeetcodeMap = lazy(() => import("./LeetcodeMap"));
const CodeChefStats = lazy(() => import("./CodeChefStats"));

// Enhanced Loading component
const StatsLoading = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading Stats...</p>
  </div>
);

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "10px",
              paddingBottom: "7px",
            }}
            className="animate-section"
          >
            <h1 style={{ fontSize: "1em", paddingBottom: "2em", textAlign: "left" }}>
              <Type />
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "100px", paddingBottom: "30px" }}
            className="about-img animate-section"
          >
            <img
              src={laptopImg}
              alt="about"
              className="img-fluid floating-image"
              loading="lazy"
            />
          </Col>
        </Row>

        <div className="section-with-animation">
          <h1 className="project-heading animate-title">
            Professional <strong className="purple">Skillset </strong>
          </h1>
          <Techstack />
        </div>

        <div className="section-with-animation">
          <h1 className="project-heading animate-title">
            <strong className="purple">Tools</strong> I use
          </h1>
          <Toolstack />
        </div>

        <div className="section-with-animation">
          <Suspense fallback={<StatsLoading />}>
            <Github />
          </Suspense>
        </div>

        <div className="section-with-animation">
          <Suspense fallback={<StatsLoading />}>
            <LeetcodeMap />
          </Suspense>
        </div>

        <div className="stats-grid section-with-animation">
          <Row className="g-4">
            <Col xl={4} lg={4} md={6} sm={12} xs={12} className="stats-column">
              <h1 className="project-heading stats-heading">
                Leet<strong className="purple">Code </strong>Stats
              </h1>
              <Suspense fallback={<StatsLoading />}>
                <LeetCodeStats />
              </Suspense>
            </Col>
            <Col xl={4} lg={4} md={6} sm={12} xs={12} className="stats-column">
              <h1 className="project-heading stats-heading">
                Geeksfor<strong className="purple">Geeks </strong>Stats
              </h1>
              <Suspense fallback={<StatsLoading />}>
                <GFGProfile />
              </Suspense>
            </Col>
            <Col xl={4} lg={4} md={12} sm={12} xs={12} className="stats-column">
              <h1 className="project-heading stats-heading">
                Code<strong className="purple">Chef </strong>Stats
              </h1>
              <Suspense fallback={<StatsLoading />}>
                <CodeChefStats />
              </Suspense>
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
}

export default About;
