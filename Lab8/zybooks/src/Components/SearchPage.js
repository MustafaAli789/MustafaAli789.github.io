import React from 'react';
import SearchBar from './SearchBar';
import Typography from '@material-ui/core/Typography';

const SearchPage = () => {
    return(
        <React.Fragment>
            <SearchBar />
            <div style={{ display: "flex", alignItems: "center", marginTop: "1rem", flexDirection: "column" }} className="results">
                <img style={{ width: "max-content" }} src={require("../Assets/bookNotFound.png")}></img>
                <Typography variant="h5" style={{ fontWeight:"lighter", color:"#b2b2b2", marginTop: "1rem" }}>
                    No Books Found
                </Typography>
            </div>
        </React.Fragment>
    )
}

export default SearchPage;