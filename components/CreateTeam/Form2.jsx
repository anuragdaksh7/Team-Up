"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { useState } from "react"
import { Input } from "../ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { useRouter } from "next/navigation"
import axios from "axios"


const formSchema = z.object({
    teamName: z.string().min(7, {
        message: "team name too short"
    }).max(20, {
        message: "team name too long"
    }),
    teamDesc: z.string().min(20, {
        message: "team description too short"
    }).max(50, {
        message: "team description too long"
    }),
})

export function CardWithForm() {
    const router = useRouter();
    const [teamName, setTeamName] = useState("");
    const [teamDesc, setTeamDesc] = useState("");

    const handleSubmit = async (values) => {
        // console.log(values);
        const response = await axios.post("/api/v1/createTeam", values);
        const data = await response.data;
        if (data.success) {
            router.push("/home")
        }
        console.log(data.success);
    }

    function onSubmit(values) {
        handleSubmit(values);
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teamName: teamName,
            teamDesc: teamDesc,
        },
    });
    return (
        <div className="flex justify-center items-center h-[85lvh]">
            <Card className="w-[350px]">

                <CardHeader>
                    <CardTitle>Create Team</CardTitle>
                    <CardDescription>Creat your new Team in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="teamName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Team Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Team Name"
                                                value={teamName}
                                                onChange={
                                                    (e)=>{
                                                        setTeamName(e.target.value)
                                                    }
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="teamDesc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Team Desc</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Team Desciption"
                                                value={teamDesc}
                                                 onChange={
                                                    (e)=>{
                                                        setTeamDesc(e.target.value)
                                                    }
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <CardFooter className="flex justify-between px-0">
                                <Button onClick={
                                    (e) => {
                                        router.push("/home");
                                    }
                                } variant="outline">Cancel</Button>
                                <Button type="submit">Submit</Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
