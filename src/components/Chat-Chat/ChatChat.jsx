import React, { useContext } from 'react'
import Cam from '../../img/cam.png'
import Add from "../../img/add.png"
import More from "../../img/more.png"
import ChatMessages from '../Chat-Messages/ChatMessages'
import ChatInput from '../Chat-Input/ChatInput'
import { ChatContext } from '../../context/ChatContext'

const ChatChat = () => {
  const {data} = useContext(ChatContext);
  return (
    <div className='caf_chat'>
      <div className="caf_chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="caf_chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
        <ChatMessages/>
        <ChatInput/>
    </div>
  )
}

export default ChatChat