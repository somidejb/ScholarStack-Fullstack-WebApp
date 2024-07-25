"use client";
import { useSession } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  username: string;
  email: string;
  // Add other user properties as needed
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<User[]>([]);
  const { session } = useSession();
  const currentUser = session?.user;

  const getContacts = async () => {
    try {
      const res = await fetch('/api/users'); // Ensure this URL is correct
      if (!res.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data: User[] = await res.json();
      console.log('Fetched contacts:', data); // Add logging
      setContacts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getContacts();
    }
  }, [currentUser]);

  return (
    <div>
      <div>
        {contacts.map((user, index) => (
          <div key={user._id}>
            <img 
              src='assets/images/user.png' 
              alt='profile' 
              height={15} 
              width={15} 
            />
            <p className='flex'>{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
