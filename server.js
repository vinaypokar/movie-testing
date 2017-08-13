let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let movie = require('./app/routes/movie');
//connecting mongoDB
mongoose.connect('mongodb://localhost:27017/movielist')
mongoose.connection.on('connected',()=>{
    console.log('connected to database mongo')
})
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error connecting to database mongo')
    }
})

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

//defining routes
app.get("/",(req,res) => res.json({msg: "welcome to movies page"}));
app.route("/movie")
    .get(movie.getMovies)
    .post(movie.postMovie)
app.route("/movie/:id")
    .get(movie.getMovie)
    .delete(movie.deleteMovie)
    .put(movie.updateMovie);

app.listen(3020,() => console.log("server started at port 3020"));

//for testing
module.exports = app;