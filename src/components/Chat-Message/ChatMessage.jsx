import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';

const ChatMessage = ({message}) => {
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    // console.log(data)
  //scroll the latest
  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({ behavior:"smooth" })
  },[message])
  // console.log(message)
  return (
    // <div ref={ref} className={`caf_message ${message.senderId === currentUser.uid && "owner"}`}>
    <div ref={ref} className={`caf_message ${message.senderId === (currentUser && currentUser.uid) && "owner"}`}>
      <div className="caf_messageInfo">
        <img src={message.senderId === (currentUser && currentUser.uid) ? (currentUser && currentUser.photoURL) : data.user.photoURL} 
        // <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} 
        alt="" />
        <span>Just now</span>
      </div>
      <div className="caf_messageContent">
        <p>{message.text}</p>
        { message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default ChatMessage
