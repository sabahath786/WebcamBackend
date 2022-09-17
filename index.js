const express = require("express");
const db_conn = require("./database_conn");
const router = express.Router();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// test url
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

// post method from client to save recording data
app.post("/videodata", (req, res) => {
    console.log("Fetch post successfull..");
    console.log(req.body.name);
    console.log(req.body.dateModified);

    //Create video file object to be saved in db
    let videoFileObj = { name:  req.body.name, dateModified: req.body.dateModified };

    // from db obj model indert video file object 
    db_conn.Recordings.insertMany(videoFileObj)
    .then(value => {
        console.log("Saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })

    res.send("GOT video data..");
  });



// Get all saved recording data from mongodb
app.get("/getsavedvideo", (req, res) => {
  db_conn.Recordings.find({}, function(err, videos) {
        if (err) {
          res.send(err);
          console.log('Failed to retrieve the Video List: ' + err);
        } else {
          console.log(JSON.stringify(videos))
          res.send(JSON.stringify(videos));
        }
    });
});


app.listen(PORT, ()=>{
    console.log(`Server Listening on ${PORT}`);
});


