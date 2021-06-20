const router=require('express').Router({mergeParams:true})
// var multer = require('multer');
// var upload = multer({ dest: './public/images/posts' })
let count=0
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/posts')
  }
})
const upload = multer({storage: storage})
const {validNewPost} = require('../ultilities/validation')
const {savefile}=require('../ultilities/savefile')
const {makePostHandler,getLatestPostsHandler,getEarlierPostHandler}=require('../handlers/PostHandler')

router.param('id',(req,res,next,id)=>{
  if(id){
      req.previousId=id;
      next()
      return
    }
    next(new Error("no id exists"))
})

router.post('/newpost',upload.array('uploads'),savefile,validNewPost,makePostHandler)

router.get('/latest',getLatestPostsHandler)
router.get('/earlier/:id',getEarlierPostHandler)







module.exports=router