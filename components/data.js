import {
  AcademicCapIcon,
  UserGroupIcon,
  PencilSquareIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
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
      icon: <  AcademicCapIcon />,
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
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by latest technologies and tools.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };


