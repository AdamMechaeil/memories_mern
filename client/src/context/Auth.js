

const authReducer = (state , action) => {
    switch (action.type) {
      case 'AUTH':
        
        localStorage.setItem('profile', JSON.stringify({ ...action.payload?.data }));
  
        return { ...state, user: action.payload.data, loading: false, errors: null };
      case 'LOGOUT':
        localStorage.clear();
  
        return { ...state, user: null, loading: false, errors: null };
      default:
        return state;
    }
  };
  
  export default authReducer;  