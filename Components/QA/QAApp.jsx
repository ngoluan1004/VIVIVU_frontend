import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import QAList from "./QAList";

const QAApp = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  return (
    <div>
      <div>
        <section
          className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
        >
          <KeyboardBackspaceIcon
            className="cursor-pointer"
            onClick={handleBack}
          />
          <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Hỏi đáp</h1>
        </section>
        <hr className="mt-5" />
      </div>
      <div className="flex h-full sticky bottom-0">
        <div className="flex-grow">
          <QAList />
        </div>
      </div>
    </div>
  );
};

export default QAApp;
