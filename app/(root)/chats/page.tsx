import React from 'react';
import ChatList from '@/components/shared/ChatList';
import { auth } from '@clerk/nextjs/server';
import { getUserById } from '@/lib/actions/user.actions';


const Chats = async() => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const currentUser = await getUserById(userId);
  return (
    <div className="bg-gray-100 custom-mobHeight md:custom-medHeight">
      <div className="flex flex-col custom-mobHeight md:custom-medHeight">
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
