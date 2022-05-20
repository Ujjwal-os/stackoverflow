import mongoose from 'mongoose'
import Questions from '../models/Questions.js'

export const postAnswer = async(req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
    //const userId = req.userId;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    
    updateNoOfQuestions(_id, noOfAnswers)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'answer': [{ answerBody, userAnswered, userId }]}})
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json('error in updating')
    }
}

const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate( _id, { $set: { 'noOfAnswers' : noOfAnswers}})
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = async ( req, res ) => {
    const { id:_id } = req.params;
    const { answerId, noOfAnswers } = req.body;
    console.log(req.params);
    console.log(answerId,noOfAnswers);
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...');
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('Answer unavailable...');
    }
    updateNoOfQuestions( _id, noOfAnswers)
    try{
        await Questions.updateOne(
            { _id }, 
            { $pull: { 'answer': { _id: answerId } } }
        )
        res.status(200).json({ message: "Successfully deleted..."})
    }catch(error){
        res.status(405).json(error)
    }
}

export const postComment = async(req, res) => {
    const { id: _id } = req.params;
    const { commentBody,userCommented,userId,answerId } = req.body;
    //const userId = req.userId;
    console.log({ commentBody,userCommented,userId,answerId });
    console.log(_id);
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('Answer unavailable...');
    } 
    try {
        const updatedQuestion = await Questions.updateOne(
            {
                '_id':_id,
                'answer' :{
                    '$elemMatch':{
                        '_id':answerId
                    }
                }
            }, { $addToSet: {'answer.$[outer].comments': [{ commentBody,userCommented,userId }]}},
            {
                arrayFilters: [
                  { "outer._id": answerId},
                 
        
              ]
              }
        )
        console.log(updatedQuestion)
            res.status(200).json(updatedQuestion)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}