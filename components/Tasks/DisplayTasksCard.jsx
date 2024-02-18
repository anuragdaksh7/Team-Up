import TaskCard2 from "./TaskCard2"
import TaskCard from "./TaskCard"


export default function DisplayTasksCard(props) {
    // console.log("tasks",props)
    return (
        <div className="" >
            <div className="bg-green-500"></div>
            <div className="bg-yellow-400"></div>
            <div className="bg-red-500"></div>
            <div className="bg-blue-500"></div>
            <div className="bg-gray-200"></div>
            <div className="flex flex-col gap-2 ">
                {
                    props.tasks.map(
                        (val) => {
                            return <TaskCard2
                                fetcher={props.fetcher}
                                key={val._id}
                                idd={val._id}
                                status={val.status}
                                title={val.title}
                                createdBy={val.createdBy.username}
                                deletedBy={val.deletedBy?.username}
                                deleterId={val.deletedBy?._id}
                                creatorId={val.createdBy._id}
                                due={val.dueDate} />
                        }
                    )
                }
            </div>
        </div>
    )
}