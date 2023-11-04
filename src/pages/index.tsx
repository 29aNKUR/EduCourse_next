import Head from "next/head";
import Hero from "../../components/hero";
import SectionTitle from "../../components/sectionTitle";
import { benefitOne, benefitTwo } from "../../components/data";
import Benefits from "../../components/benefits";
import Testimonials from "../../components/testimonials";
import Faq from "../../components/faq";
// import PopupWidget from "../../components/popupWidget";

const Home = () => {
  return (
    <>
      <Head>
        <title>EduCouse - Learn Anything on your schedule</title>
        <meta
          name="description"
          content="EduCourse is a course selling app built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <SectionTitle
        pretitle="EduCourse Benefits"
        title=" Why should you choose us?"
      >
        Whether you're looking to enhance your career, explore new hobbies, or
        further your education, EduCourse offers a diverse range of high-quality
        courses that you can access anytime, anywhere. With user-friendly
        features, personalized recommendations, and a supportive learning
        community, EduCourse is designed to help you achieve your learning goals
        and unlock your full potential.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      <SectionTitle
        pretitle="Testimonials"
        title="Here's what our Students have to say"
      >
      </SectionTitle>
      <Testimonials />
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
      This section answers frequently asked questions we receive about learning with EduCourse.
      </SectionTitle>
      <Faq />
      {/* <PopupWidget /> */}
    </>
  );
};

export default Home;
