import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

//context provider rapper
export const ChatContextProvider = ({children})=>{
    const {currentUser} =  useContext(AuthContext);
    //Initial state
    const INITIAL_STATE = {
        chatId: "null",
        user:{}
    }
    //Reducer
    const chatReducer = (state, action) =>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user: action.payload,
                    chatId: (currentUser && currentUser.uid) > action.payload.uid ? (currentUser && currentUser.uid) + action.payload.uid : action.payload.uid + (currentUser && currentUser.uid)
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return(
        //Now wrapping page
        <ChatContext.Provider  value={{data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
};