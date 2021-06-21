const db=require('../driver')

const insertPost=async(post)=>{
    try {
        const {content="",uid,files="",like=0,comment,embeded=""}=post
        const data=await db.query(`insert into post (userid,content,datecreated,likecount,media,embeded,commentcount)
        values ($1,$2,now(),$3,$4,$5,$6) returning *;`,[
            uid,content,like,files,embeded,comment
        ])
        return data.rows[0]

    }
    catch(e){
        return {row:null,count:null,error:e.message}
    }
}

const getLatestPosts=async()=>{
    try{
        const response=await db.query(`
            select * from post
            order by postid desc
            limit 10;
        `)
        return {rows:response.rows,count:response.rowCount}
    }
    catch(e){
        throw e
    }
}
const getEarlierPostById=async(previousId)=>{
    try{
            const response=await db.query(`
                select * from post
                where postid < $1
                order by postid desc 
                limit 10;
            `,[previousId])
            return {rows:response.rows,count:response.rowCount}
    }
    catch(e){
        throw e
    }
}   

const getUserPostById=async(uid)=>{
    try{
            const response=await db.query(`select * from post where userid=$1
                    order by postid desc 
                    limit 10;
                `,[uid])
            return {rows:response.rows,count:response.rowCount}
    }
    catch(e){
        throw e
    }
}
const getUserEARLIERPostById=async(previousId,uid)=>{
    try{
        const response=await db.query(`
            select * from post
            where postid < $1 and userid=$2
            order by postid desc limit 10;
        `,[previousId,uid])
        return {rows:response.rows,count:response.rowCount}
}
catch(e){
    throw e
}

}
module.exports={
    insertPost,
    getLatestPosts,
    getEarlierPostById,
    getUserPostById,
    getUserEARLIERPostById
}