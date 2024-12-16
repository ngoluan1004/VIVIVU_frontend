import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import { useLocation, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    const path = location.pathname === "/signup" ? "/signin" : "/signup";
    navigate(path);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center font-bold text-3xl pb-5">
            Đăng nhập/Đăng ký
          </h1>

          {location.pathname === "/signup" ? <SignupForm /> : <SigninForm />}

          <h1 className="text-center py-5 font-semibold text-lg text-gray-500">
            {location.pathname === "/signup"
              ? "Nếu bạn đã có tài khoản"
              : "Nếu bạn chưa có tài khoản"}
          </h1>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleNavigate}
            sx={{
              borderRadius: "29px",
              borderColor: "#16A34A",
              color: "#16A34A",
              py: "14px",
            }}
          >
            {location.pathname === "/signup" ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
