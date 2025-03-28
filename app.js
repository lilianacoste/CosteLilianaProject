console.log("🚀 Server is starting...");
const express = require('express');
const path = require('path');
const app = express();
const itemsRoutes = require('./routes/itemRoutes'); // Import routes
const methodOverride = require('method-override');
const mongoose= require('mongoose'); // Import mongoose for MongoDB connection
app.use(methodOverride('_method'));


// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
//image uploads
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public/images')));  // Serve static images
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); // Parse JSON requests
//mongooes connect
const mongUri= 'mongodb+srv://lcoste:Beatrice@cluster0.hxmho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));
// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set views folder

// Define routes
app.use('/items', itemsRoutes); // Use item routes

// Landing Page
app.get('/', (req, res) => {
  res.render('index'); // Renders index.ejs
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
