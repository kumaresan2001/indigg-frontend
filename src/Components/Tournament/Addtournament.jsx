// import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../../global";
export function Addtournament() {
  const formValidationSchema = yup.object({
    tourname: yup.string().required(),
    images: yup.string().required().min(4).url(),
    date: yup.number().required().min(0).max(20),
    status: yup.string().required(),
    partname1: yup.string().required(),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        tourname: "",
        images: "",
        date: "",
        status: "",
        partname1: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (newMovie) => {
        console.log("form values", newMovie);
        addMovie(newMovie);
      },
    });
  const Navigate = useNavigate();
  const addMovie = async (newMovie) => {
    await fetch(`${API}/tournament`, {
      method: "POST",
      body: JSON.stringify(newMovie),
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
        label="Tournamet Name"
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
        label="date"
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
        label="Particient Name"
        variant="outlined"
        error={touched.partname1 && errors.partname1}
        helperText={
          touched.partname1 && errors.partname1 ? errors.partname1 : null
        }
      />

      <Button
        type="submit"
        // setMovieList([...movielist, newMovie]);

        variant="containd"
      >
        add tournament
      </Button>
    </form>
  );
}
