import LeftPanel from "components/LeftPanel";
import useConversationsStore from "stores/ConversationsStore";
import useAuthStore from "stores/AuthStore";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { socketId } = useParams();

  const selectedConversation = useConversationsStore(
    (_) => _.selectedConversation
  );

  const setSelectedConversation = useConversationsStore(
    (_) => _.setSelectedConversation
  );

  const conversations = useConversationsStore((_) => _.conversations);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("selectedConversation", selectedConversation);
  }, [selectedConversation]);

  useEffect(() => {
    if (conversations[socketId]) {
      setSelectedConversation(socketId);
    } else {
      setSelectedConversation(null);
      navigate("/", { replace: true });
    }
  }, [socketId, conversations]);

  const logout = useAuthStore((_) => _.logout);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col h-[650px] w-[80%]">
        <div className="flex items-center justify-center mt-4">
          <h1 className="text-2xl font-bold mb-8">
            Welcome {useAuthStore((_) => _.user.username)}
          </h1>
        </div>
        <div className="flex h-full border-2 border-gray-300 rounded-xl">
          <LeftPanel />
          {selectedConversation ? (
            <Outlet />
          ) : (
            <div className="flex items-center justify-center flex-1">
              Select a conversation to start chatting
            </div>
          )}
        </div>
        <button
          onClick={logout}
          className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
