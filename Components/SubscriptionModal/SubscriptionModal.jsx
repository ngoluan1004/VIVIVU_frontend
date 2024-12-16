import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

const features = [
  "Dễ dàng tìm kiếm và trò chuyện",
  "theo dõi không giới hạn",
  "thêm nhiều hiệu ứng vào bài đăng",
  "thêm video dài",
  "xử lý thêm icon",
];

export default function SubscriptionModal({ open, handleClose }) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleClose = () => setOpen(false);

  const [plan, setPlan] = React.useState("Anually");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center space-x-3">
            <IconButton onClick={handleClose} aria-label="delete">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex justify-center py-3">
            <div className="w-[80%] space-y-10">
              <div className="p-5 rounded-md flex items-center justify-between bg-slate-300 shadow-lg ">
                <h1 className="text-xl pr-5">
                  Người đăng ký đã xác minh sẽ nhận được dấu kiểm định màu xanh
                  lam sau khi được chấp thuận
                </h1>
                <img className="w-24 h-24" src="/img/image.png" alt="" />
              </div>
              <div className="flex justify-between border border-gray-500 rounded-full px-5 py-3 bg-gray-200">
                <div>
                  <span
                    onClick={() => setPlan("Anually")}
                    className={`${
                      plan === "Anually" ? "text-black" : "text-gray-400"
                    }cursor-pointer`}
                  >
                    hàng năm
                  </span>
                  <span className="text-green-500 text-sm ml-5">
                    TIẾT KIỆM 12%
                  </span>
                </div>
                <p
                  onClick={() => setPlan("monthly")}
                  className={`${
                    plan === "monthly" ? "text-black" : "text-gray-400"
                  }cursor-pointer`}
                >
                  hàng tháng
                </p>
              </div>
              <div className="space-y-3">
                {features.map((item) => (
                  <div className="flex items-center space-x-5">
                    <FiberManualRecordIcon
                      sx={{ width: "7px", height: "7px" }}
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-5 cursor-pointer bg-gray-900 text-white rounded-full px-5 py-3">
                <span className="line-through italic">10,000 VND/THÁNG</span>
                <span className="px-5"> 5,000 VND/THÁNG</span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
