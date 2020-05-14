import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CategoryNav from "./contents/CategoryNav";
import BookList from "../BookList";
import SearchBar from "./SearchBar";

const Book = () => {
  return (
    <div>
      <Container>
        <CategoryNav />
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
