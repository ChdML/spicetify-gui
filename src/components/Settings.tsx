import React, { useState } from 'react'
import { getInstallCmds, isAllowedToCheckForUpdates } from '../helper'
import { toast } from "react-hot-toast"
import Switch from './Switch'
const Settings = () => {
  const [checkAppUpdates, setCheckAppUpdates] = useState(isAllowedToCheckForUpdates().app)
  const [checkCliUpdates, setCheckCliUpdates] = useState(isAllowedToCheckForUpdates().cli)


  return (
    <div className=''>
      <div className='flex flex-col text-center'>
        <OptionInput label='Install command (Separated By ";")'
          onSubmit={(v, e) => {
            localStorage.setItem("install_cmd", v)
            toast.success("Saved Install Command!")
          }}
          placeholder={getInstallCmds().join("; ")} />

        <div className='flex justify-center mt-8'>
          <label className='-mr-4 mt-[0.1rem]'>Check for app updates:</label>
          <Switch switchProps={{
            checked: checkAppUpdates,
          }} onChange={
            (checked) => {
              localStorage.setItem("check_updates_app", checked ? "yes" : "no")
              setCheckAppUpdates(isAllowedToCheckForUpdates().app)
            }
          } id="app_updates" />
        </div>

        <div className='flex justify-center mt-8'>
          <label className='-mr-4 mt-[0.1rem]'>Check for Spicetify/CLI updates:</label>
          <Switch switchProps={{
            checked: checkCliUpdates,
          }} onChange={
            (checked) => {
              localStorage.setItem("check_updates_cli", checked ? "yes" : "no")
              setCheckCliUpdates(isAllowedToCheckForUpdates().cli)
            }} id="cli_updates" />
        </div>

        {/* <div className='flex justify-center mt-8'>
          <label className='mr-1 mt-[0.4rem]'>Check for updates every:</label>
          <select
            onChange={(e) => localStorage.setItem("check_for_updates_time", e.target.value)}
            defaultValue={localStorage.getItem("check_for_updates_time") || "startup"}>
            <option value="startup">
              Startup
            </option>
            <option value="2days">
              2 Days
            </option>
            <option value="4days">
              4 Days
            </option>
            <option value="week">
              Week
            </option>
            <option value="2weeks">
              2 Weeks
            </option>
            <option value="month">
              Month
            </option>
          </select>
        </div> */}
        {/* <div>
          <button className='btn'>Manually Check for updates</button>
          <p>App Current version: <b>{localStorage.getItem("app_version")}</b></p>
          <p>Spicetify/CLI Current version: <b>{localStorage.getItem("cli_version")}</b></p>
          <p>Latest App version: <b>{localStorage.getItem("latest_app_update")}</b></p>
          <p>Latest Spicetify/CLI version: <b>{localStorage.getItem("latest_cli_update")}</b></p>

        </div> */}
      </div>
      <div className='mt-6'>
        <a href='https://github.com/chdml/spicetify-gui'
          target="_blank"
          className='btn mr-2'>App Github repo</a>
        <a className='btn' target="_blank"
          href="https://github.com/spicetify/spicetify-cli">Spicetify/CLI Github repo</a>
        <p className='mt-3'>Have a suggestion/bug? Submit it to the "App Github repo"</p>
        <p>App Current version: <b>{localStorage.getItem("app_version")}</b></p>
          <p>Spicetify/CLI Current version: <b>{localStorage.getItem("cli_version")}</b></p>

      </div>

    </div>
  )
}

const OptionInput = ({ label, buttonName = "Save", onSubmit,
  placeholder }: {
    label: string,
    buttonName?: string,
    placeholder: string
    onSubmit: (v: string, e: React.FormEvent) => void,
  }) => {
  const [val, setVal] = useState<string>("")

  return (
    <form className='relative' onSubmit={async (e: React.FormEvent) => {
      e.preventDefault()
      await onSubmit(val, e)
    }}>
      {/* I don't like this absolute
      solution but it works */}
      <label className="block absolute left-[40.2%]
        -top-6
      text-grey-300 font-medium mb-2">
        {label}:
      </label>
      <input value={val}
        onChange={(e) => setVal(e.target.value)}
        className='w-80 text-xl mr-2'
        type="text" placeholder={placeholder} />
      <button
        disabled={val.length === 0} type="submit" className="btn">{buttonName}</button>

    </form>
  )
}
export default Settings