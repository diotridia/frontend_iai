import React from "react";
import API from "./API";
import { Button, Form, Modal } from "react-bootstrap";

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      error: null,
      data: {
        id: 0,
        title: "",
        author: "",
        publisher: "",
        image_url: "",
      },
      modalShow: false,
      isUpdate: false,
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.setState({ isUpdate: true });
      this.displayData();
    }
  }

  handleFormChange = (event) => {
    let newData = { ...this.state.data };
    newData[event.target.name] = event.target.value;
    this.setState({ data: newData });
  };

  handleFormSubmit = () => {
    this.props.onSubmit("a");
  }

  getBook = () => {
    API.get(`/book/${this.props.id}`)
      .then((res) => {
        this.setState({ data: res.data.result });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  displayData = () => {
    this.getBook();
  };

  saveBuku = () => {
    let data = this.state.data;
    const options = {
      headers: { "Content-Type": "application/json" },
    };

    if (this.state.isUpdate) {
      API.put(`/book/${this.props.id}`, data, options)
        .then((res) => {
          this.setState({
            response: res.data.result,
          });
        })
        .catch((error) => {
          this.setState({ error });
        });
    } else {
      API.post("/book", data, options)
        .then((res) => {
          this.setState({
            response: res.data.result,
          });
        })
        .catch((error) => {
          this.setState({ error });
        });
    }
    
    this.handleFormSubmit();
    this.setState({ modalShow: false });
  };

  render() {
    return (
      <div>
        <Button size="sm" onClick={() => this.setState({ modalShow: true })}>
          {this.props.text}
        </Button>
        <Modal
          size="md"
          show={this.state.modalShow}
          onHide={() => false}
          aria-labelledby="example-modal-sizes-title-md"
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-md">
              {this.state.isUpdate ? "Edit " : "Add "}
              Book
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="title"
                  value={this.state.data.title}
                  onChange={this.handleFormChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  placeholder="author"
                  value={this.state.data.author}
                  onChange={this.handleFormChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Publisher</Form.Label>
                <Form.Control
                  type="text"
                  name="publisher"
                  placeholder="Publisher"
                  value={this.state.data.publisher}
                  onChange={this.handleFormChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image_url"
                  placeholder="Image URL"
                  value={this.state.data.image_url}
                  onChange={this.handleFormChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={this.saveBuku}>
                Save
              </Button>
              &nbsp;
              <Button
                variant="secondary"
                onClick={() => this.setState({ modalShow: false })}
              >
                Cancel
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
