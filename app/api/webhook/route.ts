import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    console.log('Webhook POST function called');
  
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
    console.log('WEBHOOK_SECRET:', WEBHOOK_SECRET);
  
    if (!WEBHOOK_SECRET) {
      throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }
  
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");
  
    console.log('Headers:', { svix_id, svix_timestamp, svix_signature });

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  
  if(eventType === 'user.created') {
    const {id, email_addresses, first_name, last_name, username, image_url} = evt.data;

    const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username!,
        firstName: first_name!,
        lastName: last_name!,
        photo: image_url,
    }
    console.log(user);
    const mongoUser = await createUser(user);

    if(mongoUser){
        await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
                userId: mongoUser._id
            }
        })
    }
    return NextResponse.json({ message: 'User created', user: mongoUser})
  }
  if(eventType === 'user.updated') {
    const {id, first_name, last_name, username, image_url} = evt.data;

    const user = {
        username: username!,
        firstName: first_name!,
        lastName: last_name!,
        photo: image_url,
    }
    const updatedUser = await updateUser(id, user);

    return NextResponse.json({ message: 'User updated', user: updatedUser})
  }

  // if(eventType === 'user.deleted') {
  //   const {id} = evt.data;

  //   const deletedUser = await deleteUser({clerkId: id});

  //   return NextResponse.json({ message: 'User deleted', user: deletedUser})
  // }

  return new Response('', { status: 200 })
}