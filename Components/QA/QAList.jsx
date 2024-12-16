import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const QAList = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(auth.user);

  const handleReply = (username) => {
    setNewMessage(`@${username} `); // Thiết lập giá trị ô input
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:8080/qa`, config);
        setMessages(response.data);
        // console.log("messages: ", messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:8080/qa/send`,
        { content: newMessage },
        config
      );
      setMessages((prevMessages) => [response.data, ...prevMessages]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className=" bg-green-500 pt-3 pl-3">
        <h2 className="text-xl font-semibold mb-4">Thông tin hỏi đáp</h2>
      </div>
      <div className="flex flex-col space-y-2 h-96 overflow-y-auto mb-6">
        {messages.map((msg) => (
          <div
            key={msg.messageId}
            className={`max-w-[80%] py-1 px-3 rounded-lg ${
              msg.sender.userId == currentUser.userId
                ? "self-end bg-green-200"
                : "self-start bg-gray-200"
            }`}
          >
            <div>
              <div
                className="flex items-center cursor-pointer mt-1"
                onClick={() => navigate(`/profile/${msg?.sender.userId}`)}
              >
                <div className="flex space-x-1">
                  {/* <span className="font-semibold">{msg.sender.fullName}</span> */}
                  <span className="text-gray-600 font-bold">
                    @{msg.sender.username}
                  </span>
                </div>
              </div>
              <p>{msg.content}</p>
              <span className="text-sm text-gray-500">
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            </div>
            <span
              className=" text-blue-500 text-sm cursor-pointer"
              onClick={() => handleReply(msg.sender.username)}
            >
              trả lời
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Nhập câu hỏi..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default QAList;
