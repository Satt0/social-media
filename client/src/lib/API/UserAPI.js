import url from "./URL";
import axios from 'axios'
const API = {
  async registerNewUser(user) {
    try {
      const feedback = await fetch(
        `${url.dev}/user/signup`,
        getHeaders("POST", { user: user })
      ).then((res) => res.json());

      if (feedback.status) {
        return feedback;
      }
      throw new Error();
    } catch (e) {
      return { err: "bad request" };
    }
  },
  async loginExistingUser(user) {
    try {
      const feedback = await fetch(
        `${url.dev}/user/login`,
        getHeaders("POST", { user: user })
      ).then((res) => res.json());

      if (feedback.status) {
        return feedback;
      }
      throw new Error();
    } catch (e) {
      return { err: "bad request from client" };
    }
  },
  async loginFacebook(user) {
    try {
      const feedback = await fetch(
        `${url.dev}/user/fblogin`,
        getHeaders("POST", { user: user })
      ).then((res) => res.json());

      if (feedback.status) {
        return feedback;
      }
      throw new Error();
    } catch (e) {
      return { err: "bad request" };
    }
  },
  async makePost(form){
   const data=await axios({
      method: "post",
      url: "http://localhost:4000/post/newpost",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        return response.data
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
      return data
  },
  async getLatestPost(){
    try{
      const posts=await axios.get(`${url.dev}/post/latest`).then(({data})=>data)
      return posts

    }catch(e){
      return {err:"bad request! no post."}
    }
  },
  async getUserById(id){
      try{  
            return fetch(`${url.dev}/user/information/${id}`).then(res=>res.json())
      }catch(e){
        return {err:e.message}
      }
  }
};

const getHeaders = (method, data) => {
  
 
  return {
    method: method, // *GET, POST, PUT, DELETE, etc.

    mode: "cors",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
};

export default API;
