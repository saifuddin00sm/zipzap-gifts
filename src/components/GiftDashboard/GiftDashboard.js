
import { Row, Col, Container, Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

function GiftDashboard() {
    const [user] = useOutletContext();
    return (
        <Container className="main-container">
            <Row className="page-header justify-content-center">
                <Col  md="10">
                    <h1>Gift Dashboard</h1>
                </Col>
                <Col md="2">
                    <Button>Send a Gift</Button>
                </Col>
            </Row>
            <hr/>
        </Container>
    );
}
export default GiftDashboard;