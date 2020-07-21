import React, {useState, useEffect} from 'react'
import Books from "../Books"
import BooksFrench from "../BooksFrench"
import {Language, setLanguage} from "../Language"
import BookCard from "./BookCard"
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Carousel from 'react-material-ui-carousel'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import {Paper} from '@material-ui/core'
import BookInfo from "./BookInfo"
import "./MyBooks.css"

function Item(props)
{
    let bookInfo = props.item[1];
    let myBookInfo = props.item[2];
    const [bookInfoOpen, setBookInfoOpen] = useState(false);

    return (
        <React.Fragment>
            <Paper className="myBooksSlideshowItem" style={{ height: "50vh"}} onClick={()=>setBookInfoOpen(true)}>
                <img style={{ height: "100%", width: "100%", objectFit:"cover" }} src={require("../Assets/"+bookInfo.ImageSrc)}></img>
                <div style={{ position:"absolute", top:"20px", left:"20px", right: "20px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "black", height: "fit-content", padding: "5px" }}>
                    <Typography variant="h6" style={{ fontWeight:"lighter", color:"#b2b2b2", color: "white"}}>
                        {bookInfo.Name}
                    </Typography>
                </div>
            </Paper>
            <BookInfo open={bookInfoOpen} handleClose={()=>setBookInfoOpen(false)} bookInfo={{
                Id: myBookInfo.id, Author: bookInfo.Author, Description: bookInfo.Description, Name: bookInfo.Name, Category: props.item[0], ImageSrc: bookInfo.ImageSrc, Rating: bookInfo.Rating+"/5.00",Selected: true, Page: myBookInfo.page, MyRating: myBookInfo.rating
                }} updateMyBooks={props.updateMyBooks}/>
        </React.Fragment>
    )
}

export default function MyBooksPage({updateMyBooks, myBooks, changePage}){
    const [booksArr, setBooksArr] = useState([]);
    const[carouselItems, setCarouselItems] = useState([])
    
    useEffect(() => {
        let myBooksArr = []
        let books;
        if (Language === "English") books = Books;
        else books = BooksFrench;
        myBooks.forEach(myBook => {
            let bookInfo;
            let found = false;
            for (let i = 0; i<Books.length; i++) {
                if (found) break;
                for (let j =0; j<books[i].Books.length; j++) {
                    if(books[i].Books[j].id === myBook.id) {
                        found = true;
                        bookInfo = [books[i].Category, books[i].Books[j], myBook];
                        break;
                    }
                }
            }
            myBooksArr.push(bookInfo);
        })
        
        if (myBooksArr.length === 1) {
            setCarouselItems([myBooksArr[0]]);
        } else if (myBooksArr.length === 2) {
            setCarouselItems([myBooksArr[0], myBooksArr[1]]);
        } else if (myBooksArr.length >= 3) {
            setCarouselItems([myBooksArr[0], myBooksArr[1], myBooksArr[2]]);
        }
        setBooksArr(myBooksArr);
    }, [myBooks]);
    const renderbooksGrid = () => {
        return booksArr.map((book, i) => {
            return(<BookCard page={book[2].page} myRating={book[2].rating} showProgressBar={true} selected={true} id={book[1].id} updateMyBooks={updateMyBooks} key={i} name={book[1].Name} author={book[1].Author} category={book[0]} type={"col"} desc={book[1].Description} rating={book[1].Rating+"/5.00"} imageSrc={book[1].ImageSrc}/>)
        })
    }
    return(
        <div style={{ marginTop: myBooks.length > 0 ? "4rem" : "0rem", height: "100%", display: myBooks.length > 0 ? "inherit":"flex", alignItems:"center", justifyContent:"center" }}>
            {myBooks.length === 0 && 
                <div style={{ display: "flex", alignItems:"center", justifyContent: "center", flexDirection:"column" }}>
                    <IconButton onClick={()=>changePage(0)}>
                        <AddCircleOutlineIcon style={{ fontSize: "6rem" }} />
                    </IconButton>
                    <Typography variant="h5" style={{ fontWeight:"lighter", color:"#b2b2b2" }}>
                            {Language === "English" ? "Add Book" : "Ajouter un Livre"}
                    </Typography>
                </div>
            }
            {myBooks.length > 0 &&
                <React.Fragment>
                    <Carousel interval={2500}>
                        {
                            carouselItems.map( item => <Item item={item} updateMyBooks={updateMyBooks} /> )
                        }
                     </Carousel>
                    <Typography variant="h6" style={{fontWeight: "300", fontSize: "1rem", marginTop: "0.5rem"}}>
                        { Language === "English" ? "All Books" : "Tous les livres"}
                    </Typography>
                    <Divider light/>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {renderbooksGrid()}
                    </div>
                </React.Fragment>
            }
            <div className="pusher"></div>
        </div>
    )
}