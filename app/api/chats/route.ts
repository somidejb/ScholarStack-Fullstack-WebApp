import { connectToDatabase } from "@/lib/mongodb/database"
import Chat from "@/lib/mongodb/database/models/chat";
import User from "@/lib/mongodb/database/models/user.model";

export const POST = async (req:Request) =>{
    try{
        await connectToDatabase();

            const body = await req.json();
            const { currentUserId, members, firstName } = body;

        //for finding user in chat
        const query = {members: {$all:[currentUserId, ...members], $size: 2}}
        
        let chat = await Chat.findOne(query)
//for creating a new chat

        if(!chat){
            
                const updateAllMembers = chat.members.map( async () => {
                    await User.findByIdAndUpdate(
                        {
                            $addToSet: { chats: chat._id},
                        },
                        {new: true}
                    );
                })
                Promise.all(updateAllMembers)
            
        }
        
    
    
    }
    catch (err){

    }
}