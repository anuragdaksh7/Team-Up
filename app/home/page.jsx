
import LeftNavDesktop from "@/components/HomeComps/LeftNav-DesktopView";
import MainComponent from "@/components/HomeComps/MainComponent";
import Nav from "@/components/Nav";

export default function Page () {
    return (
        <div>
            <Nav route="home" />
            <div className=" flex">
                <LeftNavDesktop />
                <MainComponent />
            </div>
        </div>
    )
}