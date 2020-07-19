import React, {useState} from 'react';
import SearchBar from './SearchBar';
import Typography from '@material-ui/core/Typography';
import Books from "../Books";
import BookCard from "./BookCard"

class SearchPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            filteredBooks: []
        }
    }

    onChange = (val, searchType) => {
        let newFilteredBooks = []

        if (val === "") {
            this.setState({ filteredBooks: newFilteredBooks })
            return;
        }

        Books.forEach(category => {
            category.Books.forEach(book => {
                if (searchType === "Name" && book.Name.toLowerCase().includes(val.toLowerCase())) {
                    newFilteredBooks.push([category.Category, book]);
                } else if (searchType === "Author" && book.Author.toLowerCase().includes(val.toLowerCase())) {
                    newFilteredBooks.push([category.Category, book]);
                }
            })
        });
        this.setState({ filteredBooks: newFilteredBooks })
    }

    renderNoBooks = () => {
        if (this.state.filteredBooks.length === 0) {
            return(
                <React.Fragment>
                    <img style={{ width: "max-content" }} src={require("../Assets/bookNotFound.png")}></img>
                    <Typography variant="h5" style={{ fontWeight:"lighter", color:"#b2b2b2", marginTop: "1rem" }}>
                        No Books Found
                    </Typography>
                </React.Fragment>
            )
        } else {return null; }
    }

    renderBooks = () => {
        return this.state.filteredBooks.map((book, i) => {
            let selected = false;
            let page = 0;
            let myRating = 0;
            this.props.myBooks.forEach(myBook => {
                if(myBook.id === book[1].id) {
                    selected = true;
                    page = myBook.page;
                    myRating = myBook.rating;
                }   
            })
            return <BookCard page={page} myRating={myRating} showProgressBar={false} selected={selected} id={book[1].id} updateMyBooks={this.props.updateMyBooks} key={i} name={book[1].Name} author={book[1].Author} category={book[0]} type={"row"} desc={book[1].Description} rating={book[1].Rating+"/5.00"} imageSrc={book[1].ImageSrc} />
        })
    }

    render(){
        return(
            <React.Fragment>
                <SearchBar handleChange={this.onChange}/>
                <div style={{ display: "flex", alignItems: "center", marginTop: "1rem", flexDirection: "column" }} className="results">
                    {this.renderNoBooks()}
                </div>
                {this.renderBooks()}
                <div className="pusher"></div>
            </React.Fragment>
        )
    }
}

export default SearchPage;