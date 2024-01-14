import LeftNavDesktop from "@/components/HomeComps/LeftNav-DesktopView";
import Nav from "@/components/Nav";

export default function Page () {
    return (
        <div>
            <Nav route="home" />
            <div className="h-screen">
                <LeftNavDesktop />
            </div>
        </div>
    )
}