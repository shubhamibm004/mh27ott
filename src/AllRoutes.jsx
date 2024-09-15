import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/footer";
import IndividualPage from "./components/IndividualPage/IndividualPage";
import MainPage from "./components/MainPage/MainPage";
import Navbar from "./components/Navbar/Navbar";
import VideoPage from "./components/videoPage/VideoPage";
import { WatchList } from "./components/Watchlist/WatchList";
import {Profile} from "./components/Profile/Profile"
import Login from "./components/Login/login";
import SignUp from "./components/Login/signup";
import AdminDashboard from "./components/Login/AdminDashboard";

function AllRoutes() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Profile/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/:category" element={<MainPage ></MainPage>} ></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
        {/* <Route path="/:category/:language" element={<MainPage ></MainPage>} ></Route> */}
        <Route  path={`/:category/:id`}  element={<IndividualPage  ></IndividualPage>} ></Route>
        <Route path="/:category/:id/video" element={<VideoPage></VideoPage>}></Route>
        <Route path="/watchlist" element={<WatchList/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>

      </Routes>
      <Footer></Footer>
    </>
  );
}

export default AllRoutes;
