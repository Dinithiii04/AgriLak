'use client'
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Stats } from '@/components/stats';
import { Categories } from '@/components/categories';
import { AboutGardening } from '@/components/about-gardening';
import { CareServices } from '@/components/care-services';
import { AboutSection } from '@/components/gardening-services';
import { ExpertTeam } from '@/components/expert-team';
import { BlogSection } from '@/components/blog-section';
import { useEffect, useState } from 'react';
import GifLoader from '@/components/loader';

export default function Home() {  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <GifLoader />
  }
  return (
    <div className="w-full">
      <Hero />
      <Services />
      <Stats />
      <CareServices />
      <AboutSection />
      <ExpertTeam />
    </div>
  );
}