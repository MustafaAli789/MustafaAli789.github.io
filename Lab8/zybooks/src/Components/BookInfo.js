import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
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
import LinearProgress from '@material-ui/core/LinearProgress';
import BookReadPage from "./BookReadPage"
import {Language} from "../Language"
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

export default function BookInfo({open, handleClose, bookInfo, updateMyBooks}) {
    const classes = useStyles();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [bookReadPageOpen, setBookReadPageOpen] = useState(false);
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
    const toggleBookInMyBooks = () => {
        if(!bookInfo.Selected) {
            setSnackBarOpen(true);
            updateMyBooks('ADD', {id: bookInfo.Id, page: 0, rating: 0})
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
    return (
        <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <Grid container>
                <Grid style={{ display: "flex", padding: "1.5rem" }} container xs={12}>
                    <Grid item xs={3}>
                        <IconButton style={{ marginTop: "-1.5rem", marginLeft: "-1.5rem"}} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <img className={"bookInfoImg"} src={require("../Assets/"+bookInfo.ImageSrc)}></img>
                        {bookInfo.Selected && <LinearProgress variant="determinate" value={(bookInfo.Page/10)*100} />}
                        <div style={{ display: "flex", justifyContent:"center", marginTop: "0.25rem" }}>
                            <Typography color="textSecondary" style={{ fontSize: 14}}>
                                {bookInfo.Rating}
                            </Typography>
                            <IconButton style={{ padding: "0", marginTop: "-4px",  marginLeft: "6px" }} onClick={()=>{
                                toggleBookInMyBooks();
                                }}>
                                {getStarredIcon()}
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
                <Grid style={{ textAlign:"center" }} item xs={12}>
                    <Typography variant="h6" style={{fontWeight: "bold", fontSize: "1rem"}}>
                        {bookInfo.Name}
                    </Typography>
                </Grid>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                    <Typography variant="h6" style={{fontWeight: "300", fontSize: "1rem"}}>
                        {bookInfo.Author}
                    </Typography>
                </Grid>
                <Grid style={{ paddingLeft:"1.5rem", paddingRight: "1.5rem", marginTop: "1.5rem" }} item xs={12}>
                    <Divider light/>
                </Grid>
                <Grid style={{ padding:"0.75rem 1.5rem 0.75rem 1.5rem" }} container xs={12}>
                    <Grid item xs={6}>
                        <Typography style={{ fontSize: "8px"}} color="textSecondary" gutterBottom>
                            Genre
                        </Typography>
                        <Typography style={{ fontSize: "12px"}} gutterBottom>
                            {bookInfo.Category}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography style={{ fontSize: "8px"}} color="textSecondary" gutterBottom>
                            {Language === "English" ? "Launches" : "Lancements"}
                        </Typography>
                        <Typography style={{ fontSize: "12px"}} gutterBottom>
                            2018
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography style={{ fontSize: "8px"}} color="textSecondary" gutterBottom>
                                {Language === "English" ? "Size" : "Taille"}
                        </Typography>
                        <Typography style={{ fontSize: "12px"}} gutterBottom>
                            500 Pages
                        </Typography>
                    </Grid>
                </Grid>
                <Grid style={{ padding: "1.5rem", paddingTop: "0", paddingBottom:"0.75rem" }} item xs={12}>
                    <Typography style={{ fontSize: "8px"}} color="textSecondary" gutterBottom>
                        Synopsis
                    </Typography>
                    <Typography style={{ fontSize: "12px"}} gutterBottom>
                        {bookInfo.Description}
                    </Typography>
                </Grid>   
                <Grid style={{ padding:"1.5rem", paddingTop: "0", paddingBottom: "0.75rem" }} item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style={{ width: "100%" }}
                        startIcon={<ChromeReaderModeIcon />}
                        onClick={()=>setBookReadPageOpen(true)}
                    >
                        {Language === "English"? "Read" : "Lis"}
                    </Button>
                </Grid> 
                <Grid style={{ paddingLeft:"1.5rem", paddingRight: "1.5rem" }} item xs={12}>
                    <Divider light/>
                </Grid> 
                <Grid style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", paddingLeft:"1.5rem", paddingRight: "1.5rem", paddingTop: "0.75rem", marginBottom: "0.75rem" }} item xs={12}>
                    <Typography variant="h6" style={{fontWeight: "400", fontSize: "0.85rem"}}>
                        {Language === "English" ? "Rate This Book" : "Evaluer ce Livre"}
                    </Typography>
                    <Rating name="half-rating" defaultValue={bookInfo.MyRating} precision={0.5} onChange={(e, val)=>updateBook(bookInfo.Id, bookInfo.Page, val)} />
                </Grid>        
            </Grid>
        </Dialog>
        <Snackbar open={snackBarOpen} autoHideDuration={2000} onClose={()=>setSnackBarOpen(false)}>
            <MuiAlert elevation={6} variant="filled" onClose={()=>setSnackBarOpen(false)} severity="success">
                {getSnackBarMessage()}
            </MuiAlert>
        </Snackbar>
        <AlertDialog open={alertDialogOpen} handleClose={()=>setAlertDialogOpen(false)} title={Language === "English" ? "Remove Book from MyBooks" : "Supprimer le livre de MyBooks"}
                content={Language === "English" ? "Are you sure you want to remove " +bookInfo.Name+" from your books?" : "Voulez-vous vraiment supprimer " + bookInfo.Name +" de vos livres?"} agreeText={Language === "English" ? "Yes":"Oui"} disagreeText={Language === "English" ? "No":"Non"} handleAlertSelection={handleAlertSelection}/>
        <BookReadPage open={bookReadPageOpen} handleClose={()=>setBookReadPageOpen(false)} bookInfo={bookInfo} updateMyBooks={updateMyBooks} />
    </div>
  );
}