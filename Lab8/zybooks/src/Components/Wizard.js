import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Dialog2 from "./Dialog"
import Books from "../Books"
import BooksFrench from "../BooksFrench"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BookCard from "./BookCard"
import {Language} from "../Language"
import "./Wizard.css"
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

const SimilarBook = ({imageSrc}) => {
    const [selected, setSelected] = useState(false);
    return(
        <div onClick={()=>setSelected(!selected)} className="similarBook" style={{ width: "33%", padding: "10px", position: "relative" }}>
            {selected && (
                <CheckCircleOutlineIcon style={{ position: "absolute", backgroundColor: "white" }} />)}
            <img style={{width: "100%"}} src={require("../Assets/"+imageSrc)}></img>
        </div>
    )
}

export default function Wizard({open, handleClose, myBooks, updateMyBooks}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [age, setAge] = useState(1);
    const [name, setName] = useState(Language === "English" ? "Name" : "Nom");
    const [gender, setGender] = useState("female")
    const [dialogOpen, setOpenDialog] = useState(false)
    const [category, setCategory] = useState("Weeks Hot Picks")
    const [similarBooks, setSimilarBooks] = useState([])

    useEffect(()=>{
        let myBooksArr = []
        myBooks.forEach(myBook => {
            let bookInfo;
            let found = false;
            let books;
            if (Language === "English") books = Books;
            else books = BooksFrench;
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
        setSimilarBooks(myBooksArr)
    }, [myBooks])

    function getSteps() {
        return [Language === "English" ? 'Basic Info' : 'Informations de base',Language === "English" ?  'Similar Books':'Livres similaires',Language === "English" ?  'Book Recommendations':'Livre Recommandations'];
      }
    const steps = getSteps();

    const handleNext = () => {
        if (activeStep === 0 && name === "") {
            setOpenDialog(true);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleReset = () => {
        setActiveStep(0);
      };

      const items=[1, 2, 3,4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26, 27, 28, 29, 30]
      const categories=["Weeks Hot Picks", "Action Adventure", "Young Adult", "Dystopian", "Non-Fiction"]

      const renderGrid = () => {
        return similarBooks.map(book => {
            return <SimilarBook imageSrc={book[1].ImageSrc}/>
        })
      }

      const renderRecommendations = () => {
        let newFilteredBooks = []
        let val = "h"
        let books;
        if (Language === "English") books = Books;
        else books = BooksFrench;
        books.forEach(category => {
            category.Books.forEach(book => {
                if (book.Name.toLowerCase().includes(val.toLowerCase())) {
                    newFilteredBooks.push([category.Category, book]);
                }
            })
        });

        return newFilteredBooks.map((book, i) => {
            let selected = false;
            let page = 0;
            let myRating = 0;
            myBooks.forEach(myBook => {
                if(myBook.id === book[1].id) {
                    selected = true;
                    page = myBook.page;
                    myRating = myBook.rating;
                }   
            })
            return <BookCard page={page} myRating={myRating} showProgressBar={false} selected={selected} id={book[1].id} updateMyBooks={updateMyBooks} key={i} name={book[1].Name} author={book[1].Author} category={book[0]} type={"row"} desc={book[1].Description} rating={book[1].Rating+"/5.00"} imageSrc={book[1].ImageSrc} />
        })
      }

    const renderStep = () => {
        if (activeStep === 0) {
            return(<div style={{padding: "1rem", display: "flex", flexDirection: "column" }}>
                <TextField size="small" onChange={(e)=>setName(e.target.value)} required error={age.length === 0} id="standard-error" label={Language === "English" ? "Enter Name" : "Entrez le nom"} defaultValue={Language === "English" ? "Name" : "Nom"} />
                <TextField
                    id="standard-select-age"
                    select
                    label={Language === "English" ? "Select Age" : "Sélectionnez l'âge"}
                    value={age}
                    required
                    onChange={(e)=>setAge(e.target.value)}
                    helperText={Language === "English" ? "Please select your age" : "Veuillez sélectionner votre âge"}
                    style={{ marginTop: "1rem" }}
                    size="small"
                    >
                    {items.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <FormControl component="fieldset" style={{ marginTop: "1rem" }}>
                    <FormLabel style={{ fontSize: "0.8rem" }} component="legend">Gender</FormLabel>
                    <RadioGroup className="radioGroup" aria-label="gender" name="gender1" value={gender} onChange={(e)=>setGender(e.target.value)}>
                        <FormControlLabel value="female" control={<Radio />} label={Language === "English" ? "Female" : "Femme"} />
                        <FormControlLabel value="male" control={<Radio />} label={Language === "English" ? "Male" : "Masculin"} />
                        <FormControlLabel value="other" control={<Radio />} label={Language === "English" ? "Other" : "Autre"} />
                    </RadioGroup>
                </FormControl>
            </div>)
        } else if (activeStep === 1) {
            return(<div style={{ padding: "1rem", paddingTop: "0"}}>
                <TextField
                    id="standard-select-category"
                    select
                    label={Language==="English" ? "Select Category":"Choisir une catégorie"}
                    value={category}
                    required
                    onChange={(e)=>setCategory(e.target.value)}
                    helperText={Language === "English" ? "Please select your category" : "Veuillez sélectionner votre catégorie"}
                    style={{ marginTop: "1rem", width:"100%" }}
                    size="small"
                    >
                    {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Typography variant="h6" style={{fontWeight: "400", fontSize: "14px", marginTop: "1rem", color: "rgba(0, 0, 0, 0.54)"}}>
                    {Language === "English" ? "Select Similar Books from Your Shelf" : "Sélectionnez des livres similaires dans votre étagère"}
                </Typography>
                <Divider style={{ marginTop: "0.5rem" }} light/>
                <div className={"scrollingWrapper"} style={{ marginTop:"1rem" }}>
                    {renderGrid()}
                </div>
            </div>)
        } else if (activeStep === 2) {
            return(<div style={{ flexGrow: "1", padding: "1rem", paddingTop: "0" }}>
                {renderRecommendations()}
            </div>)
        }
    }

    return (
        <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <div className="topBar" style={{ justifyContent:"initial", zIndex: "100"}}>
                <IconButton style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" style={{fontWeight: "bold", fontSize: "1rem", textAlign:"center"}}>
                    {Language === "English" ? "Wizard" : "Sorcier"}
                </Typography>
            </div>
            <div>
                <Stepper className="stepper" activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                    <Step className="stepLabel" key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </div>
        <div style={{ padding: '1rem', paddingTop: "0", height: "100%", display: "flex", flexDirection: "column" }}>
            {renderStep()}
            {activeStep === steps.length ? (
            <div>
                <Typography>All steps completed</Typography>
                <Button onClick={handleClose}>Reset</Button>
            </div>
            ) : (
            <div style={{ marginTop: "auto" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                    >
                        {Language ==="English" ? "Back" : "Arrière"}
                    </Button>
                    <Button variant="contained" color="primary" onClick={()=>{
                        if (activeStep === steps.length - 1) {
                            handleClose();
                        }
                        handleNext();
                        }}>
                        {activeStep === steps.length - 1 ? (Language === "English" ? 'Finish': "Terminer") : (Language === "English" ? 'Next': 'Prochain')}
                    </Button>
                </div>
            </div>
            )}
        </div>
        </Dialog>
        <Dialog2 open={dialogOpen} handleClose={()=>setOpenDialog(false)} title={Language==="English" ? "Error! Invalid Name!":"Erreur! Nom incorrect!"} text={Language==="English" ? "Name must be atleast one character long": "Le nom doit contenir au moins un caractère"} exitText={Language==="English" ? "Close":"Fermer"}/>
    </div>
  );
}