import { Leaf, TreePine, Mountain } from 'lucide-react';

export function Categories() {
  const categories = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Garden Maintenance',
      description: 'Professional garden maintenance services',
    },
    {
      icon: <TreePine className="w-8 h-8" />,
      title: 'Garden Clearance',
      description: 'Expert garden clearance solutions',
    },
    {
      icon: <Mountain className="w-8 h-8" />,
      title: 'Landscape Design',
      description: 'Creative landscape design services',
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-green-800 mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}