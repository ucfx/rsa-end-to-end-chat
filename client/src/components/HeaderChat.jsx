import useConversationsStore from "stores/ConversationsStore";

const HeaderChat = ({ decryptMessage, setDecryptMessage }) => {
  const selectedConversation = useConversationsStore(
    (_) => _.selectedConversation
  );
  const conversations = useConversationsStore((_) => _.conversations);

  return (
    <div className="bg-gray-200 flex p-4">
      <div className="avatar bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
        {conversations[selectedConversation]?.username.charAt(0)}
      </div>
      <h1 className="text-2xl font-bold ml-3">
        {conversations[selectedConversation]?.username}
      </h1>
      <span className="text-xl text-gray-500 pl-5">
        e:{conversations[selectedConversation]?.e}, n:
        {conversations[selectedConversation]?.n}
      </span>
      <label className="ml-auto">
        <input
          type="checkbox"
          checked={decryptMessage}
          onChange={() => setDecryptMessage(!decryptMessage)}
          className="form-checkbox text-blue-500 w-5 h-5"
        />
        #
      </label>
    </div>
  );
};

export default HeaderChat;
