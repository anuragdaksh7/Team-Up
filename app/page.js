import LandingPage1 from "@/components/LandingPageComps/LandingPage1";
import LandingPage2 from "@/components/LandingPageComps/LandingPage2";
import LandingPage3 from "@/components/LandingPageComps/LandingPage3";
import LandingPage4 from "@/components/LandingPageComps/LandingPage4";
import LandingPage5 from "@/components/LandingPageComps/LandingPage5";
import Nav from "@/components/Nav";


export default function Home() {
  return (
    <div>
      <Nav route="/" />
      <LandingPage1 />
      <LandingPage2 />
      <LandingPage3 />
      <LandingPage4 />
      <LandingPage5 />
    </div>
  )
}
