import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ReportItem from "./ReportItem";

const ReportList = () => {
  const [reports, setReports] = React.useState([]);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  React.useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API để lấy danh sách bài đăng của user
        const response = await axios.get(
          `http://localhost:8080/reports/list`,
          config
        );

        if (response.status === 200) {
          // console.log("Fetched reports:", response.data); // In ra dữ liệu trả về
          setReports(response.data); // Cập nhật state với danh sách bài đăng
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchReports();
  }, []);

  const handleDeleteReport = (reportId) => {
    setReports((prevUsers) =>
      prevUsers.filter((report) => report.reportId !== reportId)
    );
  };

  return (
    <div>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          Quản lý báo xấu
        </h1>
      </section>
      <hr className="mt-5" />
      <h1 className="py-5 text-xl font-bold opacity-90 ml-11">Danh sách: </h1>
      <section className="space-y-1">
        {reports.length > 0 ? (
          reports.map((report) => (
            <ReportItem
              key={report.id}
              item={report}
              onDelete={handleDeleteReport}
            />
          ))
        ) : (
          <div></div>
        )}
      </section>
    </div>
  );
};

export default ReportList;
