import { Grid, TextField, Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Formik, useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUser } from "../../Store/Auth/Action.js";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  password: Yup.string().required("Password is Required"),
});
const SigninForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth); // Lấy lỗi từ Redux store

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      // console.log("form value", values);
    },
  });

  // Hiển thị alert khi có lỗi từ Redux store
  React.useEffect(() => {
    if (error) {
      alert(error); // Hiển thị thông báo lỗi
    }
  }, [error]); // Chạy khi có sự thay đổi trong error

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            size="large"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            variant="outlined"
            size="large"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid className="mt-20" item xs={12}>
          <Button
            sx={{ borderRadius: "29px", py: "14px", bgcolor: "#16A34A" }}
            fullWidth
            type="submit"
            variant="contained"
            size="large"
          >
            Đăng nhập
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SigninForm;
