'use client'
import React, {useState, useEffect} from 'react'
import Modal_cont from '../component/modal/modal_cont'
import { useChat } from '../context/ChatContext'
import { Dropdown } from '../component/helper'

const DocumentPage = () => {
    const [page_number, setPage_number] = useState(1)
    const [lead_box, setLead_box] = useState<Leads_Props | null>(null);
    const [filtered_lead_box, setFiltered_lead_box] = useState<Leads_Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', disposition: ''})
    const {modalFor, setModalFor, selectedItem, setSelectedItem, showModal, setShowModal, setModalSource, modalSource} = useChat()

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

    function handle_view(data:any) {
        setShowModal(!showModal)
        setModalFor('view')
        setModalSource('admin-document')
        setSelectedItem(data)
    }

    function handle_select( selected: string, id?: string) {
        console.log(id, selected)
    }

    return (
        <div className='w-full flex items-start justify-center px-[75px] py-10 '  >
            <div className="w-full flex flex-col justify-start items-center gap-10">

                {/* section showing metrics */}
                <div className="w-full flex flex-wrap items-center justify-between gap-10">
                    <span className="w-[225px] h-[175px] rounded-[3px] shadow-md border border-slate-200 px-[15px] flex flex-col items-center justify-center gap-5 ">
                        <p className="text-3xl font-[600] text-blue-600">1,500</p>
                        <p className="text-md text-center text-blue-600">Total Documents</p>
                    </span>

                    <span className="w-[225px] h-[175px] rounded-[3px] shadow-md border border-slate-200 px-[15px] flex flex-col items-center justify-center gap-5 ">
                        <p className="text-3xl font-[600] text-amber-600">120</p>
                        <p className="text-md text-center text-amber-600">Pending Approvals</p>
                    </span>

                    <span className="w-[225px] h-[175px] rounded-[3px] shadow-md border border-slate-200 px-[15px] flex flex-col items-center justify-center gap-5 ">

                        <p className="text-3xl font-[600] text-teal-600">1300</p>
                        <p className="text-md text-center text-teal-600 ">Approved Docuements</p>

                    </span>

                    <span className="w-[225px] h-[175px] rounded-[3px] shadow-md border border-slate-200 px-[15px] flex flex-col items-center justify-center gap-5 ">

                        <p className="text-3xl font-[600] text-red-600">80</p>
                        <p className="text-md text-center text-red-600 mx-auto ">Rejected Documents</p>

                    </span>

                </div>

                {/* section four recent transaction table */}
                <div className="w-full flex flex-col items-start justify-start shadow-lg  rounded-[3px] border border-slate-200">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-300 ">
                        <p className="text-md font-[600] ">Reports</p>
                    </span>
                    
                    <span className="w-full flex items-center justify-end p-[15px] pb-0 ">
                        <span className="w-[250px] h-[35px] mr-10 ">
                            <Dropdown options={['Pending', 'Overdue', 'Paid']} placeholder='Select Status' id='repayment_status' onSelect={handle_select} />
                        </span>

                        <span className="w-[200px] ">
                            <input type="text" placeholder='search' className='input-type-2 ' />
                        </span>

                    </span>

                    <div className="w-full p-[15px] flex flex-col items-start justify-start mx-auto ">
                        <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                            <p className="text-sm font-[600] w-[17%] px-[15px] ">Document Id</p>
                            <p className="text-sm font-[600] w-[17%] px-[15px] ">Document Name</p>
                            <p className="text-sm font-[600] w-[17%] px-[15px] ">Uploaded By</p>
                            <p className="text-sm font-[600] w-[17%] px-[15px] ">Upload Date</p>
                            <p className="text-sm font-[600] w-[17%] px-[15px] ">Status</p>
                            <p className="text-sm font-[600] w-[15%] px-[15px] ">Action</p>
                        </span>

                        <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                            <div className="w-full h-full flex flex-col justify-start">
                                {[1,2,4,5,1,1,1,1,1,1,].map((data, ind)=>{
                                    return(
                                        <span key={ind} className="table-body-row-1  ">
                                            <span className="w-[17%] px-[15px]  ">
                                                <p className="text-sm font-[500] text-blue-600 hover:cursor-pointer" onClick={()=> handle_view(data)} >DC1000207{ind}</p>
                                            </span>
                                            <p className="text-sm font-[500] w-[17%] px-[15px] text-slate-600">ID_Verification.pdf</p>
                                            <p className="text-sm font-[500] w-[17%] px-[15px] text-slate-600">Ibrahim Babangida</p>
                                            <p className="text-sm font-[500] w-[17%] px-[15px] text-slate-600">27 November, 2024</p>
                                            <p className="text-sm font-[500] w-[17%] px-[15px] text-slate-600">Pending</p>  {/* pending approved rejected */}
                                            <span className="w-[15%] px-[15px] flex items-center justify-start ">
                                                <button className="h-[27.5px] px-5 rounded-[2.5px] bg-teal-700 text-white " onClick={()=> handle_view(data)}>
                                                    view
                                                </button>
                                            </span>
                                            
                                        </span>
                                    )
                                })}
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

            {showModal && <Modal_cont showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} setModalFor={setModalFor} selectedItem={selectedItem} setSelectedItem={setSelectedItem} modalSource={modalSource} setModalSource={setModalSource} />}
        </div>
    )
}

export default DocumentPage