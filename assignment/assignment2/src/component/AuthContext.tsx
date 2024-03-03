import { createContext, Dispatch } from "react";
import { AuthAction, StateType } from "../type/CommonType";
import { useReducer } from "react";


const initialState = {
    userid:"",
    username:"",
    isLogin:false
};


function AuthReducer(state: StateType, action: AuthAction):StateType {
    switch(action.type) {
        case "LOGIN":
            let currentState = {...state, ...action.value, isLogin:true};
            setLocalStorageItem("authState", currentState);
            return currentState;
            
        case "LOGOUT":
            setLocalStorageItem("authState", initialState);
            return initialState;

        default:
            throw new Error("unknown action");
    }
}


const AuthContext = 
        createContext<{state:StateType, 
                       dispatch:Dispatch<AuthAction>}>({
  state: initialState,
  dispatch: () => {}
});


const AuthProvider = ({children}:{children:any}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


const setLocalStorageItem = (key:string, state:StateType) => {
  localStorage.setItem(key, JSON.stringify(state)); 
}

const getLocalStorageItem = (key:string):StateType => {
  const savedState = localStorage.getItem(key);
  return savedState? JSON.parse(savedState):{};
}



export 
{ AuthContext, AuthProvider, setLocalStorageItem, getLocalStorageItem };