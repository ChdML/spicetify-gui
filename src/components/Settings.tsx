import React, { useState } from 'react'
import { getInstallCmds } from '../helper'
import { toast } from "react-hot-toast"
import Switch from './Switch'
const Settings = () => {


  return (
    <div className=''>
      <div className='flex flex-col text-center'>
        <OptionInput label='Install command (Separated by ";")'
          onSubmit={(v) => {
            localStorage.setItem("install_cmd", v)
            toast.success("Saved Install Command!")
          }}
          placeholder={getInstallCmds().join("; ")} />

        
      </div>
      <div className='mt-6'>
        <a href='https://github.com/chdml/spicetify-gui'
          target="_blank"
          className='btn mr-2'>App Github repo</a>
        <a className='btn' target="_blank"
          href="https://github.com/spicetify/spicetify-cli">Spicetify/CLI Github repo</a>
        <p className='mt-3'>Have a suggestion/bug? Submit it to the "App Github repo"</p>

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
      <label className="block
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