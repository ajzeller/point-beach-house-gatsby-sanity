import React from 'react'
import HamburgerIcon from './hamburger'
import { IoIosMenu } from "react-icons/io";
import Fireplace from '../../assets/svg/fireplace.svg'
import Kayak from '../../assets/svg/kayak.svg'
import Bike from '../../assets/svg/bike.svg'
import Snowflake from '../../assets/svg/snowflake.svg'
import Washer from '../../assets/svg/washer.svg'
import HotPot from '../../assets/svg/hot-pot.svg'
import Sunset from '../../assets/svg/sunset.svg'
import Laptop from '../../assets/svg/laptop.svg'
import People from '../../assets/svg/people.svg'
import Bath from '../../assets/svg/bath.svg'
import House from '../../assets/svg/house.svg'
import Bed from '../../assets/svg/bed.svg'


function Icon (props) {
  switch (props.symbol) {
    case 'people':
      return <People />
    case 'bath':
      return <Bath />
    case 'house':
      return <House />
    case 'bed':
      return <Bed />
    case 'snowflake':
      return <Snowflake />
    case 'fireplace':
      return <Fireplace />
    case 'kayak':
      return <Kayak />
    case 'bike':
      return <Bike />
    case 'washer':
      return <Washer />
    case 'hotpot':
      return <HotPot />
    case 'sunset':
      return <Sunset />
    case 'laptop':
      return <Laptop />
    default:
      return <span>Unknown icon: {props.symbol}</span>
  }
}

export default Icon
