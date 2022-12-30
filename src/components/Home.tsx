import { invoke } from "@tauri-apps/api/tauri";
import { sendNotification } from "@tauri-apps/api/notification"
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { formatTime, getInstallCmds, getOs, getUninstallCmds } from "../helper";
import Modal from "./Modal";
import Convert from "ansi-to-html";
import type { CmdButton as CmdButtonType } from "../helper/types";

function Home() {
    const backupRef = useRef<HTMLElement>(null);
    return (
        <>
            <img className="ml-auto mr-auto" src="/spicetify_fixed.png" width={256} height={256} />
            <h1>Spicetify</h1>

            <CmdButton modalTitle="Install Command"
            notification={"Successfully Installed Spicetify!"}
                data-tip="Installs Spicetify if not already installed and runs Spicetify apply"
                cmd={{
                    isWindows: getOs().isWin,
                    cmds: getInstallCmds()
                }}
            >Install</CmdButton>
            <CmdButton modalTitle="Uninstall Command"
            notification={"Successfully Uninstalled Spicetify!"}
                data-tip="Uninstalls Spicetify"
                cmd={{
                    isWindows: getOs().isWin,
                    cmds: getUninstallCmds()
                }}
            >Uninstall</CmdButton>
            
            <br />
            
            <CmdButton modalTitle="Update Command"
            notification={"Successfully Updated Spicetify!"}
                data-tip="When changing css files etc. you should run this"
                cmd={{
                    isWindows: getOs().isWin,
                    cmds: ["spicetify update"]
                }}
            >Update</CmdButton>
            
            <CmdButton modalTitle="Update Command"
            notification={"Successfully Updated Spicetify!"}
                data-tip="Upgrades spicetify to the latest version"
                cmd={{
                    isWindows: getOs().isWin,
                    cmds: ["spicetify upgrade"]
                }}
            >Upgrade</CmdButton>
            <br />
            <CmdButton onClick={() => {
                localStorage.setItem("last_backup", Date.now().toString())
                if(backupRef.current !== null) backupRef.current.innerText = formatTime(new Date(Number(localStorage.getItem("last_backup"))),true,false)
            }} modalTitle="Backup Command"
            notification={"Successfully Backed up Spicetify!"}
                data-tip="Creates a spicetify backup to current configuration"
                cmd={{
                    isWindows: getOs().isWin,
                    cmds: ["spicetify backup"]
                }}
            >Create backup</CmdButton>

            <CmdButton modalTitle="Backup Command"
            notification={"Successfully Applied backup Spicetify!"}
                data-tip="Applies last set backup"
                cmd={{
                    isWindows: getOs().isWin,
                    cmds: ["spicetify restore backup"]
                }}
            >Apply backup</CmdButton>
            
            <p>Last backup: <b ref={backupRef}>{localStorage.getItem("last_backup") ?
            formatTime(new Date(Number(localStorage.getItem("last_backup"))),true,false) : "None"}</b></p>
        </>
    )
}

const CmdButton = ({ children, cmd, notification,
    modalTitle, onClick = function(){}, ...props }:CmdButtonType) => {
    const [running, setRunning] = useState(false);
    const [done, setDone] = useState(false);
    const convert = new Convert();
    const win = window as any;
    win.cmd_output = (cmd: string) => {
        console.log(cmd)
        const elm = document.querySelector(".cmd_window")
        const preElm = document.createElement("pre")
        preElm.setAttribute("data-prefix", "$")
        const codeElm = document.createElement("code")
        codeElm.innerHTML = `[${formatTime(new Date(), false, true)}]: ${convert.toHtml(cmd)}`
        preElm.append(codeElm)
        elm?.prepend(preElm)
    };
    win.cmd_done = () => {
        toast.success("Finished Running Command!")
        if(notification) sendNotification({
            title: "Spicetify",
            body: notification
        });
        setDone(true)
    }
    return (
        <>
            <button {...props}
                className="btn m-2"
                onClick={() => {
                    onClick()
                    setRunning(true)
                    setDone(false)
                    invoke("run_cmds", {...cmd})
                }} disabled={running}>{children}</button>
            <Modal title={`${modalTitle} / ${done ? "Done" : "Running"}`}
                open={running} setOpen={(b) => {
                    if (done) setRunning(b)
                    else toast.error("Command running, Please wait till command finishes running.")
                }}>
                <div className="cmd_window">

                </div>
            </Modal>
        </>
    )
}
export default Home