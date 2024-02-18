"use client"
import Nav from "@/components/Nav";
import UserPage from "@/components/UserProfile/UserPage";
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"


export default function Page( {params} ) {
    const router = useRouter();
    const [userSelf, setUserSelf] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userStatus, setUserStatus] = useState("");
    const [userTeams, setUserTeams] = useState([]);
    const [loaded , setLoaded] = useState(false);
    const getUser = async () => {
        const payload = {
            _id: params.userId
        }
        const response = await axios.post("/api/getUser", payload);
        const data = await response.data;
        if (!data.success) {
            alert(data.error);
            router.push("/home");
        } else {
            const dataObj = data.user;
            // setUser(dataObj);
            setUserName(dataObj.username);
            setUserEmail(dataObj.email);
            setUserStatus(dataObj.status);
            setUserTeams(dataObj.teams);
            setUserSelf(dataObj.self);
            setLoaded(true);
            // console.log(userInfo,dataObj);
        }
    }

    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Nav />
            {
                (loaded)?<>
                    {/* <p>{params.userId}</p> */}
                    <UserPage self={userSelf} username={userName} email={userEmail} status={userStatus} teams={userTeams} />
                </>:
                <div className="flex justify-center h-[80lvh] items-center">
                    <p>Loading...</p>
                </div>
            }
            
            
        </div>
    )
}