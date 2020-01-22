//rediriger vers la page ajouter un article apres connection

const User = require('../database/models/User')


module.exports = (req, res, next) => {

  if(req.session.userId) {                    //si la requette session user id est ok

    return res.redirect('/articles/add')    // alors tu rediriges vers la page articles add
    
  }
  next()

}