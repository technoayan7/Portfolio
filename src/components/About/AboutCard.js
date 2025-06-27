import React from "react";
import Card from "react-bootstrap/Card";

function AboutCard() {
  return (
    <Card className="quote-card-view about-card">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p className="about-text">
            Hi Everyone, I am <span className="purple">Ayan Ahmad. </span>
            <br />
            I am a Final-year undergrad at <span className="purple">IIIT Allahabad</span> pursuing a Bachelor of Technology in Information Technology.
            <br />
            <br />
            I am highly interested in <span className="highlight">algorithmic problem-solving</span> and have a firm grasp in data structures and algorithms. In my one year of experience of practicing competitive programming,
            I have climbed up to the <span className="achievement">Expert at Codeforces</span> ( Solved Over More than 700 problems ) and a <span className="achievement">5🌟 at Codechef</span>.
            <br />
            <br />
            I am <span className="highlight">Web Development enthusiast</span> and have made quite a few Projects in React Js and Firebase. I am currently learning more about Go, MongoDB, Express, React, Node.
          </p>

          <p className="quote-text">
            "Everything That's Kills Me, Makes Me Feel Alive!"
          </p>
          <footer className="blockquote-footer">
            <cite title="Source Title">Ayan</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
