import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div id="home">
      <Link href="/report" className="card pointer">
        Assignment 1 : Report Website
      </Link>
      <Link href="/restaurant" className="card pointer">
        Assignment 2 : Restaurant Website
      </Link>
    </div>
  );
}
