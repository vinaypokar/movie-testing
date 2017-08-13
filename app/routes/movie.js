let mongoose = require('mongoose');
let Movie = require('../models/movie');

//retriving all the movies using GET /movie
function getMovies(req, res){
    Movie.find((err, movies) => {
        if(err) 
            res.send(err);
		res.json(movies);
	});
}

//adding the new movie using POST /movie
function postMovie(req,res){
    var newMovie = new Movie(req.body);
    newMovie.save((err,movie) => {
        if(err)
            res.send(err);
        else
            res.json({msg : "Movie successfully added",movie});
    });
}

//retrive a particular movie by its id using GET /movie/:id
function getMovie(req,res){
    Movie.findById(req.params.id, (err,movie) => {
        if(err)
            res.send(err);
        res.json(movie);
    });
}

//delete a movie by its id using DELETE /movie/:id
function deleteMovie(req,res){
    Movie.remove({_id : req.params.id}, (err,result) => {
        if(err)
            res.send(err);
        res.json({msg: "Movie successfully deleted", result});
    });
}

//update movie by its id using PUT /movie/:id
function updateMovie(req,res){
    Movie.findById({_id: req.params.id}, (err, movie) => {
		if(err) res.send(err);
		Object.assign(movie, req.body).save((err, movie) => {
            if(err) 
                res.send(err);
			res.json({ message: 'Movie updated', movie });
		});	
	});
}

//exporting all the functions
module.exports = {getMovies, postMovie, getMovie, deleteMovie, updateMovie};