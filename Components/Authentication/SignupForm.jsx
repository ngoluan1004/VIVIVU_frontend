import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Store/Auth/Action";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const SignupForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    backgroundImage: null,
    imgUrl: null,
    location: "",
    email: "",
    birthDate: {
      day: "",
      month: "",
      year: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["day", "month", "year"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        birthDate: {
          ...prev.birthDate,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0], // Chỉ lưu trữ 1 file cho mỗi trường
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("fullName", formData.fullName);
    form.append("username", formData.username);
    form.append("password", formData.password);
    form.append("backgroundImage", formData.backgroundImage);
    form.append("imgUrl", formData.imgUrl);
    form.append("location", formData.location);
    form.append("email", formData.email);
    form.append(
      "birthDate",
      `${formData.birthDate.year}-${formData.birthDate.month}-${formData.birthDate.day}`
    );

    try {
      // const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`, // Gửi JWT nếu cần
        },
      };
      await axios.post("http://localhost:8080/users/create-user", form, config);
      alert("Tạo tài khoản thành công!");
    } catch (err) {
      console.error(err);
      alert("Error creating user!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <p>Background Image</p>
          <input
            fullWidth
            label="Background Image"
            name="backgroundImage"
            variant="outlined"
            type="file"
            required
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12}>
          <p>Avatar</p>
          <input
            fullWidth
            label="Avatar"
            name="imgUrl"
            variant="outlined"
            type="file"
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fullname"
            name="fullName"
            variant="outlined"
            size="small"
            value={formData.fullName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            size="small"
            value={formData.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            variant="outlined"
            size="small"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            variant="outlined"
            size="small"
            value={formData.location}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Date</InputLabel>
          <Select
            fullWidth
            name="day"
            value={formData.birthDate.day}
            size="small"
            onChange={handleChange}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Month</InputLabel>
          <Select
            fullWidth
            name="month"
            value={formData.birthDate.month}
            size="small"
            onChange={handleChange}
          >
            {months.map((month) => (
              <MenuItem key={month.label} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Year</InputLabel>
          <Select
            fullWidth
            name="year"
            value={formData.birthDate.year}
            size="small"
            onChange={handleChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid className="mt-20" item xs={12}>
          <Button
            sx={{ borderRadius: "29px", py: "14px", bgcolor: "#16A34A" }}
            fullWidth
            type="submit"
            variant="contained"
            size="large"
          >
            Đăng ký
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;
