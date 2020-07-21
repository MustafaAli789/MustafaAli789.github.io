import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import {Language, setLanguage} from "../Language"
import './NavigationBar.css'

const NavigationBar = ({page, changePage}) => {

  return (
    <BottomNavigation
      value={page}
      onChange={(event, newValue) => {
        changePage(newValue);
      }}
      showLabels
      className="navBar"
      style={{ position: "fixed", width:"inherit" }}
    >
      <BottomNavigationAction className="navBarItem" label={Language === "English" ? "Discover" : "Découvrir"} icon={<MenuBookIcon />} />
      <BottomNavigationAction className="navBarItem" label={Language === "English" ? "Search" : "Chercher"} icon={<SearchIcon />} />
      <BottomNavigationAction className="navBarItem" label={Language === "English" ? "My Books" : "Mes livres"} icon={<PersonIcon />} />
    </BottomNavigation>
  );
}

export default NavigationBar;