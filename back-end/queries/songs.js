const db = require("../db/dbConfig.js");

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

// DELETE
const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      "DELETE FROM songs WHERE id = $1 RETURNING *",
      id
    );
    return deletedSong;
  } catch (error) {
    return error;
  }
};

// // UPDATE
// const updateSong = async (id, song) => {
//   try {
//     const updatedSong = await db.one(
//       "UPDATE songs SET name=$1, url=$2, category=$3, is_favorite=$4 where id=$5 RETURNING *",
//       [song.name, song.url, song.category, song.is_favorite, id]
//     );
//     return updatedSong;
//   } catch (error) {
//     return error;
//   }
// };

//UPDATE (PUT)

// const updateSong = async (id, song) => {
//   try {
//       const updatedSong = await db.one(
//           "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 where id=$6 RETURNING *",
//           [song.name, song.artist, song.album, song.time, song.is_favorite, id]
//       );
//       return updatedSong;
//   }
//   catch (error) {
//       return error;
//   }
// };

// saraii solved issue in class
const updateSong = async (id, song) => {
  try {
    const updatedSong = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 where id=$6 RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite, id]
    );
    return updatedSong;
  } catch (error) {
    console.log("not working")
    // return error;
  }
};

module.exports = { 
  getAllSongs,
  getSong,
  createSong,
  deleteSong, 
  updateSong
};