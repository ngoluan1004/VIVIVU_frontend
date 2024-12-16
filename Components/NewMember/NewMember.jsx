import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MemberItem from "./MemberItem";

const NewMember = () => {
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API để lấy danh sách bài đăng của user
        const response = await axios.get(
          `http://localhost:8080/users/newest`,
          config
        );

        if (response.status === 200) {
          // console.log("Fetched user newest:", response.data); // In ra dữ liệu trả về
          setUsers(response.data); // Cập nhật state với danh sách bài đăng
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchUsers();
  }, []);

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
          Thành viên mới
        </h1>
      </section>
      <hr className="mt-5" />

      <section className="space-y-1">
        {users.length > 0 ? (
          users.map((user) => <MemberItem key={user.id} item={user} />)
        ) : (
          <div></div>
        )}
      </section>
    </div>
  );
};

export default NewMember;
