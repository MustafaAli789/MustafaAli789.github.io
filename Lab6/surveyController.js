// required packages
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');

// read the data file
function readData(fileName){
    let dataRead = fs.readFileSync('./data/' + fileName + '.json');
    let infoRead = JSON.parse(dataRead);
    return infoRead;
}

// read the data file
function writeData(info, fileName){
    data = JSON.stringify(info);
    fs.writeFileSync('./data/' + fileName + '.json', data);
}

// update the data file, I use "name" to be equal to fruit, or animal or color
// to match with the file names
// I assume we always just add 1 to a single item
function combineCounts(newData){
    let data = readData('data');

    for (key in newData) {
        let value = newData[key];
        if (["colorRange", "thumbnailsRange", "sidebarRange", "commentsRange"].includes(key)) {
            if (value<=20 && value >= 0) {
                value = "veryUnsatisfactory";
            } else if(value<=40 && value >= 21) {
                value = "unsatisfactory";
            }
            else if(value<=60 && value >= 41) {
                value = "neutral";
            }
            else if(value<=80 && value >= 61) {
                value = "satisfactory";
            } else {
                value = "verySatisfactory";
            }
            newData[key] = value;
        }

        if (data[key][value] !== undefined && data[key][value] !== null) {
            data[key][value] +=1;
        } else {
            data[key][`${value}`] = 1; // adding a new value, specifcally for written answers
        }
        writeData(data, 'data');

    }
}

// This is the controler per se, with the get/post
module.exports = function(app){

    // when a user goes to localhost:3000/analysis
    // serve a template (ejs file) which will include the data from the data files
    app.get('/analysis', function(req, res){
        var data = readData("data");
        res.render('showResults', {data});
        //console.log([color, fruit, animal]);
    });

    // when a user goes to localhost:3000/niceSurvey
    // serve a static html (the survey itself to fill in)
    app.get('/niceSurvey', function(req, res){
        res.sendFile(__dirname+'/views/index.html');
    });

    // when a user types SUBMIT in localhost:3000/niceSurvey 
    // the action.js code will POST, and what is sent in the POST
    // will be recuperated here, parsed and used to update the data files
    app.post('/niceSurvey', urlencodedParser, function(req, res){
        //console.log(req.body);
        let json = req.body;
        console.log(json)
        combineCounts(json);
        res.json(200);
        //res.sendFile(__dirname + "/views/niceSurvey.html");
    });
    

};