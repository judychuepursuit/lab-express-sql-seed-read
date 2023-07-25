const db = require("../db/dbConfig.js");

// const getAllSongs = async () => {
//     try {
//       const allSongs = await db.any("SELECT * FROM songs");
//       return allSongs;
//     } catch (error) {
//       return error;
//     }
// };

// const getAllSongs = async () => {
//   // console.log("Running getAllSongs function...")
//   try {
//     const allSongs = await db.any("SELECT * FROM songs");
//     console.log("allSongs:")
//     console.log(allSongs)
//     return allSongs;
//   } catch (error) {
//     console.log("Caught error during getAllSongs function.")
//     console.log(error)
//     return error;
//   }
// };

const getAllSongs = async () => {
  const allSongs = await db.any("SELECT * FROM songs");
  return allSongs;
};

const getSong = async (id) => {
    try {
      const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
      return oneSong;
    } catch (error) {
      return error;
    }
};

const createSong = async (song) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite]
    );
    return newSong;
  } catch (error) {
    throw error;
  }
};

module.exports = { 
  getAllSongs,
  getSong,
  createSong,
  // deleteSong, 
  // updateSong
};