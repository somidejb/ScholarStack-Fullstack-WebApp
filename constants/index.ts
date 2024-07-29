import { Label } from "@radix-ui/react-label";

export const headerLinks = [
      {
        label: 'Home',
        route: '/'
      },
      {
        label: 'Books',
        route: '/books'
      },
      {
        label: 'UploadBook',
        route: '/books/upload'
      },
      {
        label: 'Profile',
        route: '/profile'
      },
      {
        label: 'Chats',
        route: '/chats'
      },
      {
        label: 'Admin',
        route: '/admin'
      },
]

export const books = [
    {
        id: 1,
        title: "Author your life",
        author: "David McCrae",
        price: "14.50",
        image: "/assets/images/book1.png",
        condition: "Good",
        description: "A comprehensive introduction to computer science concepts and programming.",
        category: "Recently Uploaded"
    },
    {
        id: 2,
        title: "Technology Programming",
        author: "Davidd Lesiw",
        price: "10.00",
        image: "/assets/images/book2.png",
        condition: "Like New",
        description: "This textbook offers a clear and engaging introduction to physics principles with practical applications.",
    },
    {
        id: 3,
        title: "Prisoner",
        author: "Arthur Miller",
        price: "15.49",
        image: "/assets/images/book3.png",
        condition: "Acceptable",
        description: "An essential textbook covering the core principles of chemistry for students.",
        category: "free"
    },
    {
        id: 4,
        title: "Technology Programming",
        author: "David Lesiw",
        price: "10.00",
        image: "/assets/images/book2.png",
        condition: "Very Good",
        description: "Explore the fascinating world of biology with clear explanations and interactive features.",
    },
    {
        id: 5,
        title: "Learning JavaScript",
        author: "Mark Ethan",
        price: "Free",
        image: "/assets/images/book1.png",
        condition: "Good",
        description: "A beginner's guide to JavaScript programming with practical examples.",
    },
    {
        id: 6,
        title: "Python for Everyone",
        author: "Anna Scott",
        price: "Free",
        image: "/assets/images/book2.png",
        condition: "Like New",
        description: "An in-depth look at Python programming with real-world applications.",
    },
    {
        id: 7,
        title: "Data Structures and Algorithms",
        author: "John Doe",
        price: "25.00",
        image: "/assets/images/book3.png",
        condition: "Good",
        description: "Detailed explanations of data structures and algorithms for software development.",
    },
    {
        id: 8,
        title: "Advanced CSS Techniques",
        author: "Jane Smith",
        price: "18.75",
        image: "/assets/images/book1.png",
        condition: "Like New",
        description: "Master advanced CSS techniques for creating responsive and modern web designs.",
    },
    {
        id: 9,
        title: "Machine Learning Basics",
        author: "Emily Johnson",
        price: "22.99",
        image: "/assets/images/book2.png",
        condition: "Very Good",
        description: "An introductory guide to machine learning concepts and applications.",
    },
    {
        id: 10,
        title: "Deep Learning with Python",
        author: "Michael Brown",
        price: "30.00",
        image: "/assets/images/book3.png",
        condition: "Excellent",
        description: "Comprehensive coverage of deep learning techniques using Python.",
    }
];

export const sampleMessages = 
  {
    "David Carlson": [
      { sender: "David Carlson", content: "Hey, How are you?", avatar: "/assets/images/p1.png" },
    ],
    "Lily Bloom": [
      { sender: "Lily Bloom", content: "You in Sunridge, right?", avatar: "/assets/images/p5.png" },
    ],
    "Josh Seary": [
      { sender: "Josh Seary", content: "Hey, we meeting tmrw for book...", avatar: "/assets/images/p2.png" },
    ],
    "Chris Brown": [
      { sender: "Chris Brown", content: "Hey, so when did u bought this...", avatar: "/assets/images/p3.png" },
    ],
    "Lei Wong": [
      { sender: "Lei Wong", content: "I would love to buy this book", avatar: "/assets/images/p4.png" },
    ],
  };

export const chatsContacts = 
[
  { 
    name: "David Carlson", 
    message: "Hey, How are you?", 
    time: "3:20PM", 
    avatar: "assets/images/p1.png", 
    isOpened: false 
  },
  { name: "Lily Bloom", 
    message: "You in Sunridge, right?", 
    time: "9:20PM", 
    avatar: "assets/images/p5.png", 
    isOpened: false 
  },
  {
    name: "Josh Seary",
    message: "Hey, we meeting tmrw for book...",
    time: "3:29PM",
    avatar: "assets/images/p2.png",
    isOpened: false,
  },
  {
    name: "Chris Brown",
    message: "Hey, so when did u bought this...",
    time: "8:00PM",
    avatar: "assets/images/p3.png",
    isOpened: false,
  },
  {
    name: "Lei Wong",
    message: "I would love to buy this book",
    time: "11:20AM",
    avatar: "assets/images/p4.png",
    isOpened: false,
  },
];
  
export const bookDefaultValues = {
    title: "",
    author: "",
    description: "",
    imageURLs: [],
    categoryId: "",
    languageId: "",
    isBookFree: false,
    price: "0",
    salePrice: "",
    location: "",
}

export const prices = [
  {
    label: 'Free',
    value: 'free'
  },
  {
    label: '$5 - $10',
    value: '5to10'
  },
  {
    label: '$10 - $25',
    value: '10to25'
  },
  {
    label: '$25 - $50',
    value: '25to50'
  },
  {
    label: 'Above $50',
    value: 'above50'
  }
];