
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import CustomInput from "../components/CustomInput";
import { uploadImg } from "../features/upload/uploadSlice";
import { imageUpload } from "../utils/imageUpload";
const AddImage = () => {
  const dispatch = useDispatch()
  const [img,setImg] = useState("")

  const handleOnChange = async (e)=>{
    const image = e.target.files[0];
    try {
      const imageData = await imageUpload(image);
      console.log(imageData);
      setImg(imageData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    formik.values.image = img ? img : " "
  },[img])
  const formik = useFormik({
  
    initialValues: {
      image : "",
    },
   
    onSubmit: (values) => {
      dispatch(uploadImg(values))
      formik.resetForm()
      
      
    },
  });
 
  return (
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
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddImage;
