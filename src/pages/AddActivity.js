import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import {
  createActivity,
  getSingleActivity,
  resetState,
  updateActivity,
} from "../features/activity/activitySlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { imageUpload } from "../utils/imageUpload";
let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  icon: Yup.string().required("Icon is required"),
});
const AddActivity = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const getActivityId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getActivityId !== undefined) {
      dispatch(getSingleActivity(getActivityId));
    } else {
      dispatch(resetState());
    }
  }, []);
  const activityState = useSelector((state) => state.activity.singleActivity);
  const { title, description, icon } = activityState;

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
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title || "",
      description: description || "",
      icon: icon || img,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getActivityId, activityData: values };
      if (getActivityId !== undefined) {
        dispatch(updateActivity(data));
        navigate("/admin/activity-list");
      } else {
        dispatch(createActivity(values));
      }
      formik.resetForm();
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {getActivityId !== undefined ? "Edit" : "Add"} Activity
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="mt-4">

        <CustomInput
            className="mt-3"
            type="file"
            id="image"
            name="icon"
            accept="image/*"
            onChange={(i) => handleOnChange(i)}
          />
          {/* <div>
            {getBlogId !== undefined ? (
              <img src={image} />
            ) : (
              <p>No Image is found</p>
            )}
          </div> */}
          <div className="error">
            {formik.touched.icon && formik.errors.icon}
          </div>
          <CustomInput
            type="text"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleChange("title")}
            value={formik.values.title}
            placeholder="Enter the activity title"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="text"
            name="description"
            onChange={formik.handleChange("description")}
            onBlur={formik.handleChange("description")}
            value={formik.values.description}
            placeholder="Enter the activity description"
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

         

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-4"
          >
            {getActivityId !== undefined ? "Update" : "Add"} Activity
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddActivity;
