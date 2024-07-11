import React from 'react'
import { RootState } from '../stateManagement/reducers'
import { useSelector } from 'react-redux'

export const Home = () => {
  const first_name=useSelector((state:RootState)=>state.authReducer.authData.first_name)



  return (
    <div>Home</div>

  )
}
