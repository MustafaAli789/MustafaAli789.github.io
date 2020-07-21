import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import harryPotterBanner from '../Assets/HarryPotter.png'
import Books from '../Books'
import BooksFrench from "../BooksFrench"
import {Language, setLanguage} from "../Language"
import BookCard from './BookCard'
import BookRow from './BookRow'
import Fab from '@material-ui/core/Fab';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Tooltip from '@material-ui/core/Tooltip';
import Wizard from "./Wizard"
import './DiscoverPage.css'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  }
});

export default function DiscvoverPage({updateMyBooks, myBooks}) {
  const classes = useStyles();
  const [wizardOpen, setWizardOpen] = useState(false);
  const bull = <span className={classes.bullet}>•</span>;


  const renderBooks = () => {
    let books;
    if (Language === "English") books = Books;
    else books = BooksFrench;
      return books.map((bookCategory, i) => {
          return(<BookRow showProgressBar={false} myBooks={myBooks} updateMyBooks={updateMyBooks} key={i} bookCategoryObject={bookCategory} />)
      })
  }

  return (
    <div>
        <Card className={classes.root} style={{ marginTop: "4rem" }}>
            <CardContent style={{padding: "0"}}>
                <img style={{width: "100%"}} src={harryPotterBanner}></img>
            </CardContent>
            <CardActions>
                <Button size="small">{Language === "English"? "Buy Now" : "Acheter maintenant"}</Button>
            </CardActions>
        </Card>
        {renderBooks()}
        {wizardOpen && <Wizard open={wizardOpen} handleClose={()=>setWizardOpen(false)} myBooks={myBooks} updateMyBooks={updateMyBooks}/>}
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            style={{ width: "100%" }}
            startIcon={<LibraryBooksIcon />}
            onClick={()=>setWizardOpen(true)}
        >
            {Language === "English" ? "Open Wizard" : "Ouvrir l'assistant"}
        </Button>
        <div className="pusher"></div>
    </div>
  );
}