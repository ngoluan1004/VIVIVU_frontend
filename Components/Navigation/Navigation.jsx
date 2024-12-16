import React from "react";
import axios from "axios";
import { navigation } from "./NavigationMenu";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";

const Navigation = () => {
  const [avatar, setAvatar] = React.useState([]);

  const { auth } = useSelector((store) => store);

  const dispatch = useDispatch();

  const { id } = useParams();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    handleClose();
    dispatch(logout());
  };

  // fetchUserById
  React.useEffect(() => {
    const fetchUserById = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Gửi request GET đến API để lấy danh sách bài đăng của user
        const response = await axios.get(
          `http://localhost:8080/users/${auth.user.userId}`,
          config
        );

        if (response.status === 200) {
          // console.log("Fetched user:", response.data); // In ra dữ liệu trả về
          setAvatar(response.data); // Cập nhật state với danh sách bài đăng
        } else {
          console.error("Error fetching user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Gọi hàm khi userId thay đổi
    fetchUserById();
  }, [auth.user.userId]);

  // Lọc navigation dựa trên role
  const filteredNavigation = navigation.filter((item) => {
    if (auth.user?.role === "ADMIN") return true; // Admin hiển thị tất cả
    if (auth.user?.role === "USER") {
      // Bỏ 2 mục "Loại du lịch" và "Hỏi đáp" với USER
      return (
        item.title !== "Quản lý tài khoản" && item.title !== "Quản lý báo xấu"
      );
    }
    return false; // Mặc định không hiển thị nếu role không hợp lệ
  });

  return (
    <div className="h-screen sticky top-0 overflow-x-hidden">
      <div>
        <div className="py-5">
          <h1 className="text-4xl">Vivivu</h1>
        </div>
        <div className="space-y-4">
          {filteredNavigation.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer flex space-x-3 items-center"
              onClick={() =>
                item.title === "Cá nhân"
                  ? navigate(`/profile/${auth.user.userId}`)
                  : navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="py-5">
          <Button
            onClick={() => navigate(`/`)}
            sx={{
              width: "80%",
              borderRadius: "29px",
              py: "14px",
              bgcolor: "#16A34A",
            }}
            variant="contained"
          >
            Đăng bài
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar
            alt="username"
            src={`http://localhost:8080${avatar.imgUrl}`}
          />
          <div>
            <p className="block">{auth.user?.fullName}</p>
            <span className=" opacity-70">@{auth.user?.username}</span>
          </div>

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon className=" ml-10" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

/**
 * h-screen: Thiết lập chiều cao của phần tử bằng chiều cao của toàn màn hình. Điều này có nghĩa là phần tử sẽ chiếm toàn bộ chiều cao màn hình, bất kể kích thước màn hình là bao nhiêu. Khi cuộn trang, nó vẫn giữ nguyên chiều cao bằng chiều cao của cửa sổ hiển thị.
 * sticky: Thiết lập vị trí của phần tử là sticky. Kiểu này giúp phần tử hoạt động tương tự như relative khi bạn cuộn xuống, nhưng khi phần tử chạm đến giá trị top được đặt, nó sẽ trở nên fixed (cố định) tại vị trí đó cho đến khi không còn nằm trong viewport.
 * top-0: Đặt vị trí cố định của phần tử khi sticky được kích hoạt. Ở đây, top-0 có nghĩa là khi phần tử trở nên cố định, nó sẽ dừng lại ở mép trên cùng của màn hình (khoảng cách top là 0px).
 * cursor-pointer: Thay đổi con trỏ chuột thành hình bàn tay khi người dùng di chuột qua phần tử này. Thường được dùng để chỉ rằng phần tử có thể nhấp được, tạo cảm giác trực quan cho người dùng rằng có thể tương tác.
 * flex: Thiết lập phần tử sử dụng Flexbox, giúp dễ dàng sắp xếp các phần tử con theo chiều ngang (mặc định) hoặc chiều dọc khi cần.
 * space-x-3: Thêm khoảng cách giữa các phần tử con của phần tử Flexbox theo chiều ngang (trục x). Cụ thể, space-x-3 tạo ra khoảng cách ngang là 0.75rem (hoặc 12px) giữa các phần tử con, làm cho chúng tách biệt nhau.
 * items-center: Căn giữa các phần tử con theo trục dọc (trục y) trong phần tử Flexbox. Điều này đảm bảo rằng các phần tử con được căn đều theo chiều dọc, tạo nên sự sắp xếp gọn gàng và hài hòa hơn.
 *
 */
