import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"
import type { NavbarProps } from "./helper/types"
import {tabs } from "./helper";
import Home from "./components/Home";
import Marketplace from "./components/Marketplace";
import Settings from "./components/Settings";
import { Toaster } from "react-hot-toast";
const App = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  useEffect(() => {
    document.title = "Spicetify | " + tabs[selectedTab]
  
  }, [selectedTab])
  return (
    <>
      <Navbar selectedTab={selectedTab}
        setSelectedTab={setSelectedTab} />
        <Toaster position="bottom-right" toastOptions={{
        duration: 6000,
        className: "bg-grey-900 text-common-white"
        }} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={tabs[selectedTab]}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {(selectedTab === 0) && <Home />}
            {(selectedTab === 1) && <Marketplace />}
            {(selectedTab === 2) && <Settings />}
          </motion.div>
        </AnimatePresence>

      </main>
    </>
  );
}

const Navbar = ({ selectedTab, setSelectedTab }: NavbarProps) => {
  return (
    <AnimatePresence>
      <nav>
        <motion.div initial={{
          left: `${100 / tabs.length * 0}%`
        }} transition={{
          duration: 0.25,
          ease: "easeOut"
        }}
          animate={{
            left: `${100 / tabs.length * selectedTab}%`
          }}
          className={`absolute bottom-[0px]
     right-0 h-[2px] bg-primary-500
    z-10`} style={{ 
            width: `calc(100% / ${tabs.length})`,
          }} />

        {tabs.map((v, i) => {
          return <button 
          disabled={v === "Marketplace"} data-tip={v === "Marketplace" ? "Coming soon™" : null} data-tooltip-pos="bottom"
          key={`nav_${i}`} onClick={() => setSelectedTab(i)}>
            {v}
          </button>
        })}

      </nav>
    </AnimatePresence>
  )
}
export default App;
