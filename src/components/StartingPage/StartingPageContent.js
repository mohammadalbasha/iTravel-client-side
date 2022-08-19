import HowItWorks from "./Sections/HowItWorks";
import DownloadApp from "./Sections/DownloadApp";
import AboutUs from "../AboutUs/AboutUs";
import Footer from "../Layout/Footer";
import Launcher from "./Launcher/Launcher";
import SignUp from "../Auth/SignUp";

const StartingPageContent = () => {
  return (
    <>
      <Launcher/>
      <HowItWorks/>
      <AboutUs />
      <DownloadApp/>
      <SignUp />
      <Footer />
    </>
  );
};

export default StartingPageContent;
