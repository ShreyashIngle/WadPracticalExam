// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost/music', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Define song schema and model
const songSchema = new mongoose.Schema({
  Songname: String,
  Film: String,
  Music_director: String,
  Singer: String,
  Actor: String,
  Actress: String
});

const Song = mongoose.model('Song', songSchema);

// Middleware to parse JSON
app.use(express.json());

// a) Create a Database called music (This is done automatically when we connect)
app.get('/', (req, res) => {
  res.send('Welcome to the Music DB');
});

// c) Insert an array of 5 song documents
app.post('/songs', async (req, res) => {
  const songs = [
    { Songname: 'Song1', Film: 'Film1', Music_director: 'Director1', Singer: 'Singer1' },
    { Songname: 'Song2', Film: 'Film2', Music_director: 'Director2', Singer: 'Singer2' },
    { Songname: 'Song3', Film: 'Film3', Music_director: 'Director3', Singer: 'Singer3' },
    { Songname: 'Song4', Film: 'Film4', Music_director: 'Director4', Singer: 'Singer4' },
    { Songname: 'Song5', Film: 'Film5', Music_director: 'Director5', Singer: 'Singer5' }
  ];

  try {
    await Song.insertMany(songs);
    res.status(200).send('Songs inserted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// d) Display total count of documents and list all documents
app.get('/songs/all', async (req, res) => {
  try {
    const songs = await Song.find();
    const count = await Song.countDocuments();
    res.json({ count, songs });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// e) List specified Music Director songs
app.get('/songs/music-director/:director', async (req, res) => {
  const { director } = req.params;
  try {
    const songs = await Song.find({ Music_director: director });
    res.json(songs);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// f) List specified Music Director songs sung by specified Singer
app.get('/songs/music-director/:director/singer/:singer', async (req, res) => {
  const { director, singer } = req.params;
  try {
    const songs = await Song.find({ Music_director: director, Singer: singer });
    res.json(songs);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// g) Delete a song you don’t like
app.delete('/songs/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Song.findByIdAndDelete(id);
    res.send('Song deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// h) Add new song which is your favorite
app.post('/songs/add', async (req, res) => {
  const { Songname, Film, Music_director, Singer, Actor, Actress } = req.body;
  const newSong = new Song({ Songname, Film, Music_director, Singer, Actor, Actress });
  try {
    await newSong.save();
    res.send('New song added');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// i) List Songs sung by Specified Singer from specified film
app.get('/songs/singer/:singer/film/:film', async (req, res) => {
  const { singer, film } = req.params;
  try {
    const songs = await Song.find({ Singer: singer, Film: film });
    res.json(songs);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// j) Update the document by adding Actor and Actress name
app.put('/songs/update/:id', async (req, res) => {
  const { id } = req.params;
  const { Actor, Actress } = req.body;
  try {
    const updatedSong = await Song.findByIdAndUpdate(id, { Actor, Actress }, { new: true });
    res.json(updatedSong);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// k) Display the above data in Browser in tabular format
app.get('/songs/table', async (req, res) => {
  try {
    const songs = await Song.find();
    let table = '<table border="1"><tr><th>Song Name</th><th>Film Name</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>';
    songs.forEach(song => {
      table += `<tr>
                  <td>${song.Songname}</td>
                  <td>${song.Film}</td>
                  <td>${song.Music_director}</td>
                  <td>${song.Singer}</td>
                  <td>${song.Actor || ''}</td>
                  <td>${song.Actress || ''}</td>
                </tr>`;
    });
    table += '</table>';
    res.send(table);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
