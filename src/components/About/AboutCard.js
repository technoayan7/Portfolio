import React from "react";
import Card from "react-bootstrap/Card";
// import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Ayan Ahmad. </span>
            <br /> I am a Third-year undergrad at <span className="purple">IIIT Allahabad</span> pursuing a Bachelor of Technology in Information Technology.
            I am highly interested in algorithmic problem-solving and have a firm grasp in data structures and algorithms. In my one year of experience of practicing competitive programming,
            I have climbed up to the Specialist at Codeforces ( Solved Over More than 600 problems ) and a 4🌟 at Codechef.
            <br />
            I am Web Development enthusiast and have made quite a few Projects in React Js and Firebase. I am currently learning more about MongoDB, Express, React, Node.
            <br />

          </p>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Everthing Thats kills Me, Makes Me feel Alive!"{" "}
          </p>
          <footer className="blockquote-footer">Ayan</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
