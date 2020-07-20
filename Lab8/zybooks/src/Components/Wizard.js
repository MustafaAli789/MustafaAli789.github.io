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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BookCard from "./BookCard"
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
    const [name, setName] = useState("Name");
    const [gender, setGender] = useState("female")
    const [dialogOpen, setOpenDialog] = useState(false)
    const [category, setCategory] = useState("Weeks Hot Picks")
    const [similarBooks, setSimilarBooks] = useState([])

    useEffect(()=>{
        let myBooksArr = []
        myBooks.forEach(myBook => {
            let bookInfo;
            let found = false;
            for (let i = 0; i<Books.length; i++) {
                if (found) break;
                for (let j =0; j<Books[i].Books.length; j++) {
                    if(Books[i].Books[j].id === myBook.id) {
                        found = true;
                        bookInfo = [Books[i].Category, Books[i].Books[j], myBook];
                        break;
                    }
                }
            }
            myBooksArr.push(bookInfo);
        })
        setSimilarBooks(myBooksArr)
    }, [myBooks])

    function getSteps() {
        return ['Basic Info', 'Similar Books', 'Book Recommendations'];
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

        Books.forEach(category => {
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
                <TextField size="small" onChange={(e)=>setName(e.target.value)} required error={age.length === 0} id="standard-error" label="Enter Name" defaultValue="Name" />
                <TextField
                    id="standard-select-age"
                    select
                    label="Select Age"
                    value={age}
                    required
                    onChange={(e)=>setAge(e.target.value)}
                    helperText="Please select your age"
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
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
            </div>)
        } else if (activeStep === 1) {
            return(<div style={{ padding: "1rem", paddingTop: "0"}}>
                <TextField
                    id="standard-select-category"
                    select
                    label="Select Category"
                    value={category}
                    required
                    onChange={(e)=>setCategory(e.target.value)}
                    helperText="Please select your category"
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
                    Select Similar Books from Your Shelf
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
                    Wizard
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
                        Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={()=>{
                        if (activeStep === steps.length - 1) {
                            handleClose();
                        }
                        handleNext();
                        }}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
            )}
        </div>
        </Dialog>
        <Dialog2 open={dialogOpen} handleClose={()=>setOpenDialog(false)} title={"Error! Invalid Name!"} text="Name must be atleast one character long" exitText={"Close"}/>
    </div>
  );
}