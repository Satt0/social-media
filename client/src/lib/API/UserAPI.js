import url from "./URL";
import axios from "axios";
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
  async makePost(form) {
    const data = await axios({
      method: "post",
      url: `${url.dev}/post/newpost`,
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        return response.data;
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    return data;
  },
  async getLatestPost() {
    try {
      const posts = await axios
        .get(`${url.dev}/post/latest`)
        .then(({ data }) => data);
      return posts;
    } catch (e) {
      return { err: "bad request! no post." };
    }
  },
  async getUserById(id) {
    try {
      return fetch(`${url.dev}/user/information/${id}`).then((res) =>
        res.json()
      );
    } catch (e) {
      return { err: e.message };
    }
  },
  async getEarlierPostByLastId(lastId) {
    try {
      const response = await fetch(`${url.dev}/post/earlier/${lastId}`).then(
        (res) => res.json()
      );
      return response;
    } catch (e) {
      return { err: e.message };
    }
  },
  async getAllPostById(uid) {
    try {
      const response = await fetch(`${url.dev}/post/allpost/${uid}`).then(
        (res) => res.json()
      );
      return response;
    } catch (e) {
      return { err: e.message };
    }
  },
  async getUserEarlierPostById(uid, lastId) {
    try {
      const response = await fetch(
        `${url.dev}/post/earlier/${uid}/${lastId}`
      ).then((res) => res.json());
      return response;
    } catch (e) {
      return { err: e.message };
    }
  },
  async setUserAvatar(uid, form) {
    try {
      const data = await axios({
        method: "put",
        url: `${url.dev}/user/avatar/${uid}`,
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          return response.data;
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
      return data;
    } catch (e) {
      return { err: e.message };
    }
  },
  async userCommentPost(comment){
      try{
        const response=await fetch(`${url.dev}/post/comment`,getHeaders("POST",comment)).then(res=>res.json())
        return response
      }
      catch(e){
        return {err:'bad request'}
      }
  },
  async getPostLatestComment(postid){
        try{
              const response=await fetch(`${url.dev}/post/comment/${postid}`).then(res=>res.json())
              return response
        }catch (e){
          return {
            err:'bad request'
          }
        }
  },
  async updateCommentByLastID(update){
      try{  
            const response=await fetch(`${url.dev}/post/comment/update`,getHeaders("POST",update)).then(res=>res.json())
            return response
      }
      catch(e){
        return {err:"not found"}
      }
  }
};

const getHeaders = (method, data) => {
  return {
    method: method, // *GET, POST, PUT, DELETE, etc.

    mode: "cors",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
};

export default API;
