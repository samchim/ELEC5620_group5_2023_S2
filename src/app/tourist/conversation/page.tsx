"use client";

import ChatInput from "@/components/ChatInput";
import { MessageLeft, MessageQueue, MessageRight } from "@/components/Message";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";

const testMessageQueue: MessageQueue = [
  {
    message: "Hello",
    from: "tourist",
  },
  {
    message: "Hi",
    from: "llm",
  },
  {
    message: "How are you?",
    from: "tourist",
  },
  {
    message: "I'm fine, thank you.",
    from: "llm",
  },
  {
    message: "Goodbye",
    from: "tourist",
  },
  {
    message: "Bye",
    from: "llm",
  },
];

const TouristConversationPage = () => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [messageQueue, setMessageQueue] = useState<MessageQueue>([]);

  const getMessageFromApi = async (userMessage: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return "from api";
  };

  const handleSendUserMessage = async () => {
    if (!userMessage) return;
    const tempMessageQueue = [...messageQueue];
    tempMessageQueue.push(
      {
        message: userMessage,
        from: "tourist",
      },
      {
        message: "loading...",
        from: "llm",
      }
    );
    setMessageQueue(messageQueue);
    console.log(tempMessageQueue);

    const llmMessage = await getMessageFromApi(userMessage);
    tempMessageQueue[tempMessageQueue.length - 1] = {
      message: llmMessage,
      from: "llm",
    };
    setUserMessage("");
    console.log(tempMessageQueue);
    setMessageQueue(tempMessageQueue);
  };

  return (
    <Container>
      <Typography variant="h4">Interactive Conversation</Typography>
      <Paper>
        {messageQueue.map((message) => {
          return message.from === "tourist" ? (
            <MessageRight message={message.message} />
          ) : (
            <MessageLeft message={message.message} />
          );
        })}
        <ChatInput
          message={userMessage}
          setMessage={setUserMessage}
          sendMessage={handleSendUserMessage}
        />
      </Paper>
    </Container>
  );
};

export default TouristConversationPage;
