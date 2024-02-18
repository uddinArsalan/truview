// import Image from "next/image";
// import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Feed />
    </main>
  );
}
