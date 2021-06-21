const router = require("express").Router({ mergeParams: true });
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


router.post("/signup", validUserRegister, RegisterHandler);

router.post("/login", validUserLogin, LoginHandler);

router.post("/fbsignup", validFacebookUserRegister, (req, res) => {
  res.json({ result: true });
});
router.post("/fblogin", validFacebookUserLogin, authFaceBookHandler);

router.get('/information/:uid',getUserInformationByIdHandler)
router.put('/avatar/:uid',upload.single('avatar'),saveAvatar,setUserNewAvatarHandler)

module.exports = router;
