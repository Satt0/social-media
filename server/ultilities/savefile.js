const savefile = (req, res, next) => {
  try {
    const files = req.files;

    let newFiles = files.map((e) => {
      return {path:e.path,type:e.mimetype};
    });

    req.filesVerified = newFiles;
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = { savefile };
