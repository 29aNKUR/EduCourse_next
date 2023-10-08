import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "How do I get started?",
    answer:
      "To get started, simply create an account on our platform. Once registered, you can browse our course catalog, select the courses that interest you, and enroll in them. You can start learning immediately.",
  },
  {
    question: " Are the courses on EduCourse self-paced?",
    answer:
      "Yes, most of our courses are self-paced, allowing you to learn at your own speed and convenience. However, some courses may have set schedules or deadlines for assignments and assessments.",
  },
  {
    question: "How long do I have access to a course after enrolling? ",
    answer:
      "You have lifetime access to the course materials after enrolling. You can revisit the content and resources whenever you like, even after you've completed the course.",
  },
  {
    question: "Do I receive a certificate upon course completion?",
    answer:
      "Yes, you will receive a certificate of completion for each course you successfully finish. Our certificates are recognized and can be added to your resume or LinkedIn profile to showcase your achievements. ",
  },
];

export default Faq;
