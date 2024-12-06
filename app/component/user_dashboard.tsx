'use client'
import React, {useState, useEffect} from 'react'
import {DoughnutChartOne} from "./donut_chart"

const User_Dashboard = () => {
    const [page_number, setPage_number] = useState(1)
    const [lead_box, setLead_box] = useState<Leads_Props | null>(null);
    const [filtered_lead_box, setFiltered_lead_box] = useState<Leads_Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', disposition: ''})

    interface Leads_Props {
        forEach?(arg0: (data: any, ind: number) => void): unknown;
        filter?(arg0: (user: any) => any): unknown;
        map?(arg0: (data: any) => void): unknown;
        total_number_of_leads_pages?: number; // Now optional and can be undefined
        total_number_of_leads?: number; // Now optional can be undefined
        leads: any;
    }  

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = lead_box?.total_number_of_leads_pages

        if (item === 'prev') {
        if (page_number > 1) {
            new_page_number = page_number - 1;
        }
        } else if (item === 'next') {
        if (max_page_number && page_number < max_page_number) {
            new_page_number = page_number + 1;
        }
        } else {
        new_page_number = item;
        }

        setPage_number(new_page_number);
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = lead_box?.total_number_of_leads_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-md font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-600 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
            >
                {i}
            </p>
            );
        }
        } else {
        let startPage = Math.max(1, page_number - 1);
        let endPage = Math.min(page_number + 1, max_page_number);

        if (page_number === 1) {
            startPage = 1;
            endPage = max_displayed_pages;
        } else if (page_number === max_page_number) {
            startPage = max_page_number - 2;
            endPage = max_page_number;
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
            >
                {i}
            </p>
            );
        }
        }

        return pages;
    };

    return (
        <div className='w-full flex items-start justify-center  px-[20px] md:px-[55px] lg:px-[75px] py-10 relative'  >
            <div className="w-full flex flex-col justify-start items-center ">

                {/* section showing metrics */}
                <div className="w-full flex flex-wrap items-center justify-between gap-[20px] sm:gap-10">

                    <span className="w-[45%] md:w-[250px] lg:w-[220px] h-[175px] rounded-[5px]  p-[25px] shadow-md flex flex-col items-center justify-center gap-5 border border-slate-200 ">
                        <p className="text-xl sm:text-2xl font-[600] text-teal-700">720</p>
                        <p className="text-md sm:text-lg font-[500] text-center text-teal-700">Credit Score</p>
                    </span>

                    <span className="w-[45%] md:w-[250px] lg:w-[220px] h-[175px] rounded-[5px]  p-[25px] shadow-md flex flex-col items-center justify-center gap-5 border border-slate-200 ">
                        <p className="text-xl sm:text-2xl font-[600] text-blue-600">5</p>
                        <p className="text-md sm:text-lg font-[500] text-center text-blue-600">Total Loans Taken</p>
                    </span>

                    <span className="w-[45%] md:w-[250px] lg:w-[220px] h-[175px] rounded-[5px]  p-[25px] shadow-md flex flex-col items-center justify-center gap-5 border border-slate-200 ">

                        <p className="text-xl sm:text-2xl font-[600] text-amber-600">2</p>
                        <p className="text-md sm:text-lg font-[500] text-center text-amber-600 ">Active Loans</p>

                    </span>

                    <span className="w-[45%] md:w-[250px] lg:w-[220px] h-[175px] rounded-[5px]  p-[25px] shadow-md flex flex-col items-center justify-center gap-5 border border-slate-200 ">

                        <p className="text-xl sm:text-2xl font-[600] text-red-600">$15,000</p>
                        <p className="text-md sm:text-lg font-[500] text-center text-red-600 mx-auto w-[80%] ">Amount Owed</p>

                    </span>

                    <span className="w-[45%] md:w-[250px] lg:w-[220px] h-[175px] rounded-[5px]  p-[25px] shadow-md flex flex-col items-center justify-center gap-5 border border-slate-200 ">

                        <p className="text-xl sm:text-2xl font-[600] text-blue-600">$10,000</p>
                        <p className="text-md sm:text-lg font-[500] text-center text-blue-600   ">Amount Paid</p>

                    </span>
                </div>

                {/* section two loan info cards 1. loan id, 2. loan status, 3. loan repament date */}
                <div className="mt-10 w-full flex flex-col items-start justify-start shadow-lg rounded-[3px] border border-slate-200">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-300">
                        <p className="text-md font-[600]">Loan Info</p>
                    </span>

                    {/* Wrapping content in overflow container */}
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1154px] p-[15px] flex flex-col items-start justify-start mx-auto">
                            <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                                <p className="text-sm font-[600] w-[20%] px-[15px]">Loan Id</p>
                                <p className="text-sm font-[600] w-[20%] px-[15px]">Amount</p>
                                <p className="text-sm font-[600] w-[20%] px-[15px]">Interest Rate</p>
                                <p className="text-sm font-[600] w-[20%] px-[15px]">Status</p>
                                <p className="text-sm font-[600] w-[20%] px-[15px]">Next Payment Date</p>
                            </span>

                            <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                                <div className="w-full h-full flex flex-col justify-start">
                                    {[1, 2, 4, 5, 1, 1, 1, 1, 1, 1].map((data, ind) => {
                                        return (
                                            <span key={ind} className="table-body-row-1">
                                                <p className="text-sm font-[500] w-[20%] px-[15px]">BL10005001</p>
                                                <p className="text-sm font-[500] w-[20%] px-[15px]">$12,500</p>
                                                <p className="text-sm font-[500] w-[20%] px-[15px]">Barack Obama</p>
                                                <p className="text-sm font-[500] w-[20%] px-[15px] text-teal-700">$7,500</p>
                                                <p className="text-sm font-[500] w-[20%] px-[15px]">{9 + ind} Nov, 2024</p>
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="w-full h-[50px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px]">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                                {render_page_numbers()}
                            </span>
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md">Showing 1-15 of {(filtered_lead_box && filtered_lead_box.leads.length) || 0}</p>
                        </span>
                    </span>
                </div>

                {/* Upcoming payments */}
                <div className="mt-10 w-full flex flex-col items-start justify-start shadow-lg rounded-[3px] border border-slate-200">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-300">
                        <p className="text-md font-[600]">Upcoming Payments</p>
                    </span>

                    {/* Wrapping content in overflow container */}
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1154px] p-[15px] flex flex-col items-start justify-start mx-auto">
                            <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                                <p className="text-sm font-[600] w-[17%] px-[15px]">Loan Id</p>
                                <p className="text-sm font-[600] w-[17%] px-[15px]">Total Amount</p>
                                <p className="text-sm font-[600] w-[17%] px-[15px]">Paid Amount</p>
                                <p className="text-sm font-[600] w-[17%] px-[15px]">Amount Due</p>
                                <p className="text-sm font-[600] w-[17%] px-[15px]">Due Date</p>
                                <p className="text-sm font-[600] w-[15%] px-[15px]">Action</p>
                            </span>

                            <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                                <div className="w-full h-full flex flex-col justify-start">
                                    {[1, 2, 4, 5, 1, 1, 1, 1, 1, 1].map((data, ind) => {
                                        return (
                                            <span key={ind} className="table-body-row-1">
                                                <p className="text-sm font-[500] w-[17%] px-[15px]">BL10005001</p>
                                                <p className="text-sm font-[500] w-[17%] px-[15px]">$12,500</p>
                                                <p className="text-sm font-[500] w-[17%] px-[15px]">$12,500</p>
                                                <p className="text-sm font-[500] w-[17%] px-[15px]">$12,500</p>
                                                <p className="text-sm font-[500] w-[17%] px-[15px]">{9 + ind} Nov, 2024</p>
                                                <span className="w-[15%] px-[15px] ">
                                                    <button className="h-[30px] rounded-[2.5px] bg-blue-600 hover:bg-blue-700 text-white px-5 text-sm ">
                                                        Pay Now
                                                    </button>
                                                </span>
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="w-full h-[50px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px]">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                                {render_page_numbers()}
                            </span>
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md">Showing 1-15 of {(filtered_lead_box && filtered_lead_box.leads.length) || 0}</p>
                        </span>
                    </span>
                </div>

                {/* section four recent transaction table */}
                <div className="mt-10 w-full flex flex-col items-start justify-start shadow-lg  rounded-[3px] border border-slate-200">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-300 ">
                        <p className="text-md font-[600] ">Recent Transactions</p>
                    </span>
                                
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1350px] p-[15px] flex flex-col items-start justify-start mx-auto ">
                            <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                                <p className="text-sm font-[600] w-[15%] px-[15px] ">Date</p>
                                <p className="text-sm font-[600] w-[25%] px-[15px] ">Account Number</p>
                                <p className="text-sm font-[600] w-[10%] px-[15px] ">Amount</p>
                                <p className="text-sm font-[600] w-[10%] px-[15px] ">Type (Cr/Dr)</p>
                                <p className="text-sm font-[600] w-[20%] px-[15px] ">Subject</p>
                                <p className="text-sm font-[600] w-[10%] px-[15px] ">Status</p>
                                <p className="text-sm font-[600] w-[10%] px-[15px] ">Details</p>
                            </span>

                            <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                                <div className="w-full h-full flex flex-col justify-start">
                                    {[1,2,4,5,1,1,1,1,1,1,].map((data, ind)=>{
                                        return(
                                            <span key={ind} className="table-body-row-1  ">
                                                <p className="text-sm font-[500] w-[15%] px-[15px] ">{7 + ind} Nov, 2024</p>
                                                <p className="text-sm font-[500] w-[25%] px-[15px] ">SU10005001 - Savings Account (USD)</p>
                                                <p className="text-sm font-[500] w-[10%] px-[15px] text-teal-700 ">$7,500</p>
                                                <p className="text-sm font-[500] w-[10%] px-[15px] ">Credit</p>
                                                <p className="text-sm font-[500] w-[20%] px-[15px] ">Account Maintenanc Fee</p>
                                                <span className="text-sm font-[500] w-[10%] px-[15px] flex justify-start items-center ">
                                                    { ind % 2 == 1 ? <p className="  text-start text-amber-600 ">Pending</p> :
                                                    <p className="  text-start text-teal-700 ">Completed</p>}
                                                </span>
                                                <span className="text-sm font-[500] w-[10%] px-[15px] flex justify-end">
                                                    <button className="h-[32.5px] w-[100px] rounded-[3px]  border border-slate-500 hover:border-blue-600 text-black hover:text-blue-600">view</button>
                                                </span>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>

                    <span className="w-full h-[50px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md">Showing 1-15 of {(filtered_lead_box && filtered_lead_box.leads.length) || 0}</p>
                        </span>
                    </span>
                </div>

            </div>

        </div>
    )
}

export default User_Dashboard