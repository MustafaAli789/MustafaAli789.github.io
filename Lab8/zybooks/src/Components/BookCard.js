import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './BookCard.css'

const BookCard = ({name, author, desc, rating, category, imageSrc}) => {
    const [saved, setSaved] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const getStarredIcon = () => {
        if(!saved) {
            return(<StarBorderIcon fontSize="small"/>)
        } else {
            return(<StarIcon fontSize="small"/>)
        }
    }
    const getSnackBarMessage = () => {
        if(saved) return `Added ${name} to my books!`
        else return `Removed ${name} from my books!`
    }
    return(
        <React.Fragment>

            <Card className={"card-"+name} style={{ width: "33%", boxShadow: "none", marginTop: "10px" }}>
                <CardContent className="cardContent" style={{padding:"5px"}}>
                    <img style={{width: "100%"}} src={require("../Assets/"+imageSrc)}></img>
                    <Tooltip title={name}>
                        <Typography variant="body2" component="p" style={{ fontWeight: "bold", lineHeight: "1.1", textOverflow: "ellipsis", whiteSpace:"nowrap", overflow: "hidden" }}>
                            {name}
                        </Typography>
                    </Tooltip>
                    <div style={{ display: "flex", marginTop: "6px" }}>
                        <Typography color="textSecondary" style={{ fontSize: 12 }}>
                            {rating}
                        </Typography>
                        <IconButton style={{ marginLeft: "auto", padding: "0", marginTop: "-4px" }} onClick={()=>{
                            setSaved(!saved);
                            setSnackBarOpen(true);
                            }}>
                            {getStarredIcon()}
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
            <Snackbar open={snackBarOpen} autoHideDuration={2000} onClose={()=>setSnackBarOpen(false)}>
                <MuiAlert elevation={6} variant="filled" onClose={()=>setSnackBarOpen(false)} severity="success">
                    {getSnackBarMessage()}
                </MuiAlert>
            </Snackbar>
        </React.Fragment>

    )
}

export default BookCard;