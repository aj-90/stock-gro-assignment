export const removeFav=(data) =>{
    return{
        type: "REMOVE_FAV",
        payload:{
            data:data
        }
    }
}
