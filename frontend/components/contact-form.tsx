"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-green-800 text-white font-bold text-lg rounded-md hover:bg-green-700 transition-colors"
              >
                SUBMIT
              </button>
            </form>
          </div>

          <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Get In Touch</h2>
          <p className="text-gray-600">We are here to help you! How can we assist?</p>
        

          <div className="space-y-8">
            <div className="relative h-80 md:h-96">
              <Image
                src="/images/contact.png"
                alt="Customer support illustration"
                fill
                className="object-contain"
                priority
              />
            </div>

          </div>
          </div>
        </div>

        <div className="mt-12 w-full h-[400px] rounded-md overflow-hidden shadow-md">
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63316.82736592769!2d79.82177092655326!3d6.927076871872128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591f5b36a21f%3A0x9e7a6a96fba8b74!2s10%20Trelawney%20Pl%2C%20Colombo%2000400!5e0!3m2!1sen!2slk!4v1710368248573!5m2!1sen!2slk"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        />
        </div>
      </div>
    </section>
  );
}
