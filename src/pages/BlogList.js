import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../features/blog/blogSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { useState } from "react";
import ChangeDateFormat from "../components/ChangeDateFormat";


const BlogList = () => {
    const columns = [
        {
          title: "SNo",
          dataIndex: "key",
        
        },
        {
          title: "Blog Title",
          dataIndex: "title",
         
        },
        {
          title: "Blog Description",
          dataIndex: "desc",
         
        },
        {
          title: "Image",
          dataIndex: "image",
         
        },
        {
          title: "Date",
          dataIndex: "date",
         
        },
        {
          title: "Action",
          dataIndex: "action",
         
        },
      ];
      const [open,setOpen] = useState(false)
      const [blogId,setBlogId] = useState("")

      const showModal = (e) =>{
        setOpen(true)
        setBlogId(e)
      }

      const hideModal = (e)=>{
        setOpen(false)
      }
    
      const data2 = [];
    
      const dispatch = useDispatch()
      useEffect(()=>{
        dispatch(getBlogs())
      },[])
      const blog_state = useSelector((state)=> state.blog.blogs)
      const blogDetails = useSelector((state) => state.blog)
      const {createdBlog,updatedBlog,deletedBlog} = blogDetails
      for (let i = 0; i < blog_state.length; i++) {
        data2.push({
          key: i+1,
          title: blog_state[i].title,
          desc: blog_state[i].description,
          image: blog_state[i].image,
          date : ChangeDateFormat(blog_state[i].date),
          action :  (
            <>
              <Link to={`/admin/add-blog/${blog_state[i]._id}`} className=" fs-3 text-danger">
                <BiEdit />
              </Link>
              <button className="ms-3 fs-3 text-danger border-0 bg-transparent" onClick={()=>{
                showModal(blog_state[i]._id)
              }}>
                <AiFillDelete />
              </button>
            </>
          ),
        });
      }

      useEffect(()=>{
        dispatch(getBlogs())
      },[createdBlog,updatedBlog,deletedBlog])
      const deleteBlogs = (e) =>{
        dispatch(deleteBlog(e))
        setOpen(false)
      }
  return (
    <div>
        <h3 className="mb-4">Blog list</h3>
       <div>
       <Table columns={columns} dataSource={data2}  scroll={{
                      x: 700,
                    }}></Table>
       </div>
       <CustomModal
        titile="Are you sure you want to delete this blog?" open={open} onCancel={hideModal} performAction={()=>{deleteBlogs(blogId)}}
       title="Are you sure you want to delete this brnad?" />
    </div>
  )
}

export default BlogList