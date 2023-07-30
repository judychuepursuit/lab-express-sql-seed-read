const express = require("express");
const songs = express.Router();
const { 
  getAllSongs, 
  getSong,
  createSong,
  deleteSong,
  updateSong,
} = require("../queries/songs");
const { checkName, checkBoolean, checkArtist } = require("../validations/checkSongs.js");

// INDEX
// songs.get("/", async (req, res) => {});
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
// songs.get("/:id", async (req, res) => {
//   const song = await getSong(id);
//   if (song) {
//     res.json(song);
//   } else {
//     res.status(404).json({ error: "not found" });
//   }
// });

songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await getSong(id);
  if (song.time) {
    res.json(song);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
songs.post("/", async (req, res) => {
  try {
    const song = await createSong(req.body);
    res.json(song);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// DELETE
songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSong = await deleteSong(id);
  if (deletedSong.id) {
    res.status(200).json(deletedSong);
  } else {
    res.status(404).json("Song not found");
  }
});

// UPDATE/PUT
// added checkArtist to work
songs.put("/:id", checkName, checkBoolean, checkArtist, async (req, res) => {
  const { id } = req.params;
  const updatedSong = await updateSong(id, req.body);
  res.status(200).json(updatedSong);
});

// songs.put("/:id", checkName, checkArtist, checkBoolean, async (req, res) => {
//   const { id } = req.params;
//   const updatedSong = await updateSong(id, req.body);
//   res.status(200).json(updatedSong);
// });

module.exports = songs;