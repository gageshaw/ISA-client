import React from "react";
import ForgotPassword from "../components/ForgotPassword";
import UpdateProfile from "../components/UpdateProfile";
import Analysis from "../components/Analysis";
import Schedule from "../components/Schedule";
import Reports from "../components/Reports";
import Manager from "../components/Manager";
import Owner from "../components/Owner";
import { useAuth } from "../contexts/AuthContext";

// TODO: Import all private routes here and add in export object.

const ForgotPasswordPage = () => <ForgotPassword />;
const UpdateProfilePage = () => <UpdateProfile />;
const AnalysisPage = () => <Analysis />;
function HomePage() {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Schedule uid={currentUser.uid} />;
  } else {
    return null;
  }
}
const SchedulePage = () => <Schedule />;
const ReportsPage = () => <Reports />;
const ManagerPage = () => <Manager />;
const OwnerPage = () => <Owner />;

export {
  ForgotPasswordPage,
  UpdateProfilePage,
  AnalysisPage,
  HomePage,
  SchedulePage,
  ReportsPage,
  ManagerPage,
  OwnerPage,
};
