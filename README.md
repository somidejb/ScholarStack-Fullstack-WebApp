📚 Scholar Stack
Scholar Stack is a full-stack platform designed to help students buy and sell books effortlessly! Whether you're looking for textbooks, novels, or study materials, Scholar Stack connects buyers and sellers in a seamless, user-friendly way.

🌟 Key Features

Homepage: Browse through popular books and discover new finds.
Books Page: Search and filter books by price, category, and language. 🎯
Upload Book Page: Sell your own books with a simple upload process. 📤
Chats Page: Message sellers directly for quick and easy transactions. 💬
Profile Page: Manage your account, see your listings, and more! 🧑‍💼
Admin Page: Admins can accept or reject book uploads to maintain platform quality. 🛠️

🚀 Technologies Used

Frontend: Next.js – for a fast, scalable, and dynamic UI.
Backend: Node.js – powering the server-side logic.
Database: MongoDB – a flexible NoSQL database.
UI Components: Shadcn – for a smooth and accessible user interface.
Authentication: Clerk – handling secure and user-friendly authentication.
Real-time Communication: Pusher – enabling instant messaging between users.
File Uploads: UploadThing – making file uploads a breeze.

📖 How It Works

Browse Books: Explore the extensive collection of books through the intuitive search and filter system.
Upload Books: List your books for sale with just a few clicks, and they’ll be visible to potential buyers after admin approval.
Chat with Sellers: Have questions or want to negotiate? Start a conversation directly on the platform.
Admin Control: Maintain the quality of listings through the admin dashboard where books can be accepted or rejected.

🛠️ Installation & Setup
Follow these steps to get Scholar Stack up and running on your local machine:

1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/scholar-stack.git
cd scholar-stack
2. Install Dependencies
bash
Copy code
npm install
3. Set Up Environment Variables
Create a .env.local file and add the following environment variables:

bash
Copy code
MONGODB_URI=<your-mongodb-uri>
CLERK_SECRET_KEY=<your-clerk-secret-key>
PUSHER_APP_ID=<your-pusher-app-id>
PUSHER_KEY=<your-pusher-key>
PUSHER_SECRET=<your-pusher-secret>
4. Run the Application
bash
Copy code
npm run dev
The app will now be running at http://localhost:3000.

🛡️ Security
Authentication is powered by Clerk, ensuring safe and secure login for all users.
Real-time messages are encrypted and sent using Pusher, ensuring secure communication.
Admin moderation keeps the platform's quality high.

📷 Screenshots
✨ Homepage
Browse top books and discover new ones!

✨ Books Page
Find your desired books using our powerful search and filters.

✨ Upload Book
Selling a book? Upload it easily with our intuitive form.

✨ Chats
Message the sellers directly through the platform.

🤝 Contribution
Contributions are welcome! If you have any ideas or find a bug, feel free to submit an issue or a pull request.

⚡ Scholar Stack – Empowering students with affordable learning materials!
