import React from 'react';
import ChatList from '@/components/shared/ChatList';
import { auth } from '@clerk/nextjs/server';
import { getUserById2 } from '@/lib/actions/user.actions';

const Chats = async() => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  console.log("user Id: ", userId);
  const currentUser = await getUserById2(userId);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col h-screen">
        <ChatList
          className="w-full h-full shadow-lg rounded-lg bg-white"
          userId={userId}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default Chats;
