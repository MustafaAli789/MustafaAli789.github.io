import React, { useState } from 'react'
import BookCard from './BookCard'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import './BookRow.css'

const BookRow = ({bookCategoryObject}) => {

    const getBooksArray = () => {
        return bookCategoryObject.Books.map((book,i)=>{
            return(<BookCard key={i} name={book.Name} author={book.Author} desc={book.Description} rating={book.Rating+"/5.00"} imageSrc={book.ImageSrc} category={bookCategoryObject.Category}/>)
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