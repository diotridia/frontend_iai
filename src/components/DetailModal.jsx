import React from "react";
import API from "./../API";
import { Container, Modal, Col, Row, Button } from "react-bootstrap";
import Img from "./ImageComponent";

class DetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idBook: 0,
      response: [],
      error: null,
      data: {
        id: 0,
        title: "",
        author: "",
        publisher: "",
      },
      modalShow: false,
    };
  }

  componentDidMount() {
    console.log("cek "+this.props.idBook)
  }

  componentWillReceiveProps(nextProps){
    console.log("cek "+nextProps.idBook)
    if (nextProps.idBook > 0) {
      this.setState({ idBook: nextProps.idBook });
      this.getBook();
      this.setState({ modalShow: nextProps.show });
      console.log(this.state.data)
      console.log(nextProps.idBook)
    }
  }

  getBook = () => {
    API.get(`/book/${this.state.idBook}`)
      .then((res) => {
        this.setState({ data: res.data.result });
        this.forceUpdate()
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <div>
        <Modal
          size="md"
          show={this.state.modalShow}
          onHide={() => false}
          aria-labelledby="example-modal-sizes-title-md"
        >
        <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-md">
              Book Detail
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col lg={4}>
                  <Img src={this.state.data.image_url} style={{ width: "100%" }} />
                </Col>
                <Col lg={8}>
                  <table>
                  <tbody>
                    <tr>
                      <td>Title</td>
                      <td>: {this.state.data.title}</td>
                    </tr>
                    <tr>
                      <td>Author</td>
                      <td>: {this.state.data.author}</td>
                    </tr>
                    <tr>
                      <td>Publisher</td>
                      <td>: {this.state.data.publisher}</td>
                    </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
            </Container>
            <Button
                variant="secondary"
                onClick={() => this.setState({modalShow: false})}
              >
                Batal
              </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default DetailModal;
