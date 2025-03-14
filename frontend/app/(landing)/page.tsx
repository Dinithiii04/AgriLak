'use client'
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Stats } from '@/components/stats';
import { CareServices } from '@/components/care-services';
import { FaQSection } from '@/components/faq';

import { useEffect, useState } from 'react';
import GifLoader from '@/components/loader';
import ChatWidget from '@/components/chat-widget';
import ExpertTeam from '@/components/expert-team';
import ContactForm from '@/components/contact-form';

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
      <ChatWidget/>
      <FaQSection/>
      <ExpertTeam />
      <ContactForm/>
    </div>
  );
}