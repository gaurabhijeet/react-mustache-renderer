import { Col, Row } from "react-bootstrap";

import { MustacheRender } from "./MustacheRender";

function App() {
  return (
    <Row>
      <Col sm={6}> some code as per mock</Col>
      <Col>
        <MustacheRender />
      </Col>
    </Row>
  );
}

export default App;
