import React, { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PatientDashboard from "./patientDashboard/Dashboard";
import PharmaDashboard from "./pharmaPartnerDashboard/Dashboard";

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
        toast.error("You are not logged in!");
        navigate('/login');
        return null;
    }
    let decoded = null;
    try {
        decoded = jwtDecode(token);
    } catch (err) {
        toast.error("Invalid token. Please login again.");
        localStorage.removeItem('token');
        navigate('/login');
        return null;
    }

    const role = decoded?.role;
    const email = decoded?.sub;


    return (
        <>
            {role == "PATIENT" && <PatientDashboard email={email}/>}
            {role == "PHARMA_PARTNER" && <PharmaDashboard email={email}/>}
        </>
    )
}
export default Dashboard;

