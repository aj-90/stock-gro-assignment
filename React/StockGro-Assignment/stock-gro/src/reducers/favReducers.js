import Data from "../data.json"

const initialData ={
    list:Data
}

const favReducers=(state=initialData,action)=>{
    switch(action.type){
        

        case "REMOVE_FAV":
            console.log(state.list)
            console.log("akshat")
            console.log(action.payload.data)
            const newList = state.list.filter((elem) => elem._id !== action.payload.data._id)
            return{
                ...state,
                list:newList
                }
            default:return state;
    }
}

export default favReducers;