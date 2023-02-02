export const tabs = ["Home", "Marketplace", "Settings"]
export const spicetifyRepo = "https://github.com/spicetify/spicetify-cli"

export function formatTime(date: Date,
    showDate: boolean = false, showSeconds: boolean = false): string {
    let hours: number | string = date.getHours();
    let minutes: string | number = date.getMinutes();
    let seconds: number = date.getSeconds()
    //   var ampm:string = hours >= 12 ? 'PM' : 'AM';
    //   hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    // ${ampm} for 12 hour format
    let strTime = `${hours}:${minutes}${showSeconds ? `:${seconds}` : ""}`;
    return showDate ?
        ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime) :
        strTime;

}
export async function getReleases() {
    const data: string = await (await fetch(spicetifyRepo + "/releases")).text()
}

export function getOs(): {
    isWin: boolean,
    isMac: boolean,
    isLinux: boolean
} {
    const os = navigator.userAgent;
    let isWin = false
    let isMac = false
    let isLinux = false

    if (os.search('Windows') !== -1) isWin = true
    else if (os.search('Mac') !== -1) isMac = true
    else if (os.search('Linux') !== -1 && os.search('X11') !== -1) isLinux = true
    // else if (os.search('X11')!==-1 && !(os.search('Linux')!==-1))
    return {
        isWin,
        isMac,
        isLinux
    }
}


export function getInstallCmds(): Array<string> {
    const os = getOs()
    if (localStorage.getItem("install_cmd") !== null) return localStorage.getItem("install_cmd")?.split(";") || [""]
    if (os.isWin) return ["iex (iwr -useb https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.ps1).Content",
        "iex (iwr -useb https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/resources/install.ps1).Content"]
    if (os.isLinux || os.isMac) return ["curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.sh", "sh",
    "curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/resources/install.sh", "sh"]
    return ["echo \"Please add your own install command in the settings\""]
}
export function getUninstallCmds(): Array<string> {
    const os = getOs()
    // if (localStorage.getItem("install_cmd") !== null) return localStorage.getItem("install_cmd") || ""
    if (os.isWin) return ["spicetify restore",
        "rmdir -r -fo $env:APPDATA\\spicetify",
        "rmdir -r -fo $env:LOCALAPPDATA\\spicetify",]
    // if (os.isLinux || os.isMac) return "curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.sh | sh | curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/resources/install.sh | sh"
    // 
    
    return ["echo \"Please add your own uninstall command in the settings\""]

}
