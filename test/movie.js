let mongoose = require("mongoose");
let Movie = require('../app/models/movie');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

//middlewares
chai.use(chaiHttp);

//testing
describe('Movies', () => {
	beforeEach((done) => { //Before each test we empty the database
		Movie.remove({}, (err) => { 
		   done();		   
		});		
	});
    //testing the GET route
    describe('/GET movie', () => {
	    it('it should GET all the movies', (done) => {
		    chai.request(server)
		    .get('/movie')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	    });
    });
 
    //testing the POST route
    describe('/POST movie', () => {
	    it('it should not POST a movie without name field', (done) => {
	  	    let movie = {
	  		    description: "Sci-fi",
	  		    year_released: "2015",
                rating: 7,
                actors: ["abcd","efgh"],
                directors: ["hijk"]                 
	  	    }
			chai.request(server)
		    .post('/movie')
		    .send(movie)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('name');
			  	res.body.errors.name.should.have.property('kind').eql('required');
		        done();
		    });
	    });
	    it('it should POST a movie ', (done) => {
	  	    let movie = {
                name: "Spiderman",
	  		    description: "Sci-fi",
	  		    year_released: "2015",
                rating: 7,
                actors: ["abcd","efgh"],
                directors: ["hijk"]
	  	    }
			chai.request(server)
		    .post('/movie')
		    .send(movie)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('msg').eql('Movie successfully added');
			  	res.body.movie.should.have.property('name');
			  	res.body.movie.should.have.property('description');
			  	res.body.movie.should.have.property('year_released');
                res.body.movie.should.have.property('rating');
                res.body.movie.should.have.property('actors');
                res.body.movie.should.have.property('directors');
		      done();
		    });
	    });
    });
    //testing GET/:id route
    describe('/GET/:id movie', () => {
	    it('it should GET a movie by the given id', (done) => {
	  	    let movie = new Movie({ name: "Spiderman", description: "Sci-fi", year_released: "2015", rating: 7, actors: ["abcd","efgh"], directors: ["hijk"]});
	  	    movie.save((err, movie) => {
	  		    chai.request(server)
		        .get('/movie/' + movie.id)
		        .send(movie)
		        .end((err, res) => {
			  	    res.should.have.status(200);
			  	    res.body.should.be.a('object');
			  	    res.body.should.have.property('name');
			  	    res.body.should.have.property('description');
			  	    res.body.should.have.property('year_released');
                    res.body.should.have.property('rating');
                    res.body.should.have.property('actors');
                    res.body.should.have.property('directors');
			  	    res.body.should.have.property('_id').eql(movie.id);
		        done();
		        });
	  	    });
			
	    });
    });
    //testing PUT/:id route
    describe('/PUT/:id movie', () => {
	    it('it should UPDATE a movie given the id', (done) => {
	  	    let movie = new Movie({name: "Spiderman", description: "Sci-fi", year_released: "2015", rating: 7, actors: ["abcd","efgh"], directors: ["hijk"]})
	  	    movie.save((err, movie) => {
				chai.request(server)
			    .put('/movie/' + movie.id)
			    .send({name: "Batman", description: "Sci-fi", year_released: "2015", rating: 7, actors: ["abcd","efgh"], directors: ["hijk"]})
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Movie updated');
				  	res.body.movie.should.have.property('year_released').eql(2015);
			      done();
			    });
		    });
	    });
    });
    //testing DELETE/:id route
    describe('/DELETE/:id movie', () => {
	    it('it should DELETE a movie given the id', (done) => {
	  	    let movie = new Movie({name: "Spiderman", description: "Sci-fi", year_released: "2015", rating: 7, actors: ["abcd","efgh"], directors: ["hijk"]})
	  	    movie.save((err, movie) => {
				chai.request(server)
			    .delete('/movie/' + movie.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('msg').eql('Movie successfully deleted');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		    });
	    });
    });
});
  