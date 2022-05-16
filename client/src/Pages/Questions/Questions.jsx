import React from 'react'
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import '../../App.css'

const Questions = () => {
  return (
    <div className="home-container-1">
        <LeftSideBar />
        <div className="home-container-2">
          <HomeMainbar />
          <RightSidebar />
        </div>
    </div>
  
  )
}

export default Questions