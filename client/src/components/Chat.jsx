import RightPanel from "./RightPanel";
import InputMessage from "./InputMessage";
import HeaderChat from "./HeaderChat";
import { useState } from "react";

const Chat = () => {
  const [decryptMessage, setDecryptMessage] = useState(true);
  return (
    <div className="flex flex-col flex-1">
      <HeaderChat
        decryptMessage={decryptMessage}
        setDecryptMessage={setDecryptMessage}
      />
      <RightPanel decryptMessage={decryptMessage} />
      <div className="flex justify-end">
        <InputMessage />
      </div>
    </div>
  );
};

export default Chat;
