"use client"
import { useRouter } from "next/navigation"
export default function NavbarDash(){
    const router = useRouter();
    function handleLogout(){
        router.push("/")
    }
    return(
        <div className="h-16 px-10 bg-[#F6F6F6] flex justify-between items-center w-screen absolute top-0">
                <img src="../../../logo.png" alt="logo" />
                <div className="md:flex hidden">
                    <h1 className="text-black font-mono text-xl"> Respect. </h1>
                    <h1 className="text-black font-mono text-xl"> Integrity. </h1>
                    <h1 className="text-black font-mono text-xl"> Service. </h1>
                    <h1 className="text-black font-mono text-xl"> Excellence. </h1>
                    <h1 className="text-black font-mono text-xl"> Stewardship. </h1>
                </div>
                <button onClick={handleLogout} className="bg-red-600 text-white font-semibold w-16 h-8 rounded-xl"> logout </button>
        </div>
    )
} 