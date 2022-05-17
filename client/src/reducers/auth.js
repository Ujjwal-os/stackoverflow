const authReducer = (state={date:null},action)=>{
    switch(action.type){
        case 'AUTH':
            localStorage.setItem('Profile',JSON.stringify({...action?.data}))
            return {...state,date:action?.data}
        default:
            return state
        }
}

export default authReducer