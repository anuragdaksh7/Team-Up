import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Chat from "./Chat"


export function getFirstLetters(str="Team Name") {
  // Split the string into an array of words
  const words = str.split(' ');

  // Extract the first letter of each word
  const firstLetters = words.map(word => word.charAt(0));

  // Join the first letters into a new string
  const result = firstLetters.join('').toUpperCase();

  return result;
}


const ChatFunction = () => {
  return (
    <div className="">
      <Sheet className="">
        <SheetTrigger asChild>
          <Button className="w-full" >Chat</Button>
        </SheetTrigger>
        <SheetContent className="h-[100lvh] flex flex-col justify-between">
          <SheetHeader>
            <SheetTitle>Chat</SheetTitle>
            <SheetDescription>
              Drop messages for your teammates
            </SheetDescription>
          </SheetHeader>
          <div className=" overflow-auto scrollbar-hide">
            <div className="  grid gap-2 py-4 w-full">
              <Chat message="hello world" sender="Anurag Daksh" firstLetters={getFirstLetters("Anurag Daksh")} self="true" _id="1234" />
              <Chat message="hello world" sender="Anurag Daksh" firstLetters={getFirstLetters("Anurag Daksh")} self="true" _id="1234" />
              <Chat message="hello world" sender="Tanishk Bharadwaj" firstLetters={getFirstLetters("Tanishk Bharadwaj")} self="false" _id="1234" />
              <Chat message="hello world" sender="Mohit Singh" firstLetters={getFirstLetters("Mohit Singh")} self="false" _id="1234" />
              <Chat message="hello world" sender="Anurag Daksh" firstLetters={getFirstLetters("Anurag Daksh")} self="true" _id="1234" />
              <Chat message="hello world" sender="Kunal Sharma" firstLetters={getFirstLetters("Kunal Sharma")} self="false" _id="1234" />
              <Chat message="hello world hello world hello world hello world hello world hello world " sender="Anurag Daksh" firstLetters={getFirstLetters("Anurag Daksh")} self="false" _id="1234" />
              <Chat message="hello world" sender="Anurag Daksh" firstLetters={getFirstLetters("Anurag Daksh")} self="true" _id="1234" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default ChatFunction