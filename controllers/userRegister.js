const User = require('../database/models/User')



module.exports = (req, res) => {
    User.create (
        req.body, (error, user) => {

            if (error) {   //si erreur de type pas de nom, ou mot de passe

                const registerError = Object.keys(error.errors).map(key => error.errors[key].message);

                req.flash('registerError', registerError)
                req.flash('data', req.body) //recupere les données saisies par l'utilisateur
                
                return res.redirect('/user/create')     //redirige vers ...
            }

            res.redirect('/')
        }
    )
}