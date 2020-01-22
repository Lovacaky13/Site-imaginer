
const Post = require("../database/models/Article")



module.exports = async (req, res) => {

        const posts = await Post.find({})
          //  , posts = dbPosts.reverse().slice(0,4)
            
        // console.log(posts);
        res.render("index", { posts })

}