import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Badge } from "@/components/ui/badge"


const Note = (props) => {
    // console.log(props)
    const handleDelete = async () => {
        const payload = {_id: props._id};
        const response = await axios.post("/api/NoteControls/DeleteNote", payload);
        const data = await response.data;
        if (data.success) {
            window.location.reload();
        } else {
            alert(data.message);
        }

    }
    return (
        <div className='text-black select-none border-[1px] min-w-40 bg-gray-100 hover:bg-white duration-200 hover:scale-105 rounded-md px-2 py-1 pb-2'>
            <div className=' flex justify-between mb-0'>
                <p className=' font-semibold '>{props.title}</p>
                {
                    (props.leader) ? <RiDeleteBin6Line onClick={handleDelete} className=" hover:scale-110 duration-200 cursor-pointer" /> : <></>
                }
            </div>
            <div className='mt-0 mb-1'>
                <p className=' text-sm'>{props.content}</p>
            </div>
            <div className='flex flex-wrap gap-1 text-xs'>
                {
                    (props.tags.length > 0) && props.tags.map((value, idx) => {
                        // return <p key={idx} className=' bg-green-500 px-1 hover:scale-105 duration-200  rounded-md text-gray-800 text-xs'>{value}</p>
                        return <Badge key={idx}>{value}</Badge>
                    })
                }
            </div>
        </div>
    )
}

export default Note