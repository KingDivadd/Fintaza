'use client'
import React, {useState, useEffect} from 'react'
import App_navigation from "../../component/app_navigation"
import Welcome_navigation from "../../component/welcome_navigation"
import Route_navigation from "../../component/route_navigation"
import { useChat } from '../../context/ChatContext'
import Admin_dashboard from '../../component/admin_dashboard'
import User_management_page  from '../../pages/admin_user_manag_page'
import LoanManagement from '../../pages/loan_management_page'
import Payment from '../../pages/admin_payment_page'
import Report_analytics_page from '../../pages/report_analytics_page'
import DocumentPage from '../../pages/admin_document_page'
import Admin_support_page from '../../pages/admin_support_page'



const Admin_User_dashboard = () => {
    const {route_nav} = useChat()

    return (
        <div className="bg-white flex items-start justify-center w-full min-h-[100vh] overflow-y-auto ">
            <div className="flex flex-col items-start justify-between h-full w-full ">

                    <App_navigation />
                    <Welcome_navigation />
                    <Route_navigation />

                    { route_nav == 'dashboard' && <Admin_dashboard /> }
                    { route_nav == 'user-management' && <User_management_page /> }
                    { route_nav == 'loan-management' && <LoanManagement /> }
                    { route_nav == 'payments' && <Payment /> }
                    { route_nav == 'reports' && <Report_analytics_page /> }
                    { route_nav == 'documents' && <DocumentPage /> }
                    { route_nav == 'support-center' && <Admin_support_page /> }


                    {/* {nav === "dashboard" && <Dashboard />}
                    {nav === "profile-management" && <Profile_management />}
                    {nav === "user-management" && <User_management />} */}

            </div>
        </div>
    )
}

export default Admin_User_dashboard