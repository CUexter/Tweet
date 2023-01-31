import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Link href="/about" className={styles.card}>
      <h2 className={inter.className}>Testing</h2>
      <p className={inter.className}>Testing with playwright</p>
    </Link>
  );
}
