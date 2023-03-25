import React from 'react'
import { ReactComponent as Logo } from "../coincexxx.svg"

const Header = () => {
  return (
    <div>
        <div className="shadow-md mb-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
                <Logo/>
                <h1 className="text-2xl font-bold">AlmaBetter</h1>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Header