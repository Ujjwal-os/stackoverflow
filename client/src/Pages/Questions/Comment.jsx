import React from 'react'
import './Questions.css'
import {Link} from 'react-router-dom'

const Comment = ({answerId}) => {
   const comments=[{
     commentBody:"This is comment",
     userId:1,
     userCommented:"Pravin",
     commentedOn:"3 july"
   }]
  return (
    <div>
        {
            comments.map((comment)=>(
                    <div style={{display:"block"}} className="comment-display">
                            <span style={{display:"inline-block",color:"rgba(0, 0, 0, 0.7)"}}>
                                    {comment.commentBody} - {" "}
                                    
                                    <Link to={`/User/${comment.userId}`} style={{color:'#0086d8'}}>{comment.userCommented}</Link>
                                        {" "}
                                    {comment.commentedOn}
                            </span>
                    </div>
            ))
        }
    </div>
  )
}

export default Comment