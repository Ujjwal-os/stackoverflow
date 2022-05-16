import React from 'react'
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import QuestionDetails from './QuestionDetails'

const DisplayQuestion = () => {
  return (
    <div className="home-container-1">
        <LeftSideBar />
        <div className="home-container-2">
            <QuestionDetails />
          <RightSidebar />
        </div>
    </div>
  )
}

export default DisplayQuestion