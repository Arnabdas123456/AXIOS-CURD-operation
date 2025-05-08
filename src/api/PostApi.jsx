import axios from "axios";
const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

//get method
export const getPosts = () => {
    return api.get("/posts");
};

//delete method
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
};

//post method
export const postData = (post) => {
    return api.post("/posts", post);
};

//put method

export const updatePost = (id, post) => { // update the post with the given id
    return api.put(`/posts/${id}`, post); // send a PUT request to the API with the updated post data
};

