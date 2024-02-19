import { createContext, useContext, useState, useEffect } from "react"
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";

import appLogo from '../assets/hexLab.svg';

const SidebarContext = createContext()

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const setSidebarWidth = () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        if (window.innerWidth < 768) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', setSidebarWidth);
        return () => {
          window.removeEventListener('resize', setSidebarWidth)
        }
    }, [])
    
    return (
        <aside className={`h-screen flex transition-all ${expanded ? "w-[250px]" : "w-[80px]"}`}>
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img 
                        src={appLogo} 
                        className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
                        alt=""                    
                    />
                    <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        {expanded ? <ChevronFirst /> : <ChevronLast className="relative right-3"/>}            
                    </button>
                </div>

                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-3">{ children }</ul>
                </SidebarContext.Provider>    

                <div>Width: {windowWidth} Height: {windowHeight}</div>            

                <div className="border-t flex p-3">
                    <img 
                        src="https://mighty.tools/mockmind-api/content/human/46.jpg"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                        <div className="leading-4">
                            <h4 className="font-semibold">John Doe</h4>
                            <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                        </div>
                        <MoreVertical size={20}/>
                    </div>          
                </div>
            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext)
    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
            ${
                active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                :
                "hover:bg-indigo-50 text-gray-600"
            }
        `}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "": "left-8 top-2"}`}></div>}

            {
                !expanded && 
                    <div 
                        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm 
                        invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100
                        group-hover:translate-x-0`}
                    >
                        {text}
                    </div>
            }
        </li>
    )
}