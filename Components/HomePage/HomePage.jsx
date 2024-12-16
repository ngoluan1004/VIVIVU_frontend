import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import TweetDetail from "../TweetDetail/TweetDetail";
import Top10Post from "../HomeSection/Top10Post";
import Search from "../Search/Search";
import Notification from "../Notification/Notification";
import NewMember from "../NewMember/NewMember";
import AccountManager from "../AccountManager/AccountManager";
import ReportList from "../ReportManager/ReportList";
import ChatApp from "../Message/ChatApp";
import QAApp from "../QA/QAApp";
import CategoryList from "../Category/CategoryList";
import VietNamList from "../Category/VietNamList";
import ThegioiList from "../Category/ThegioiList";

const HomePage = () => {
  return (
    // Grid xây dựng layout responsive.
    <Grid container xs={12} className="px-5 lg:px-36 justify-between">
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation />
      </Grid>
      <Grid item xs={12} lg={6} className="hidden lg:block w-full relative">
        {/* px-5 lg:px-9 */}
        <Routes>
          <Route path="/" element={<HomeSection />}></Route>
          <Route path="/home" element={<HomeSection />}></Route>
          <Route path="/profile/:userId" element={<Profile />}></Route>
          <Route path="/post/:postId" element={<TweetDetail />}></Route>
          <Route path="/list_10_post" element={<Top10Post />}></Route>
          <Route path="/explore" element={<Search />}></Route>
          <Route path="/notification" element={<Notification />}></Route>
          <Route path="/message" element={<ChatApp />}></Route>
          <Route path="/new_member" element={<NewMember />}></Route>
          <Route path="/qa" element={<QAApp />}></Route>
          <Route path="/category" element={<CategoryList />}></Route>
          <Route path="/vietnam_category" element={<VietNamList />}></Route>
          <Route path="/thegioi_category" element={<ThegioiList />}></Route>
          <Route path="/account_manager" element={<AccountManager />}></Route>
          <Route path="/report_manager" element={<ReportList />}></Route>
        </Routes>
      </Grid>
      <Grid item xs={0} lg={3} className="hidden lg:block w-full relative">
        <RightPart />
      </Grid>
    </Grid>
  );
};

export default HomePage;

/**
 * container: Khi được khai báo container, <Grid> sẽ hoạt động như một container chính,
 * đóng vai trò là flexbox, cung cấp bố cục cho các phần tử con bên trong nó.
 * xs={12}: Chia cột của container này trên màn hình nhỏ và trung bình thành 12 cột, tức là chiếm hết chiều rộng.
 * px-5 và lg:px-36: Trên màn hình nhỏ, nội dung sẽ có padding là 20px ở hai bên. Trên màn hình lớn (từ breakpoint lg trở lên), nội dung sẽ có padding là 144px ở hai bên.
 */
