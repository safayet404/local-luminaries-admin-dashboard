import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";

import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";

import { createCupons, getACupon,resetState, updateCupon } from "../features/cupon/cuponSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = Yup.object().shape({
  name: Yup.string().required("Coupon Name is Required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount Percentage is Required"),
 
});
const AddCupon = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const getCuponId = location.pathname.split("/")[3]
  const navigate = useNavigate()
  console.log(getCuponId);

  const newCupon = useSelector((state) => state.cupon)

  const {cuponName,expiryDate,totalDiscount} = newCupon
  console.log(cuponName);

  useEffect(()=>{
    if(getCuponId !== undefined)
    {
      dispatch(getACupon(getCuponId))
    }
    else {
      dispatch(resetState());
    }
  },[cuponName])

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };


  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      name: cuponName ||  "",
      expiry : changeDateFormat(expiryDate) ||  "",
      discount : totalDiscount || ""
    
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getCuponId !== undefined)
      {
        const data = {id : getCuponId, cuponData : values}
        dispatch(updateCupon(data))
        navigate("/admin/cupon-list")

      }
      else
      {

        dispatch(createCupons(values));
        formik.resetForm()
       
      }
     
    },
  });
  return (
    <div>
      <h3 className="mb-4"> {getCuponId !== undefined ? "Edit" : "Add"} Cupon</h3>

      <div>
      <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
            placeholder="Enter Coupon Name"
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            name="expiry"
            onChange={formik.handleChange("expiry")}
            onBlur={formik.handleBlur("expiry")}
            value={formik.values.expiry}
            placeholder="Enter Expiry Data"
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            name="discount"
            onChange={formik.handleChange("discount")}
            onBlur={formik.handleBlur("discount")}
            value={formik.values.discount}
            placeholder="Enter Discount"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
           {getCuponId !== undefined ? "Update" : "Add"} Cupon
          </button>
        </form>
      </div>
    </div>
  );
};


export default AddCupon;
