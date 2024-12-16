import HomeIcon from "@mui/icons-material/Home"
import ExploreIcon from "@mui/icons-material/Explore"
import NotificationIcon from "@mui/icons-material/Notifications"
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReportIcon from '@mui/icons-material/Report';
import GroupsIcon from '@mui/icons-material/Groups';
import CategoryIcon from '@mui/icons-material/Category';

export const navigation=[
    {
        title:"Trang chủ",
        icon:<HomeIcon/>,
        path:"/"
    },
    {
        title:"Tìm kiếm",
        icon:<ExploreIcon/>,
        path:"/explore"
    },
    {
        title:"Thông báo",
        icon:<NotificationIcon/>,
        path:"/notification"
    },
    {
        title:"Tin nhắn",
        icon:<MessageIcon/>,
        path:"/message"
    },
    {
        title:"Bài mới",
        icon:<ListAltIcon/>,
        path:"/list_10_post"
    },
    {
        title:"Hỏi đáp",
        icon:<GroupIcon/>,
        path:"/qa"
    },
    {
        title:"Chủ đề",
        icon:<CategoryIcon/>,
        path:"/category"
    },
    {
        title:"Quản lý tài khoản",
        icon:<GroupsIcon/>,
        path:"/account_manager"
    },
    {
        title:"Quản lý báo xấu",
        icon:<ReportIcon/>,
        path:"/report_manager"
    },
    {
        title:"Cá nhân",
        icon:<AccountCircleIcon/>,
        path:"/profile"
    },
]