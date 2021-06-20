const router = require("express").Router({ mergeParams: true });

const { RegisterHandler,LoginHandler ,authFaceBookHandler} = require("../handlers/UserHandler/Athentication");
const {
  validUserRegister,
  validUserLogin,
  validFacebookUserRegister,
  validFacebookUserLogin,
} = require("../ultilities/validation");
const {getUserInformationByIdHandler} = require('../handlers/UserHandler/Information')
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


module.exports = router;
