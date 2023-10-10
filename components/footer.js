import Link from "next/link";
import Image from "next/image";
import React from "react";
import Container from "./container";

export default function Footer() {
  const legal = ["Terms", "Privacy", "Legal"];
  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              {" "}
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100"
              >
                <Image
                  src="/img/logo.svg"
                  alt="N"
                  width="32"
                  height="32"
                  className="w-8"
                />
                <span>EduCourse</span>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400 hidden md:block">
              EduCourse is your one-stop destination for online learning. Dive
              into a world of knowledge and skill-building with a vast catalog
              of courses taught by experts from around the globe.
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {legal.map((item, index) => (
                <Link
                  key={index}
                  href="/"
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <div>Connect with us</div>
            <div className="flex mt-5 space-x-5 text-gray-400 dark:text-gray-500">
              <Link href="https://github.com/29aNKUR">
                <span className="sr-only">Instagram</span>
                <GitHub />
              </Link>
              <Link href="https://www.linkedin.com/in/ankur-semle">
                <span className="sr-only">Linkedin</span>
                <Linkedin />
              </Link>
              <Link href="https://twitter.com/SemleAnkur">
                <span className="sr-only">Twitter</span>
                <Twitter />
              </Link>
              <Link href="https://facebook.com/">
                <span className="sr-only">Facebook</span>
                <Facebook />
              </Link>
            </div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Made with ♥ by Ankur
        </div>
      </Container>
    </div>
  );
}

const Twitter = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#1DA1F2" // Change the fill color to Twitter blue
  >
    <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
  </svg>
);

const Facebook = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#1877F2" // Change the fill color to Facebook blue
  >
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
  </svg>
);
const GitHub = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      d="M12 0a12 12 0 0 0-3.83 23.39c.61.11.83-.27.83-.6s0-1.09-.02-1.97c-3.39.73-4.11-1.63-4.11-1.63-.55-1.39-1.34-1.76-1.34-1.76-1.09-.73.08-.72.08-.72 1.21.08 1.85 1.21 1.85 1.21 1.08 1.85 2.86 1.28 3.56.98.11-.77.42-1.28.76-1.58-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.4 1.21-3.25a4.38 4.38 0 0 1 .11-3.23s1.02-.32 3.35 1.25a11.54 11.54 0 0 1 6 0c2.33-1.57 3.34-1.25 3.34-1.25a4.38 4.38 0 0 1 .12 3.23c.74.85 1.2 1.94 1.2 3.25 0 4.64-2.81 5.67-5.48 5.97.43.37.81 1.09.81 2.2 0 1.59-.02 2.86-.02 3.26 0 .33.21.72.84.6A12 12 0 0 0 12 0"
      fill="#000"
    />
  </svg>
);
const Linkedin = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#0077B5" // Change the fill color to LinkedIn blue
  >
    <path
      d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.10.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z"
      fill="#0077B5" // Change the fill color to LinkedIn blue
    />
  </svg>
);
