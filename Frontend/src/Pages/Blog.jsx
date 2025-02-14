import React from "react";
import { ArrowRight, Clock, User } from "lucide-react";
import pic from "/public/images/Galle.webp";

const blogPosts = [
  {
    id: 1,
    title: "A Review Of Cars With Advanced Infotainment Systems",
    author: "Dusten",
    date: "Jan 6, 2024",
    readTime: "3 Min Read",
    imageUrl: pic,
    description:
      "Lorem ipsum dolor sit amet consectetur. Risus quis diam hendrerit...",
  },
  {
    id: 2,
    title: "A Review Of Cars With Advanced Infotainment Systems",
    author: "Dusten",
    date: "Jan 6, 2024",
    readTime: "3 Min Read",
    imageUrl: pic,
    description:
      "Lorem ipsum dolor sit amet consectetur. Risus quis diam hendrerit...",
  },
  {
    id: 3,
    title: "A Review Of Cars With Advanced Infotainment Systems",
    author: "Dusten",
    date: "Jan 6, 2024",
    readTime: "3 Min Read",
    imageUrl: pic,
    description:
      "Lorem ipsum dolor sit amet consectetur. Risus quis diam hendrerit...",
  },
  {
    id: 4,
    title: "A Review Of Cars With Advanced Infotainment Systems",
    author: "Dusten",
    date: "Jan 6, 2024",
    readTime: "3 Min Read",
    imageUrl: pic,
    description:
      "Lorem ipsum dolor sit amet consectetur. Risus quis diam hendrerit...",
  },
];

function Blog() {
  return (
    <div className=" text-white min-h-screen mt-16 relative py-10">
      {/* Header Section */}
      <header className="py-16 px-6 text-center bg-gray-800 ">
        <h1 className="text-4xl font-bold">Your Journey<br />Your Car<br />Your Way</h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet consectetur. Diam volutpat morbi elementum vel euismod aliquam.
        </p>
        <button className="mt-6 bg-red-500 px-6 py-3 rounded-lg flex items-center mx-auto hover:bg-red-600 transition-all">
          Subscribe
          <ArrowRight className="ml-2" />
        </button>
      </header>

      {/* Blog Section */}
      <div className="w-full min-w-[10vw] ">
        <h2 className="text-3xl font-bold mb-8">All posts</h2>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex bg-white text-black rounded-lg shadow-md overflow-hidden">
              <img src={post.imageUrl} alt={post.title} className="w-1/3 object-cover" />
              <div className="p-6 flex flex-col justify-between w-2/3">
                <div>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm my-2">
                    <User size={16} className="mr-1" /> {post.author} &nbsp;•&nbsp;
                    <Clock size={16} className="mr-1" /> {post.date} &nbsp;•&nbsp;
                    {post.readTime}
                  </div>
                  <p className="text-gray-600">{post.description}</p>
                </div>
                <button className="mt-4 w-[8vw] bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all">
                  Read full article...
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
