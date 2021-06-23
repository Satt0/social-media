const router = require("express").Router({ mergeParams: true });

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/posts");
  },
});
const upload = multer({ storage: storage });
const { validNewPost ,userCommentPostValidation,validUpdateCommentByLastTrackedID} = require("../ultilities/validation");
const { savefile } = require("../ultilities/savefile");
const {
  makePostHandler,
  getLatestPostsHandler,
  getEarlierPostHandler,
  getUserPostByIdHandler,
  getUserEarlierPostByIdHandler,
  postUserCommentToPostHanlder,
  getPostLatestCommentHandler,
  updateUserCommentBylastIDHandler
} = require("../handlers/PostHandler");

router.param("id", (req, res, next, id) => {
  if (id) {
    req.previousId = id;
    next();
    return;
  }
  next(new Error("no id exists"));
});

router.post(
  "/newpost",
  upload.array("uploads"),
  savefile,
  validNewPost,
  makePostHandler
);
router.param('uid',(req,res,next,id)=>{
  if(parseInt(id)>0){
    req.userId=id;
    next()
  }
  else{
    next(new Error("invalid User ID!"))
  }
})
router.param("lastid",(req,res,next,id)=>{
  if(id){
    req.previousId=id
    next()
  }
  else{
    next(new Error("no postid"))
  }
})
router.param('postid',(req,res,next,id)=>{
  try{
    if(id.trim().length){
      req.postid=id
      next()
      return
    }
    throw new Error("no postid")
  }catch(e){
    next(e)
  }
})
router.get("/latest", getLatestPostsHandler);
router.get("/earlier/:id", getEarlierPostHandler);
router.get('/allpost/:uid',getUserPostByIdHandler);
router.get('/earlier/:uid/:lastid',getUserEarlierPostByIdHandler)

router.post('/comment',userCommentPostValidation,postUserCommentToPostHanlder)
router.get('/comment/:postid',getPostLatestCommentHandler)
router.post('/comment/update',validUpdateCommentByLastTrackedID,updateUserCommentBylastIDHandler)
module.exports = router;
