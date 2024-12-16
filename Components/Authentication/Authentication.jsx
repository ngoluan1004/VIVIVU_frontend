import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import AuthModal from "./AuthModel";

const Authentication = () => {
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const handleOpenAuthModel = () => setOpenAuthModel(true);
  const handleCloseAuthModel = () => setOpenAuthModel(false);

  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <Grid
          className="hidden lg:block bg-vivivu-bg bg-cover bg-center h-screen relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/50"
          item
          lg={7}
        >
          {/* <img className="w-full h-screen" src="/img/image.png" alt="" /> */}

          <div className="absolute top-[40%] left-[25%]">
            <h1 className="text-9xl font-semibold text-white"> VIVIVU </h1>
          </div>
        </Grid>

        <Grid className="px-10" lg={5} xs={12}>
          <h1 className="font-bold text-5xl ">Vui lòng đăng ký</h1>
          <h1 className="font-bold text-5xl ">hoặc đăng nhập</h1>

          <h1 className="font-bold text-3xl py-11"> Tham gia ngay hôm nay</h1>

          <div className="w-[60%]">
            <div className="w-full">
              <GoogleLogin width={330} />
              <p className="py-5 text-center">OR</p>

              <Button
                onClick={handleOpenAuthModel}
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "29px",
                  borderColor: "#16A34A",
                  color: "#16A34A",
                  py: "7px",
                }}
              >
                Tạo tài khoản
              </Button>

              <p className="text-sm py-5">
                Bằng cách đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính
                sách riêng tư, bao gồm cả việc sử dụng Cookie
              </p>
            </div>
            <div className="mt-6">
              <h1 className="font-bold text-xl mb-5">Đã có tài khoản rồi?</h1>
              <Button
                onClick={handleOpenAuthModel}
                fullWidth
                variant="contained"
                size="large"
                sx={{ borderRadius: "29px", py: "14px", bgcolor: "#16A34A" }}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>

      <AuthModal open={openAuthModel} handleClose={handleCloseAuthModel} />
    </div>
  );
};

export default Authentication;
