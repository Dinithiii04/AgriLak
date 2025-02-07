import Image from 'next/image';

export function ExpertTeam() {
  const team = [
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      name: "Dilshan Kavishka Indigahawela",
      role: "Paddy Yield Prediction",
    },
    {
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      name: "Binara Mendis",
      role: "Paddy Disease Detection",
    },
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      name: "TRV Fernando",
      role: "Fertilizer Recommendation System",
    },
    {
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      name: "CADM Anthony",
      role: "Irrigation Management",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Meet Our Expert Team</h2>
          <p className="text-gray-600">Our dedicated researchers developing AI-driven solutions for smart paddy farming.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Rounded Image */}
              <div className="w-48 h-48 overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Name & Role */}
              <h3 className="text-xl font-semibold mt-4 text-green-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
