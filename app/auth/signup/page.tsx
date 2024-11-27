'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useChat} from '../../context/ChatContext'
import Alert from '../../component/helper'
import { post_auth_request, post_request } from "../../api/index"
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'


const Signup = () => {
    const router = useRouter()
    const {header_nav, setHeader_nav, } = useChat()
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [showPassword, setShowPassword] = useState(false)
    const {loggedInUser, setLoggedInUser} = useChat()
    const [auth, setAuth] = useState({
        email: '', password: '', first_name: '', last_name: '', business_name: '', 
        code: '', phone: '', city: '', state: '', zip: '', address: '',
    })
    const [inputError, setInputError] = useState({
        email: false, password: false, first_name: false, last_name: false, business_name: false, 
        code: false, phone: false, city: false, state: false, zip: false, address: false, 
    })

    const [phase, setPhase] = useState('first')

    const handle_change = (e:any)=>{
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]:value})
    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }


    useEffect(() => {
        if (auth.email) { 
            setInputError({...inputError, email: auth.email == ''} );
            return;
        }
        if (auth.password) { 
            setInputError({...inputError, password: auth.password == ''} ) 
            return;
        }
        
    }, [auth])


    async function handle_signup(e: any) {
        e.preventDefault();

        if (!auth.last_name || !auth.first_name || !auth.code || !auth.phone || !auth.email || !auth.password || !auth.city || !auth.state || !auth.address) {
            if (!auth.last_name){ showAlert(`Please provide your last name`, 'warning');  }
            if (!auth.first_name){ showAlert(`Please provide your first name`, 'warning');  }
            if (!auth.email){ showAlert(`Please provide your email address`, 'warning');  }
            if (!auth.code){ showAlert(`Please provide your phone country code`, 'warning');  }
            if (!auth.phone){ showAlert(`Please provide your phone number `, 'warning');  }
            if (!auth.city){ showAlert(`Please provide your city `, 'warning');  }
            if (!auth.state){ showAlert(`Please provide your state `, 'warning');  }
            if (!auth.last_name && !auth.first_name && !auth.code && !auth.phone && !auth.email && !auth.password && !auth.city && !auth.state && !auth.address){showAlert(`Please enter all requested information`, 'warning')}
            
            setInputError({
                ...inputError,
                email: auth.email === "",
                password: auth.password === "",
            });
            return;
        } else {
            setLoading(true); 

            try {
                
                const response = await post_auth_request('app/add-user', auth)                

                console.log('response result === ', response)

                if (response.status == 200 || response.status == 201){

                    localStorage.setItem('x-id-key' ,response.headers.get('x-id-key'));

                    setAuth({email: '', password: '', first_name: '', last_name: '', business_name: '', 
                        code: '', phone: '', city: '', state: '', zip: '', address: '',})

                        // setTimeout(() => {
                        //     router.push('/user/porter')
                        // }, 1000);
                    
                    showAlert(response.data.msg, "success")
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
                setLoading(false); // Set loading to false in both success and error cases
            }
            setLoading(false)

        }
        setLoading(false)
    }


    return (
        <div className="w-full bg-white h-screen flex flex-col items-center justify-start sm:justify-center gap-10 " >
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>


            <div className=" max-sm:p-[15px] mx-auto flex flex-wrap items-center justify-center gap-[50px] lg:gap-20  "> 
                <span className=' sm:w-[400px] lg:mb-10 max-sm:text-[35px] max-lg:text-[40px] lg:text-[55px] max-lg:font-[700] lg:font-[800] text-center text-blue-700 flex items-center justify-center whitespace-nowrap'>
                    Fintaza<p className="text-amber-600">Pdl</p>
                </span>

                {phase == 'first' && 
                <form action='' className="w-full sm:w-[400px] flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white min-h-[200px] gap-[30px] shadow-lg border border-slate-200 ">

                    <span className="w-full flex flex-col items-center justify-start gap-[5px]"> 
                        <p className="text-[27.5px] font-[700] text-blue-600"> Welcome to FintazaPdl</p>
                        <p className="text-sm font-[500] text-slate-700 text-centeer">Provide all Information</p>
                    </span>
                    
                    <input type="text" name='first_name' value={auth.first_name} onChange={handle_change} placeholder='First Name' className={inputError.first_name ? 'input-error-1' :'input-type-1 '} />
                
                    <input type="text" name='last_name' value={auth.last_name} onChange={handle_change} placeholder='Last Name'  className={inputError.last_name ? 'input-error-1' :'input-type-1 '} />
                    
                    <input type="text" name='business_name' value={auth.business_name} onChange={handle_change} placeholder='Business Name'  className={inputError.business_name ? 'input-error-1' :'input-type-1 '} />
                    
                    <input type="email" name='email' value={auth.email} onChange={handle_change} placeholder='Email'  className={inputError.email ? 'input-error-1' :'input-type-1 '} />
                                    
                    <input type="password" name='password' value={auth.password} onChange={handle_change} placeholder='Password'  className={inputError.password ? 'input-error-1' :'input-type-1 '} />

                    <span className="text-sm flex items-center justify-center gap-[5px] mx-auto">
                        Already have account? <p className="text-sm text-blue-600 hover:underline" onClick={()=> router.push('/auth/login')}>Login</p> 
                    </span>

                    <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={()=>{ setPhase('second'); console.log('auth : ', auth)}}>
                        Next
                    </button>

                </form>}

                {phase == 'second' && 
                <form action='' className="w-full sm:w-[400px] flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white min-h-[200px] py-[30px] gap-[35px] shadow-lg border border-slate-200 ">

                    <span className="w-full flex items-center justify-start gap-[20px] ">
                        <span className=" w-[80px] flex items-center justify-center  ">
                            <input type="text" name='code' value={auth.code} onChange={handle_change} placeholder='+000'  className={inputError.code ? 'input-error-1' :'input-type-1 '} />
                        </span>
                        <input type="text" name='phone' value={auth.phone} onChange={handle_change} placeholder='Phone'  className={inputError.phone ? 'input-error-1' :'input-type-1 '} />
                    </span>
                    
                    <input type="text" name='city' value={auth.city} onChange={handle_change} placeholder='City' className='input-type-1 ' />
                    
                    <input type="text" name='state' value={auth.state} onChange={handle_change} placeholder='State' className='input-type-1 ' />
                    
                    <input type="text" name='zip' value={auth.zip} onChange={handle_change} placeholder='Zip' className='input-type-1 ' />
                    
                    <textarea name="address" value={auth.address} id="address" onChange={handle_change} placeholder='Address' rows={3} className='text-area-input-1' ></textarea>

                    <span className="text-sm flex items-center justify-center gap-[5px] mx-auto">
                        Already have account? <p className="text-sm text-blue-600 hover:underline" onClick={()=> router.push('/auth/login')}>Login</p> 
                    </span>

                    <span className="w-full flex items-center justify-start gap-[20px] ">

                        <button className="px-5 flex items-center justify-center h-[45px] rounded-[3px] bg-amber-600 hover:bg-aamber-700 text-white" onClick={()=> setPhase('first')}  >
                            Back
                        </button>
                        
                        <button className=" w-full h-[45px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-500 flex items-center justify-center " onClick={handle_signup} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'signup'}
                        </button>

                    </span>

                </form>}

            </div>



        </div>
    )
}

export default Signup