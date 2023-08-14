import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../../global";
export function Addparticipant() {
  const formValidationSchema = yup.object({
    partname: yup.string().required(),
    images: yup.string().required().min(4).url(),

    status: yup.string().required(),
    tourname: yup.string().required(),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        partname: "",
        images: "",

        status: "",
        tourname: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (newParticipant) => {
        console.log("form values", newParticipant);
        addParticipant(newParticipant);
      },
    });
  const Navigate = useNavigate();
  const addParticipant = async (newParticipant) => {
    await fetch(`${API}/participant`, {
      method: "POST",
      body: JSON.stringify(newParticipant),
      headers: {
        "Content-Type": "application/json",
      },
    });
    Navigate("/participant");
  };
  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <TextField
        name="partname"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.partname}
        label="Participant Name"
        variant="outlined"
        error={touched.partname && errors.partname}
        helperText={
          touched.partname && errors.partname ? errors.partname : null
        }
      />
      <TextField
        name="images"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.images}
        label="Images"
        variant="outlined"
        error={touched.images && errors.images}
        helperText={touched.images && errors.images ? errors.images : null}
      />

      <TextField
        name="status"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.status}
        label="Status"
        variant="outlined"
        error={touched.status && errors.status}
        helperText={touched.status && errors.status ? errors.status : null}
      />
      <TextField
        name="tourname"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.tourname}
        label="Tournament Name"
        variant="outlined"
        error={touched.tourname && errors.tourname}
        helperText={
          touched.tourname && errors.tourname ? errors.tourname : null
        }
      />

      <Button type="submit" variant="containd">
        add participant
      </Button>
    </form>
  );
}
