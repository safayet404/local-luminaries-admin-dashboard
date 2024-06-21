import CustomInput from "../components/CustomInput";
import { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";

import {
  createTour,
  getSingleTour,
  resetState,
  updateTour,
} from "../features/tour/tourSlice";

import { imageUpload } from "../utils/imageUpload";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),

  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  duration: Yup.string().required("Duration is required"),
  date: Yup.string().required("Date is required"),
});

const AddTour = () => {
  const [img, setImg] = useState("");

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
  const location = useLocation();
  const navigate = useNavigate();

  const getTourId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getTourId !== undefined) {
      dispatch(getSingleTour(getTourId));
    } else {
      dispatch(resetState());
    }
  }, [getTourId]);

  const single_tour = useSelector((state) => state.tour.singleTour);
  const { title, description, image, duration, price,date } = single_tour;
  console.log(single_tour);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title || "",
      date : date || "",
      description: description || "",
      price: price || "",
      image: image || img,
      duration: duration || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getTourId, tourData: values };
      if (getTourId !== undefined) {
        dispatch(updateTour(data));
        navigate("/admin/tour-list");
      } else {
        dispatch(createTour(values));

        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">{getTourId !== undefined ? "Update" : "Add"} Tour </h3>

      <div>
        <form onSubmit={formik.handleSubmit}>
          { img ? <div>
            <img className="tourAddImage" src={img} />
          </div> : " "}

          
          <CustomInput
            className="mt-3"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(i) => handleOnChange(i)}
          />
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
          <CustomInput
            className="mt-3"
            type="date"
            name="date"
            onChange={formik.handleChange("date")}
            onBlue={formik.handleBlur("date")}
            value={formik.values.date}
            placeholder="Enter the product date"
          />

          <div className="error">
            {formik.touched.date && formik.errors.date}
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
          <CustomInput
            className="mt-3"
            type="number"
            name="price"
            onChange={formik.handleChange("price")}
            onBlue={formik.handleBlur("price")}
            value={formik.values.price}
            placeholder="Enter the price"
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <CustomInput
            className="mt-3"
            type="text"
            name="duration"
            onChange={formik.handleChange("duration")}
            onBlue={formik.handleBlur("duration")}
            value={formik.values.duration}
            placeholder="Enter the duration"
          />
          <div className="error">
            {formik.touched.duration && formik.errors.duration}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-4"
          >
           {getTourId !== undefined ? "Update" : "Add"} Tour
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTour;
