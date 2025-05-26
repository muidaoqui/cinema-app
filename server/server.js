const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/QL_CINE")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// GET aggregate count by name
app.get("/api/users/aggregate", async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: "$name",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// GET all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// GET user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// POST create new user
app.post("/api/users/post", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// PUT update user
app.put("/api/users/update/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// DELETE user
app.delete("/api/users/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// GET search users by name (case-insensitive)
app.get("/api/users/search/:name", async (req, res) => {
  try {
    const users = await User.find({ name: { $regex: req.params.name, $options: "i" } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// GET sort users by field
app.get("/api/users/sort/:field", async (req, res) => {
  try {
    const users = await User.find().sort({ [req.params.field]: 1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// GET pagination
app.get("/api/users/pagination/:page/:limit", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

const InfoSchema = new mongoose.Schema({
  content: { type: String, required: true },
  actor: [{ type: String }],
  director: { type: String },
  comments: [{ type: String }],
  somePic: [{ type: String }]
}, { _id: false });

const MovieSchema = new mongoose.Schema({
  nameMo: { type: String, required: true },
  cinemaMo: [{ type: String, required: true }],
  infoMo: { type: InfoSchema, required: true },
  newsMo: { type: String },
  agelimitMo: { type: Number, min: 0 },
  ratingMo: { type: Number, min: 0, max: 10 },
  showtimeMo: [{ type: Date }]
});
const Movie = mongoose.model('Movie', MovieSchema);
const ComingSoon = mongoose.model('ComingSoon', MovieSchema);
app.get("/api/movies", async(req, res) => {
  try{
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.get("/api/movies/:id", async(req, res) => {
  try{
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.post("/api/movies/post", async(req, res) => {
  try{
    const { nameMo, cinemaMo, infoMo, newsMo, agelimitMo, ratingMo, showtimeMo } = req.body;
    if (!nameMo || !cinemaMo || !infoMo) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newMovie = new Movie({ nameMo, cinemaMo, infoMo, newsMo, agelimitMo, ratingMo, showtimeMo });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  } 
});

app.put("/api/movies/update/:id", async(req, res) => {
  try{
    const { nameMo, cinemaMo, infoMo, newsMo, agelimitMo, ratingMo, showtimeMo } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { nameMo, cinemaMo, infoMo, newsMo, agelimitMo, ratingMo, showtimeMo },
      { new: true }
    );
    if (!updatedMovie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.delete("/api/movies/delete/:id", async(req, res) => {
  try{
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.get("/api/movies/search/:nameMo", async(req, res) => {
  try{
    const movies = await Movie.find({ nameMo: { $regex: req.params.nameMo, $options: "i" } });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.get("/api/comingsoon", async(req, res) => {
  try{
    const comingsoon = await ComingSoon.find();
    res.status(200).json(comingsoon);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.get("/api/comingsoon/:id", async(req, res) => {
  try{
    const comingsoon = await ComingSoon.findById(req.params.id);
    if (!comingsoon) return res.status(404).json({ message: "Coming soon movie not found" });
    res.status(200).json(comingsoon);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.post("/api/comingsoon/post", async(req, res) => {
  try{
    const { nameMo, cinemaMo, infoMo, newsMo, agelimitMo, ratingMo, showtimeMo } = req.body;
    if (!nameMo || !cinemaMo || !infoMo) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newComingSoon = new ComingSoon({ nameMo, cinemaMo, infoMo, newsMo, agelimitMo, ratingMo, showtimeMo });
    await newComingSoon.save();
    res.status(201).json(newComingSoon);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  } 
});

app.put("/api/comingsoon/update/:id", async(req, res) => {
  try{
    const { nameMo, cinemaMo, infoMo, newsMo, agelimitMo, ratingMo, showtimeMo } = req.body;
    const updatedComingSoon = await ComingSoon.findByIdAndUpdate(
      req.params.id,
      { nameMo, cinemaMo, infoMo, newsMo, agelimitMo, ratingMo, showtimeMo },
      { new: true }
    );
    if (!updatedComingSoon) return res.status(404).json({ message: "Coming soon movie not found" });
    res.status(200).json(updatedComingSoon);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.delete("/api/comingsoon/delete/:id", async(req, res) => {
  try{
    const deletedComingSoon = await ComingSoon.findByIdAndDelete(req.params.id);
    if (!deletedComingSoon) return res.status(404).json({ message: "Coming soon movie not found" });
    res.status(200).json({ message: "Coming soon movie deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.get("/api/comingsoon/search/:nameMo", async(req, res) => {
  try{
    const comingsoon = await ComingSoon.find({ nameMo: { $regex: req.params.nameMo, $options: "i" } });
    res.status(200).json(comingsoon);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

const PosterSchema = new mongoose.Schema({
  images: {
    type: [String], // mảng chứa tên file hoặc URL
    required: true
  }
}, { timestamps: true });
const Poster = mongoose.model('Poster', PosterSchema);

// 🔍 GET all posters
app.get('/api/posters', async (req, res) => {
  try {
    const posters = await Poster.find();
    res.json(posters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🆕 POST create poster
app.post('/api/posters', async (req, res) => {
  try {
    const poster = new Poster(req.body);
    const saved = await poster.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✏️ PUT update poster by ID
app.put('/api/posters/:id', async (req, res) => {
  try {
    const updated = await Poster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Poster not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ DELETE poster by ID
app.delete('/api/posters/:id', async (req, res) => {
  try {
    const deleted = await Poster.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Poster not found' });
    res.json({ message: 'Poster deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const DiscountSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true }
});

const Discount = mongoose.model('Discount', DiscountSchema);

// GET all discounts
app.get('/api/discounts', async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.get("/api/discounts/:id", async(req, res) => {
  try{
    const discount = await Discount.findById(req.params.id);
    if (!discount) return res.status(404).json({ message: "Discount not found" });
    res.status(200).json(discount);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// POST create new discount
app.post('/api/discounts', async (req, res) => {
  try {
    const { title, content, image } = req.body;
    if (!title || !content || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newDiscount = new Discount({ title, content, image });
    await newDiscount.save();
    res.status(201).json(newDiscount);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

const CinemaSchema = new mongoose.Schema({
  nameCine: { type: String, required: true, unique: true },
  addressCine: { type: String, required: true },
  hotline: { type: String, required: true },
  image: { type: String, required: true }
});

const Cinema = mongoose.model('Cinema', CinemaSchema);

// GET all cinemas
app.get('/api/cinemas', async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.status(200).json(cinemas);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// GET cinema by ID
app.get('/api/cinemas/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.status(200).json(cinema);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// POST create new cinema
app.post('/api/cinemas', async (req, res) => {
  try {
    const { nameCine, addressCine, hotline, image } = req.body;
    if (!nameCine || !addressCine || !hotline || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCinema = new Cinema({ nameCine, addressCine, hotline, image });
    await newCinema.save();
    res.status(201).json(newCinema);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// PUT update cinema by ID
app.put('/api/cinemas/:id', async (req, res) => {
  try {
    const { nameCine, addressCine, hotline, image } = req.body;
    const updatedCinema = await Cinema.findByIdAndUpdate(
      req.params.id,
      { nameCine, addressCine, hotline, image },
      { new: true }
    );
    if (!updatedCinema) return res.status(404).json({ message: 'Cinema not found' });
    res.status(200).json(updatedCinema);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// DELETE cinema by ID
app.delete('/api/cinemas/:id', async (req, res) => {
  try {
    const deletedCinema = await Cinema.findByIdAndDelete(req.params.id);
    if (!deletedCinema) return res.status(404).json({ message: 'Cinema not found' });
    res.status(200).json({ message: 'Cinema deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

const ProductSchema = new mongoose.Schema({
  namePro: { type: String, required: true },
  pricePro: { type: Number, required: true, min: 0 },
  describePro: { type: String },
  image: [{ type: String }]  
});

const Product = mongoose.model('Product', ProductSchema);

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));