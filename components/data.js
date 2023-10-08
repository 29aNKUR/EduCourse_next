import {
  AcademicCapIcon,
  UserGroupIcon,
  PencilSquareIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../public/img/benefit-one.png";
import benefitTwoImg from "../public/img/benefit-two.png";

const benefitOne = {
  title: "Features We Offer",
  desc: "With a rich catalog of courses spanning diverse subjects and industries, EduCourse connects learners with expert instructors and cutting-edge content. Key features include:",
  image: benefitOneImg,
  bullets: [
    {
      title: "Diverse Course Selection",
      desc: " Explore a vast library of courses, from academic subjects to professional skills and hobbies.",
      icon: <AcademicCapIcon />,
    },
    {
      title: "Expert Instructors",
      desc: "Learn from industry professionals, experienced educators, and subject matter experts.",
      icon: <UserGroupIcon />,
    },
    {
      title: "Personalized Learning",
      desc: "Receive tailored course recommendations based on your interests and goals.",
      icon: <PencilSquareIcon />,
    },
  ],
};

const benefitTwo = {
  title: "More Features...",
  desc: "Additional benefits that EduCourse offers to learners:",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Certifications",
      desc: "Showcase your skills with recognized certificates for your resume or portfolio.",
      icon: <ClipboardDocumentCheckIcon />,
    },
    {
      title: "Lifetime Access",
      desc: "Once you enroll in a course, you have lifetime access to the course materials and updates.",
      icon: <ClockIcon />,
    },
    {
      title: "Continuous Updates",
      desc: "Courses are regularly updated to reflect the latest trends and developments in various industries, ensuring that your knowledge stays current and relevant.",
      icon: <ViewfinderCircleIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
