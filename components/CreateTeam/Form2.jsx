"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { useState } from "react"
import { Input } from "../ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"


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
    const [teamName, setTeamName] = useState("");
    const [teamDesc, setTeamDesc] = useState("");

    function onSubmit(values) {
        console.log(values)
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
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="teamName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="team Name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
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
                                        <Input placeholder="team Desc" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
