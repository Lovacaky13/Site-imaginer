module.exports = (req, res) => {
    if(req.session.userId) {               //si session a un Id 
       return res.render("article/add")    // tu peux donner acces a ça (ajouter un article)
    } else {
        res.redirect ("/user/login")           //sinon retourne à la page se connecter
    }
}
