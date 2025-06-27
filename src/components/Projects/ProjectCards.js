import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import "./ProjectCard.css";

function ProjectCards(props) {
  const getTechTags = (title) => {
    const techMap = {
      "CareerHorizon": ["React", "Node.js", "MongoDB", "Express"],
      "MealDash": ["React", "Node.js", "MongoDB", "Payment Gateway"],
      "Restormer": ["Python", "PyTorch", "Computer Vision", "ML"],
      "MoviePulse": ["React", "API Integration", "Responsive Design"],
      "FitHub": ["React", "Material UI", "REST API", "YouTube API"],
      "Image Dehazing": ["Python", "OpenCV", "Deep Learning", "Computer Vision"],
      "Tic Tac Toe Game": ["HTML", "CSS", "JavaScript", "Game Logic"]
    };
    return techMap[title] || [];
  };

  const getProjectStatus = (title) => {
    const statusMap = {
      "CareerHorizon": "Live",
      "MealDash": "Live",
      "Restormer": "Research",
      "MoviePulse": "Live",
      "FitHub": "Live",
      "Image Dehazing": "Open Source",
      "Tic Tac Toe Game": "Complete"
    };
    return statusMap[title] || "Complete";
  };

  const techTags = getTechTags(props.title);
  const projectStatus = getProjectStatus(props.title);

  return (
    <Card className="project-card-view">
      {projectStatus === "Live" && (
        <div className="project-status">
          {projectStatus}
        </div>
      )}

      <Card.Img variant="top" src={props.imgPath} alt={`${props.title} preview`} />

      <Card.Body>
        <Card.Title>{props.title}</Card.Title>

        {techTags.length > 0 && (
          <div className="project-tags">
            {techTags.map((tech, index) => (
              <span key={index} className="project-tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        <Card.Text>
          {props.description}
        </Card.Text>

        <div className="project-buttons">
          <Button
            variant="primary"
            href={props.ghLink}
            target="_blank"
            className="project-btn github-btn"
            rel="noopener noreferrer"
          >
            <BsGithub />
            {props.isBlog ? "Blog" : "GitHub"}
          </Button>

          {!props.isBlog && props.demoLink && (
            <Button
              variant="primary"
              href={props.demoLink}
              target="_blank"
              className="project-btn demo-btn"
              rel="noopener noreferrer"
            >
              <CgWebsite />
              Demo
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default React.memo(ProjectCards);
