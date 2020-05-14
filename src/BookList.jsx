import React from "react";
import API from "./API";
import { Button, Card, Col, Row } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import DetailModal from "./components/DetailModal";
import SearchBar from "./components/SearchBar";
import Swal from "sweetalert2";
import Img from "./components/ImageComponent";

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: null,
      show: false,
      deleting: false,
      showDetail: false,
      idDetail: 0,
    };
  }

  componentDidMount() {
    this.getBook();
  }

  handleFS = (value) => {
    this.setState({ show: true });
    this.getBook();
    Swal.fire("Book", "Berhasil disimpan!", "success");
  };    

  handleSearch(query){
    if(query){
    API.get(`/book/search/${query}`)
      .then((res) => {
        this.setState({ books: res.data.result });
      })
      .catch((error) => {
        this.setState({ error });
      });
      this.render();
    } else {
      this.getBook()
    }
    
  }

showDetail =(id)=>{
  if(id != "0"){
  this.setState({idDetail: id})
  this.setState({showDetail: true})
  }
  console.log("tes "+id)
}

  getBook() {
    API.get("/book")
      .then((res) => {
        this.setState({ books: res.data.result });
      })
      .catch((error) => {
        this.setState({ error });
      });
    this.render();
  }

  deleteBook = (id) => {
    this.setState({ delete: true });
    API.delete("/book/" + id)
      .then((res) => {
        this.getBook();
        Swal.fire("Book", "Berhasil dihapus!", "success");
      })
      .catch((error) => {
        this.setState({ error });
        Swal.fire("Oops..", "Gagal dihapus!", "error");
      });
    this.setState({ delete: false });
  };

  render() {
    const { books, error, deleting } = this.state;
    return (
      <div>
        <SearchBar onSubmit={val => this.handleSearch(val)} />
        <DetailModal idBook={this.state.idDetail} show={this.state.showDetail}/>
        <ModalComponent
          text="Tambah Buku"
          onSubmit={(value) => this.handleFS(value)}
        />
        <Row style={{ marginTop: 10 }}>
          {error ? (
            <div>
              Gagal memuat data <br></br> Error : {error.message}
            </div>
          ) : (
            books.map((book) => (
              <Col sm={6} md={3} lg={2} key={book.id}>
                <Card onClick={event => this.showDetail(book.id)}>
                  <div style={{ height: 250, position: "relative" }}>
                    <Img src={book.image_url} style={{ width: "100%" }} />
                  </div>
                  <Card.Body>
                    <Card.Title as="h6">{book.title}</Card.Title>
                    <Card.Text></Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Row>
                      <ModalComponent
                        id={book.id}
                        text="Ubah"
                        onSubmit={(value) => this.handleFS(value)}
                      />
                      &nbsp;
                      <Button
                        size="sm"
                        variant="danger"
                        disabled={deleting}
                        onClick={() => this.deleteBook(book.id)}
                      >
                        {deleting ? "Tunggu.." : "Hapus"}
                      </Button>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    );
  }
}

export default BookList;
