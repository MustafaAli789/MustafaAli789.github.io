import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import TitleIcon from '@material-ui/icons/Title';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar({handleChange}) {
  const classes = useStyles();
  const [searchBy, setSearchBy] = useState("Name");
  const [placeholder, setPlacehlder] = useState("Search Book Title");

  const getIcon = () => {
    if (searchBy == "Name") {
      return(<TitleIcon />)
    } else if (searchBy == "Author") {
      return(<AssignmentIndIcon />)
    }
  }

  return (
    <Paper component="form" className={classes.root} style={{ marginTop: "4rem", width: "initial" }}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        onChange={(e)=>handleChange(e.target.value, searchBy)}
      />
      <Tooltip title="Search">
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title={"Toggle Search By"}>
        <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={
          ()=> {
            if (searchBy == "Name"){
              setSearchBy("Author")
              setPlacehlder("Search Book Author")
            } else if (searchBy == "Author") {
              setSearchBy("Name")
              setPlacehlder("Search Book Title")
            }
          }
        }>
        {getIcon()}
        </IconButton>
      </Tooltip>
    </Paper>
  );
}