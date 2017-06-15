const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Define our model
const userSchema = new Schema({ 
    email: { type:String, unique: true, lowercase: true }, // not case insensitive, to avoid save to lowercase
    password: String
 });

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre("save", function(next) {
    // Get access to the user model
    const user = this; // user.email, user.password

    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        }); 
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
}


// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;


// msiexec.exe /q /i mongodb-win32-x86_64-2008plus-ssl-3.4.5-signed.msi INSTALLLOCATION="G:\Program Files\MongoDB\Server\3.4.5\" ADDLOCAL="all"


// "G:\Program Files\MongoDB\Server\3.4.5\bin\mongod.exe" --dbpath "G:\Program Files\MongoDB\data\db"