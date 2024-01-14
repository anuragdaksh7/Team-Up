import { landingPage2consts } from "@/constants/LandingPageConsts"




function GradientCard(props) {
    return (
        <div className=" max-w-[300px] py-3 px-3 rounded-md bg-gradient-to-b from-[#2b2b2b] to-[#121212]">
            <h1 className="font-bold text-xl pb-3">{props.title}</h1>
            <p className=" font-extralight text-lg">{props.desc}</p>
        </div>
    )
}

export default function LandingPage2() {
    return (
        <div id="features" className="h-lvh flex justify-normal sm:justify-start  items-center px-[50px] lg:px-[200px] ">
            <div className="flex flex-col gap-14"> 
                <p className=" text-md md:text-xl font-semibold text-blue-500">FEATURE</p>
                <p className=" text-pretty md:w-[610px] font-bold text-2xl md:text-4xl">Bring your team together with this team collaboration software</p>
                <div className="flex flex-wrap justify-evenly gap-4">
                    {
                        landingPage2consts.map((item, index) => {
                            return (
                                <GradientCard key={index} title={item.title} desc={item.desc} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}