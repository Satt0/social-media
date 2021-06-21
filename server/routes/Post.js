const router = require("express").Router({ mergeParams: true });

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/posts");
  },
});
const upload = multer({ storage: storage });
const { validNewPost } = require("../ultilities/validation");
const { savefile } = require("../ultilities/savefile");
const {
  makePostHandler,
  getLatestPostsHandler,
  getEarlierPostHandler,
  getUserPostByIdHandler,
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
router.get("/latest", getLatestPostsHandler);
router.get("/earlier/:id", getEarlierPostHandler);
router.get('/allpost/:uid',getUserPostByIdHandler)
module.exports = router;
