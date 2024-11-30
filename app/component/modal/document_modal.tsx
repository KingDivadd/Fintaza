'use client'
import React, {useState, useEffect} from 'react'
import { useChat } from '../../context/ChatContext'
import Alert, {Avatar, Dropdown, readable_date_time} from '../helper'
import { patch_auth_request, post_auth_request } from '../../api'


const DocumentModal = () => {
    const {modalSource, setModalSource, modalFor, setModalFor, setShowModal, setSelectedItem, selectedItem, loggedInUser} = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [next, setNext] = useState(false)
    const [loading, setLoading] = useState(false)
    const [payment_status, setPayment_status] = useState('')
    const [array, setArray] = useState(['Paid', 'Overdue', 'Pending'])

    function handle_selected(selected: string,  id?: string ){
        console.log(id, selected)
    }

    async function handle_update(e:any) {
        e.preventDefault()
    }

    async function handle_submit(e:any) {
        e.preventDefault()
    }
    return (
        <div className="w-full">
            <div className=" bg-white  rounded-[5px] shadow-md border border-slate-200  overflow-y-auto relative " >
                <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>

                {modalFor ==  'view' && <div className=" flex flex-col items-start justify-start   ">
                    <div className="w-full flex flex-col items-start justify-start shadow-md border-b border-slate-100 px-[15px] bg-white ">
                        <span className="w-full h-[60px] flex items-center justify-between border-b border-slate-300  ">
                            <p className="text-lg font-[600] "> DC10002060</p>

                            <button className="h-[35px] px-5 rounded-[2.5px] bg-red-600 hover:bg-red-700 text-white " onClick={()=> setShowModal(false)} > Close</button>
                        </span>

                        <div className="w-full h-[60px] flex items-center justify-between gap-[15px] ">
                            <p className="text-md font-[400] ">Ibrahim Babangida</p>
                        </div>
                    </div>

                    <div className="w-full flex items-start justify-center py-[15px] flex-wrap h-auto gap-[15px] overflow-y-auto">
                        <div className="w-full sm:w-[430px] flex flex-col item-start overflow-y-auto px-[15px] gap-[15px] bg-white">
                            <span className=" w-full flex flex-wrap items-start justify-start min-h-[40px] w-full gap-[12.5px] ">
                                <p className="text-sm font-[400] w-[175px] ">Document Name</p>
                                <p className="text-sm font-[500] ">ID_Verification.pdf</p>
                            </span>

                            <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] min-h-[40px] w-full ">
                                <p className="text-sm font-[400] w-[175px] ">Uploaded By</p>
                                <p className="text-sm font-[500] ">Ibrahim Babangida</p>
                            </span>

                            <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] min-h-[40px] w-full ">
                                <p className="text-sm font-[400] w-[175px] ">Upload Date</p>
                                <p className="text-sm font-[500] ">29 November, 2024</p>
                            </span>

                            <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] min-h-[40px] w-full ">
                                <p className="text-sm font-[400] w-[175px] ">File Size</p>
                                <p className="text-sm font-[500] ">1.2 MB</p>
                            </span>

                            <span className=" w-full flex flex-wrap items-center justify-start gap-[12.5px] min-h-[40px] w-full ">
                                <p className="text-sm font-[400] w-[175px] ">Status</p>
                                <span className="flex-1 h-[40px] bg-red-100"> <Dropdown options={['Pending', 'Approved', 'Rejected']} id='status' onSelect={handle_selected} /> </span>
                            </span>

                            
                            <span className=" w-full flex  items-center justify-center gap-[12.5px] min-h-[20px] w-full ">
                                <p className="text-sm font-[400] text-blue-600 hover:underline w-[175px] cursor-pointer ">view document</p>
                            </span>

                            <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] min-h-[40px] w-full ">
                                <p className="text-sm font-[400] w-[175px] ">Comment</p>
                                <span className="w-full">
                                    <textarea name="" id="" className='text-area-input-1 h-[70px]' ></textarea>
                                </span>
                            </span>

                            <span className="w-full  ">
                                <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white" onClick={handle_update} disabled={loading}>
                                    {loading ? (
                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        ) : 'Update'}
                                    </button>
                            </span>



                            
                        </div>

                    </div>
                </div>}

                {modalFor ==  'edit' && <div className=" flex flex-col items-start justify-start   ">
                    <div className="w-full flex flex-col items-start justify-start shadow-md border-b border-slate-100 px-[15px] bg-white ">
                        <span className="w-full h-[60px] flex items-center justify-between border-b border-slate-300  ">
                            <p className="text-lg font-[600] ">Loan: BL10002060</p>

                            <button className="h-[35px] px-5 rounded-[2.5px] bg-red-600 hover:bg-red-700 text-white " onClick={()=> setShowModal(false)} >
                                Close</button>
                        </span>

                        <div className="w-full h-[60px] flex items-center justify-between gap-[15px] ">
                            <p className="text-md font-[400] ">Ibrahim Babangida</p>
                        </div>
                    </div>

                    <div className="w-full flex items-start justify-center py-[15px] flex-wrap h-[75vh] gap-[15px] overflow-y-auto">
                        <div className="w-full sm:w-[400px] flex flex-col item-start overflow-y-auto px-[15px] gap-5 bg-white">
                            <>
                            <span className=" w-full flex flex-col items-start justify-start gap-[12.5px] min-h-[45px] w-full ">
                                <p className="text-sm font-[400] ">Payment Due Date</p>
                                <span className="h-[45px] w-full "> 
                                    <input type="date" name="" id="" className='date-input-1' /> 
                                </span>
                            </span>

                            <span className=" w-full flex flex-col items-start justify-start gap-[12.5px] min-h-[45px] w-full ">
                                <p className="text-sm font-[400] ">Total Payment Amount</p>
                                <span className="h-[45px] w-full "> 
                                    <input type="text" name="" id="" className="input-type-1" />
                                </span>
                            </span>

                            <span className=" w-full flex flex-col items-start justify-start gap-[12.5px] min-h-[45px] w-full ">
                                <p className="text-sm font-[400] ">Amount Paid</p>
                                <span className="h-[45px] w-full "> 
                                    <input type="text" name="" id="" className="input-type-1" />
                                </span>
                            </span>

                            <span className=" w-full flex flex-col items-start justify-start gap-[12.5px] min-h-[45px] w-full ">
                                <p className="text-sm font-[400] ">Payment Status</p>
                                <span className="h-[45px] w-full "> 
                                    <Dropdown id='payment_status' options={['Paid', 'Overdue', 'Pending']} onSelect={handle_selected} />
                                </span>
                            </span>

                            <span className=" w-full flex flex-col items-start justify-start gap-[12.5px] min-h-[45px] w-full ">
                                <p className="text-sm font-[400] ">Amount Due</p>
                                <span className="h-[45px] w-full "> 
                                    <input type="text" name="" id="" value={'10,000'} disabled className="input-type-1" />
                                </span>
                            </span>

                            <span className=" w-full flex flex-col items-start justify-start gap-[12.5px] min-h-[45px] w-full ">
                                <p className="text-sm font-[400] ">Payment Method</p>
                                <span className="h-[45px] w-full "> 
                                    <Dropdown id='payment_method' options={['ACH', 'RTP', 'Card']} onSelect={handle_selected} />
                                </span>
                            </span>

                            <span className=" w-full flex flex-col items-start justify-start gap-[12.5px] min-h-[45px] w-full ">
                                <p className="text-sm font-[400] ">Last Payment Date</p>
                                <span className="h-[45px] w-full "> 
                                    <input type="date" name="" id="" className='date-input-1' /> 
                                </span>
                            </span>

                            <span className=" w-full flex flex-col items-start justify-start gap-[12.5px] min-h-[45px] w-full ">
                                <p className="text-sm font-[400] ">Pament Reference</p>
                                <span className="h-[45px] w-full "> 
                                    <input type="text" name="" id="" value={'REF-987654321'} disabled className='input-type-1' /> 
                                </span>
                            </span>
                            
                            <button className="mt-10 w-full flex items-center justify-center h-[45px] rounded-[3px] bg-amber-600 hover:bg-amber-700 text-white" onClick={handle_submit} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Update'}
                            </button>
                            </>
                        </div>

                    </div>
                </div>}

            </div>
        </div>
    )
}

export default DocumentModal