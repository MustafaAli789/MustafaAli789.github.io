import React from 'react';
import NavigationBar from './Components/NavigationBar';
import TopBar from './Components/TopBar';
import DiscoverPage from './Components/DiscoverPage'
import SearchPage from "./Components/SearchPage";
import MyBooksPage from "./Components/MyBooksPage";
import './App.css';
import { Language } from './Language';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      page: 0,
      myBooks: [],
      languageFrench: false
    }
  }

  updateMyBooks = (action, bookInfo) => {
    console.log("hello")
    if (action === 'REMOVE') {
      let id = bookInfo.id;
      let newMyBooks = this.state.myBooks;
      newMyBooks = newMyBooks.filter(book => book.id != id);
      this.setState({myBooks: newMyBooks})
    } else if (action === "ADD"){
      let newMyBooks = this.state.myBooks;
      newMyBooks.push(bookInfo);
      this.setState({myBooks: newMyBooks})
    } else if (action === "REPLACE"){
      let myNewBooks = this.state.myBooks;
      myNewBooks.forEach(myBook => {
        if (myBook.id === bookInfo.id) {
          myBook.page = bookInfo.page;
          myBook.rating = bookInfo.rating;
        }
      })
      this.setState({myBooks: myNewBooks})
    }
  }

  toggleLanguageFrench = () => {
    this.setState({ languageFrench: !this.state.languageFrench })
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
        return(<div className="content"><DiscoverPage myBooks={this.state.myBooks} updateMyBooks={this.updateMyBooks} /></div>);
      case 1:
        return(<div className="content"><SearchPage Language={Language} myBooks={this.state.myBooks} updateMyBooks={this.updateMyBooks} /></div>);
      case 2:
        return(<div className="content"><MyBooksPage changePage={this.changePage} myBooks={this.state.myBooks} updateMyBooks={this.updateMyBooks} /></div>);
    }
  }

  render(){
    return(
        <div className="outerContainer">
          <div className="Container">
            <TopBar toggleLanguageFrench={this.toggleLanguageFrench} page={this.state.page} changePage={this.changePage}/>
            {this.renderPage()}
            <div></div>
            <NavigationBar page={this.state.page} changePage={this.changePage}/>
          </div>
        </div>
    )
  }
}

export default App;
