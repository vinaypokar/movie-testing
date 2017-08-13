const mongoose = require('mongoose')

const MoviesSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type:String
    },
    year_released:{
        type:Number
    },
    rating:{
        type:Number
    },
    actors:{
        type:[String]
    },
    directors:{
        type:[String]
    }
})

//exporing movie schema to use it anywhere
module.exports = mongoose.model('movie',MoviesSchema)