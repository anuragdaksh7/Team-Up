import { landingPage5consts } from "@/constants/LandingPageConsts"

function Card(props) {
    return (
        <div className="w-[280px] h-[200px] flex flex-col justify-center ">
            <div className="flex justify-center py-6">
                <div className="w-[100px] rounded-full h-[100px] bg-[#3A82F7]"></div>
            </div>
            <h1 className="text-center text-lg md:text-2xl font-bold">{props.title}</h1>
        </div>
    )
}

export default function LandingPage5 () {
    return (
        <div className="h-lvh flex justify-normal sm:justify-start  items-center px-[50px] lg:px-[200px] ">
            <div className="w-full">
                <div className=" flex flex-col gap-10">
                <h1 className="w-full text-md md:text-2xl text-[#3A82F7] text-center">HOW IT WORKS</h1>
                <p className="text-xl text-center line-clamp-4 md:text-4xl font-bold text-pretty">Successful projects<br />start with collaboration</p>
                <div className="flex flex-wrap justify-center">
                    {
                        landingPage5consts.map((item,index) => {
                            return (
                                <Card key={index} title={item.title} />
                            )
                        })
                    }
                </div>
                </div>
            </div>
        </div>
    )
}