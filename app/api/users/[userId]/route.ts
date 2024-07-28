import { connectToDatabase } from "@/lib/mongodb/database";
//import Chat from "@/lib/mongodb/database/models/chat";
import Chat from "@/lib/mongodb/database/models/chat.model";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/lib/mongodb/database/models/user.model";



export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        await connectToDatabase();
        const { userId } = req.query;
        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ message: 'Invalid user ID' });
          }
        
          const allChats = await Chat.find({members: userId})
          .sort({ lastMessageAt: -1})
          .populate({path: "members",
            model: User
          } ). exec();

          return new Response(JSON.stringify(allChats), { status: 200})
            
    }
    catch(err) {
        console.log(err);
        return new Response("failed to load chat", {status: 500})
    }
}



