"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Calendar } from "../ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"


const TaskForm = (props) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());

    const formSchema = z.object({
        title: z.string().min(5, { message: "title too short" }).max(20, { message: "title too long" }),
        date: z.date({
            required_error: "A date is required.",
        }),
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title,
            date: date,
        }
    });

    const handleSubmit = async (values) => {
        console.log(values)
        const tmpDate = new Date(values.date);
        const subDate = tmpDate.toISOString().split("T")[0];
        const payload = {
            title: values.title,
            status: false,
            dueDate: subDate,
            team: props.team_id
        }
        const response = await axios.post("/api/UserControls/CreateTask", payload);
        const data = await response.data;
        if (data.success) {

            toast("Task Created Successfully", {
                description: "status: OK",
            })
            return true;

        } return false;

    }

    function onSubmit(values) {
        handleSubmit(values);
    }

    return (
        <Popover>
            <PopoverTrigger className="bg-blue-500 w-full py-2 rounded-md">Add New Task?</PopoverTrigger>
            <PopoverContent className=" w-fit shadow-lg shadow-black border-2">
                <div className="w-96 rounded-md p-4 px-8">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-2" >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>


                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal flex justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span className=" w-full">Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    className="w-full"
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date <= new Date()
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full mt-4">Submit</Button>
                        </form>
                    </Form>
                </div>
            </PopoverContent>
        </Popover >
    )
}

export default TaskForm;