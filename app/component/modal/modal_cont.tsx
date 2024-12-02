'use client'
import React, { useState, useEffect } from 'react'

import Alert from "../helper"

import User_modal from "./user_modal"
import Admin_loan from "./admin_loan"
import Payments_modal from "./payments_modal"
import DocumentModal from "./document_modal"
import AdminTicketModal from "./admin_ticket_modal"


interface Modal_props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;
    modalSource: string;
    setModalSource: (modalSource: string) => void;
}

const Modal_cont = ({ showModal, setShowModal, selectedItem, setSelectedItem, modalFor, setModalFor, modalSource}: Modal_props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        disposition: false
    });
    const [dropElements, setDropElements] = useState({
        disposition: 'Disposition'

    })

    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({...dropElements, [dropdown]: 'Disposition'});

    };

    const handleSelectDropdown = (dropdown: any, title:any)=>{
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }

    function handleCloseModal() {
        setSelectedItem(null)
        setShowModal(false)
        setModalFor('')
    }



    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className="w-full h-screen flex items-start max-sm:pt-[30px] sm:items-center justify-center overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-auto mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-auto flex flex-col items-start justify-start gap-5  ">
                            <div className="w-full flex flex-col items-start justify-start   ">

                            {modalSource  == 'user-modal' && <User_modal />}
                            {modalSource  == 'admin-loan' && <Admin_loan />}
                            {modalSource  == 'payments' && <Payments_modal />}
                            {modalSource  == 'admin-document' && <DocumentModal />}
                            {modalSource  == 'admin-ticket' && <AdminTicketModal />}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal_cont
