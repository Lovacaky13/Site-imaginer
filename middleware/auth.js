const User = require('../database/models/User')


module.exports = (req, res, next) => {

    //Connecte toi dans la base de donnée
    //verifie le user
    User.findById(req.session.userId, (error, user) => {
        // si il est dans la base de donnée

        if (error || !user) {
            //sinon tu le redirige

            return res.redirect('/')
        }
        next()
    })






}