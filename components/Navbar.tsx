import React from "react";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import firebase from "../firebase/firebaseClient";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  { name: "Inicio", href: "/", current: true },
  { name: "Mi Quiniela", href: "/quiniela", current: false },
  { name: "Marcadores", href: "/marcadores", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ _user, userPhoto }) {
  const router = useRouter();

  async function signOut() {
    await firebase.auth().signOut();
  }

  return (
    <Disclosure as="nav" className="bg-white shadow-xl">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Abrir menú principal</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <a href={"/"}>
                    <div className="block h-8 w-auto lg:hidden cursor-pointer">
                      <Image
                        width={38}
                        height={38}
                        src="/logo.png"
                        alt="Logo Qatar"
                      />
                    </div>
                  </a>
                  <a href={"/"}>
                    <div className="hidden h-8 w-auto lg:block cursor-pointer">
                      <Image
                        width={38}
                        height={38}
                        src="/logo.png"
                        alt="Logo Qatar"
                      />
                    </div>
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        href={item.href}
                        key={item.name}
                        className={classNames(
                          router.pathname === item.href
                            ? "bg-gray-200  text-gray-700 cursor-pointer"
                            : " text-gray-700 hover:bg-gray-300 hover:text-gray-800 cursor-pointer",
                          "px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gradient-to-r from-stone-400 to-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-white ">
                      <span className="sr-only">Abir menú de usuario</span>
                      <div className="h-8 w-8 rounded-full">
                        <Image
                          className="rounded-full"
                          width={32}
                          height={32}
                          src={userPhoto || "/.png"}
                          alt="Profile picture"
                        />
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href={
                              router.pathname === `/users/[user]`
                                ? `/users/${_user?.uid}`
                                : `/users/${_user?.uid}`
                            }
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Ver perfil
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={signOut}
                            className={classNames(
                              active ? "bg-gray-100 cursor-pointer" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            Cerrar Sesión
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    router.pathname === item.href
                      ? "bg-gray-200  text-gray-700"
                      : " text-gray-700 hover:bg-gray-200 hover:text-gray-800",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={
                    router.pathname === item.href ? "page" : undefined
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
