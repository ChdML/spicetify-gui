import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type {Modal as type} from "../helper/types"
const Modal = ({
    open = false,
    setOpen,
    children,
    footer,
    title
}:type) => {

    return createPortal((
        <AnimatePresence mode="wait">
            {open ? <motion.div tabIndex={-1}
                transition={{
                    duration: 0.2
                }}
                initial={{
                    opacity: 0,
                    y: 10
                }}
                exit={{
                    opacity: 0,
                    y: -10
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                className="absolute top-0 left-0
    w-full h-full bg-[rgba(0,0,0,0.5)]
    
    z-50 p-4 overflow-y-auto 
    flex justify-center items-center
     ">
                <div className="relative max-w-3xl min-w-[48rem] ">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-grey-800 rounded-lg shadow">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t border-grey-600">
                            <h3 className="text-xl font-semibold text-common-white">
                                {title}
                            </h3>
                            <button onClick={() => setOpen(false)} type="button" className="text-grey-300 hover:text-primary-600 transition-colors rounded-lg text-sm p-1.5 ml-auto  
                        inline-flex items-center " data-modal-toggle="defaultModal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-3 space-y-6 max-h-[32rem] overflow-x-hidden overflow-y-auto">
                            {children}
                        </div>
                        {/* <!-- Modal footer --> */}
                        {footer ? <div className="flex items-center p-6
                    space-x-2 border-t text-grey-300 rounded-b border-grey-600">
                            {footer}
                        </div> : null}
                    </div>
                </div>
            </motion.div> : null}
        </AnimatePresence>
    ), document.getElementById("root")!)
}

export default Modal