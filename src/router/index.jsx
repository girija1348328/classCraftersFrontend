import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "@/pages/index";
import UsersPage from "../pages/users";
import RolesPage from "../pages/roles";
import StudentPage from "../pages/students";
import ClassroomPage from "../pages/classroom";
import PaymentPage from "../pages/payment";
import PaymentListPage from "../pages/payment/paymentList/paymentList";
import ManageClassroom from "../pages/classroom/manageClassroom/manageClassroom";
import PaymentListByInstitutionPage from "../pages/payment/paymentList/paymentListByInstitution";
import HorizontalLayout from "@/layouts/horizontal";

const AppRouter = () => (
  <BrowserRouter>
    <HorizontalLayout>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/students/list" element={<StudentPage />} />
        <Route path="/classrooms/list" element={<ClassroomPage />} />
        <Route path="/manage-classrooms/:id" element={<ManageClassroom />} />
        <Route path="/payment/fee-structure" element={<PaymentPage />} />
        <Route path="/payment/payments" element={<PaymentListPage />} />
        <Route path="/payment/payments/:institution_id" element={<PaymentListByInstitutionPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </HorizontalLayout>
  </BrowserRouter>
);


export default AppRouter;