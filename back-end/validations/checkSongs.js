const checkName = (req, res, next) => {
    if (req.body.name) {
      next();
    }
    else {
        res.status(400).json({ error: "Name is required" });
    }
}

const checkArtist = (req, res, next) => {
    if (req.body.artist) {
        next();
    }
    else {
        res.status(400).json({ error: "Artist is required" });
    }
}

const checkBoolean = (req, res, next) => {
    const { is_favorite } = req.body;
    if ([
        "true", 
        "false",
         true, 
         false, 
         undefined].includes(is_favorite)
         ) {
        next();
    }
    else {
        res.status(400).json({ error: "is_favorite must be a boolean value" });
    }
};
//  testing this w validate
const validateURL = (req, res, next) => {
    if (
      req.body.url.substring(0, 7) === "http://" ||
      req.body.url.substring(0, 8) === "https://"
    ) {
      next();
    } else {
      res
        .status(400)
        .json({ error: `You forgot to start your url with http:// or https://` });
    }
  };

module.exports = { 
    checkName, 
    checkArtist, 
    checkBoolean
};