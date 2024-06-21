import CustomInput from "../components/CustomInput";
import { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { imageUpload } from "../utils/imageUpload";
import {
  createBlogs,
  getABlog,
  updateBlog,
  resetState,
} from "../features/blog/blogSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.string().required("Date is required"),
});

const AddBlog = () => {
  const [img, setImg] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const getBlogId = location.pathname.split("/")[3];
  console.log(getBlogId);

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, []);
  const newBlog = useSelector((state) => state.blog.singleBlog);
  
  const { title, description, image, date } = newBlog;

  const handleOnChange = async (e) => {
    const image = e.target.files[0];
    try {
      const imageData = await imageUpload(image);
      console.log(imageData);
      setImg(imageData);
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title || "",
      description: description || "",
      image: image || img,
      date: date || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        navigate("/admin/blog-list");
      } else {
        dispatch(createBlogs(values));
      }

      formik.resetForm();
    },
  });

  return (
    <div>
      <h3 className="mb-4">{getBlogId !== undefined ? "Edit" : "Add"} Blogs</h3>

      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            className="mt-3"
            type={getBlogId ? "text" : "date"}
            name="date"
            onChange={formik.handleChange("date")}
            onBlue={formik.handleBlur("date")}
            value={formik.values.date}
            placeholder="Enter the blog date"
          />

          <div className="error">
            {formik.touched.date && formik.errors.date}
          </div>
          <CustomInput
            className="mt-3"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(i) => handleOnChange(i)}
          />
          <div>
            {getBlogId !== undefined ? (
              <img src={image} />
            ) : (
              <p>No Image is found</p>
            )}
          </div>
          <div className="error">
            {formik.touched.image && formik.errors.image}
          </div>

          <CustomInput
            className="mt-3"
            type="text"
            name="title"
            onChange={formik.handleChange("title")}
            onBlue={formik.handleBlur("title")}
            value={formik.values.title}
            placeholder="Enter the product title"
          />

          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <ReactQuill
            className="mt-3 mb-4"
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            onBlue={formik.handleBlur("description")}
            value={formik.values.description}
            placeholder="Enter the description"
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-4"
          >
            {getBlogId !== undefined ? "Update" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
