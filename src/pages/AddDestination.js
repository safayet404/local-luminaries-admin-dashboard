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
  createDestination,
  getSingleDestination,
  resetState,
  updateDestination,
} from "../features/destination/destinationSlice";

let schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  image: Yup.string().required("Image is required"),
});

const AddDestination = () => {
  const [img, setImg] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const getDestinationId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getDestinationId !== undefined) {
      dispatch(getSingleDestination(getDestinationId));
    } else {
      dispatch(resetState());
    }
  }, []);

  const destination_state = useSelector(
    (state) => state.destination.singleDestination
  );
  const { name, image } = destination_state;

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
      name: name || "",
      image: img || image,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getDestinationId !== undefined) {
        const data = { id: getDestinationId, destinationData: values };
        dispatch(updateDestination(data));
        navigate("/admin/destination-list");
      } else {
        dispatch(createDestination(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">{getDestinationId !== undefined ? "Edit" : "Add"} Blogs</h3>

      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            className="mt-3"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(i) => handleOnChange(i)}
          />
          <div>
            {getDestinationId !== undefined ? (
              <img src={img} />
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
            name="name"
            onChange={formik.handleChange("name")}
            onBlue={formik.handleBlur("name")}
            value={formik.values.name}
            placeholder="Enter the destination name"
          />

          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-4"
          >
            {getDestinationId !== undefined ? "Update" : "Add"} Destination
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDestination;
