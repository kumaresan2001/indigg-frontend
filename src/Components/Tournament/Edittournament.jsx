import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../../global";
export function Edittournament() {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API}/tournament/${id}`)
      .then((data) => data.json())
      .then((mvs) => setData(mvs));
  }, [id]);

  return data ? <EditTournamentForm data={data} /> : <h3>loading</h3>;
}
function EditTournamentForm({ data }) {
  const formValidationSchema = yup.object({
    tourname: yup.string().required(),
    images: yup.string().required().min(4).url(),
    date: yup.date().required(),
    status: yup.string().required(),
    partname1: yup.string().required(),
  });
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        tourname: data.tourname,
        images: data.images,
        data: data.date,
        status: data.status,
        partname1: data.partname1,
      },
      validationSchema: formValidationSchema,
      onSubmit: (newTournament) => {
        console.log("form values", newTournament);
        updataTourname(newTournament);
      },
    });
  const Navigate = useNavigate();
  const updataTourname = async (newTournament) => {
    await fetch(`${API}/tournament/${data._id}`, {
      method: "PUT",
      body: JSON.stringify(newTournament),
      headers: {
        "Content-Type": "application/json",
      },
    });
    Navigate("/tournament");
  };
  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
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
        name="date"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.date}
        label="Date"
        variant="outlined"
        error={touched.date && errors.date}
        helperText={touched.date && errors.date ? errors.date : null}
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
        name="partname1"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.partname1}
        label="Partname1"
        variant="outlined"
        error={touched.partname1 && errors.tpartname1}
        helperText={
          touched.partname1 && errors.partname1 ? errors.partname1 : null
        }
      />

      <Button type="submit" color="success" variant="containd">
        save
      </Button>
    </form>
  );
}
