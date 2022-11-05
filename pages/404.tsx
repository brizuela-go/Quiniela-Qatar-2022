import Image from "next/image";
import Link from "next/link";

export default function fourOFour() {
  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="flex justify-center gap-4 mb-12">
        <h1 className=" font-bold lg:text-8xl text-4xl">404</h1>
        <h1 className="lg:text-8xl text-4xl">|</h1>
        <h1 className=" font-semibold lg:text-4xl text-2xl lg:mt-7 mt-1">
          Página no encontrada
        </h1>
      </div>
      <Image
        src="https://media2.giphy.com/media/WVoSCBshAD4cMyq1gA/giphy.gif"
        alt="404"
        width={404}
        height={404}
      />
      <Link href="/">
        <a className="text-2xl font-semibold mt-8 text-white bg-gradient-to-r py-2 px-6 rounded shadow-lg hover:shadow-xl hover:-translate-y-2 transition duration-200 ease-out from-rose-700 to-rose-900">
          Volver al inicio
        </a>
      </Link>
    </div>
  );
}
