const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/music', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema
const songSchema = new mongoose.Schema({
  Songname: String,
  Film: String,
  Music_director: String,
  singer: String,
  actor: String,
  actress: String
});

const Song = mongoose.model('Song', songSchema);

// Insert initial songs
const songs = [
  { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", singer: "Arijit Singh" },
  { Songname: "Kal Ho Naa Ho", Film: "Kal Ho Naa Ho", Music_director: "Shankar-Ehsaan-Loy", singer: "Sonu Nigam" },
  { Songname: "Tujh Mein Rab", Film: "Rab Ne Bana Di Jodi", Music_director: "Salim-Sulaiman", singer: "Roop Kumar Rathod" },
  { Songname: "Kun Faya Kun", Film: "Rockstar", Music_director: "A.R. Rahman", singer: "Mohit Chauhan" },
  { Songname: "Channa Mereya", Film: "Ae Dil Hai Mushkil", Music_director: "Pritam", singer: "Arijit Singh" }
];

// Insert only once
Song.countDocuments().then(count => {
  if (count === 0) Song.insertMany(songs);
});

// a–k: Display songs in table
app.get('/', async (req, res) => {
  const songs = await Song.find();
  const count = await Song.countDocuments();
  res.render('index', { songs, count });
});

// e: Music Director filter
app.get('/director/:name', async (req, res) => {
  const songs = await Song.find({ Music_director: req.params.name });
  res.json(songs);
});

// f: Director + Singer filter
app.get('/director/:name/singer/:singer', async (req, res) => {
  const songs = await Song.find({ Music_director: req.params.name, singer: req.params.singer });
  res.json(songs);
});

// g: Delete a song
app.get('/delete/:songname', async (req, res) => {
  await Song.deleteOne({ Songname: req.params.songname });
  res.redirect('/');
});

// h: Add a new song (fav)
app.post('/add', async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.redirect('/');
});

// i: Songs by Singer from a film
app.get('/film/:film/singer/:singer', async (req, res) => {
  const songs = await Song.find({ Film: req.params.film, singer: req.params.singer });
  res.json(songs);
});

// j: Update Actor & Actress
app.get('/update/:songname', async (req, res) => {
  await Song.updateOne({ Songname: req.params.songname }, {
    actor: "Ranbir Kapoor",
    actress: "Nargis Fakhri"
  });
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server at http://localhost:${PORT}`));