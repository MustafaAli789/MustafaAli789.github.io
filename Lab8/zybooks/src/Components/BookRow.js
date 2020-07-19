import React, { useState } from 'react'
import BookCard from './BookCard'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import './BookRow.css'

const BookRow = ({bookCategoryObject, updateMyBooks, myBooks, showProgressBar}) => {

    const getBooksArray = () => {
        return bookCategoryObject.Books.map((book,i)=>{
            let selected = false;
            let page = 0;
            let myRating = 0;
            myBooks.forEach(myBook => {
                if(myBook.id === book.id) {
                    selected = true;
                    page = myBook.page;
                    myRating = myBook.rating;
                }   
            })
            return(<BookCard page={page} myRating={myRating} showProgressBar={showProgressBar} selected={selected} id={book.id} updateMyBooks={updateMyBooks} key={i} type={"col"} name={book.Name} author={book.Author} desc={book.Description} rating={book.Rating+"/5.00"} imageSrc={book.ImageSrc} category={bookCategoryObject.Category}/>)
        })
    }

    return(
        <React.Fragment>
            <Typography variant="h6" style={{fontWeight: "300", fontSize: "1rem", marginTop: "0.5rem"}}>
                {bookCategoryObject.Category}
            </Typography>
            <Divider light/>
            <div className="scrollingWrapper">
            {   getBooksArray()}
             </div>
        </React.Fragment>
    )
}

export default BookRow;