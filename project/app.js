// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Create Express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://del_monte:del_monte@cluster0.vsgbo9w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get("/Jewelry", (req, res) => {
  // Render the jewelry.ejs template
  res.render('Jewelry');
});

app.get("/watches", (req, res) => {
  // Render the jewelry.ejs template
  res.render('watches');
});

app.get("/Bags_accesories", (req, res) => {
  // Render the jewelry.ejs template
  res.render('Bags_accesories');
});

app.post('/users', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.redirect('/users');
  } catch (err) {
    console.error('Error saving user:', err.message);
    res.redirect('/');
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users', { users });
  } catch (err) {
    console.error('Error finding users:', err.message);
    res.redirect('/');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
