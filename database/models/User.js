
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema ({

    name: {
        type: String,
        required: [true, 'le nom est obligatoire']   // ajouter cette ligne qd on veut une saisie obligatoire
    },

    email: {
        type: String,
        required: [true, "l'email est obligatoire"],
        unique:   true   //mot de passe ne doit pas etre identique aux autres utilisateurs
    },

    password: {
        type: String,
        required: [true, 'le password est obligatoire']
    },

   
    
    
})


// crypter le mot de passe
UserSchema.pre('save', function (next) {

    const user = this                                      //prends le mot de passe

    bcrypt.hash( user.password, 10, (error, encrypted)=>{  //crypte le (! il faut installer bcrypt : npm i bcrypt)

     user.password = encrypted
     next()                                                //et ensuite continue
    })
})


module.exports = mongoose.model('User', UserSchema)