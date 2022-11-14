import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="p-4 bg-white md:px-6 md:py-8 mt-44 ">
      <div className="sm:flex sm:items-center sm:justify-around">
        <Link scroll prefetch={true} href="/">
          <a className="flex justify-center items-center mb-4 sm:mb-0">
            <Image
              width={32}
              height={32}
              src="/logo.png"
              className="mr-3 h-8"
              alt="Quiniela de Arturo"
            />
          </a>
        </Link>
        <ul className="flex flex-wrap items-center justify-center mb-6 text-sm text-gray-500 sm:mb-0 ">
          <li>
            <Link prefetch={true} href="https://wa.me/522213321516">
              <a className="hover:underline">Contacto</a>
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center text-center">
        2022{" "}
        <Link scroll href="/">
          <a className="hover:underline">La Quiniela de Arturo</a>
        </Link>
        . Todos los derechos reservados.
      </span>
    </div>
  );
};

export default Footer;
