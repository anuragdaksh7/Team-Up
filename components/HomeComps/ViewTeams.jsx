"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";


function TeamButtonComponent(props) {
    return (

        <AccordionContent>
            <Button variant="ghost" asChild className="w-full px-2">
            <Link
                href={"/Teams/" + props.id}
                className=""
            >
                {props.name}
            </Link>
            </Button>
        </AccordionContent>
    )
}


export default function ViewTeams() {
    const [userTeams, setUserTeams] = useState(Array());
    const getTeams = async () => {
        const response = await axios.get("/api/v1/getTeams");
        const data = await response.data;
        const newData = data.reverse();
        setUserTeams(newData);
        // console.log(data, userTeams);
    }
    useEffect(() => {
        getTeams();
    }, [])

    return (
        <div className=" mt-6 font-semibold w-full outline-none rounded-md ">

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>All Teams</AccordionTrigger>
                    <>
                        {
                            (userTeams.length >= 1) ? userTeams.map((item, index) => {
                                return (
                                    <TeamButtonComponent id={item._id} name={item.teamName} desc={item.teamDesc} key={index} />
                                )
                            }) : <></>
                        }

                    </>
                </AccordionItem>
            </Accordion>


        </div>
    )
}