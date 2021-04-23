import Head from "next/head";
import Sidebar from '../components/Sidebar'
export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Sidebar/>
    </div>
  );
}
