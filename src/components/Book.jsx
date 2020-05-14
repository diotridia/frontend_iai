import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookList from "../BookList";
import SearchBar from "./SearchBar";

const Book = () => {
  return (
    <div>
      <Container>
     
        <Row className="justify-content-md-center">
          <Col>
          <BookList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Book;
