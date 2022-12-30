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
    let stdout = output
        .stdout(std::process::Stdio::piped())
        .spawn()
        .expect("failed to execute process")
        .stdout
        .expect("failed to get stdout");
    let reader = io::BufReader::new(stdout);
    
    for line in reader.lines() {
        // println!("{}", line.unwrap());
        let mut mut_str = "".to_string();
        let output_str = format!("window['cmd_output'](`{}`)", &line.unwrap_or(mut_str));
        window.eval(&output_str);
    }
    window.eval("window['cmd_done']()");
    
    /**/
}

fn check_if_commands_harmful(cmds: &str) -> bool {
    let allowed_commands = vec![
        "ls",
        "echo",
        "pwd",
        "cat",
        "grep",
        "iwr",
        "iex",
        "curl",
        "sh",
        "spicetify",
    ];

    // split the cmd string on the "|" symbol
    let child_commands: Vec<&str> = cmds.split("|").flat_map(|s| s.split(";")).collect();

    // check each child command against the whitelist
    for child_cmd in child_commands {
        if !allowed_commands.contains(&child_cmd.trim().split_whitespace().next().unwrap()) {
            println!("Dangerous Command detected: {}", child_cmd);
            return true;
        }
    }
    return false;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_cmds])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
