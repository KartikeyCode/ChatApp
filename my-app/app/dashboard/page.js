
import NavbarDash from "../components/navbardash"
import QueriesList from "../components/querieslist"
import TicketForm from "../components/ticketform"

export default function DashBoard(){
    return(
        <div className="min-h-screen flex flex-col items-center">
            <NavbarDash/>
            <div className="flex flex-col xl:flex-row gap-28 ">
            <TicketForm/>
            <QueriesList/>
            </div>
        </div>
    )
}