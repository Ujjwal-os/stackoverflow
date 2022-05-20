import React from 'react'
import './Questions.css'
import {Link} from 'react-router-dom'
import moment from 'moment'

const Comment = ({comments}) => {
  console.log(comments)
  return (
    <div>
        {
            comments.map((comment)=>(
                    <div style={{display:"block"}} className="comment-display" key={comment._id}>
                            <span style={{display:"inline-block",color:"rgba(0, 0, 0, 0.8)",margin:"5px 0 5px 0"}}>
                                    {comment.commentBody} - {" "}
                                    
                                    <Link to={`/User/${comment.userId}`} style={{color:'#0086d8',textDecoration:'none'}}>{comment.userCommented}</Link>
                                        {" "}
                                   {moment(comment.commentedOn).fromNow()}
                            </span>
                    </div>
            ))
        }
    </div>
  )
}

export default Comment