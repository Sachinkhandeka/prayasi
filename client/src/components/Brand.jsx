import { Link } from "react-router-dom";

export default function Brand({ className }) {
    return(
        <>
        <Link to="/" className={ className }  >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Prayasi</span>
            Blog
        </Link>
        </>
    )
}