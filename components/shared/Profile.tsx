"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Collection } from "./Collection";
import NoActiveListings from "./NoActiveListing";
import { IBook } from "@/lib/mongodb/database/models/book.model";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { daysSincePosted } from "@/lib/actions/datePosted";
import Modal from "./Modal";
import {motion} from 'framer-motion';

interface IUser {
  username: string;
  fullName: string;
  imageUrl: string;
  joinedAt: string;
  email: string;
}

interface IUserDetails {
  Bio: string;
  Location: string;
}

interface ProfileProps {
  user: IUser;
  userDetails: IUserDetails;
  userBooks: IBook[];
  userFavorites: IBook[];
  userId: string;
  clerkId: string;
  bookCount: number;  // Adding book count prop
  completedListingsCount: number; // Adding completed listings count prop
}

const Profile = ({
  user,
  userDetails,
  userBooks,
  userFavorites,
  userId,
  clerkId,
  bookCount,  // Destructuring book count prop
  completedListingsCount, // Destructuring completed listings count prop
}: ProfileProps) => {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState(user.fullName);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(userDetails.Bio);
  const [location, setLocation] = useState(userDetails.Location);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBooks, setModalBooks] = useState<IBook[]>([]);
  const [lastDismissed, setLastDismissed] = useState<Date | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeMode = JSON.parse(localStorage.getItem("activeMode") || "false");
      setIsActive(activeMode);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const now = new Date();

    if (lastDismissed) {
      const daysSinceDismissed = Math.floor(
        (now.getTime() - lastDismissed.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceDismissed < 7) return; // Don't open the modal if it has been dismissed within the last 7 days
    }

    const shouldOpenModal = userBooks.some((book) => {
      const daysPosted = daysSincePosted(new Date(book.postedAt));
      return daysPosted % 7 === 0; 
    });

    if (shouldOpenModal) {
      setModalBooks(
        userBooks.filter((book) => {
          const daysPosted = daysSincePosted(new Date(book.postedAt));
          return daysPosted % 7 === 0;  
        })
      );
      openModal();
    }
  }, [userBooks, lastDismissed]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleNotSold = () => {
    setLastDismissed(new Date());
    setIsModalOpen(false);
  };

  const handleToggle = () => {
    setIsActive((prevState: any) => {
      const newState = !prevState;
      localStorage.setItem("activeMode", JSON.stringify(newState));
      return newState;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
  
    const updatedProfile = {
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1] || "",
      username: username,
      bio: bio,
      location: location,
    };
  
    try {
      const updatedUser = await updateUserInClerkAndDB(
        userId,
        clerkId,
        updatedProfile
      );
      console.log("Profile updated successfully");
  
      // Update local state with the updated profile data
      setName(updatedUser.firstName + " " + updatedUser.lastName);
      setUsername(updatedUser.username);
      setBio(updatedUser.bio);
      setLocation(updatedUser.location);
  
      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setUpdateError("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg">
      {/* Profile and User Details section */}
      <div className="flex items-start w-full">
        {/* Profile section */}
        <div className="flex max-sm:flex-col items-center justify-center bg-[#D6DAEA] w-full h-[497px] left-0 top-[113px] gap-2 px-2">
          <div className="flex flex-col justify-center items-center lg:mr-[30px] lg:mt-8">
            <div className="relative w-36 h-36 md:w-[118px] md:h-[127px] lg:w-[346px] lg:h-[321px]">
              <Image
                src={user.imageUrl || "/assets/images/profile-icon.png"}
                alt="Profile Picture"
                className="rounded-full"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <p
              className="text-xl md:text-[35px] font-semibold mt-3 lg:mt-[30px]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {user.fullName}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#081F5C] opacity-[80%] text-white max-sm:px-8 px-12 py-3 rounded-md"
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
                    Make changes to your profile here. Click save when you&apos;re done.
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
                  <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Saving..." : "Save changes"}
                    </Button>
                  </DialogFooter>
                </form>
                {updateError && <p className="text-red-500">{updateError}</p>}
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
        {/* User details section */}
        <div
          className="max-w-full flex flex-col gap-2 mx-2 mt-20 lg:mr-10"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <div>
            <p className="text-[#000000]" style={{ fontSize: 25 }}>
              Username
            </p>
            <p className="text-[#081F5C] opacity-[60%]" style={{ fontSize: 20 }}>
              {username}
            </p>
          </div>
          <div>
            <p className="text-[#000000]" style={{ fontSize: 25 }}>
              Bio
            </p>
            <p className="text-[#081F5C] opacity-[60%]" style={{ fontSize: 20 }}>
              {bio}
            </p>
          </div>
          <div>
            <p className="text-[#000000]" style={{ fontSize: 25 }}>
              Location
            </p>
            <p className="text-[#081F5C] opacity-[60%]" style={{ fontSize: 20 }}>
              {location}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 25 }}>Status</p>
            <div className="flex items-center space-x-2">
              <Switch
                id="active-mode"
                checked={isActive}
                onChange={handleToggle}
              />
              <Label htmlFor="active-mode">Active</Label>
            </div>
          </div>
        </div>
      </div>

      {/* User Books Section */}
      <div>
        {userBooks.length > 0 ? (
          <Collection
            collection_type="My Listings"
            books={userBooks}
            userId={userId}
            isProfilePage={true} // Pass isProfilePage as true
          />
        ) : (
          <NoActiveListings />
        )}
      </div>

      {/* Favorite Books Section */}
      <div>
        {userFavorites.length > 0 ? (
          <Collection
            collection_type="My Favorite Books"
            books={userFavorites}
            userId={clerkId}
          />
        ) : (
          <p className="text-gray-600">You have no favorite books listed.</p>
        )}
      </div>

      {/* Stats section */}
      <div className="flex justify-between px-4 py-4 bg-[#081F5C] mt-5">
        <div>
          <p className="text-white">Listings Completed</p>
          <p className="text-white font-semibold text-l">{completedListingsCount}</p>
        </div>
        <div>
          <p className="text-white">Ongoing Listings</p>
          <p className="text-white font-semibold text-l">{bookCount}</p>
        </div>
        <div>
          <p className="text-white">Joined ScholarStack</p>
          <p className="text-white font-semibold text-l">
            {formatDate(user.joinedAt)}
          </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        books={modalBooks}
        userId={userId}
        handleNotSold={handleNotSold}
      />
    </div>
  );
};

export default Profile;
