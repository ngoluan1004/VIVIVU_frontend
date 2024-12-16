import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const CategoryList = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  return (
    <div>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Chủ đề</h1>
      </section>
      <hr className="mt-5" />

      <div className="flex justify-between">
        <Button
          onClick={() => navigate(`/vietnam_category`)}
          sx={{
            marginTop: "10px",
            width: "48%",
            borderRadius: "29px",
            py: "14px",
            bgcolor: "#16A34A",
          }}
          variant="contained"
        >
          Việt Nam
        </Button>
        <Button
          onClick={() => navigate(`/thegioi_category`)}
          sx={{
            marginTop: "10px",
            width: "48%",
            borderRadius: "29px",
            py: "14px",
            bgcolor: "#16A34A",
          }}
          variant="contained"
        >
          Thế giới
        </Button>
      </div>
    </div>
  );
};

export default CategoryList;
