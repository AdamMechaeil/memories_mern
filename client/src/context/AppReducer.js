  
  export default (state,action)=>{
     
    switch (action.type) {
        case 'FETCH_ALL':

          return {
                 
           ...state,
            posts: action.payload


          }

          case 'CREATE_POST' :

          return{

            ...state,
            posts: [...state.posts,action.payload]

          }

          // case 'ERROR':
          // return {
          //   ...state,
          //   error: action.payload
          // }

          case 'DELETE':
            return {
             ...state,
              posts: state.posts.filter((post) => post._id !== action.payload)

            }  
            
         case 'UPDATE':
           return{
             ...state,
             posts: state.posts.map((post)=>(post._id===action.payload._id ? action.payload : post))
           }
        default:
           return state;
    }


  }