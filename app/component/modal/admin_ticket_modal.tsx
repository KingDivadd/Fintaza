'use client'
import React, {useState, useEffect} from 'react'
import { useChat } from '../../context/ChatContext'
import Alert, {Avatar, Dropdown, readable_date_time} from '../helper'
import { patch_auth_request, post_auth_request } from '../../api'


const AdminTicketModal = () => {
    const {modalSource, setModalSource, modalFor, setModalFor, setShowModal, setSelectedItem, selectedItem, loggedInUser} = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [next, setNext] = useState(false)
    const [loading, setLoading] = useState(false)
    const [array, setArray] = useState(['Paid', 'Overdue', 'Pending'])
    const [edit_task, setEdit_task] = useState(false)

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

                {modalFor ==  'view' && 
                
                <div className=" flex flex-col items-start justify-start   ">
                    <div className="w-full flex flex-col items-start justify-start shadow-md border-b border-slate-100 px-[15px] bg-white ">
                        <span className="w-full h-[60px] flex items-center justify-between border-b border-slate-300  ">
                            <p className="text-lg font-[600] "> TC10002060</p>

                            <button className="h-[35px] px-5 rounded-[2.5px] bg-red-600 hover:bg-red-700 text-white " onClick={()=> setShowModal(false)} > Close</button>
                        </span>

                        <span className="h-[50px] w-full flex items-center justify-start gap-10">
                            <span className="h- flex items-center justify-start gap-[20px]">
                                <span className={`h-[17.5px] w-[17.5px] rounded-[17.5px] bg-blue-600 `}  ></span>
                                <p className="text-sm font-[500] ">MEDIUM PRIORITY</p>
                            </span>

                            <span className="h- flex items-center justify-start gap-[20px]">
                                <span className={`h-[17.5px] w-[17.5px] rounded-[17.5px] bg-amber-600 `}  ></span>
                                <p className="text-sm font-[500] ">IN PROGRESS</p>
                            </span>
                        </span>

                    </div>

                    <div className="w-full flex items-start justify-center p-[15px] flex-wrap  gap-[15px] overflow-y-auto ">
                        <div className="w-full sm:w-[430px] h-[515px] flex flex-col item-start overflow-y-auto px-[15px] gap-[15px] bg-white shadow-md p-[15px] border border-slate-200">
                            {/* to edit tasks */}
                            {edit_task == true && <div className="w-full flex flex-col items-start overflow-y-auto px-[15px] gap-[20px] " style={{height: 'calc(100% - 40px - 15px)'}}>
                                    <span className=" w-full flex flex-col items-start justify-start w-full gap-[10px] ">
                                        <p className="text-sm font-[400] w-[155px] ">Status</p>
                                        <span className="h-[45px] w-full "><Dropdown options={['Open', 'In Progress', 'Resolved', 'Closed'] } id='status' placeholder='In Progress' onSelect={handle_selected} /> </span>
                                    </span>

                                    <span className=" w-full flex flex-col items-start justify-start w-full gap-[10px] ">
                                        <p className="text-sm font-[400] w-[155px] ">Comment</p>
                                        <span className="min-h-[45px] w-full "><textarea name="" id="" placeholder='Type...' className='h-[100px] text-area-input-1' ></textarea> </span>
                                    </span>
                                </div>}

                            {/* TO  VIew tasks alone */}
                            {edit_task == false && <div className="w-full flex flex-col item-start overflow-y-auto px-[15px] gap-[20px]  " style={{height: 'calc(100% - 40px - 15px)'}}>
                                <span className=" w-full flex flex-wrap items-start justify-start w-full gap-[12.5px]">
                                    <p className="text-sm font-[400] w-[155px] ">Customer Name</p>
                                    <p className="text-sm font-[500] ">Ibrahim Babagida</p>
                                </span>
                                <span className=" w-full flex flex-wrap items-start justify-start w-full gap-[12.5px] ">
                                    <p className="text-sm font-[400] w-[155px] ">Email Address</p>
                                    <p className="text-sm font-[500] ">ibrahim.babangida@gmail.com</p>
                                </span>

                                <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] w-full ">
                                    <p className="text-sm font-[400] w-[155px] ">Phone Number</p>
                                    <p className="text-sm font-[500] ">+245 1234907610</p>
                                </span>

                                <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] w-full ">
                                    <p className="text-sm font-[400] w-[155px] ">Subject</p>
                                    <p className="text-sm font-[500] ">Difficulty Making Payment</p>
                                </span>

                                <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] w-full ">
                                    <p className="text-sm font-[400] w-[155px] ">Date Submitted</p>
                                    <p className="text-sm font-[500] ">29 November, 2024</p>
                                </span>

                                <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] w-full ">
                                    <p className="text-sm font-[400] w-[155px] ">Attached Files</p>
                                    <p className="text-sm font-[500] ">None</p>
                                </span>

                                <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] w-full ">
                                    <p className="text-sm font-[400] w-[155px] ">Assigned To</p>
                                    <p className="text-sm font-[500] ">Alice Walker</p>
                                </span>

                                <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] w-full  ">
                                    <p className="text-sm font-[400] w-[155px] ">Issue Description</p>
                                    <p className="text-sm font-[500] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae enim quis fugiat laborum doloremque rem!</p>
                                </span>

                                <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] w-full  ">
                                    <p className="text-sm font-[400] w-[155px] ">Resolution</p>
                                    <p className="text-sm font-[500] ">Pending additional debugging by the IT team.</p>
                                </span>

                                {/* <span className=" w-full flex flex-wrap items-start justify-start gap-[12.5px] w-full ">
                                    <p className="text-sm font-[400] w-[155px] ">Comment</p>
                                    <span className="w-full">
                                        <textarea name="" id="" className='text-area-input-1 ' ></textarea>
                                    </span>
                                </span> */}
                            </div>}

                            <span className="  h-[40px] w-full flex items-center justify-end gap-[10px] ">
                                {/* <button className="h-[40px] px-5 rounded-[2.5px] text-sm hover:border hover:border-red-600">Close</button> */}
                                { edit_task == false && <button className="h-[40px] px-5 rounded-[2.5px] text-sm bg-amber-600 hover:bg-amber-700 text-white" onClick={()=> setEdit_task(true)}>Edit Ticket</button>}
                                { edit_task == true && <button className="h-[40px] px-5 rounded-[2.5px] text-sm bg-blue-600 hover:bg-blue-700 text-white" onClick={()=> setEdit_task(false)}>View Ticket</button>}

                                {edit_task == true && <button className=" w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white" onClick={handle_update} disabled={loading}>
                                    {loading ? (
                                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        ) : 'Update'}
                                </button> }
                            </span>



                            
                        </div>

                        <div className="w-[430px] h-[515px]  shadow-md border border-slate-200 rounded-[5px] flex items-center justify-center ">
                            <p className="text-sm font-semibold ">No Attachments</p>
                        </div>

                        <div className="w-[430px] h-[515px]  shadow-md border border-slate-200 rounded-[5px] ">
                            <div className="w-full flex flex-col h-full overflow-y-auto ">
                                <div className="w-full flex flex-col items-start justify-start">
                                    {/* each activity */}
                                    {[1,2,3,4,5].map((data:any,ind:number)=>{
                                        return(
                                    <div key={ind} className=" activity-cont-1 "> 
                                        <span className="w-[60px] h-full flex flex-col items-center justify-start gap-[5px] activity-col-1 ">
                                            <span className="h-[45px] w-[45px] rounded-[45px] bg-sky-500 "></span>
                                            <span className="w-[1px] bg-slate-400 activity-line-1" style={{height: 'calc(100% - 50px)'}} ></span>
                                        </span>
                                        <div className="w-full flex flex-1 flex-col items-start justify-start gap-[5px] ">
                                            <p className="text-sm font-[600] ">John Doe</p>
                                            <p className="text-sm font-[400] ">Assigned 6 days ago</p>
                                            <p className="text-sm font-[500] ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex blanditiis dolore nobis molestias iure sequi.</p>
                                        </div>
                                    </div>
                                        )
                                    })}
                                </div>
                            </div>
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

export default AdminTicketModal