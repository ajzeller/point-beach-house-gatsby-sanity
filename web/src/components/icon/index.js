import React from 'react'
import HamburgerIcon from './hamburger'
import { IoIosMenu } from "react-icons/io";


function Icon (props) {
  switch (props.symbol) {
    case 'hamburger':
      return <HamburgerIcon />
    case 'menu':
      return <IoIosMenu size={'30px'} />
    default:
      return <span>Unknown icon: {props.symbol}</span>
  }
}

export default Icon
