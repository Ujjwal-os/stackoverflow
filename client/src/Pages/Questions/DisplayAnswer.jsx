import React from 'react'
import {Link,useLocation,useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Avatar from '../../components/Avatar/Avatar'

import './Questions.css'
import copy from 'copy-to-clipboard'
import moment from 'moment'
import {deleteAnswer} from '../../actions/question.js'
import PostComment from './PostComment'
import Comment from './Comment'

const DisplayAnswer = ({question,key}) => {
    const dispatch=useDispatch();
    const {id}=useParams();
    const User=useSelector((state)=>(state.currentUserReducer))

    const location=useLocation();
    const url="http://localhost:3000"

    const handleShare = () =>{
        const add=url+location.pathname;
        copy(add);
        alert("Copied Link : "+add);
    }
    const handleDelete = (answerId,noOfAnswers)=>{
        dispatch(deleteAnswer(id,answerId,noOfAnswers-1))
    }


  return (
    <div>
        {
            question.answer.map((ans)=>(
                <div className="display-ans" key={ans._id}>
                    <p>{ans.answerBody}</p>
                    <div className="question-actions-user">
                        <div>
                            <button type="button" onClick={handleShare}>Share</button>
                            {
                                (User?.result?._id===ans.userId) && (<button type="button" onClick={()=>handleDelete(ans._id,question.noOfAnswers)}>Delete</button>)
                            }    
                        </div>
                        
                        <div>
                            <p>answered {moment(ans.answeredOn).fromNow()}</p>
                            <Link to={`/User/${question.userId}`} className="user-link" style={{color:'#0086d8'}}>
                                <Avatar backgroundColor="green" px='8px' py='5px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                <div>
                                    {ans.userAnswered}
                                </div>
                            </Link>
                        </div>
                        
                    </div>
                    <Comment data={ans.comments} />
                    <PostComment answerId={ans._id} />    
                </div>
            ))
        }

        
    </div>
  )
}

export default DisplayAnswer