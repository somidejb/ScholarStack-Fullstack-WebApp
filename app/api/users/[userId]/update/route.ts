import { connectToDatabase } from "@/lib/mongodb/database";
import User from "@/lib/mongodb/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";


interface Params {
  params: {
    userId: string;
  };
}

export const POST = async (req: NextRequest, { params }: Params): Promise<NextResponse> => {
  try {
    await connectToDatabase();
    const { userId } = params;
    const body = await req.json();
    const { username, profileImage } = body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        profileImage,
      },
      { new: true }
    );

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("User not updated", { status: 500 });
  }
};
