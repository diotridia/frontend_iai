import React from 'react';
import { Button, Table } from 'react-bootstrap';

class WL extends React.Component{

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
            <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Image URL</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.image_url}</td>
                  <td>
                    <Button onClick={() => this.props.editBook(book.id)}>Edit</Button>
                    &nbsp;<Button onClick={() => this.deleteBook(book.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
            )
        }
    }
}

export default WL;