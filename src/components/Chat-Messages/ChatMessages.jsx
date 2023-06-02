import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import Message from '../Chat-Message/ChatMessage'
import { ChatContext } from '../../context/ChatContext';
import { db } from '../../firebase';

const ChatMessages = () => {
  const [message, setMessage] = useState([]);
  const {data} = useContext(ChatContext);

  //Fetch chat
  useEffect(()=>{
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
        doc.exists() && setMessage(doc.data().messages);
      })

      return ()=>{
        unSub(); 
      }
  },[data.chatId])
  return (
    <div className='caf_messages'>
    {
      message.map(m=>(
        <Message message={m} key={m.id}/>
      ))
    }
  </div>
  )
}

export default ChatMessages