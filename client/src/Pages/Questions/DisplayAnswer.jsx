import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import Comment from './Comment'
import './Questions.css'

const DisplayAnswer = ({question,key}) => {

    const [link,setLink]=useState(true);

    const eventhandle =()=>{
        setLink(!link);
    }

  return (
    <div>
        {
            question.answer.map((ans)=>(
                <div className="display-ans" key={ans._id}>
                    <p>{ans.answerBody}</p>
                    <div className="question-actions-user">
                        <div>
                            <button type="button">Share</button>
                            <button type="button">Delete</button>
                        </div>
                        
                        <div>
                            <p>answered {ans.answeredOn}</p>
                            <Link to={`/User/${question.userId}`} className="user-link" style={{color:'#0086d8'}}>
                                <Avatar backgroundColor="green" px='8px' py='5px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                <div>
                                    {ans.userAnswered}
                                </div>
                            </Link>
                        </div>
                    </div>
                    <Comment comments={ans.comments} />
                
                </div>
            ))
        }
        <form>
                    {
                        link && (<button className="comment-button" type="button" onClick={eventhandle}>Add Comment</button>)
                    }
                    {
                        !link && (
                            <div>
                                <textarea cols="90" rows="5"></textarea>
                                <button className="comment-button" type="button" onClick={eventhandle}>Submit Comment</button>

                            </div>
                        ) 
                    }
        </form>
        
    </div>
  )
}

export default DisplayAnswer