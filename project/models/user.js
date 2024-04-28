const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Change to 'email' and make it required
  password: { type: String, required: true } // Add a 'password' field and make it required
});

module.exports = mongoose.model('User', userSchema);
 
