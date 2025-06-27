import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/Ayan_SDE.pdf";
import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./Resume.css";

// Performance optimization: Set worker source once
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [state, setState] = useState({
    width: 1200,
    numPages: 1,
    pageNumber: 1,
    loading: true,
    error: null,
    pdfLoaded: false
  });

  // Memoized scale calculation for better performance
  const scale = useMemo(() => {
    if (state.width > 786) return 1.7;
    if (state.width > 576) return 1.2;
    return 0.6;
  }, [state.width]);

  // Optimized resize handler with debouncing
  const handleResize = useCallback(() => {
    const debounceTimer = setTimeout(() => {
      setState(prev => ({ ...prev, width: window.innerWidth }));
    }, 150);

    return () => clearTimeout(debounceTimer);
  }, []);

  useEffect(() => {
    // Set initial width
    setState(prev => ({ ...prev, width: window.innerWidth }));

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // PDF loading handlers
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setState(prev => ({
      ...prev,
      numPages,
      loading: false,
      pdfLoaded: true,
      error: null
    }));
  }, []);

  const onDocumentLoadError = useCallback((error) => {
    console.error('PDF loading error:', error);
    setState(prev => ({
      ...prev,
      loading: false,
      error: 'Failed to load PDF. Please try downloading instead.',
      pdfLoaded: false
    }));
  }, []);

  const onPageLoadSuccess = useCallback(() => {
    setState(prev => ({ ...prev, loading: false }));
  }, []);

  // Download tracking for analytics (optional)
  const handleDownload = useCallback(() => {
    // You can add analytics tracking here
    console.log('Resume downloaded');
  }, []);

  // Loading component
  const ResumeLoading = () => (
    <div className="resume-loading">
      <div className="pdf-loading-spinner">
        <BsFileEarmarkPdf className="pdf-icon" />
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p>Loading Resume...</p>
    </div>
  );

  // Error component
  const ResumeError = () => (
    <div className="resume-error">
      <BsFileEarmarkPdf className="pdf-icon error" />
      <p>{state.error}</p>
      <Button
        variant="primary"
        href={pdf}
        target="_blank"
        className="download-btn primary"
        onClick={handleDownload}
      >
        <AiOutlineDownload />
        Download Resume Instead
      </Button>
    </div>
  );

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />

        {/* Header Section */}
        <div className="resume-header">
          <h1 className="resume-title">
            My <strong className="purple">Resume</strong>
          </h1>
          <p className="resume-description">
            Download my resume to know more about my experience and skills.
          </p>
        </div>

        {/* Action Buttons */}
        <Row className="resume-actions" style={{ justifyContent: "center", marginBottom: "30px" }}>
          <Col xs="auto">
            <Button
              variant="primary"
              href={pdf}
              target="_blank"
              className="download-btn primary"
              onClick={handleDownload}
            >
              <AiOutlineDownload />
              Download Resume
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-primary"
              href={pdf}
              target="_blank"
              className="download-btn secondary"
            >
              <AiOutlineEye />
              View in New Tab
            </Button>
          </Col>
        </Row>

        {/* PDF Viewer */}
        <Row className="resume-viewer">
          <Col className="text-center">
            <div className="pdf-container">
              {state.loading && <ResumeLoading />}
              {state.error && <ResumeError />}

              {!state.error && (
                <Document
                  file={pdf}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  className="pdf-document"
                  loading={<ResumeLoading />}
                >
                  <Page
                    pageNumber={state.pageNumber}
                    scale={scale}
                    onLoadSuccess={onPageLoadSuccess}
                    className="pdf-page"
                    renderTextLayer={false} // Performance optimization
                    renderAnnotationLayer={false} // Performance optimization
                  />
                </Document>
              )}

              {/* PDF Controls */}
              {state.pdfLoaded && state.numPages > 1 && (
                <div className="pdf-controls">
                  <Button
                    variant="outline-light"
                    disabled={state.pageNumber <= 1}
                    onClick={() => setState(prev => ({
                      ...prev,
                      pageNumber: prev.pageNumber - 1
                    }))}
                    className="page-btn"
                  >
                    Previous
                  </Button>
                  <span className="page-info">
                    Page {state.pageNumber} of {state.numPages}
                  </span>
                  <Button
                    variant="outline-light"
                    disabled={state.pageNumber >= state.numPages}
                    onClick={() => setState(prev => ({
                      ...prev,
                      pageNumber: prev.pageNumber + 1
                    }))}
                    className="page-btn"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Bottom Action */}
        <Row style={{ justifyContent: "center", marginTop: "30px" }}>
          <Col xs="auto">
            <Button
              variant="primary"
              href={pdf}
              target="_blank"
              className="download-btn primary"
              onClick={handleDownload}
            >
              <AiOutlineDownload />
              Download Resume
            </Button>
          </Col>
        </Row>

        {/* Additional Info */}
        <div className="resume-info">
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <div className="info-card">
                <h5>📄 About This Resume</h5>
                <p>
                  This resume is regularly updated with my latest projects, skills, and experiences.
                  It's optimized for both ATS systems and human reviewers.
                </p>
                <div className="resume-stats">
                  <div className="stat-item">
                    <span className="stat-number">1+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">3+</span>
                    <span className="stat-label">Projects Completed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">10+</span>
                    <span className="stat-label">Technologies</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default React.memo(ResumeNew);
