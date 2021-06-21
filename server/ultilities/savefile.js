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
const saveAvatar=(req,res,next)=>{
  try{
      const file=req.file
      
      req.newAvatar={path:file.path,type:file.minetype}
      next()
      return;
  }
  catch(e){
    next(e)
  }
}
module.exports = { savefile ,saveAvatar};
