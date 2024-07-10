"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Collection } from "./Collection";
import NoActiveListings from "./NoActiveListing";
import { IBook } from "@/lib/mongodb/database/models/book.model";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
//import "@fontsource/poppins";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaPen } from "react-icons/fa";
import { updateUserInClerkAndDB } from "@/lib/actions/user.actions";

interface IUser {
  username: string;
  fullName: string;
  imageUrl: string;
  joinedAt: string;
}

interface IUserDetails {
  Bio: string;
  Location: string;
}

interface ProfileProps {
  user: IUser;
  userDetails: IUserDetails;
  userBooks: IBook[];
  userId: string;
  clerkId: string;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  userDetails,
  userBooks,
  userId,
  clerkId,
}) => {
  const { user: clerkUser } = useUser();
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState(user.fullName);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(userDetails.Bio);
  const [location, setLocation] = useState(userDetails.Location);

  useEffect(() => {
    const savedState = localStorage.getItem("activeMode");
    if (savedState !== null) {
      setIsActive(JSON.parse(savedState));
    } else {
      setIsActive(true);
      localStorage.setItem("activeMode", JSON.stringify(true));
    }
  }, []);

  const handleToggle = () => {
    setIsActive((prevState) => {
      const newState = !prevState;
      localStorage.setItem("activeMode", JSON.stringify(newState));
      return newState;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile = {
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1] || '',
      username: username,
      bio: bio,
      location: location,
    };

    try {
      await updateUserInClerkAndDB(userId, clerkId, updatedProfile);
      console.log("Profile updated successfully");
      // You might want to refresh the page or update the state here
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg mt-[50px]">
      <div className="flex items-start">
        <div className="flex items-center justify-center bg-[#D6DAEA] w-[1060px] h-[497px] left-0 top-[113px] ">
          <div className="flex flex-col justify-center items-center lg:mr-[30px] lg:mt-8">
            <div className="relative w-36 h-36 md:w-[118px] md:h-[127px] lg:w-[346px] lg:h-[321px]">
              <Image
                src={user.imageUrl || "/assets/images/profile-icon.png"}
                alt="Profile Picture"
                className="rounded-full"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div
              className="text-xl font-semibold mt-4 lg:mt-[30px]"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: 35 }}
            >
              {user.fullName}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#081F5C] opacity-[80%] text-white px-12 py-3 rounded-md"
                  size="lg"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <FaPen className="mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bio" className="text-right">
                      Bio
                    </Label>
                    <Input
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              className="bg-[#081F5C] lg:w-[250px] opacity-[80%] text-white px-6 py-3 rounded-md"
              size="lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <Mail className="mr-2 h-4 w-4" />
              Inbox
            </Button>
          </div>
        </div>

        <div
          className="space-y-2 ml-2 mr-5 mt-20 lg:mr-10"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <div>
            <p className="text-[#000000]" style={{ fontSize: 25 }}>
              Username
            </p>
            <p
              className="text-[#081F5C] opacity-[60%]"
              style={{ fontSize: 20 }}
            >
              {user.username}
            </p>
          </div>
          <div>
            <p className="text-[#000000]" style={{ fontSize: 25 }}>
              Bio
            </p>
            <p
              className="text-[#081F5C] opacity-[60%]"
              style={{ fontSize: 20 }}
            >
              {userDetails.Bio}
            </p>
          </div>
          <div>
            <p className="text-[#000000]" style={{ fontSize: 25 }}>
              Location
            </p>
            <p
              className="text-[#081F5C] opacity-[60%]"
              style={{ fontSize: 20 }}
            >
              {userDetails.Location}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 25 }}>Status</p>
            <div className="flex items-center space-x-2">
              <Switch id="active-mode" checked={isActive} onChange={handleToggle} />
              <Label htmlFor="active-mode">Active</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="px-20 py-20">
        {userBooks.length > 0 ? (
          <Collection
            collection_type="My Listings"
            books={userBooks}
            userId={userId}
          />
        ) : (
          <NoActiveListings />
        )}
      </div>

      <div className="flex justify-between px-4 py-4 bg-[#081F5C] mb-[130px]">
        <div>
          <p className="text-white">Listings Completed</p>
          <p className="text-white font-semibold text-2xl"></p>
        </div>
        <div>
          <p className="text-white">Ongoing Listings</p>
          <p className="text-white font-semibold text-2xl">04</p>
        </div>
        <div>
          <p className="text-white">Joined ScholarStack</p>
          <p className="text-white font-semibold text-2xl">
            {formatDate(user.joinedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;