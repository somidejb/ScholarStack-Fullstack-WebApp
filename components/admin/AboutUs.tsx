import React from 'react';
import Image from 'next/image';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Jubril Somide',
    role: 'Software Developer',
    description: 'Jubril is a seasoned project manager with over 10 years of experience.',
    imageUrl: '/assets/images/jubril.jpeg', // replace with actual image URL
  },
  {
    id: 2,
    name: 'Kruti Mistry',
    role: 'UI/UX Designer',
    description: 'Kruti is a lead developer specializing in frontend technologies.',
    imageUrl: '/assets/images/kruti.jpeg', // replace with actual image URL
  },
  {
    id: 3,
    name: 'Diya Patel',
    role: 'UI/UX Designer',
    description: 'Diya creates user-friendly designs that are both beautiful and functional.',
    imageUrl: '/assets/images/diya.jpg', // replace with actual image URL
  },
  {
    id: 4,
    name: 'Michael Brown',
    role: 'Backend Developer',
    description: 'Michael is an expert in server-side development and database management.',
    imageUrl: '/assets/images/book3.png', // replace with actual image URL
  },
  {
    id: 5,
    name: 'Sarah Davis',
    role: 'QA Engineer',
    description: 'Sarah ensures that our products meet the highest quality standards.',
    imageUrl: '/assets/images/book3.png', // replace with actual image URL
  },
  {
    id: 6,
    name: 'David Wilson',
    role: 'DevOps Engineer',
    description: 'David specializes in continuous integration and deployment strategies.',
    imageUrl: '/assets/images/book3.png', // replace with actual image URL
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-violet-500 mb-12">About Us</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
            >
              <Image
                className="w-32 h-32 rounded-full mx-auto"
                src={member.imageUrl}
                alt={member.name}
                width={150}
                height={150}
              />
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold text-violet-400">{member.name}</h2>
                <p className="text-sm text-zinc-600">{member.role}</p>
                <p className="mt-2 text-zinc-700">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
