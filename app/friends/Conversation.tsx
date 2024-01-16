'use client'
import { createConversation } from '@/actions/createConversation';
import { sendMessage } from '@/actions/sendMessage';
import { fetchMessages } from '@/actions/fetchMessages'; // Import the fetchMessages function
import { useCurrentUser } from '@/hooks/use-current-user';
import { redirect } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Message } from '@/drizzle/schema';

function Conversation() {
  const me = useCurrentUser();
  if (!me) {
    redirect('/auth/login');
  }
  const [userOne, setUserOne] = useState('');
  const [userTwo, setUserTwo] = useState('');
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); // State to store the fetched messages

  useEffect(() => {
    if (conversationId) {
      // Fetch messages when conversationId changes
      const fetchMessagesForConversation = async () => {
        const fetchedMessages = await fetchMessages(conversationId);
        setMessages(fetchedMessages);
      };
      fetchMessagesForConversation();
    }
  }, [conversationId]);

  const handleCreateConversation = async () => {
    const id = await createConversation(userOne, userTwo);
    setConversationId(id);
  };
  
  const handleSendMessage = async () => {
    await sendMessage(conversationId!, message, me?.id);
    setMessage('');
  };

  return (
    <div>
      <h1>Create Conversation</h1>
      <input
        value={userOne}
        onChange={(e) => setUserOne(e.target.value)}
        placeholder="User One ID"
      />
      <input
        value={userTwo}
        onChange={(e) => setUserTwo(e.target.value)}
        placeholder="User Two ID"
      />
      <button onClick={handleCreateConversation}>Create Conversation</button>

      {conversationId && (
        <>
          <h1>Send Message</h1>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </>
      )}

      {messages.length > 0 && (
        <>
          <h1 className='font-bold text-2xl'>Messages</h1>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg.content}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Conversation;