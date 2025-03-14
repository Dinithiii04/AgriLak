"use client";

import { useState } from "react";
import Image from "next/image";

type TeamMember = {
  id: number;
  name: string;
  image: string;
  color: string;
};

const teamMembers: TeamMember[] = [
  { id: 1, name: "Dilshan Indigahawela", image: "/images/1.png", color: "bg-[#142C14]" },
  { id: 2, name: "Ranudee  Fernando ", image: "/images/3.png", color: "bg-[#2D5128]" },
  { id: 3, name: "Dinithi  Anthony", image: "/images/4.png", color: "bg-[#537B2F]" },
  { id: 4, name: "Binara  Mendis", image: "/images/8.png", color: "bg-[#8DA750]" },
];

export default function ExpertTeam() {
  return (
    <div className="container mx-auto px-6 py-16 bg-[#F5F5F5]">
      {/* Heading & Description */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Left Side: Text Content */}
        <div className="md:w-1/2 border-l-4 border-[#142C14] pl-6">
          <h2 className="text-4xl font-bold text-[#142C14] mb-4">Meet Our Expert Team</h2>
          <p className="text-lg font-medium text-gray-700">
            Our expert team consists of professionals with years of experience in their fields. 
            Each member brings unique skills and knowledge to ensure we provide the best service to our clients.
          </p>
        </div>

        {/* Right Side: Team Members */}
        <div className="md:w-1/2 flex justify-end">
          <div className="flex">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className={`relative h-[380px] w-[160px] ${member.color} flex flex-col items-center justify-end rounded-lg transition-transform hover:scale-105`}
              >
                {/* Member Name (Top Right, Vertical) */}
                <div className="absolute top-16 right-2 text-white font-bold text-sm rotate-90 writing-vertical-l">
                  {member.name}
                </div>

                {/* Member Image */}
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={140}
                  height={140}
                  className="object-contain mb-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
