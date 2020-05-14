import React from 'react';
import { Button, Card, CardDeck, Col, Row } from 'react-bootstrap';

class AddForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            books: [],
            error : null
        }
    }

    componentDidMount() {
        const URL = "http://127.0.0.1:8000/api/book";
        fetch(URL)
        .then(res => res.json())
        .then(response => {
            this.setState({books: response.result})
        }),
        (error) => {
            this.setState({ error });
        }
    }

    render(){
        const { books, error } = this.state;
        console.log(books);
        if(error){
            return ( <div>Error : {error.message}</div>);
        } else {
            return (
                <Row>
                {books.map(book => (
                    <Col md={3}>
                        <Card key={book.id}>
                            <Card.Img variant="top" src={book.image_url} />
                            <Card.Body>
                            <Card.Title>{book.nama}</Card.Title>
                            <Card.Text>
                                {/* <p>{wayang.golongan}</p>
                                <p>{wayang.kasta}</p>
                                <p>{wayang.senjata}</p>
                                <p>{wayang.ayah}</p>
                                <p>{wayang.ibu}</p>
                                <p>{wayang.pasangan}</p>
                                <p>{wayang.anak}</p> */}
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={() => this.props.editBook(book.id)}>Edit</Button>
                                &nbsp;<Button variant="danger" onClick={() => this.deleteBook(wayang.id)}>Delete</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
                </Row>
            )
        }
    }
}

export default AddForm;