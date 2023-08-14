import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../../global";
export function Editparticipant() {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API}/participant/${id}`)
      .then((data) => data.json())
      .then((mvs) => setData(mvs));
  }, [id]);

  return data ? <EditTournamentForm data={data} /> : <h1>loading</h1>;
}
function EditTournamentForm({ data }) {
  const formValidationSchema = yup.object({
    tourname: yup.string().required(),
    images: yup.string().required().min(4).url(),
    status: yup.string().required(),
    partname: yup.string().required(),
  });
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        tourname: data.tourname,
        images: data.images,
        status: data.status,
        partname: data.partname,
      },
      validationSchema: formValidationSchema,
      onSubmit: (newParticipant) => {
        console.log("form values", newParticipant);
        updataparticipant(newParticipant);
      },
    });
  const Navigate = useNavigate();
  const updataparticipant = async (newParticipant) => {
    await fetch(`${API}/participant/${data._id}`, {
      method: "PUT",
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
        label="PartIcipant Name"
        variant="outlined"
        error={touched.partname && errors.tpartname1}
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

      <Button type="submit" color="success" variant="containd">
        save
      </Button>
    </form>
  );
}
