import React from 'react';
import NavigationBar from './Components/NavigationBar';
import TopBar from './Components/TopBar';
import DiscoverPage from './Components/DiscoverPage'
import SearchPage from "./Components/SearchPage";
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      page: 0
    }
  }

  changePage = (pageNum) => {
    switch(pageNum){
      case 0:
        this.setState({page: 0});
        break;
      case 1:
        this.setState({page: 1});
        break;
      case 2:
        this.setState({page: 2});
        break;
    }
  }

  renderPage = () => {
    switch(this.state.page){
      case 0:
        return(<div className="content"><DiscoverPage /></div>);
      case 1:
        return(<div className="content"><SearchPage /></div>);
      case 2:
        return(<div>My Books Page</div>);
    }
  }

  render(){
    return(
      <div className="outerContainer">
        <div className="Container">
          <TopBar page={this.state.page} changePage={this.changePage}/>
          {this.renderPage()}
          <div></div>
          <NavigationBar page={this.state.page} changePage={this.changePage}/>
        </div>
      </div>
    )
  }
}

export default App;
