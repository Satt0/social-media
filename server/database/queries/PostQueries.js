const db = require("../driver");

const insertPost = async (post) => {
  try {
    const {
      content = "",
      uid,
      files = "",
      like = 0,
      comment,
      embeded = "",
    } = post;
    const data = await db.query(
      `insert into post (userid,content,datecreated,likecount,media,embeded,commentcount)
        values ($1,$2,now(),$3,$4,$5,$6) returning *;`,
      [uid, content, like, files, embeded, comment]
    );
    return data.rows[0];
  } catch (e) {
    return { row: null, count: null, error: e.message };
  }
};

const getLatestPosts = async () => {
  try {
    const response = await db.query(`
            select * from post
            order by postid desc
            limit 10;
        `);
    return { rows: response.rows, count: response.rowCount };
  } catch (e) {
    throw e;
  }
};
const getEarlierPostById = async (previousId) => {
  try {
    const response = await db.query(
      `
                select * from post
                where postid < $1
                order by postid desc 
                limit 10;
            `,
      [previousId]
    );
    return { rows: response.rows, count: response.rowCount };
  } catch (e) {
    throw e;
  }
};
const getOnePostById=async (postid)=>{
    try{
           
            const res=await db.query(`select * from post where postid=$1 limit 1;`,[postid])
           
            return res.rows[0]

    }
    catch(e){
        throw e
    }
}
const getUserPostById = async (uid) => {
  try {
    const response = await db.query(
      `select  * from post where userid=$1
                    order by postid desc 
                    limit 10;
                `,
      [uid]
    );
    return { rows: response.rows, count: response.rowCount };
  } catch (e) {
    throw e;
  }
};
const getUserEARLIERPostById = async (previousId, uid) => {
  try {
    const response = await db.query(
      `
            select * from post
            where postid < $1 and userid=$2
            order by postid desc limit 10;
        `,
      [previousId, uid]
    );
    return { rows: response.rows, count: response.rowCount };
  } catch (e) {
    throw e;
  }
};

const userCommentPost = async (comment) => {
  try {
    const { userid, postid, content, datecreated = getDateNowISO() } = comment;
    const response = await db.query(
      `insert into usercomment(postid,userid,datecreated,content)
            values($1,$2,$3,$4) returning *;`,
      [postid, userid, datecreated, content]
    );
    return { rows: response.rows, count: response.count };
  } catch (e) {
    throw e;
  }
};
const getPostLatestCommentByIdLimit10 = async (postid) => {
  try {
    const response = await db.query(
      `select * from usercomment
                    where postid=$1
                        order by commentid desc
                        limit 5
                     ;`,
      [postid]
    );
    return { rows: response.rows, count: response.count };
  } catch (e) {
    throw e;
  }
};
const updateUserCommentByLastTrackedID = async (postid, lastTrackedID) => {
  try {
    const response = await db.query(
      `select * from usercomment
                    where postid=$1 and commentid > $2
                    order by commentid desc
                    limit 10;
            `,
      [postid, lastTrackedID]
    );
    return { rows: response.rows, count: response.rowCount };
  } catch (e) {
    throw e;
  }
};

const userLikePostLock = async (userid, postid, iconcode) => {
  try {
    const res = await db.query(
      `
        INSERT INTO userlike (postid, userid,iconcode,datecreated) VALUES ($1, $2,$3,now());

        `,
      [postid, userid, iconcode]
    );
    return res;
  } catch (e) {
    throw e;
  }
};
const updatePostLikeCountIncreBy1 = async (postid,val) => {
  try {
    const res = await db.query(
      `update post set likecount=likecount+$1 where postid=$2 returning *;`,
      [val,postid]
    );

    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
const deleteLike = async (postid, userid) => {
  try {
    const res = await db.query(
      `delete from userlike where postid = $1 and userid=$2 returning *;`
    ,[postid,userid]);
    return res.rowCount>0
  } catch (e) {
      
      return false
  }
};
const checkUserLIKEDPost = async (userid, postid) => {
  try {
    const response = await db.query(
      `select * from userlike where userid=$1 and postid=$2;`,
      [userid, postid]
    );
    return response.rowCount > 0;
  } catch (e) {}
};

// helper

function getDateNowISO() {
  return new Date().toISOString().substring(0, 10);
}
module.exports = {
  insertPost,
  getLatestPosts,
  getEarlierPostById,
  getUserPostById,
  getUserEARLIERPostById,
  getOnePostById,
  userCommentPost,
  getPostLatestCommentByIdLimit10,
  updateUserCommentByLastTrackedID,
  userLikePostLock,
  updatePostLikeCountIncreBy1,
  checkUserLIKEDPost,
  deleteLike
};
