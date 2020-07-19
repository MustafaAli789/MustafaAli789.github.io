import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AlertDialog from "./AlertDialog"
import LinearProgress from '@material-ui/core/LinearProgress';
import BookInfo from "./BookInfo"
import './BookCard.css'

const BookCard = ({showProgressBar, page, myRating, selected, id, name, author, desc, rating, category, imageSrc, type, updateMyBooks}) => {
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [bookInfoOpen, setBookInfoOpen] = useState(false);
    const getStarredIcon = () => {
        if(!selected) {
            return(<StarBorderIcon fontSize="small"/>)
        } else {
            return(<StarIcon fontSize="small"/>)
        }
    }
    const getSnackBarMessage = () => {
        if(selected) return `Added ${name} to my books!`
        else return `Removed ${name} from my books!`
    }

    const getStyle = (component) => {
        if(component === "div") {
            if(type==="row") {
                return {
                    marginLeft:"1rem",
                    display: "flex",
                    flexDirection: "column"
                }
            } else {return{}}
        }

        if(component === "img") {
            if (type === "row") {
                return {
                    maxHeight: "100px"
                }
            } else {
                return {width: "100%", minHeight: "150px", objectFit: "cover"}
            }
        }

        if (component === "cardContent") {
            if (type === "row") {
                return {
                    padding: "5px",
                    display: "flex"
                }
            } else {
                return {padding: "5px"}
            }
        }

        if (component === "div2") {
            if (type === "row") {
                return {
                    marginTop: "auto",
                    display: "flex"
                }
            } else {
                return {marginTop: "6px", display: "flex"}
            }
        }
    }
    
    const renderDescription = () => {
        if (type === "row") {
            return(
                <Typography className="descContainer" variant="body2" component="p" style={{ marginTop: "0.2rem", fontSize: "10px", whiteSpace: "break-space", overflowY:"scroll", maxHeight: "55px" }}>
                    {desc}
                </Typography>
            )
        } else return null;
    }

    const renderAuthor = () => {
        if (type === "row") {
            return(
                <Typography color="textSecondary" style={{ fontSize: 12 }}>
                    {author}
                </Typography>
            )
        } else return null;
    }

    const updateBooks = () => {
        if(!selected) {
            setSnackBarOpen(true);
            updateMyBooks('ADD', {id: id, page: 0, rating: 0})
        } else {
            setAlertDialogOpen(true)
        }
    }
    
    const handleAlertSelection = (choice) => {
        if (choice === "AGREE") {
            setSnackBarOpen(true);
            updateMyBooks('REMOVE', {id: id})
            setAlertDialogOpen(false);
        } else if (choice === "DISAGREE") {
            setAlertDialogOpen(false);
        }
    }

    return(
        <div style={{  width: type==="row" ? "100%" : "33%" }}>

            <Card className={"card-"+name} style={{ width: "100%", boxShadow: "none", marginTop: "10px" }}>
                <CardContent onClick={(e)=>{
                    if(!(e.target.tagName === "path" || e.target.tagName === "svg")) setBookInfoOpen(true);
                    }} className="cardContent" style={getStyle("cardContent")}>
                    <img style={getStyle("img")} src={require("../Assets/"+imageSrc)}></img>
                    {showProgressBar && <LinearProgress variant="determinate" value={(page/500)*100} />}
                    <div style={getStyle("div")}>
                        <Tooltip title={name}>
                            <Typography variant="body2" component="p" style={{ fontWeight: "bold", lineHeight: "1.1", textOverflow: "ellipsis", whiteSpace:"nowrap", overflow: "hidden" }}>
                                {name}
                            </Typography>
                        </Tooltip>
                        {renderDescription()}
                        <div style={getStyle("div2")}>
                            {renderAuthor()}
                            <Typography color="textSecondary" style={{ fontSize: 12, marginLeft: type === "row" ? "auto" : "initial" }}>
                                {rating}
                            </Typography>
                            <IconButton style={{ padding: "0", marginTop: "-4px",  marginLeft: type === "row" ? "10px" : "auto" }} onClick={()=>{
                                updateBooks();
                                }}>
                                {getStarredIcon()}
                            </IconButton>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Snackbar open={snackBarOpen} autoHideDuration={2000} onClose={()=>setSnackBarOpen(false)}>
                <MuiAlert elevation={6} variant="filled" onClose={()=>setSnackBarOpen(false)} severity="success">
                    {getSnackBarMessage()}
                </MuiAlert>
            </Snackbar>
            <AlertDialog open={alertDialogOpen} handleClose={()=>setAlertDialogOpen(false)} title={"Remove Book from MyBooks"}
                content={"Are you sure you want to remove " +name+" from your books?"} agreeText={"Yes"} disagreeText={"No"} handleAlertSelection={handleAlertSelection}/>
            <BookInfo open={bookInfoOpen} handleClose={()=>setBookInfoOpen(false)} bookInfo={{
                Id: id, Author: author, Description: desc, Name: name, Category: category, ImageSrc: imageSrc, Rating: rating,Selected: selected, Page: page, MyRating: myRating
                }} updateMyBooks={updateMyBooks}/>
        </div>

    )
}

export default BookCard;