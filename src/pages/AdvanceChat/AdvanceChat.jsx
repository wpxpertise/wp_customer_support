import ChatChat from '../../components/Chat-Chat/ChatChat';
import ChatSidebar from '../../components/Chat-sidebar/chatSidebar';
import "./chat.scss";

const AdvanceChat = () => {
  return (
  <div className="wcs_chat_cls" id="wcs_chat">
      <div className="wcs_Chats">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              {/* start  */}
                <div className='caf_home'>
                  <div className="caf_container">
                      <ChatSidebar/>
                      <ChatChat/>
                  </div>
                </div>
              {/* End  */}
            </div>
          </div>
      </div>
  </div>
  )
}

export default AdvanceChat