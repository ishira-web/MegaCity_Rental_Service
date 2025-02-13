import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      faqRefs.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  const faqs = [
    {
      question: "What services does Mega City Cabservice offer?",
      answer:
        "We provide city-wide taxi services, airport transfers, and outstation travel options at affordable rates.",
    },
    {
      question: "How can I book a cab?",
      answer:
        "You can book a cab through our website, mobile app, or by calling our hotline.",
    },
    {
      question: "Are your drivers licensed and experienced?",
      answer:
        "Yes, all our drivers are licensed and undergo thorough background checks and training.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, credit/debit cards, and online payments through popular platforms.",
    },
    {
      question: "Do you offer 24/7 service?",
      answer: "Yes, our services are available 24/7 for your convenience.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen font-walsheim flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl w-full space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            ref={(el) => (faqRefs.current[index] = el)}
            className="faq-item bg-blue-600 shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <h3 className="text-lg font-semibold text-white">
                {faq.question}
              </h3>
              <ChevronDown
                className={`w-6 h-6 text-slate-200 transition-transform duration-300 ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === index && (
              <p className="text-slate-400 mt-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
