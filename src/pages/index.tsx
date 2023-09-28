// import Home from './home'

// const index = () => {
//   return (
//     <div>

//       <Home/>
//     </div>
//   )
// }

// export default index

import Head from "next/head";
import Hero from "../../components/hero";
import Navbar from "../../components/navbar";
import SectionTitle from "../../components/sectionTitle";
import { benefitOne, benefitTwo } from "../../components/data";
import Video from "../../components/video";
import Benefits from "../../components/benefits";
import Footer from "../../components/footer";
import Testimonials from "../../components/testimonials";
import Cta from "../../components/cta";
import Faq from "../../components/faq";
import PopupWidget from "../../components/popupWidget";

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

      <Navbar />
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
      {/* <SectionTitle
        pretitle="Watch a video"
        title="Learn how to fullfil your needs"
      >
        This section is to highlight a promo or demo video of your product.
        Analysts says a landing page with video has 3% more conversion rate. So,
        don&apos;t forget to add one. Just like this.
      </SectionTitle>
      <Video /> */}
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
      {/* <Cta /> */}
      <Footer />
      <PopupWidget />
    </>
  );
};

export default Home;
