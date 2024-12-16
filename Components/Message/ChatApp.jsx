import React, { useState } from "react";
import UsersList from "./UserList";
import MessageList from "./MessageList";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch, useSelector } from "react-redux";

const ChatApp = () => {
  const { auth } = useSelector((store) => store);

  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(auth.user);

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
          <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Tin nhắn</h1>
        </section>
        <hr className="mt-5" />
      </div>
      <div className="flex h-full sticky bottom-0">
        <div className="flex-none">
          <UsersList onSelectUser={setSelectedUser} />
        </div>
        <div className="flex-grow">
          {selectedUser ? (
            <MessageList
              selectedUser={selectedUser}
              currentUser={currentUser}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Hãy chọn một người dùng để bắt đầu trò chuyện!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
