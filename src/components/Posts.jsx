import { useEffect, useState } from "react";
import { deletePost, getPosts } from "../api/PostApi";
import "../templates/posts.css";
import { Form } from "./Form";

export const Posts = () => {
    // state to hold the posts data
    const [data, setData] = useState([]);

    // state to hold the data of the post to be updated
    // this state will be used to prefill the input fields with the data of the post to be updated
    const [updateDataApi, setUpdateDataApi] = useState({});

    const getPostsData = async () => {
        const res = await getPosts();
        console.log(res.data);
        setData(res.data);
    };

    useEffect(() => {
        getPostsData();
    }, []);

    // function to delete post
    const deleteData = async (id) => {
        try {
            const res = await deletePost(id);
            //console.log(res);
            if (res.status === 200) {
                // filter out the deleted post from the data array
                // and update the state with the new array
                const newUpdatedPosts = data.filter((curPost) => {
                    return curPost.id !== id;
                });
                setData(newUpdatedPosts);
            } else {
                alert("Failed to delete the post", res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // function to edit post
    // this function will set the updateDataApi state with the current post data
    const editData = (curEle) => setUpdateDataApi(curEle);

    return (
        <>
            <section className="section-form">
                <Form
                    data={data}
                    setData={setData}
                    updateDataApi={updateDataApi}
                    setUpdateDataApi={setUpdateDataApi} />
            </section>
            <section className="section-post">
                <ol>
                    {data.map((curEle) => {
                        const { id, title, body } = curEle;
                        return (
                            <li key={id}>
                                <p>Title: {title}</p>
                                <p>Body: {body}</p>
                                <div className="button-group">
                                    <button className="btn-edit"
                                        onClick={() => editData(curEle)}>
                                        Edit
                                    </button>
                                    <button className="btn-delete"
                                        onClick={() => deleteData(id)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </section>
        </>
    );
};