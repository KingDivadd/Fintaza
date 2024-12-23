'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProps {
    first_name: string; last_name: string; email: string; avatar: string; business_name: string; 
    phone: string; code: string; zip: string; state: string; city: string; address: string; user_role: string; 
    is_active: boolean, date_of_birth: number;  ssn: string; marital_status: string; number_of_dependents: number;

}

interface ProfileToggle {
    two_fa: boolean,
    email_auth: boolean,
    sms_auth: boolean,
    web_push: boolean
}

interface ChatContextType {
    header_nav: string; 
    setHeader_nav: (header_nav: string) => void; 
    pricing_plan: string; 
    setPricing_plan: (pricing_plan: string) => void; 
    route_nav: string; 
    setRoute_nav: (route_nav: string) => void; 
    close_welcome_nav: boolean; 
    setClose_welcome_nav: (close_welcome_nav: boolean) => void; 
    trigger_notification: boolean; 
    setTrigger_notification: (trigger_notification: boolean) => void; 
    user_role: string; 
    setUser_role: (user_role: string) => void; 
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;
    modalSource: string;
    setModalSource: (modalSource: string) => void;
    profileToggle: ProfileToggle;
    setProfileToggle: (profileToggle: ProfileToggle) => void;
    loggedInUser: UserProps;
    setLoggedInUser: (loggedInUser: UserProps) => void;
}


// Provide a default value matching the shape of ChatContextType
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [header_nav, setHeader_nav] = useState('home')
    const [pricing_plan, setPricing_plan] = useState('')
    const [route_nav, setRoute_nav] = useState('')
    const [close_welcome_nav, setClose_welcome_nav] = useState(false)
    const [user_role, setUser_role] = useState('')
    const [trigger_notification, setTrigger_notification] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [modalFor, setModalFor] = useState('')
    const [modalSource, setModalSource] = useState('')
    const [profileToggle, setProfileToggle] = useState({two_fa: false, email_auth: true, sms_auth: true, web_push: false })
    const [loggedInUser, setLoggedInUser] = useState({first_name: '', last_name: '', email: '', avatar: '', business_name: '', phone: '', code: '', zip: '', state: '', city: '', address: '', user_role: '', is_active: true, date_of_birth: 0,  ssn: '', marital_status: '', number_of_dependents: 0})
    

    return (
        <ChatContext.Provider value={{
            header_nav, setHeader_nav, 
            pricing_plan, setPricing_plan,
            route_nav, setRoute_nav,
            close_welcome_nav, setClose_welcome_nav,
            user_role, setUser_role,
            trigger_notification, setTrigger_notification,
            showModal, setShowModal, selectedItem, setSelectedItem, modalFor, setModalFor, modalSource, setModalSource,
            profileToggle, setProfileToggle, loggedInUser, setLoggedInUser
            }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
