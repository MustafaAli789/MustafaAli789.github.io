import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AlertDialog from "./AlertDialog"
import Rating from '@material-ui/lab/Rating';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Slider from '@material-ui/core/Slider';
import {Language} from "../Language"
import "./BookReadPage.css"
import "./BookInfo.css"

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BookReadPage({open, handleClose, bookInfo, updateMyBooks}) {
    const classes = useStyles();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [curPage, setCurPage] = useState(0);
    const [pageText, setPageText] = useState("")

    useEffect(()=>{
        setCurPage(bookInfo.Page)   
    }, [])

    useEffect(()=>{
        updateBookTest();
    }, [bookInfo])

    const getStarredIcon = () => {
        if(!bookInfo.Selected) {
            return(<StarBorderIcon fontSize="small"/>)
        } else {
            return(<StarIcon fontSize="small"/>)
        }
    }

    const getSnackBarMessage = () => {
        if(bookInfo.Selected){ 
            return Language === "English" ? `Added ${bookInfo.Name} to my books!` : `Ajouté ${bookInfo.Name} à mes livres!`
        }
        else {
            return Language === "English" ? `Removed ${bookInfo.Name} from my books!` : `Supprimé ${bookInfo.Name} de mes livres!`
        }
    }

    const updateBookTest = async () => {
        const text = await import(`../Assets/Book1/Page${curPage}.js`);
        setPageText(text.default.text)
    }

    //TODO
    const toggleBookInMyBooks = () => {
        if(!bookInfo.Selected) {
            setSnackBarOpen(true);
            updateMyBooks('ADD', {id: bookInfo.Id, page: curPage, rating: 0})
        } else {
            setAlertDialogOpen(true)
        }
    }

    const updateBook = (id, page, rating) => {
        updateMyBooks('REPLACE', {id: id, page: page, rating: rating})
    }
    
    const handleAlertSelection = (choice) => {
        if (choice === "AGREE") {
            setSnackBarOpen(true);
            updateMyBooks('REMOVE', {id: bookInfo.Id})
            setAlertDialogOpen(false);
        } else if (choice === "DISAGREE") {
            setAlertDialogOpen(false);
        }
    }

    function valuetext(value) {
        return `Page ${value}`;
      }
      
    return (
        <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <div className="topBar">
                <IconButton style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" style={{fontWeight: "bold", fontSize: "1rem", textAlign:"center"}}>
                    {bookInfo.Name}
                </Typography>
                <IconButton onClick={()=>{
                    toggleBookInMyBooks();
                    }}>
                    {getStarredIcon()}
                </IconButton>
            </div>
            <div className="booktext" style={{ overflowY: "scroll", overflowX: "hidden" }}>
                <Typography variant="h6" style={{fontWeight: "400", fontSize: "0.75rem", textAlign:"center"}}>
                    <pre style={{ whiteSpace: "break-spaces", fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif', fontSize: "0.8rem" }}>
                        {pageText}
                    </pre>
                </Typography>
            </div>
            <div className="bookReadControlBar">
                <IconButton edge="start" disabled={curPage === 0} color="inherit" onClick={handleClose} aria-label="arrowBackPage" onClick={()=>{
                     let newPage = curPage;
                     newPage--;
                     setCurPage(newPage);
                     updateBook(bookInfo.Id, newPage, bookInfo.MyRating)
                }}>
                    <ArrowBackIcon />
                </IconButton>
                <div style={{ width:"80%", textAlign:"center" }}>
                    <Typography variant="h6" style={{fontWeight: "300", fontSize: "1rem"}}>
                        Page {curPage}
                    </Typography>
                    <Slider
                        value={curPage}
                        getAriaValueText={valuetext}
                        step={1}
                        marks
                        min={0}
                        max={10}
                        valueLabelDisplay="auto"
                        style={{ width: "80%" }}
                        onChange={(e, val)=>{
                            setCurPage(val);
                            updateBook(bookInfo.Id, val, bookInfo.MyRating)
                        }}
                    />
                </div>
                <IconButton disabled={curPage === 10} edge="start" color="inherit" onClick={handleClose} aria-label="close" onClick={()=>{
                    let newPage = curPage;
                    newPage++;
                    setCurPage(newPage);
                    updateBook(bookInfo.Id, newPage, bookInfo.MyRating)
                }}>
                    <ArrowForwardIcon />
                </IconButton>
            </div>
        </Dialog>
        <Snackbar open={snackBarOpen} autoHideDuration={2000} onClose={()=>setSnackBarOpen(false)}>
            <MuiAlert elevation={6} variant="filled" onClose={()=>setSnackBarOpen(false)} severity="success">
                {getSnackBarMessage()}
            </MuiAlert>
        </Snackbar>
        <AlertDialog open={alertDialogOpen} handleClose={()=>setAlertDialogOpen(false)} title={Language === "English" ? "Remove Book from MyBooks" : "Supprimer le livre de MyBooks"}
                content={Language === "English" ? "Are you sure you want to remove " +bookInfo.Name+" from your books?" : "Voulez-vous vraiment supprimer " + bookInfo.Name +" de vos livres?"} agreeText={Language === "English" ? "Yes":"Oui"} disagreeText={Language === "English" ? "No":"Non"} handleAlertSelection={handleAlertSelection}/>
    </div>
  );
}