import Image from "next/image";
import { SetStateAction, useState } from "react";
import { Leaf, Plus, Minus } from "lucide-react";

export function AboutSection() {
  const faqs = [
    {
      question: "What is AI-Driven Smart Paddy Farming?",
      answer: "AI-driven smart paddy farming integrates artificial intelligence to optimize irrigation, predict yields, and monitor pest outbreaks in real time."
    },
    {
      question: "How does AI help in sustainable agriculture?",
      answer: "AI helps by analyzing weather patterns, soil conditions, and crop health to provide actionable insights that improve sustainability and efficiency."
    },
    {
      question: "Can AI reduce water usage in paddy farming?",
      answer: "Yes, AI-powered irrigation optimization ensures that water is used efficiently, reducing waste and improving crop yield."
    },
    {
      question: "How accurate are AI predictions in farming?",
      answer: "AI predictions are based on historical data, satellite imagery, and real-time monitoring, making them highly accurate in forecasting yield and detecting issues early."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

const toggleFAQ = (index: number) => {
  setOpenIndex(openIndex === index ? null : index);
};

  

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        {/* Left: Image */}
        <div className="lg:w-1/2 relative">
          <div className="relative w-full h-[643px]">
            <Image
              src="/images/hero.png"
              alt="Smart Paddy Farming"
              layout="fill"
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right: FAQ Section */}
        <div className="lg:w-1/2 lg:pl-12 mt-10 lg:mt-0">
          <h3 className="text-green-800 font-semibold flex items-center mb-2">
            <Leaf className="w-6 h-6 mr-2" /> Smart Paddy Farming FAQs
          </h3>
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            AI-Driven Solutions for Sustainable Agriculture
          </h2>
          <p className="text-gray-600 mb-6">
            Find answers to common questions about AI in agriculture and how it enhances sustainability.
          </p>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center bg-green-900 text-white font-semibold p-4"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? <Minus /> : <Plus />}
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-gray-100 text-gray-800">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
