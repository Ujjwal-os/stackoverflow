import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {postComment} from '../../actions/question.js'

const PostComment = ({answerId}) => {

    const dispatch=useDispatch();
    const {id}=useParams();
    const User=useSelector((state)=>(state.currentUserReducer))

    const [link,setLink]=useState(true);
    const [comment,setComment]=useState('');
    const eventhandle =()=>{
        setLink(!link);
        console.log(comment)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        console.log({"commentBody":comment,"id":id,"answerId":answerId,"userId":User?.result?._id,"userCommented":User?.result?.name})
       dispatch(postComment({"commentBody":comment,"id":id,"answerId":answerId,"userId":User?.result?._id,"userCommented":User?.result?.name}))
        setLink(!link)
    }

  return (
    <div>
    {
        link && (<button className="comment-button" onClick={eventhandle}>Add Comment for {answerId}</button>)
    }
    {
        !link && (
            <form onSubmit={handleSubmit}>
                <textarea cols="90" rows="5" onChange={(e)=>setComment(e.target.value)}></textarea>
                <button className="comment-button" type="submit" >Submit Comment</button>
            </form>
        ) 
    }
    </div>
  )
}

export default PostComment