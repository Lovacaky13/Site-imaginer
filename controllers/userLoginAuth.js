const bcrypt = require('bcrypt')                   //recupere le cryptage
const User = require('../database/models/User')   //recup info database


module.exports = (req, res) => {

    const { email, password } = req.body;     //recupere  l'email et mdp 

    User.findOne({ email }, (error, user) => {   //cherche dans la database les email et mdp
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {   //compare le mdp avec l'utilisateur
                if (same) {                          //si mdt + email corresponde
                    
                    req.session.userId = user._id    // modifie le cookie automatique avec l'id de la database
                    
                    res.redirect('/')               //alors tu vas sur la page d'acceuil
                }

                else {
                    res.redirect('/user/login')      //sinon tu restes sur la page
                }

            })

        } else {
            return  res.redirect('/user/login') //sit email existe pas redirige vers la page
        }
    })

}

