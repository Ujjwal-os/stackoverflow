import React from 'react'
import Questions from './Questions'


const QuestionList = ({questionsList}) => {
    
    return (

        <div>   
            {
                questionsList.map((question)=><Questions question={question} />)
            }

        </div>
    )
}

export default QuestionList