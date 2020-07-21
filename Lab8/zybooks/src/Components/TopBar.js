import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';
import LocalLibraryTwoToneIcon from '@material-ui/icons/LocalLibraryTwoTone';
import Dialog from "./Dialog";
import {Language, setLanguage} from "../Language"
import GTranslateIcon from '@material-ui/icons/GTranslate';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },title: {
    flexGrow: 1,
  }
}));

export default function TopBar({page, changePage, toggleLanguageFrench}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const getPageName = () => {
      switch(page){
        case 0:
            return Language === "English" ? "Discover" : "Découvrir"
        case 1:
            return  Language === "English" ? "Search" : "Chercher"
        case 2:
            return  Language === "English" ? "My Books" : "Mes livres"
      }
  }

  return (
    <div className={classes.root} style={{ position: "fixed", width: "inherit", zIndex: "1" }}>
      <AppBar position="static" style={{ backgroundColor: "red"}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>changePage(0)}>
            <LocalLibraryTwoToneIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {getPageName()}
          </Typography>
          <Tooltip title={Language === "English" ? "Toggle French" : "Basculer le français"}>
            <IconButton onClick={()=>{
              if (Language === "English") setLanguage("French")
              else setLanguage("English")
              toggleLanguageFrench();
            }}>
              <GTranslateIcon />
            </IconButton>
          </Tooltip>
          <IconButton edge="start" className={classes.menuButton} style={{marginLeft: "auto"}} color="inherit" aria-label="menu" onClick={()=>setOpen(true)}>
            <HelpOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog open={open} handleClose={()=>setOpen(false)} title={Language==="English" ? "About ZyBooks" : "À propos de zyBooks"} text="Lorem ipsum dosem dolor set" exitText={"Close"}/>
    </div>
  );
}