import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I get started with your product?",
    answer:
      "Sign up on our website, explore features, customize your profile, and start using our product. We're here to help!",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. Contact us for enterprise billing options.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required.",
  },
  {
    question: "Is technical support included?",
    answer: "Yes, all plans include technical support via email and chat during business hours.",
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time from your account settings.",
  },
  {
    question: "Is my data secure with your product?",
    answer: "Yes, we use industry-standard encryption and security measures to protect your data.",
  },
]

export default function FAQSection() {
  return (
    <section className="container mx-auto py-16 bg-[#F8F9FF] px-20">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-4xl font-bold text-[#0A4B3C] mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 leading-relaxed">
            For any unanswered questions, reach out to our support team via email. We&apos;ll respond as soon as possible to
            assist you.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-0">
              <AccordionTrigger className="text-[#0A4B3C] hover:no-underline py-6 text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

