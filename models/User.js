const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userImage: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Car'
  }
});

UserSchema.pre('save', function(next) {
  // SignedIn user go to next()
  if (!this.isModified('password')) {
    return next()
  }
  // User just SignedUp->hash the password before saving in the database
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        // otherwise hash the password
        bcrypt.hash(this.password, salt, (err, hash) => {
          if (err) return next(err);
          this.password = hash;
          next();
        });
      });
})




module.exports = mongoose.model('User', UserSchema);
