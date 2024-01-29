import TaskCard from "./TaskCard"


export default function DisplayTasksCard (props) {
    // console.log("tasks",props)
    return (
        <div>
            <div className="bg-green-500"></div>
            <div className="bg-yellow-400"></div>
            <div className="bg-red-500"></div>
            {
                props.tasks.map(
                    (val) => {
                        return <TaskCard key={val._id} status={val.status} title={val.title} createdBy={val.createdBy.username} creatorId={val.createdBy._id} due={val.dueDate} />
                    }
                )
            }
        </div>
    )
}