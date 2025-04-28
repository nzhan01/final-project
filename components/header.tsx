
import Link from "next/link";

export default function Header() {
    const linkStyling = " p-1 m-2 text-xl hover:underline"
    return(
        <header className="flex justify-between items-center  h-20">
            <h2 className = "text-4xl font-semibold p-4">CS391 Final Project Cocktail App</h2>
            <nav className = "p-2 m-4">
                <Link href="/random" className = {linkStyling}>
                    random
                </Link>
                <Link href="/about" className = {linkStyling}>
                    About
                </Link>
            </nav>
        </header>
    );
}