import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import {Toaster} from "react-hot-toast";
import ProfilePage from "./Pages/ProfilePage.jsx";
import SetCompanyPage from "./Pages/SetCompanyPage.jsx";
import CompanyDetailsPage from "./Pages/companyDetailsPage.jsx";
import UpdateCompanyPage from "./Pages/UpdateCompanyPage.jsx";
import EditProfilePage from "./Pages/EditProfilePage.jsx";
import PostAJobPage from "./Pages/PostAJobPage.jsx";
import JobPages from "./Pages/JobPages.jsx";
import JobDetailsPage from "./Pages/JobDetailsPage.jsx";
import AppliedJobsPage from "./Pages/AppliedJobsPage.jsx";
import ApplicantsPage from "./Pages/ApplicantsPage.jsx";


function App() {


  return (
    <>
        <Toaster reverseOrder={false}/>
     <BrowserRouter>
         <Routes>
             <Route path="/" element={<HomePage/>} />
             <Route path="/login" element={<LoginPage/>} />
             <Route path="/register" element={<RegisterPage/>} />
             <Route path="/post-job" element={<PostAJobPage/>}/>
             <Route path="/:userId" element={<ProfilePage/>} />
             <Route path="/:userId/update" element={<EditProfilePage/>} />
             <Route path="/company-register" element={<SetCompanyPage/>} />
             <Route path="/company-recuiter" element={<CompanyDetailsPage/>} />
             <Route path="/update-company/:id" element={<UpdateCompanyPage/>} />
             <Route path="/get-all-job" element={<JobPages/>} />
             <Route path="/job-details/:id" element={<JobDetailsPage/>} />
             <Route path="/applied-job" element={<AppliedJobsPage/>} />
             <Route path="/applicants" element={<ApplicantsPage/>} />
         </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
