import { useEffect, useRef } from "react";
import useConversationsStore from "stores/ConversationsStore";
import useAuthStore from "stores/AuthStore";
import RSA from "utils/rsa";

const RightPanel = ({ decryptMessage }) => {
  const { selectedConversation, messages, conversations } =
    useConversationsStore();

  const user = useAuthStore((_) => _.user);
  console.log(user);
  const rsa = new RSA();

  const lastMessageRef = useRef(null);
  useEffect(() => {
    console.log("d", conversations[selectedConversation].d);
    console.log("n", conversations[selectedConversation].n);
  }, [selectedConversation]);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages[selectedConversation]]);

  return (
    <div className="flex flex-col p-4 overflow-y-auto h-[460px]">
      {messages[selectedConversation] &&
        messages[selectedConversation].map((message, index) => {
          console.log("message", message);
          return (
            <div
              key={index}
              ref={
                index === messages[selectedConversation].length - 1
                  ? lastMessageRef
                  : null
              }
              className={`rounded-xl w-[80%] p-2 mb-2 ${
                message.me ? "bg-blue-400 self-end" : "bg-gray-200"
              }`}
            >
              {message.me ? (
                <p className="text-gray-800">
                  {!decryptMessage
                    ? rsa.encrypt(
                        message.text,
                        conversations[selectedConversation].e,
                        conversations[selectedConversation].n
                      )
                    : message.text}
                </p>
              ) : (
                <p className="text-gray-800">
                  {decryptMessage
                    ? rsa.decrypt(message.text, user.d, user.n)
                    : message.text}
                </p>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default RightPanel;
