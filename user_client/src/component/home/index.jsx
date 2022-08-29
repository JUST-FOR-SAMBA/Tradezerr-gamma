import { useNavigate } from "react-router-dom";
import Board from "../board";

const HomeComponent = () => {
    const navigate = useNavigate();


    return (
        <div className="space-y-6">
            <p className="text-xl text-gray-200 font-mono"> Companies Board </p>
            <Board />
        </div>
    )
}

export default HomeComponent