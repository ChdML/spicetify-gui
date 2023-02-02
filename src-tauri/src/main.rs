#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::io::{self, BufRead};
use std::process::Command;

#[tauri::command(async)]
fn run_cmds(cmds: Vec<String>, is_windows: bool, window: tauri::Window) {
    let mut output = if is_windows {
        Command::new("powershell")
    } else {
        Command::new("sh")
    };

    /* Loop through array of cmds and add to
    powershell/shell
    */
    if is_windows {
        output.arg("-noninteractive");
        output.arg("-Command");
        output.arg(cmds.join("; "));
    } else {
        output.arg("-c");
        output.arg(cmds.join("; "));
    }
    /**/
    /*Open new window and read output*/
    let spawned_process = output.stdout(std::process::Stdio::piped()).spawn()
    .expect("failed to execute process");
    let proc_id_eval = format!("window['set_proc_id'](`{}`)", &spawned_process.id());
    window.eval(&proc_id_eval);

    let stdout = spawned_process
        .stdout
        .expect("failed to get stdout");

    let reader = io::BufReader::new(stdout);

    for line in reader.lines() {
        // println!("{}", line.unwrap());
        let mut mut_str = "".to_string();
        let output_str = format!("window['cmd_output'](`{}`)", &line.unwrap_or(mut_str).replace("\\", "\\\\"));
        window.eval(&output_str);
    }
    window.eval("window['cmd_done']()");

    /**/
}

#[tauri::command]
fn kill_proc(pid: i32, window: tauri::Window) {
    let os = std::env::consts::OS;
    let output = if os.contains("windows") {
        Command::new("taskkill")
            .arg("/pid")
            .arg(pid.to_string())
            .arg("/f")
            .output()
            .expect("Failed to kill process")
    } else {
        Command::new("kill")
            .arg("-9")
            .arg(pid.to_string())
            .output()
            .expect("Failed to kill process")
    };
    window.eval("window['proc_killed']()");

    /**/
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_cmds, kill_proc])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
