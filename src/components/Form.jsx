import { useEffect, useState } from "react";
import { postData, updatePost } from "../api/PostApi";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
    // state to hold the input data
    // this state will be used to store the data entered in the input fields
    const [addData, setAddData] = useState({
        title: "",
        body: ""
    });
    let isEmpty = Object.keys(updateDataApi).length === 0; // check if the updateDataApi is empty or not

    // useEffect to update the input fields when the updateDataApi changes
    // this will be used to prefill the input fields with the data of the post to be updated
    useEffect(() => {
        updateDataApi &&
            setAddData({
                title: updateDataApi.title || "",
                body: updateDataApi.body || "",
            });
    }, [updateDataApi]); // update the input fields when the updateDataApi changes

    // function to handle input change
    // this function will update the state of the input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddData((prev) => {
            // console.log(prev);
            return {
                ...prev,
                [name]: value
            };
        });
    }

    // function to post data
    const addPostData = async () => {
        const res = await postData(addData);
        console.log("res", res);
        if (res.status === 201) {
            setData([...data, res.data]); // add the new post to the data array
            // clear the input fields after adding the post
            setAddData({ title: "", body: "" });
        }
    }

    // function to update post data
    // this function will be called when the user clicks on the edit button
    const editPostData = async () => {
        try {
            const res = await updatePost(updateDataApi.id, addData);
            console.log(res);

            // if the response is successful, update the data array with the new post data
            if (res.status === 200) {
                setData((prev) => {
                    return prev.map((curEle) => {
                        return curEle.id === res.data.id ? res.data : curEle; // update the post with the new data
                    })
                })
            };
            // clear the input fields after updating the post
            setAddData({ title: "", body: "" });
            setUpdateDataApi({}); // clear the updateDataApi state

        } catch (error) {
            console.log(error);
        };
    };

    // function to handle form submit
    // this function will prevent the default behavior of the form
    const handleFormSubmit = (e) => {
        e.preventDefault();
        //check if the input fields are empty or not
        if (addData.title === "" || addData.body === "") {
            alert("Please fill all the fields");
            return;
        }
        const action = e.nativeEvent.submitter.value;
        if (action === "Add") {
            // if the action is add, call the addPostData function
            addPostData();
        } else if (action === "Edit") {
            // if the action is edit, call the editPostData function
            editPostData();
        }
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="title">
                    <input type="text"
                        autoComplete="off"
                        id="title"
                        name="title"
                        placeholder="Add Titile"
                        value={addData.title}
                        onChange={handleInputChange} />
                </label>
            </div>
            <div>
                <label htmlFor="body">
                    <input type="text"
                        autoComplete="off"
                        id="body"
                        name="body"
                        placeholder="Add Post"
                        value={addData.body}
                        onChange={handleInputChange} />
                </label>
            </div>
            <button type="submit" value={isEmpty ? "Add" : "Edit"}>
                {isEmpty ? "Add" : "Edit"}
            </button>
        </form>
    );
};