import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function PortfolioComponent() {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={5}>
                    <h1 className="project-heading" style={{ paddingBottom: '10px', textAlign: 'center' }}>
                        LeetCode <strong className="purple">Statistics</strong>
                    </h1>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                            title="LeetCode Stats"
                            src="https://leetcode-stats-six.vercel.app/api?username=technoayan&theme=dark"
                            width="100%"
                            height="100%"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default PortfolioComponent;
