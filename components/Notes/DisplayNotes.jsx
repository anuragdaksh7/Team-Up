import AllNotes from "./AllNotes";



export default function DisplayNotes( props ) {
    return (
        <div>
            <h1 className="mb-2 font-bold text-lg">Important Notes</h1>
            <AllNotes tId = {props.teamId}/>
        </div>
    )
}