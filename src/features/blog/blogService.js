import axios from "axios";
import { base_url } from "../../utils/base_url";
import toast from "react-hot-toast";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/all-blog`);

  return response.data;
};
const getABlog = async (id) => {
  const response = await axios.get(`${base_url}blog/single-blog/${id}`);

  return response.data;
};
const updateBlog = async (blog) => {
  try {
    const response = await axios.put(`${base_url}blog/update-blog/${blog.id}`, {
      title: blog.blogData.title,
      description: blog.blogData.description,
      date: blog.blogData.date,
      image: blog.blogData.image,
    });
    if (response.status === 200) {
      toast.success("Blog Data Updated");
    }

    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong");
  }
};
const createBlogs = async (blog) => {
  try {
    const response = await axios.post(`${base_url}blog/create-blog`, blog);
    if (response.status === 200) {
      toast.success("Blog is created")
    }

    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong")
  }
};
const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${base_url}blog/delete-blog/${id}`);
    if (response.status === 200) {
      toast.success("Blog is deleted")
    }

    return response.data;
  } catch (error) {
   toast.error("Something Went Wrong")
  }
};

const blogService = {
  getBlogs,
  createBlogs,
  getABlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
