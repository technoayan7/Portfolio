import React, { useState, useEffect } from "react";
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
import "./ProjectCard.css";

function Projects() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      imgPath: job,
      isBlog: false,
      title: "CareerHorizon",
      description: "CareerHorizon is a fully functional job portal that manages real-time job listings and provides secure authentication for users. It features dynamic job search filters, application tracking, and recruiter management, significantly improving search efficiency and user experience.",
      ghLink: "https://github.com/technoayan7/CareerHorizon",
      demoLink: "https://careerhorizon.vercel.app/",
      category: "Full Stack"
    },
    {
      imgPath: mealdash,
      isBlog: false,
      title: "MealDash",
      description: "MealDash is a dynamic food delivery platform designed with features like category browsing, cart management, an admin dashboard for managing food items, and seamless light/dark mode switch. It integrates secure payment processing, enhancing user experience and accessibility while streamlining transactions.",
      ghLink: "https://github.com/technoayan7/mealdash",
      demoLink: "https://mealdash-ui.onrender.com/",
      category: "Full Stack"
    },
    {
      imgPath: derain,
      isBlog: false,
      title: "Restormer",
      description: "Restormer is an advanced transformer-based model designed for high-resolution image restoration, particularly for rain removal tasks. Using a custom dataset of rain/ground truth image pairs, it achieved enhanced efficiency and image quality, surpassing previous benchmarks in PSNR and SSIM performance.",
      ghLink: "https://github.com/technoayan7/Restormer",
      demoLink: "https://colab.research.google.com/drive/1lOzh9Rpz4cdLput6Y00sU4tNuZJTtjBY#scrollTo=SRd46QaXlklQ",
      category: "Machine Learning"
    },
    {
      imgPath: MoviePulse,
      isBlog: false,
      title: "MoviePulse",
      description: "MoviePulse is a feature-rich application that provides detailed information about movies, including an overview, genre, release date, rating, runtime, top cast, reviews, sorting options, and personalized recommendations.",
      ghLink: "https://github.com/technoayan7/MoviePulse",
      demoLink: "https://moviepulse.netlify.app/",
      category: "Frontend"
    },
    {
      imgPath: FitHub,
      isBlog: false,
      title: "FitHub",
      description: "Developed a responsive fitness website offering categorized exercise information and YouTube workout videos via a REST API. Integrated React Router for smooth navigation and pagination for efficient content browsing, paired with a visually engaging interface using Material UI.",
      ghLink: "https://github.com/technoayan7/FitHub",
      demoLink: "https://fit-hub.vercel.app/",
      category: "Frontend"
    },
    {
      imgPath: Objectdetection,
      isBlog: false,
      title: "Image Dehazing",
      description: "Implementation of the Efficient Image Dehazing with Boundary Constraint and Contextual Regularization paper, focusing on enhancing image clarity. Extended the project to include object detection, leveraging improved visibility for accurate detection results.",
      ghLink: "https://github.com/technoayan7/Object-Detection-in-an-Hazy-Image",
      demoLink: "https://github.com/technoayan7/Object-Detection-in-an-Hazy-Image",
      category: "Computer Vision"
    },
    {
      imgPath: tictac,
      isBlog: false,
      title: "Tic Tac Toe Game",
      description: "Developed a Tic Tac Toe Game while I was Learning HTML, CSS, JavaScript.",
      ghLink: "https://github.com/technoayan7/Tic-Tac-Toe",
      demoLink: "https://technoayan7.github.io/Tic-Tac-Toe/",
      category: "Frontend"
    }
  ];

  if (isLoading) {
    return (
      <Container fluid className="project-section">
        <Particle />
        <Container>
          <div className="projects-loading">
            <div className="projects-spinner"></div>
          </div>
        </Container>
      </Container>
    );
  }

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p className="project-description">
          Here are a few projects I've worked on recently.
        </p>

        <Row className="projects-grid">
          {projects.map((project, index) => (
            <Col md={4} key={index} className="project-card">
              <ProjectCard
                imgPath={project.imgPath}
                isBlog={project.isBlog}
                title={project.title}
                description={project.description}
                ghLink={project.ghLink}
                demoLink={project.demoLink}
                category={project.category}
              />
            </Col>
          ))}
        </Row>

        <div className="text-center" style={{ marginTop: "50px", animation: "fadeIn 1s ease-out 1s both" }}>
          <p style={{ color: "#ccc", fontSize: "1.1rem", fontFamily: "Rubik, sans-serif" }}>
            ⭐ Don't forget to star the repositories if you find them useful!
          </p>
        </div>
      </Container>
    </Container>
  );
}

export default Projects;
