const db = require("../driver");

const registerUser = async (user) => {
  try {
    const {
      username,
      password,
      userDisplayName,
      userFullName,
      dateOfBirth,
      dateCreatedAccount=getDateNowISO(),
      email,
      phone,
      gender,
    } = user;
    const response = await db.query(
      `insert into useraccount (username,"password",userdisplayname,userfullname,dateofbirth,datecreatedaccount,email,phone,gender)
    values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *;`,
      [
        username,
        password,
        userDisplayName,
        userFullName,
        dateOfBirth,
        dateCreatedAccount,
        email,
        phone,
        gender,
      ]
    );
    const data = response.rows[0];
    return {
      uid: data.userid,
      userFullName: data.userfullname,
      userDisplayName: data.userdisplayname,
      picture: data.picture,
      gender: data.gender,
    };
  } catch (e) {
    throw e;
  }
};
const LoginUser = async (user) => {
  try {
    const { username, password } = user;
    if (username && password) {
      const response = await db.query(
        `select * from useraccount 
            where username=$1 and password=$2
            `,
        [username, password]
      );
      const data = response.rows[0];
      return {
        status:true,
        user:{
          uid: data.userid,
          userFullName: data.userfullname,
          userDisplayName: data.userdisplayname,
          picture: data.picture,
          gender: data.gender,
        }
      };
    }
    throw new Error("can't get user");
  } catch (e) {
    throw e;
  }
};

const registerByFacebook = async (user) => {
  try {
    const { facebookid, picture, name, gender = "not set" } = user;
    const username = facebookid,
      userFullName = name,
      userDisplayName = name,
      password = Date.now(),
      dateOfBirth = "1970-01-01",
      dateCreatedAccount = getDateNowISO()


      // check if user exists
    const existUser=await db.query(`select * from useraccount where facebookid=$1;`,[facebookid])
    if (existUser.rowCount){
      return getJSON(existUser.rows[0])
    }
    // if not exist then insert
    const response = await db.query(
      `insert into useraccount 
      (username,"password",userdisplayname,userfullname,dateofbirth,
      datecreatedaccount,gender,facebookid,picture)
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *;`,
      [
        username,
        password,
        userDisplayName,
        userFullName,
        dateOfBirth,
        dateCreatedAccount,
        gender,
        facebookid,
        picture
      ]
    );
    return getJSON(response.rows[0])
  } catch (e) {
    throw e;
  }
};


const getUserInformationById=async(userId)=>{
  try{
        const response=await db.query(`select userid as uid,userfullname,userdisplayname,picture from useraccount 
        where userid=$1;`,[userId])
        return {rows:response.rows,count:response.rowCount}

  }catch(e){
    throw e
  }
}

function getJSON(raw){
 try{
  return {
    status:true,
    user:{
      uid:raw.userid,
      userFullName:raw.userfullname,
      picture:raw.picture,
  
    }
  }
 }
 catch(e){
   throw e
 }
}
function getDateNowISO(){
  return new Date().toISOString().substring(0, 10);
}
module.exports = { registerUser, LoginUser,registerByFacebook,getUserInformationById };
