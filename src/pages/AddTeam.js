import CustomInput from "../components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTeam, getSingleTeam, resetState, updateTeam } from "../features/team/teamSlice";
import { imageUpload } from "../utils/imageUpload";

let schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  designation: Yup.string().required("Designation is required"),
  image: Yup.string().required("Image is required"),
  socialMediaLink: Yup.object().shape({
    facebookLink: Yup.string().required("Facebook link is required"),
    linkedinLink: Yup.string().required("LinkedIn link is required"),
    instagramLink: Yup.string().required("Instagram link is required"),
  }),
 
});

const AddTeam = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [img, setImg] = useState("");
  
  const getTeamId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const team_state = useSelector((state) => state.team.singleTeam);
  const {name,designation,image,socialMediaLink} = team_state
  

  useEffect(() => {
    if (getTeamId !== undefined) {
    

      dispatch(getSingleTeam(getTeamId));
    } else {
      dispatch(resetState());
    }
  }, []);
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
      name: name || "",
      designation: designation || "",
      image: image || img,
      socialMediaLink : {
        facebookLink : socialMediaLink?.facebookLink || "",
        linkedinLink : socialMediaLink?.linkedinLink || "",
        instagramLink : socialMediaLink?.instagramLink ||  ""
      }
      
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getTeamId !== undefined) {
        const data = { id: getTeamId, teamData: values };
        dispatch(updateTeam(data));
        navigate("/admin/team-list");
      } else {
        dispatch(createTeam(values));
      }
      formik.resetForm();
    },
  });
  return (
    <div>
      <h3 className="mb-4">
        {getTeamId !== undefined ? "Edit" : "Add"} Team
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <CustomInput
            type="text"
            name="name"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleChange("name")}
            value={formik.values.name}
            placeholder="Enter the member name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="text"
            name="designation"
            onChange={formik.handleChange("designation")}
            onBlur={formik.handleChange("designation")}
            value={formik.values.designation}
            placeholder="Enter the member designation"
          />
          <div className="error">
            {formik.touched.designation && formik.errors.designation}
          </div>
          <CustomInput
            className="mt-3"
            type="file"
            id="image"
            name="icon"
            accept="image/*"
            onChange={(i) => handleOnChange(i)}
          />
          <div className="error">
            {formik.touched.image && formik.errors.image}
          </div>
          <CustomInput
            type="text"
            name="socialMediaLink.facebookLink"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.socialMediaLink.facebookLink}
            placeholder="Enter the member facebook"
          />
          <div className="error">
            {formik.touched.socialMediaLink && formik.errors.socialMediaLink && formik.errors.socialMediaLink.facebookLink}
          </div>
          <CustomInput
            type="text"
            name="socialMediaLink.linkedinLink"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.socialMediaLink.linkedinLink}
            placeholder="Enter the member linkedin"
          />
           <div className="error">
            {formik.touched.socialMediaLink && formik.errors.socialMediaLink && formik.errors.socialMediaLink.linkedinLink}
          </div>
          <CustomInput
            type="text"
            name="socialMediaLink.instagramLink"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.socialMediaLink.instagramLink}
            placeholder="Enter the member instagram"
          />
          <div className="error">
            {formik.touched.socialMediaLink && formik.errors.socialMediaLink && formik.errors.socialMediaLink.instagramLink}
          </div>


          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-4"
          >
            {getTeamId !== undefined ? "Update" : "Add"} Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
