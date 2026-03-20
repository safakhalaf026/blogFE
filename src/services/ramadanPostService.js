// import axios from "axios";
// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/ramadanPost`
// const authConfig = () => ({
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
// })

// // retrieve all ramadanPost
// const index = async () => {
//     try {
//         const response = await axios.get(BASE_URL, authConfig())
//         return response.data.ramadanPost
//     } catch (err) {
//         console.log(err)
//     }
// }

// // retrieve ONE application
// const show = async (ramadanPostId) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/${ramadanPostId}`, authConfig())
//         return response.data.ramadanPost
//     } catch (error) {
//         console.log(error)
//     }
// }

// // create new application
// const create = async (formData) => {
//     try {
//         const response = await axios.post(BASE_URL, formData, authConfig())

//         return response.data.ramadanPost
//     } catch (error) {
//         console.log(error)
//     }
// }

// // edit application
// const update = async (ramadanPostId, formData) => {
//     try {
//         const response = await axios.put(`${BASE_URL}/${ramadanPostId}`, formData, authConfig())

//         return response.data.ramadanPost
//     } catch (error) {
//         console.log(error)
//     }
// }

// // delete application
// const remove = async (ramadanPostId) => {
//     try {
//         const response = await axios.delete(`${BASE_URL}/${ramadanPostId}`, authConfig())

//         return response.data.ramadanPost
//     } catch (error) {
//         console.log(error)
//     }
// }

// export {
//     index,
//     show,
//     create,
//     update,
//     remove
// }

import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/ramadanPost`;
const authConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

// retrieve all ramadanPosts
const index = async () => {
  try {
    const response = await axios.get(BASE_URL, authConfig());
    return response.data.ramadanPost;
  } catch (err) {
    console.log(err);
  }
};

// retrieve all post IDs in order (for prev/next navigation)
const getPostIds = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ids`, authConfig());
    return response.data.ids; // returns an array of post IDs
  } catch (err) {
    console.log(err);
  }
};

// retrieve ONE post
const show = async (ramadanPostId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${ramadanPostId}`, {
      ...authConfig(),
      headers: {
        ...authConfig().headers,
        'Cache-Control': 'no-cache',
      },
    });
    return response.data.ramadanPost;
  } catch (error) {
    console.log(error);
  }
};

// create new post
const create = async (formData) => {
  try {
    const response = await axios.post(BASE_URL, formData, authConfig());
    return response.data.ramadanPost;
  } catch (error) {
    console.log(error);
  }
};

// edit post
const update = async (ramadanPostId, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${ramadanPostId}`, formData, authConfig());
    return response.data.ramadanPost;
  } catch (error) {
    console.log(error);
  }
};

// delete post
const remove = async (ramadanPostId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${ramadanPostId}`, authConfig());
    return response.data.ramadanPost;
  } catch (error) {
    console.log(error);
  }
};

export {
  index,
  show,
  create,
  update,
  remove,
  getPostIds, // << added this
};