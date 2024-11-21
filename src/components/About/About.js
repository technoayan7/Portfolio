import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Type from "./Type";
import Particle from "../Particle";
import Github from "./Github";
import LeetCodeStats from "./LeetCodeStats";
import GFGProfile from "./GFGStats";
import LeetcodeMap from "./LeetcodeMap";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";


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
          >
            <h1 style={{ fontSize: "1em", paddingBottom: "2em", textAlign: "left" }}>
              <Type />
            </h1>
            {/* <div style={{ padding: 50, textAlign: "left" }}>
              <Type/>
            </div> */}
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "100px", paddingBottom: "30px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
        <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>

        <Techstack />

        {/* <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack /> */}

        <Github />
        <LeetcodeMap />
        <Row>
          <Col md={6}>
            <h1 className="project-heading">
              Leet<strong className="purple">Code </strong>Stats
            </h1>
            <LeetCodeStats />
          </Col>
          <Col md={6}>
            <h1 className="project-heading">
              Geeksfor<strong className="purple">Geeks </strong>Stats
            </h1>
            <GFGProfile />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
