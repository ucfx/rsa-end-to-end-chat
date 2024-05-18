import useConversationsStore from "stores/ConversationsStore";
import useSocket from "hooks/useSocket";

import { useNavigate } from "react-router-dom";
const LeftPanel = () => {
  const conversations = useConversationsStore((_) => _.conversations);
  const { socket } = useSocket();

  const navigate = useNavigate();

  return (
    <div className="left-panel p-4 border-r border-gray-300 w-[30%] min-w-[200px]">
      {Object.keys(conversations)
        .filter((key) => key !== socket.id)
        .map((key) => {
          return (
            <div
              onClick={() => navigate(`/${key}`)}
              key={key}
              className="group relative conversation flex items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer"
            >
              <div className="avatar bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                {conversations[key].username.charAt(0)}
              </div>
              <div className="username ml-2 text-gray-700">
                {conversations[key].username}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LeftPanel;
