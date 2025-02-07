"use client";

import Image from 'next/image';
import { Button } from './ui/button';

export function BlogSection() {
  const posts = [
    {
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
      date: "12 December 2023",
      title: "The Art of Garden Design",
      excerpt: "Learn about the principles of garden design and how to create beautiful outdoor spaces.",
    },
    {
      image: "https://images.unsplash.com/photo-1599685315640-9ceab2f58944",
      date: "10 December 2023",
      title: "Sustainable Gardening Practices",
      excerpt: "Discover eco-friendly gardening methods that help protect the environment.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Read Latest News & Blog</h2>
          <p className="text-gray-600">Stay updated with our latest gardening tips and news</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-6">
                <p className="text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Button variant="outline" className="text-green-800 border-green-800">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}