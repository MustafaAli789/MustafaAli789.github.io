import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
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
      style={{ position: "fixed", bottom: "-1px", width:"inherit" }}
    >
      <BottomNavigationAction className="navBarItem" label="Discover" icon={<MenuBookIcon />} />
      <BottomNavigationAction className="navBarItem" label="Search" icon={<SearchIcon />} />
      <BottomNavigationAction className="navBarItem" label="MyBooks" icon={<PersonIcon />} />
    </BottomNavigation>
  );
}

export default NavigationBar;