import Image from 'next/image';

export function Testimonial() {
  return (
    <section className="py-16 bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-8">372+</h2>
            <p className="text-xl mb-6">
              On the other hand we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure.
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="William M. Jones"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h4 className="font-semibold">William M. Jones</h4>
                <p className="text-gray-300">CEO & Founder</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae"
              alt="Garden"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}