import React, { useEffect, useState } from "react";
import axios from "axios";

const MessageList = ({ selectedUser, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/messages/conversation/${selectedUser.userId}`,
          config
        );
        setMessages(response.data);
        // console.log("messages: ", messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser]);

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
        `http://localhost:8080/messages/send/${selectedUser.userId}`,
        { content: newMessage },
        config
      );
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className=" bg-green-500 pt-3 pl-3">
        <h2 className="text-xl font-semibold mb-4">
          Tin nhắn với {selectedUser.fullName}
        </h2>
      </div>
      <div className="flex flex-col space-y-2 h-96 overflow-y-auto mb-6">
        {messages.map((msg) => (
          <div
            key={msg.messageId}
            className={`max-w-[60%] p-3 rounded-lg ${
              msg.sender.userId == currentUser.userId
                ? "self-end bg-green-200"
                : "self-start bg-gray-200"
            }`}
          >
            <p>{msg.content}</p>
            <span className="text-sm text-gray-500">
              {new Date(msg.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
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

export default MessageList;
