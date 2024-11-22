import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import derain from "../../Assets/Projects/derain.jpg";
import job from "../../Assets/Projects/job.jpg";
import mealdash from "../../Assets/Projects/mealdash.jpg";
import tictac from "../../Assets/Projects/tictac.jpg";
import FitHub from "../../Assets/Projects/fithub.jpg";
import MoviePulse from "../../Assets/Projects/MoviePulse.jpg";
import Objectdetection from "../../Assets/Projects/objectdetection.jpg";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={job}
              isBlog={false}
              title="CareerHorizon"
              description="CareerHorizon is a fully functional job portal that manages real-time job listings and provides secure authentication for users. It features dynamic job search filters, application tracking, and recruiter management, significantly improving search efficiency and user experience."
              ghLink="https://github.com/technoayan7/CareerHorizon"
              demoLink="https://careerhorizon.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mealdash}
              isBlog={false}
              title="MealDash"
              description="MealDash is a dynamic food delivery platform designed with features like category browsing, cart management, an admin dashboard for managing food items, and seamless light/dark mode switch. It integrates secure payment processing, enhancing user experience and accessibility while streamlining transactions."
              ghLink="https://github.com/technoayan7/mealdash"
              demoLink="https://mealdash-ui.onrender.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={derain}
              isBlog={false}
              title="Restormer"
              description="Restormer is an advanced transformer-based model designed for high-resolution image restoration, particularly for rain removal tasks. Using a custom dataset of rain/ground truth image pairs, it achieved enhanced efficiency and image quality, surpassing previous benchmarks in PSNR and SSIM performance."
              ghLink="https://github.com/technoayan7/Restormer"
              demoLink="https://colab.research.google.com/drive/1lOzh9Rpz4cdLput6Y00sU4tNuZJTtjBY#scrollTo=SRd46QaXlklQ"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={MoviePulse}
              isBlog={false}
              title="MoviePulse"
              description="MoviePulse is a feature-rich application that provides detailed information about movies, including an overview, genre, release date, rating, runtime, top cast, reviews, sorting options, and personalized recommendations."
              ghLink="https://github.com/technoayan7/MoviePulse"
              demoLink="https://moviepulse.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={FitHub}
              isBlog={false}
              title="FitHub"
              description="Developed a responsive fitness website offering categorized exercise information and YouTube workout videos via a REST API. Integrated React Router for smooth navigation and pagination for efficient content browsing, paired with a visually engaging interface using Material UI."
              ghLink="https://github.com/technoayan7/FitHub"
              demoLink="https://fit-hub.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Objectdetection}
              isBlog={false}
              title="Image Dehazing"
              description="Implementation of the Efficient Image Dehazing with Boundary Constraint and Contextual Regularization paper, focusing on enhancing image clarity. Extended the project to include object detection, leveraging improved visibility for accurate detection results."
              ghLink="https://github.com/technoayan7/Object-Detection-in-an-Hazy-Image"
              demoLink="https://github.com/technoayan7/Object-Detection-in-an-Hazy-Image"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={tictac}
              isBlog={false}
              title="Tic Tac Toe Game"
              description="Developed a Tic Tac Toe Game while I was Learning HTML, CSS, JavaScript."
              ghLink="https://github.com/technoayan7/Tic-Tac-Toe"
              demoLink="https://technoayan7.github.io/Tic-Tac-Toe/"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
