import { useState } from "react";
import useSocket from "hooks/useSocket";
import useConversationsStore from "stores/ConversationsStore";
import RSA from "utils/rsa";
const InputMessage = () => {
  const [message, setMessage] = useState("");
  const selectedConversation = useConversationsStore(
    (_) => _.selectedConversation
  );
  const pushMessage = useConversationsStore((_) => _.pushMessage);
  const conversations = useConversationsStore((_) => _.conversations);
  const { socket } = useSocket();

  const rsa = new RSA();
  console.log(rsa);
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    console.log("Sending message:", message);
    const cipherText = rsa.encrypt(
      message,
      conversations[selectedConversation].e,
      conversations[selectedConversation].n
    );

    console.log(cipherText);

    socket.emit("sendMessage", { to: selectedConversation, text: cipherText });
    pushMessage(selectedConversation, { text: message, me: true });
    setMessage("");
    e.target.previousElementSibling.focus();
  };

  return (
    <div className="flex items-center w-full">
      <input
        className="border w-full border-gray-300 rounded-lg py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e);
          }
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default InputMessage;
