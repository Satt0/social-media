import url from "./URL";
const gqlURL = url.img + "graphql";


const createLikeQuery=({userid,postid,iconcode})=>`mutation{
	createLike(input:{userid:${userid},postid:${postid},iconcode:${iconcode}}){
   

      change
      status
    
  }
}`
const checkLikeStatusQuery=({userid,postid})=>`query{
  checkUserLikePost(input:{userid:${userid},postid:${postid}}) {
    didlike
  }
}`
const deleteLikeQuery=({userid,postid})=>`mutation{
  deleteLike(input:{userid:${userid},postid:${postid}}){
    

    change
      status
    
  }


}`

const getOnePostQuery=(postid)=>`	{
  getPostInformationById(postid:${postid}){
    postid
    userid
    content
    media
    datecreated
    likecount
    embeded
    
    user{
      userfullname
      userid
      userdisplayname
      picture
    }
  }
}`



const getPostById = (postid) => {
  try {
    return fetchGQL(getOnePostQuery(postid));
  } catch (err) {
    return { err: err };
  }
};


const likePost=async(like)=>{
  return await fetchGQL(createLikeQuery(like))
}
const checkLikeStatus=async({userid,postid})=>{
    return await fetchGQL(checkLikeStatusQuery({userid,postid}))
}
const deleteLike=async({userid,postid})=>{
  return await fetchGQL(deleteLikeQuery({userid,postid}))
}

// helper
const fetchGQL = async(query) => {
  try{
    return await fetch(gqlURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    })
      .then((response) => {
        return response.json();
      })
      
  }catch(e){
    return {err:e}
  }
};
export {
 
  likePost,
  checkLikeStatus,
  deleteLike,
  getPostById
  
};
