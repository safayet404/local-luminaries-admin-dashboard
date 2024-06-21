import CustomInput from "../components/CustomInput";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { getCategories } from "../features/category/categorySlice";
import { getBrands } from "../features/brand/brandSlice";
import { getColor } from "../features/color/colorSlice";
import { createProducts, resetState } from "../features/product/productSlice";
let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
 
 
   color: Yup.array()
    .min(1, "Pick atleast one color")
     .required("Color is required"),
});

const AddProduct = () => {
    
   const [color, setColor] = useState([]);

 
   const handleColors = (e) => {
     setColor(e);
     console.log(color);
   };




  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(getCategories());
  dispatch(getBrands());
  dispatch(getColor());
  }, []);
  const category_state = useSelector((state) => state.category.categories);
  const brand_state = useSelector((state) => state.brand.brands);
   const color_state = useSelector((state) => state.color.colors);
   
   const colors = [];
   color_state.forEach((i) => {
   colors.push({
     label: i.title,
     value: i.title,
     });
   });
   
   useEffect(() => {
     formik.values.color = color ? color : " ";
   
   }, [color]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price : "",
      quantity : "",
      brand : "",
      category : "",
      color : "",
     

    
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      if(createProducts(values))
      {
        alert("added successfully")
      }
     

      
      
    },
  });
  return (
    <div>
      <h3 className="mb-4">Add Product</h3>

      <div>
        <form onSubmit={formik.handleSubmit}>
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
        <select
        
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
          >
            <option value="">Select the category</option>
            {category_state.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
           <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={colors}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div> 
          <select
            name="brand"
            className="form-control py-3 mb-3"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
          >
            <option value="">Select the brand name</option>
            {brand_state.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div> 
          <CustomInput
            className="mt-3"
            type="number"
            name="quantity"
            onChange={formik.handleChange("quantity")}
            onBlue={formik.handleBlur("quantity")}
            value={formik.values.quantity}
            placeholder="Enter the quantity"
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div> 
        
         

          <button type="submit" className="btn btn-success border-0 rounded-3 my-4">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
