
'use client'
import React, {useState, useEffect} from 'react'
import Admin_User_dashboard from './admin_user_dashboard'
import Single_User_dashboard from './single_user_dashboard'

import { useRouter } from 'next/navigation'
import { useChat } from '@/app/context/ChatContext'
import { post_auth_request } from '@/app/api'

const Dashboard = () => {
    const router = useRouter()
    const {user_role, setUser_role, setLoggedInUser, loggedInUser} = useChat()

    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_persist_login()
        }else{
            router.push('/auth/login')
        }
    }, [])

    async function handle_persist_login( ) {

            try {
                
                const response = await post_auth_request('app/persist-login', {})       
                
                console.log('response ', response)

                if (response.status == 200 || response.status == 201){

                    const user_data = response.data.user_data

                    const {first_name, last_name, business_name, address, user_role, email, avatar, is_admin, is_active, } = user_data

                    setLoggedInUser({...loggedInUser, first_name, last_name, business_name, address, user_role, email, avatar, is_active})

                }
                else{
                    // showAlert(response.response.data.err, "error")
                    router.push('/auth/login')
                }
            } catch (err:any) {
                console.error('Network or unexpected error:', err);
            } 
        
    }

    return (
        <div className="">
            {loggedInUser.user_role === 'admin' && <Admin_User_dashboard />  }
            {loggedInUser.user_role === 'user' && <Single_User_dashboard />  }

        </div>
    )
}

export default Dashboard