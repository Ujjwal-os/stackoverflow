import React,{useState} from 'react'
import './Questions.css'
import {useParams,Link,useLocation,useNavigate} from 'react-router-dom'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import {useSelector,useDispatch} from 'react-redux'
import {postAnswer,deleteQuestion,voteQuestion} from '../../actions/question.js'

const QuestionDetails = () => {
    const {id}=useParams();
    const questionsList=useSelector((state)=>(state.questionsReducer))
    const User=useSelector((state)=>(state.currentUserReducer))
    const navigate=useNavigate();
    const [Answer, setAnswer] = useState("")
    const location=useLocation();
    const url="http://localhost:3000";
    // var questionsList = [{ 
    //     _id: '1',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongo db", "express js"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //         comments: [{
    //             commentBody:"It also may be more semantically correct for something to be a button, even if you want it to look like a link. For example imagine a pair of Expand All Collapse All links that change something on the page. Clicking these causes an action, but doesn't take the user anywhere",
    //             userCommented:"manoj",
    //             commentedOn: "feb 2",
    //             userId:1
    //         }]
    //     }]
    // },{ 
    //     _id: '2',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     userId: 1,
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //         comments: [{
    //             commentBody:"Comment",
    //             userCommented:"manoj",
    //             commentedOn: "feb 2",
    //             userId:1
    //         }]
    //     }]
    // },{ 
    //     _id: '3',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     userId: 1,
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //         comments: [{
    //             commentBody:"Comment",
    //             userCommented:"manoj",
    //             commentedOn: "feb 2",
    //             userId:1
    //         }]
    //     }]
    // }]
    const dispatch=useDispatch();
    const postAnswerHandler=(e,answerLength)=>{
        e.preventDefault();
        if(User===null){
            alert("Login or Signup for posting answer")
            navigate('/Auth')
        }else{
            if(Answer===""){
                alert("Enter an answer before submitting")
            }else{
                dispatch(postAnswer({id,noOfAnswers:answerLength+1,answerBody:Answer,userAnswered:User.result.name,userId:User?.result._id}))
            }
        }
    }
    const handleShare=()=>{
        const add=url+location.pathname;
        copy(add);
        alert("Copied Link : "+add);
    }
    
    const handleDelete=()=>{
        dispatch(deleteQuestion(id,navigate))
    }

    const handleUpVote=()=>{
        dispatch(voteQuestion(id,'upvote',User.result._id))
    }

    const handleDownVote=()=>{
        dispatch(voteQuestion(id,'downvote',User.result._id))
    }

  return (
    <div className="question-details-page">
        {
            questionsList.data===null?
            <h1>Loading...</h1>:
            <>
                {
                    questionsList.data.filter(question=>question._id===id).map(question=>(
                        <div key={question._id}>
                            <section className="question-details-container">
                                <h1>{question.questionTitle}</h1>
                                <div className="question-details-container-2">
                                    <div className="question-votes">
                                        <img src={upvote} alt="" width='18' className='votes-icon' onClick={handleUpVote}/>
                                        <p>{question.upVote.length-question.downVote.length}</p>
                                        <img src={downvote} alt="" width='18' className='votes-icon' onClick={handleDownVote}/>
                                    </div>
                                    <div style={{width:"100%"}}>
                                        <p className="question-body">{question.questionBody}</p>
                                        <div className="question-details-tags">
                                            {
                                                question.questionTags.map((tag)=>(<p key={tag}>{tag}</p>))
                                            }
                                        </div>
                                        <div className="question-actions-user">
                                            <div>
                                                <button type="button" onClick={handleShare}>Share</button>
                                                {
                                                    (User?.result?._id===question.userId) && (<button type="button" onClick={handleDelete}>Delete</button>)
                                                }
                                                
                                            </div>
                                            <div>
                                                <p>asked {moment(question.askedOn).fromNow()}</p>
                                                <Link to={`/User/${question.userId}`} className="user-link" style={{color:'#0086d8'}}>
                                                    <Avatar backgroundColor="orange" px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                    <div>
                                                        {question.userPosted}
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                question.noOfAnswers!==0 && (
                                    <section>
                                        <h3>{question.noOfAnswers} Answers</h3>
                                        <DisplayAnswer key={question._id} question={question}/>
                                    </section>
                                )
                            }
                            <section className="post-ans-container">
                                <h3>Your Answer</h3>
                                <form onSubmit={(e)=>{postAnswerHandler(e,question.answer.length)}}>
                                    <textarea name="" id="" cols="30" rows="10" onChange={(e)=>setAnswer(e.target.value)}></textarea><br />
                                    <input type="Submit" className='post-ans-btn' value='Post Your Answer'/>
                                </form>
                                <p>
                                        Browse other Question tagged
                                        {
                                            question.questionTags.map((tag) => (
                                                <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                                            ))
                                        } or 
                                        <Link to='/AskQuestion' style={{textDecoration: "none", color:"#009dff"}}> ask your own question.</Link>
                                    </p>
                            </section>
                        </div>
                    ))
                }
            </>
        }
    </div>
  )
}

export default QuestionDetails