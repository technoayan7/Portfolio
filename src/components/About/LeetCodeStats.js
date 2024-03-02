import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

function PortfolioComponent() {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={4}>
                    <h1 className="project-heading" style={{ paddingBottom: "10px", textAlign: "center" }}>
                        LeetCode <strong className="purple">Statistics</strong>
                    </h1>
                    <iframe
                        title="LeetCode Stats"
                        src="https://leetcode-stats-six.vercel.app/api?username=technoayan&theme=dark"
                        width="100%"
                        height="200px"
                    ></iframe>
                </Col>
            </Row>
        </Container>
    );
}

export default PortfolioComponent;
