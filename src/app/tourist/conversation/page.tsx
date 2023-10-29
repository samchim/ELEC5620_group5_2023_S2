"use client";

import ChatInput from "@/components/ChatInput";
import { MessageLeft, MessageQueue, MessageRight } from "@/components/Message";
import { fetchFromApi } from "@/components/Util";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TouristConversationPage = () => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [messageQueue, setMessageQueue] = useState<MessageQueue>([]);
  const router = useRouter();

  const getMessageFromApi = async (userMessage: string): Promise<string> => {
    const apiResponse = await fetchFromApi(
      `/tourist/chat?message=${userMessage}`,
      { method: "POST" }
    );
    console.log(apiResponse);
    return await apiResponse.text();
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
    console.log(tempMessageQueue);
    setUserMessage("sending...");

    const llmMessage = await getMessageFromApi(userMessage);
    tempMessageQueue[tempMessageQueue.length - 1] = {
      message: llmMessage,
      from: "llm",
    };

    console.log(tempMessageQueue);
    setMessageQueue(tempMessageQueue);
    setUserMessage("");
  };

  return (
    <Container>
      <Typography variant="h4">Interactive Conversation</Typography>
      <Paper>
        {messageQueue.map((message, i) => {
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
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          router.push("/tourist/home");
        }}
      >
        Back
      </Button>
    </Container>
  );
};

export default TouristConversationPage;
