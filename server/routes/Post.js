var router = require("express-promise-router")();
var validator = require('validator');
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



router.use((req,res,next)=>{
  if(!req.session.user){
    console.log(req.session.user);
  return  next(new Error("not authorized"))
  }
  next()

})

router.param("id", (req, res, next, id) => {
  if (validator.isNumeric(id+'')) {
    req.previousId = id;
    
    return Promise.resolve('next')
  }
  return Promise.reject(new Error("must be numeric!"))
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
    return Promise.resolve('next')
  }
  else{
    return Promise.reject(new Error("invalid User ID!"))
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
      return Promise.resolve('next')
    }
    return Promise.reject(new Error("no postid"))
  }catch(e){
   return Promise.reject(e)
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
