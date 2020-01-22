const mongoose = require ('mongoose')
const Article = require('./database/models/article')

mongoose.connect('mongodb://localhost:27017/blog-test');


/*
Article.create({
    title: "Avenger Endgame",
    intro: "test d'intro",
    content: "critique sur le film",
}, (error, post) => {
    console.log(error, post);

}
)
*/
