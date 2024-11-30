'use client'
import React, {useState, useEffect} from 'react'
import { useChat } from '../../context/ChatContext'
import { FaRegCircleXmark } from "react-icons/fa6"
import Drop_down_1 from '../drop_down'
import Alert, {Avatar, readable_date_time} from '../../component/helper'
import { patch_auth_request, post_auth_request } from '../../api'
import moment from 'moment'
import { IoIosFlag } from "react-icons/io";


const Admin_loan = () => {
    const {modalSource, setModalSource, modalFor, setModalFor, setShowModal, setSelectedItem, selectedItem, loggedInUser} = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [show_repayment_table, setShow_repayment_table] = useState(false)
    const [next, setNext] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (modalFor == 'edit') {   
            const {last_name, first_name, email, title, is_admin, is_active, business_name, code, phone, city, state, zip, address, created_at, updated_at } = selectedItem
            // setAuth({...auth, last_name, first_name, email,is_active, business_name, code, phone, city, state, zip, address })
            // setIsActive(is_active)
            // setSelected_item(title)
        }
    }, [])

    async function handle_update(e:any) {
        e.preventDefault()
        try {
            
        } catch (err:any) {
            
        }
    }
    async function handle_reject(e:any) {
        e.preventDefault()
        try {
            
        } catch (err:any) {
            
        }
    }
    async function handle_approve(e:any) {
        e.preventDefault()
        try {
            
        } catch (err:any) {
            
        }
    }

    return (
        <div className="w-full">
            <div className=" bg-white  rounded-[5px] shadow-md border border-slate-200  overflow-y-auto relative " >
                <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>

                {modalFor == 'view' && !show_repayment_table && 
                <div className="w-[90vw] flex flex-col items-start justify-start   "> 
                    <div className="w-full flex flex-col items-start justify-start shadow-md border-b border-slate-100 px-[15px] bg-white ">
                        <span className="w-full h-[60px] flex items-center justify-between border-b border-slate-300  ">
                            <p className="text-lg font-[600] ">Loan: BL10002060</p>

                            <button className="h-[35px] px-5 rounded-[2.5px] bg-red-600 hover:bg-red-700 text-white " onClick={()=> setShowModal(false)} >
                                Close</button>
                        </span>

                        <div className="w-full h-[60px] flex items-center justify-between gap-[15px] ">
                            <span className="w-[400px] "> <p className="text-md font-[500]">Personal Information</p> </span>
                            <span className="w-[400px] "> <p className="text-md font-[500]">Loan Information</p> </span>
                            <span className="w-[400px] "> <p className="text-md font-[500]">Repayment Schedule</p> </span>
                        </div>
                    </div>
                    
                    <div className="mt-[15px] w-full flex flex-wrap items-start justify-between gap-[15px] px-[15px] pt-0 h-[500px] overflow-y-auto ">
                        <div className="w-[400px] h-[500px] flex flex-col item-start overflow-y-auto ">
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[130px]">Full Name</p>
                                <p className="text-sm font-[500] flex-1"> Babangida Ibrahim </p>
                            </span>

                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[130px]">Business Name</p>
                                <p className="text-sm font-[500] flex-1"> DivadLabs </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[130px]">Phone</p>
                                <p className="text-sm font-[500] flex-1"> +234 90260392 </p>
                            </span>
                            
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[130px]">Email</p>
                                <p className="text-sm font-[500] flex-1"> ibrahim.babangida@gmail.com </p>
                            </span>

                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[130px]">Zip</p>
                                <p className="text-sm font-[500] flex-1"> 12345 </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[130px]">State</p>
                                <p className="text-sm font-[500] flex-1"> Texas </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[130px]">City</p>
                                <p className="text-sm font-[500] flex-1"> Dublin </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[130px]">SSN</p>
                                <p className="text-sm font-[500] flex-1"> ************ </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[130px]">Date of Birth</p>
                                <p className="text-sm font-[500] flex-1"> 14 November, 1987 </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[130px]">Marital Status</p>
                                <p className="text-sm font-[500] flex-1"> Married </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[130px]"> Dependants</p>
                                <p className="text-sm font-[500] flex-1"> 3 </p>
                            </span>
                        </div>

                        <div className="w-[400px] h-[500px] flex flex-col item-start overflow-y-auto">
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[190px]">Loan Id</p>
                                <p className="text-sm font-[500] flex-1"> BL10002060 </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[190px]">Loan Type</p>
                                <p className="text-sm font-[500] flex-1"> Personal Loan </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[190px]">Loan Amount</p>
                                <p className="text-sm font-[500] flex-1"> $10,500 </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[190px]">Interest Rate</p>
                                <p className="text-sm font-[500] flex-1"> 30% </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[190px]">Disbursment Date</p>
                                <p className="text-sm font-[500] flex-1"> 19 November, 2024 </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[190px]">Repayment Date</p>
                                <p className="text-sm font-[500] flex-1"> 18 December, 2024 </p>
                            </span>
                        </div>

                        <div className="w-[400px] h-[500px] flex flex-col item-start overflow-y-auto">
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[175px]">Repayment Schedule</p>
                                <p className="text-sm font-[500] flex-1"> Monthly </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[175px]">Total Amount Paid</p>
                                <p className="text-sm font-[500] flex-1"> $7,250 </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[175px]">Outstanding Balance</p>
                                <p className="text-sm font-[500] flex-1 text-amber-600"> $5,850.45 </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[175px]">Payment Mode</p>
                                <p className="text-sm font-[500] flex-1 "> Auto Debit </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full ">
                                <p className="text-sm w-[175px]">Late Payment</p>
                                <p className="text-sm font-[500] flex-1 "> $0 </p>
                            </span>

                            <p className="text-sm font-[500] mt-10 text-blue-600 hover:underline cursor-pointer" onClick={()=> setShow_repayment_table(true)}>View repayment table</p>
                        </div>

                    </div>
                        
                </div>}

                {modalFor == 'view' && show_repayment_table && <div className="w-[90vw] flex flex-col items-start justify-start   "> 
                    <div className="w-full flex flex-col items-start justify-start shadow-md border-b border-slate-100 px-[15px] bg-white ">
                        <span className="w-full h-[60px] flex items-center justify-between border-b border-slate-300  ">
                            <p className="text-lg font-[600] ">Loan: BL10002060</p>

                            <button className="h-[35px] px-5 rounded-[2.5px] bg-red-600 hover:bg-red-700 text-white " onClick={()=> setShowModal(false)} >
                                Close</button>
                        </span>

                        <div className="w-full h-[60px] flex items-center justify-between gap-[15px] ">
                            <p className="text-md font-[500] ">Repayment History</p>
                        </div>
                    </div>
                    <div className="mt-[15px] w-full flex flex-wrap items-start justify-between gap-[15px] px-[15px] pt-0 h-[500px] overflow-y-auto ">
                        
                        <div className="w-full  flex flex-col items-start justify-start mx-auto ">
                            <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                                <p className="text-sm font-[600] w-[12.5%] px-[15px] ">Payment Date</p>
                                <p className="text-sm font-[600] w-[12.5%] px-[15px] ">Payment Amount</p>
                                <p className="text-sm font-[600] w-[12.5%] px-[15px] ">Payment Type</p>
                                <p className="text-sm font-[600] w-[12.5%] px-[15px] ">Cumulative Paid</p>
                                <p className="text-sm font-[600] w-[15%]   px-[15px] ">Remaining Balance</p>
                                <p className="text-sm font-[600] w-[12.5%] px-[15px] ">Interest Paid</p>
                                <p className="text-sm font-[600] w-[12.5%] px-[15px] ">Principal Paid</p>
                                <p className="text-sm font-[600] w-[10%]   px-[15px] ">Late Fee</p>
                            </span>

                            <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                                <div className="w-full h-full flex flex-col justify-start">
                                    {[1,2,4,5,1,1,1,1,1,1,].map((data, ind)=>{
                                        return(
                                            <span key={ind} className="table-body-row-1  ">
                                                <p className="text-sm font-[500] w-[12.5%] px-[15px] ">Nov 22, 2024</p>
                                                <p className="text-sm font-[500] w-[12.5%] px-[15px] ">$500</p>
                                                <p className="text-sm font-[500] w-[12.5%] px-[15px] ">Regular</p>
                                                <p className="text-sm font-[500] w-[12.5%] px-[15px] ">$500</p>
                                                <p className="text-sm font-[500] w-[15%] px-[15px] ">$10,700</p>
                                                <p className="text-sm font-[500] w-[12.5%] px-[15px] ">$120</p>
                                                <p className="text-sm font-[500] w-[12.5%] px-[15px] ">$380</p>
                                                <p className="text-sm font-[500] w-[10%] px-[15px] text-red-600">$50</p>
                                                
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>

                    </div>

                    </div>

                    <div className="w-full flex items-center justify-end p-[15px] pt-0  ">
                        <button className="h-[45px] px-10 text-white text-sm rounded-[3px] bg-amber-600 hover:bg-amber-700 " onClick={()=> setShow_repayment_table(false)}>
                            Back
                        </button>
                    </div>
                </div>}
                
                {modalFor == 'edit' && 
                <div className=" flex flex-col items-start justify-start ">
                    <div className="w-full flex flex-col items-start justify-start shadow-md px-[15px] bg-white ">
                        <span className="w-full h-[70px] flex items-center justify-between   ">
                            <p className="text-lg font-[600] ">Loan: BL10002060</p>

                            <button className="h-[35px] px-5 rounded-[2.5px] bg-red-600 hover:bg-red-700 text-white " onClick={()=> setShowModal(false)} >
                                Close</button>
                        </span>

                    </div>

                    <div className="w-full flex  items-start justify-start px-[15px] my-[15px] gap-[25px] ">
                        <div className=" sm:w-[475px] h-[500px] overflow-y-auto flex flex-col items-start gap-[25px] ">
                            <span className="flex flex-col gap-[10px] w-full">
                                <p className="text-sm">Loan Amount</p>
                                <span className="w-full"> <input type="text" className="input-type-1" /> </span>
                            </span>
                            
                            <span className="flex flex-col gap-[10px] w-full">
                                <p className="text-sm">Loan Term</p>
                                <span className="w-full"> <input type="text" className="input-type-1" /> </span>
                            </span>

                            <span className="flex flex-col gap-[10px] w-full">
                                <p className="text-sm">Interest Rate</p>
                                <span className="w-full"> <input type="text" className="input-type-1" /> </span>
                            </span>

                            <span className="flex flex-col gap-[10px] w-full">
                                <p className="text-sm">Loan Start Date</p>
                                <span className="w-full"> <input type="text" className="input-type-1" /> </span>
                            </span>
                            <span className="flex flex-col gap-[10px] w-full">
                                <p className="text-sm">Loan Status</p>
                                <span className="w-full"> <input type="text" className="input-type-1" /> </span>
                            </span>

                            <span className="flex flex-col gap-[10px] w-full">
                                <p className="text-sm">Payment Frequency</p>
                                <span className="w-full"> <input type="text" className="input-type-1" /> </span>
                            </span>

                            <span className="flex flex-col gap-[10px] w-full">
                                <p className="text-sm">Late Payment Penalty (%)</p>
                                <span className="w-full"> <input type="text" className="input-type-1" /> </span>
                            </span>

                            <span className="flex flex-col gap-[10px] w-full">
                                <p className="text-sm">Remarks (%)</p>
                                <span className="w-full"> <input type="text" className="input-type-1" /> </span>
                            </span>


                        </div>
                    </div>

                    <span className=" w-full p-[15px] pt-0 flex items-center justify-end">
                        <button className="px-5 flex items-center justify-center h-[45px] rounded-[3px] bg-amber-600 hover:bg-amber-700 text-white" onClick={handle_update} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'Update'}
                        </button>
                    </span>

                </div>}

                {modalFor == 'approve' && 
                <div className=" flex flex-col items-start justify-start ">
                    <div className="w-full flex flex-col items-start justify-start shadow-md px-[15px] bg-white ">
                        <span className="w-full h-[70px] flex items-center justify-between   ">
                            <p className="text-lg font-[600] ">Loan: BL10002060</p>

                            <button className="h-[35px] px-5 rounded-[2.5px] bg-red-600 hover:bg-red-700 text-white " onClick={()=> setShowModal(false)} >
                                Close</button>
                        </span>

                    </div>

                    <div className="w-full flex  items-start justify-start px-[15px] my-[15px] gap-[25px] ">
                        <div className=" sm:w-[475px] h-[500px] overflow-y-auto flex flex-col items-start gap-[15px] ">
                            <span className="flex items-center min-h-[45px] gap-[10px] w-full">
                                <p className="text-sm w-[175px] ">Borrower Name</p>
                                <p className="text-sm font-[500]">Ibrahim Babaginda</p>
                            </span>
                            
                            <span className="flex items-center min-h-[45px] gap-[10px] w-full">
                                <p className="text-sm w-[175px] ">Loan Amount</p>
                                <p className="text-sm font-[500]">$10,000</p>
                            </span>
                            
                            <span className="flex items-center min-h-[45px] gap-[10px] w-full">
                                <p className="text-sm w-[175px] ">Loan Term</p>
                                <p className="text-sm font-[500]">24month</p>
                            </span>
                            
                            <span className="flex items-center min-h-[45px] gap-[10px] w-full">
                                <p className="text-sm w-[175px] ">Interet Rate</p>
                                <p className="text-sm font-[500]">5.5%</p>
                            </span>
                            
                            <span className="flex items-center min-h-[45px] gap-[10px] w-full">
                                <p className="text-sm w-[175px] ">Loan Start Date</p>
                                <p className="text-sm font-[500]">21 November, 2024</p>
                            </span>
                            
                            <span className="flex items-center min-h-[45px] gap-[10px] w-full">
                                <p className="text-sm w-[175px] ">Payment Schedule</p>
                                <p className="text-sm font-[500]">21 November, 2024</p>
                            </span>
                            
                            <span className="flex flex-col gap-[20px] w-full">
                                <p className="text-sm">Approval Remarks (%)</p>
                                <span className="w-full"> <textarea name="" id="" className='h-[90px] text-area-input-1' ></textarea> </span>
                            </span>


                        </div>
                    </div>

                    <span className=" w-full p-[15px] pt-0 flex items-center justify-between">
                        
                        <button className="px-5 flex items-center justify-center h-[45px] rounded-[3px] bg-red-600 hover:bg-red-700 text-white" onClick={handle_reject} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'Reject'}
                        </button>
                        
                        <button className="px-5 flex items-center justify-center h-[45px] rounded-[3px] bg-teal-700 hover:bg-teal-800 text-white" onClick={handle_approve} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'Approve'}
                        </button>
                    </span>

                </div>}

            </div>
        </div>
    )
}

export default Admin_loan