import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import harryPotterBanner from '../Assets/HarryPotter.png'
import Books from '../Books'
import BookCard from './BookCard'
import BookRow from './BookRow'
import './DiscoverPage.css'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  }
});

export default function DiscvoverPage() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


  const renderBooks = () => {
      return Books.map((bookCategory, i) => {
          return(<BookRow key={i} bookCategoryObject={bookCategory} />)
      })
  }

  return (
    <div>
        <Card className={classes.root} style={{ marginTop: "4rem" }}>
            <CardContent style={{padding: "0"}}>
                <img style={{width: "100%"}} src={harryPotterBanner}></img>
            </CardContent>
            <CardActions>
                <Button size="small">Buy Now</Button>
            </CardActions>
        </Card>
        {renderBooks()}
        <div className="pusher"></div>
    </div>
  );
}