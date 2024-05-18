import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import useAuthStore from "stores/AuthStore";
import useConversationsStore from "stores/ConversationsStore";
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useAuthStore((_) => _.user);
  const pushMessage = useConversationsStore((_) => _.pushMessage);
  const setConversations = useConversationsStore((_) => _.setConversations);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:5000", {
        auth: {
          user: {
            username: user.username,
            e: user.e,
            n: user.n,
          },
        },
      });
      setSocket(socket);

      socket.on("users", (users) => {
        setConversations(users);
      });

      socket.on("newMessage", ({ from, text }) => {
        pushMessage(from, { text });
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
