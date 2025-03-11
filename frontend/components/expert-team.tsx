import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // Ensure correct import path

type TeamMember = {
  image: string;
  name: string;
  role: string;
  description: string;
  motivations: string[];
  goals: string[];
  painPoints: string[];
};

export function ExpertTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const open = Boolean(selectedMember); // Convert selectedMember to a boolean

  const team: TeamMember[] = [
    {
      image: "images/ranu.png",
      name: "Ranudee Fernando",
      role: "Paddy Yield Prediction",
      description: "Expert in AI-driven yield prediction, leveraging machine learning models to enhance productivity.",
      motivations: ["Improving efficiency", "Sustainable farming", "AI-driven predictions"],
      goals: ["Enhance crop yield predictions", "Develop AI models for better forecasting", "Help farmers maximize productivity"],
      painPoints: ["Limited access to high-quality training data", "Complexity of integrating AI into farming systems"],
    },
    {
      image: "images/3.png",
      name: "Dilshan Indigahawela",
      role: "Paddy Disease Detection",
      description: "Specialist in plant disease detection using computer vision and deep learning models.",
      motivations: ["Precision agriculture", "Early disease detection", "AI for farming"],
      goals: ["Detect plant diseases with AI", "Reduce crop loss through early intervention", "Integrate deep learning models into farming solutions"],
      painPoints: ["High variability in disease symptoms", "Lack of labeled datasets for training models"],
    },
    {
      image: "images/4.png",
      name: "Dinithi Anthony",
      role: "Fertilizer Recommendation System",
      description: "Researcher focusing on AI-powered fertilizer optimization for sustainable farming.",
      motivations: ["Sustainable soil management", "Efficient fertilizer use", "AI in agriculture"],
      goals: ["Optimize fertilizer recommendations", "Improve soil health through AI-driven suggestions", "Help farmers reduce excess fertilizer usage"],
      painPoints: ["Variability in soil compositions", "Difficulty in real-time analysis"],
    },
    {
      image: "images/1.png",
      name: "Binara Mendis",
      role: "Irrigation Management",
      description: "Expert in AI-based irrigation management, optimizing water usage efficiently.",
      motivations: ["Water conservation", "Efficient irrigation", "AI-based water management"],
      goals: ["Develop AI models for irrigation scheduling", "Reduce water wastage in agriculture", "Improve irrigation efficiency for farmers"],
      painPoints: ["Limited real-time water data", "Challenges in adapting AI to different soil conditions"],
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Meet Our Expert Team</h2>
          <p className="text-gray-600">Our dedicated researchers developing AI-driven solutions for smart paddy farming.</p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="w-48 h-48 overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-green-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Modal with Dialog */}
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && setSelectedMember(null)}>
          <DialogContent className="p-6 rounded-xl shadow-lg text-center bg-white max-h-[80vh] overflow-y-auto">
            {selectedMember && (
              <>
                <DialogTitle className="text-2xl font-semibold text-green-900">{selectedMember.name}</DialogTitle>
                <DialogDescription className="text-gray-600">{selectedMember.role}</DialogDescription>

                {/* Profile Image */}
                <div className="w-32 h-32 mx-auto overflow-hidden rounded-full shadow-md">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="mt-2 text-gray-700">{selectedMember.description}</p>

                {/* Motivations */}
                <div className="mt-4 text-left">
                  <h4 className="font-semibold text-green-800">Motivations</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedMember.motivations.map((motivation, idx) => (
                      <li key={idx}>{motivation}</li>
                    ))}
                  </ul>

                  {/* Goals */}
                  <h4 className="mt-3 font-semibold text-green-800">Goals</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedMember.goals.map((goal, idx) => (
                      <li key={idx}>{goal}</li>
                    ))}
                  </ul>

                  {/* Pain Points */}
                  <h4 className="mt-3 font-semibold text-green-800">Pain Points</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedMember.painPoints.map((pain, idx) => (
                      <li key={idx}>{pain}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
