import React from 'react'
import type {Switch as type} from "../helper/types"
const Switch = ({
    switchProps, labelProps,
    onChange,
    id
}:type) => {
  return (
    <>
    <input onChange={async(e) => await onChange(e.target.checked)}
    {...switchProps} type="checkbox" id={id}
    /><label htmlFor={id} {...labelProps}></label>

    </>
  )
}

export default Switch