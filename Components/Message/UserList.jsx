import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8080/users/list",
          config
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-xl font-semibold p-4 border-b border-gray-300 -translate-y-1">
        Danh sách người dùng
      </h2>
      {users.map((user) => (
        <div
          key={user.userId}
          className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectUser(user)}
        >
          <img
            src={`http://localhost:8080${user.imgUrl}`}
            alt={user.username}
            className="w-10 h-10 rounded-full mr-4"
          />
          <span className="text-lg">{user.fullName}</span>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
