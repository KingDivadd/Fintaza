'use client'
import React, {useState, useEffect} from 'react'
import { useChat } from '../../context/ChatContext'
import { FaRegCircleXmark } from "react-icons/fa6"
import Drop_down_1 from '../drop_down'
import Alert, {Avatar, readable_date_time} from '../../component/helper'
import { patch_auth_request, post_auth_request } from '../../api'
import moment from 'moment'
import { IoIosFlag } from "react-icons/io";



const User_modal = () => {
    const {modalSource, setModalSource, modalFor, setModalFor, setShowModal, setSelectedItem, selectedItem} = useChat()
    const [auth, setAuth] = useState({
        email: '', first_name: '', last_name: '', business_name: '', 
        code: '', phone: '', city: '', state: '', zip: '', address: '', is_active: true,
    })
    const [loading, setLoading] = useState(false)
    const [dropArray, setDropArray] = useState<string[]>(['Intern','Graduate Student', 'Junior Research Associate', 'Senior Research Associate','Principal Investigator', 'Lab Manager'])
    const [selected_item, setSelected_item] = useState('')
    const [alert, setAlert] = useState({message: '', type: ''})
    const [isActive, setIsActive] = useState(true);
    const toggleActive = () => setIsActive(!isActive);

    useEffect(() => {
        if (modalFor == 'edit') {   
            const {last_name, first_name, email, title, is_admin, is_active, business_name, code, phone, city, state, zip, address, created_at, updated_at } = selectedItem
            setAuth({...auth, last_name, first_name, email,is_active, business_name, code, phone, city, state, zip, address })
            setIsActive(is_active)
            setSelected_item(title)
        }
    }, [])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]: value})
    }

    function handle_close_modal() {
        setShowModal(false)
    }

    async function handle_submit(e: any) {
        e.preventDefault();        

        if (!auth.last_name || !auth.first_name || !auth.code || !auth.phone || !auth.email || !auth.city || !auth.state || !auth.address) {
            if (!auth.last_name){ showAlert(`Please provide user's last name`, 'warning');  }
            if (!auth.first_name){ showAlert(`Please provide user's first name`, 'warning');  }
            if (!auth.email){ showAlert(`Please provide user's email address`, 'warning');  }
            if (!auth.code){ showAlert(`Please provide user's phone country code`, 'warning');  }
            if (!auth.phone){ showAlert(`Please provide user's phone number `, 'warning');  }
            if (!auth.city){ showAlert(`Please provide user's city `, 'warning');  }
            if (!auth.state){ showAlert(`Please provide user's state `, 'warning');  }
            if (!auth.last_name && !auth.first_name && !auth.code && !auth.phone && !auth.email && !auth.city && !auth.state && !auth.address){showAlert(`Please enter all user's information`, 'warning')}
            

            return;
        } else {
            setLoading(true); 
            try {
                
                const response = await post_auth_request('app/add-user', auth)                
                
                if (response.status == 200 || response.status == 201){

                    setAuth({...auth, first_name: '', last_name: '', email: ''})

                    setSelected_item('Select')
                    showAlert(response.data.msg, "success")
                    setTimeout(() => {
                        setShowModal(false)
                    }, 1500);
                    
                    setLoading(false)
                }
                else{
                    showAlert(response.response.data.err, "error")
                    setLoading(false)
                }
            } catch (err:any) {
                console.error('Network or unexpected error:', err);
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            } finally {
                setLoading(false); 
            }
        }
    }

    async function handle_update(e: any) {
        e.preventDefault();        

        if (!auth.last_name || !auth.first_name || !auth.code || !auth.phone || !auth.email || !auth.city || !auth.state || !auth.address) {
            if (!auth.last_name){ showAlert(`Please provide user's last name`, 'warning');  }
            if (!auth.first_name){ showAlert(`Please provide user's first name`, 'warning');  }
            if (!auth.email){ showAlert(`Please provide user's email address`, 'warning');  }
            if (!auth.code){ showAlert(`Please provide user's phone country code`, 'warning');  }
            if (!auth.phone){ showAlert(`Please provide user's phone number `, 'warning');  }
            if (!auth.city){ showAlert(`Please provide user's city `, 'warning');  }
            if (!auth.state){ showAlert(`Please provide user's state `, 'warning');  }
            if (!auth.last_name && !auth.first_name && !auth.code && !auth.phone && !auth.email && !auth.city && !auth.state && !auth.address){showAlert(`Please enter all user information`, 'warning')}
            
            return;
        } else {
            setLoading(true); 
            try {
                
                const response = await patch_auth_request(`app/edit-user/${selectedItem.user_id}`, auth)                
                
                if (response.status == 200 || response.status == 201){

                    setAuth({...auth, first_name: '', last_name: '', email: '',})

                    setSelected_item('Select')
                    showAlert(response.data.msg, "success")
                    setTimeout(() => {
                        setShowModal(false)
                    }, 1500);
                    
                    setLoading(false)
                }
                else{
                    showAlert(response.response.data.err, "error")
                    setLoading(false)
                }
            } catch (err:any) {
                console.error('Network or unexpected error:', err);
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            } finally {
                setLoading(false); 
            }
        }
    }

    function handle_clear() {
        setAuth({...auth, last_name: '', first_name: '', email: '', business_name: '', code: '', phone: '', city: '', state: '', zip: '', address: '', })
    }

    return (
        <div className="w-full">
            <div className=" bg-white max-h-[90vh]  rounded-[5px] shadow-md border border-slate-200  overflow-y-auto relative " >
                <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>

                {modalFor !== 'view' && <div className="w-[900px] ">

                    <span className="w-full px-[25px] h-[60px] shadow-md border-b flex items-center justify-between ">
                        {modalFor == 'create' ? <p className="text-lg font-[500] ">New User</p> :
                        <div className="flex justify-start items-center gap-5">
                            <Avatar user={selectedItem} isActive={isActive} toggleActive={toggleActive} />
                            <p className="text-md font-[500] ">{selectedItem.first_name} {selectedItem.last_name}</p>
                        </div>}


                        {modalFor !== 'create' && <span className=" flex items-center justify-start gap-10 ">
                            <label htmlFor="is_active" className="text-sm    cursor-pointer " >Suspend User</label>
                            <input type="checkbox" name="is_active" id="is_active" className='h-[17.5px] w-[17.5px] ' checked={!auth.is_active} onChange={(e) =>{ setAuth({...auth, is_active: !e.target.checked}); setIsActive(!auth.is_active)}} />
                        </span>}
                    </span>

                    <div className="w-full flex items-start justify-between p-[25px] gap-[25px] ">

                        <div className="w-1/2 flex flex-col items-start justify-between h-[75vh] ">
                            <span className="w-full flex flex-col items-start justify-start gap-[15px]">
                                <p className="text-sm ">First Name</p>
                                <input type="text" name='first_name' placeholder='john' value={auth.first_name} onChange={handle_change} className='input-type-1' />
                            </span>

                            <span className="w-full flex flex-col items-start justify-start gap-[15px]">
                                <p className="text-sm ">Last Name</p>
                                <input type="text" name='last_name' placeholder='doe' value={auth.last_name} onChange={handle_change} className='input-type-1' />
                            </span>

                            <span className="w-full flex flex-col items-start justify-start gap-[15px]">
                                <p className="text-sm ">Business Name</p>
                                <input type="text" name='business_name' placeholder='Business Name' value={auth.business_name} onChange={handle_change} className='input-type-1' />
                            </span>

                            <span className="w-full flex flex-col items-start justify-start gap-[15px]">
                                <p className="text-sm ">Email</p>
                                <input type="email" name='email' disabled={modalFor == 'edit'} placeholder='john.doe@gmail.com' value={auth.email} onChange={handle_change} className='input-type-1' />
                            </span>

                            <div className="w-full flex flex-col items-start justify-start gap-[15px] " >
                                <p className="text-sm ">Phone Number</p>   
                                <span className="w-full flex items-center justify-start gap-[20px] ">
                                    <span className="w-[80px] flex flex-col  items-start justify-start   gap-[15px] ">
                                        <input type="text" name='code' value={auth.code} onChange={handle_change} placeholder='+000'  className='input-type-1 ' />
                                    </span>
                                    <input type="text" name='phone' value={auth.phone} onChange={handle_change} placeholder='Phone'  className={'input-type-1 '} />
                                </span>
                            </div>

                            {/* <div className="w-full flex items-center justify-between">
                                <span className=" flex items-center justify-start gap-10 ">
                                    <label htmlFor="is_admin" className="text-sm    cursor-pointer " >Admin Priveleges</label>
                                    <input type="checkbox" name="is_admin" id="is_admin" className='h-[17.5px] w-[17.5px] ' checked={auth.is_admin} onChange={(e) => setAuth({...auth, is_admin: e.target.checked})} />
                                </span>

                                <span className=" flex items-center justify-start gap-10 ">
                                    <label htmlFor="is_active" className="text-sm    cursor-pointer " >Suspend User</label>
                                    <input type="checkbox" name="is_active" id="is_active" className='h-[17.5px] w-[17.5px] ' checked={!auth.is_active} onChange={(e) =>{ setAuth({...auth, is_active: !e.target.checked}); setIsActive(!auth.is_active)}} />
                                </span>
                            </div> */}

                            
                        </div>
                        
                        <div className="w-1/2 flex flex-col items-start justify-between h-[75vh] ">

                            <span className="w-full flex flex-col items-start justify-start gap-[15px]">
                                <p className="text-sm ">City</p>
                                <input type="text" name='city' value={auth.city} onChange={handle_change} placeholder='City' className='input-type-1 ' />
                            </span>
                                
                            <span className="w-full flex flex-col items-start justify-start gap-[15px]">
                                <p className="text-sm ">State</p>
                                <input type="text" name='state' value={auth.state} onChange={handle_change} placeholder='State' className='input-type-1 ' />
                            </span>
                            
                            <span className="w-full flex flex-col items-start justify-start gap-[15px]">
                                <p className="text-sm ">Zip</p>
                                <input type="text" name='zip' value={auth.zip} onChange={handle_change} placeholder='Zip' className='input-type-1 ' />
                            </span>
                                
                            <span className="w-full flex flex-col items-start justify-start gap-[15px]">
                                <p className="text-sm ">Address</p>
                                <textarea name="address" value={auth.address} id="address" onChange={handle_change} placeholder='Address' className='h-[80px] text-area-input-1' ></textarea>
                            </span>

                            {/* <div className="w-full flex items-center justify-between">
                                <span className=" flex items-center justify-start gap-10 ">
                                    <label htmlFor="is_admin" className="text-sm    cursor-pointer " >Admin Priveleges</label>
                                    <input type="checkbox" name="is_admin" id="is_admin" className='h-[17.5px] w-[17.5px] ' checked={auth.is_admin} onChange={(e) => setAuth({...auth, is_admin: e.target.checked})} />
                                </span>

                                <span className=" flex items-center justify-start gap-10 ">
                                    <label htmlFor="is_active" className="text-sm    cursor-pointer " >Suspend User</label>
                                    <input type="checkbox" name="is_active" id="is_active" className='h-[17.5px] w-[17.5px] ' checked={!auth.is_active} onChange={(e) =>{ setAuth({...auth, is_active: !e.target.checked}); setIsActive(!auth.is_active)}} />
                                </span>
                            </div> */}

                            <div className="w-full flex items-center justify-end gap-[20px]">
                                <button className="h-[45px] w-[100px] rounded-[3px] bg-slate-500 hover:bg-slate-600  text-white " onClick={handle_clear} >Clear</button>
                                {modalFor == 'create' &&  <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white" onClick={handle_submit} disabled={loading}>
                                    {loading ? (
                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    ) : 'submit'}
                                </button>}

                                {modalFor == 'edit' &&  <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-amber-600 hover:bg-amber-700 text-white" onClick={handle_update} disabled={loading}>
                                    {loading ? (
                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    ) : 'submit'}
                                </button>}
                            </div>
                        </div>

                    </div>


                </div>}

                {
                    modalFor == 'view' && 
                    <div className="w-[500px] pb-[10px] ">
                        <span className="w-full px-[25px] h-[60px]  flex items-center justify-between shadow-md ">
                        
                            <div className="flex justify-start items-center gap-5">
                                <Avatar user={selectedItem} isActive={selectedItem.is_active} toggleActive={toggleActive} />
                                <p className="text-md font-[500] ">{selectedItem.first_name} {selectedItem.last_name}</p>
                            </div>


                            {!selectedItem.is_active && <div className="w-[30px] h-[30px]  ">
                                <IoIosFlag size={'100%'} className='text-red-500' /> 
                                </div>}

                        </span>

                        <div className="w-full flex flex-col items-start justify-start gap-[5px]">
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full px-[25px]">
                                <p className="text-sm w-[130px]">Last Name</p>
                                <p className="text-sm font-[500] ">{selectedItem.last_name}</p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full px-[25px]">
                                <p className="text-sm w-[130px]">First Name</p>
                                <p className="text-sm font-[500] ">{selectedItem.first_name}</p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full px-[25px]">
                                <p className="text-sm w-[130px]">Business Name</p>
                                <p className="text-sm font-[500] ">{selectedItem.business_name}</p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full px-[25px]">
                                <p className="text-sm w-[130px]">Email</p>
                                <p className="text-sm font-[500] flex-1">{selectedItem.email}</p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full px-[25px]">
                                <p className="text-sm w-[130px]">Phone</p>
                                <p className="text-sm font-[500] flex-1"> {selectedItem.code} {selectedItem.phone}</p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full px-[25px]">
                                <p className="text-sm w-[130px]">City</p>
                                <p className="text-sm font-[500] flex-1"> {selectedItem.city} </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full px-[25px]">
                                <p className="text-sm w-[130px]">State</p>
                                <p className="text-sm font-[500] flex-1"> {selectedItem.state} </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full px-[25px]">
                                <p className="text-sm w-[130px]">Zip Code</p>
                                <p className="text-sm font-[500] flex-1"> {selectedItem.zip} </p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full px-[25px]">
                                <p className="text-sm w-[130px]">Address</p>
                                <p className="text-sm font-[500] flex-1"> {selectedItem.address}</p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full px-[25px]">
                                <p className="text-sm w-[130px]">Created On</p>
                                <p className="text-sm font-[500] flex-1"> {moment(Number(selectedItem.updated_at)).calendar()}</p>
                            </span>
                            <span className="flex items-center justify-start gap-5 min-h-[45px] w-full px-[25px]">
                                <p className="text-sm w-[130px]">Last updated on</p>
                                <p className="text-sm font-[500] flex-1"> {moment(Number(selectedItem.updated_at)).calendar()} </p>
                            </span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default User_modal