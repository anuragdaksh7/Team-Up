"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Context } from "@/app/Teams/[TeamId]/page";




const NoteForm = (props) => {

    const [elementUpdate, setElementUpdate] = useContext(Context);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    const formSchema = z.object({
        title: z.string().min(5, { message: "title too short" }).max(20, { message: "title too long" }),
        content: z.string().min(10, { message: "content too short" }).max(40, { message: "content too long" }),
        tags: z.string().min(4, { message: "tags too short" }).max(20, { message: "tags too long" }),
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title,
            content: content,
            tags: tags,
        }
    })

    const handleSubmit = async (values) => {
        const team_id = props.team_id
        const payload = {
            teamId: team_id,
            title: values.title,
            content: values.content,
            tags: values.tags.split(" "),
        }
        console.log(payload)
        const response = await axios.post("/api/NoteControls/CreateNote", payload);
        const data = await response.data;
        if (data.success) {
            setElementUpdate(prev => prev + 1);
            setTitle("")
            setContent("")
            setTags("")
            toast("Success", {
                description: "Note Created",
            })
        } else {
            alert(data.message);
        }
    }

    function onSubmit(values) {
        handleSubmit(values);
    }



    return (
        <Popover>
            <PopoverTrigger className="bg-blue-500 w-full py-2 rounded-md">Add New Note?</PopoverTrigger>
            <PopoverContent className=" w-fit shadow-lg shadow-black border-2">
                <div className=" w-96 rounded-md p-4 px-8 bg-black/[0.95] backdrop-blur-md shadow-xl shadow-black z-10">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2" >
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
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                placeholder="Content"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                value={tags}
                                                onChange={(e) => setTags(e.target.value)}
                                                placeholder="tags"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full mt-3">Submit</Button>
                        </form>
                    </Form>
                </div>
            </PopoverContent>
        </Popover >
    )
}

export default NoteForm