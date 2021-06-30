var router = require("express-promise-router")();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/avatar");
  },
});
const upload = multer({ storage: storage });

const { RegisterHandler,LoginHandler ,authFaceBookHandler} = require("../handlers/UserHandler/Athentication");
const {
  validUserRegister,
  validUserLogin,
  validFacebookUserRegister,
  validFacebookUserLogin,
} = require("../ultilities/validation");
const {getUserInformationByIdHandler,setUserNewAvatarHandler} = require('../handlers/UserHandler/Information')
const {saveAvatar} =require('../ultilities/savefile')

router.param('uid',(req,res,next,id)=>{
    if(id){
      req.userId=id
      next()
    }else{
      next(new Error('no user id'))
    }
})

router.get("/resume",(req,res,next)=>{
  if(req.session.user){
    return res.json({user:req.session.user})
  }
  return res.json({err:"no data"})
})
router.post("/signup", validUserRegister, RegisterHandler);

router.post("/login", validUserLogin, LoginHandler);

router.post("/fbsignup", validFacebookUserRegister, (req, res) => {
  res.json({ result: true });
});
router.post("/fblogin", validFacebookUserLogin, authFaceBookHandler);

router.use('/avatar',(req,res,next)=>{
  if(req.session.user){
   return next()
  }
  return next(new Error("you are not allowed")) 
})
router.put('/avatar/:uid',upload.single('avatar'),saveAvatar,setUserNewAvatarHandler)



module.exports = router;
