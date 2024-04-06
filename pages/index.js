import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import EXPERIENCE from "./api/experience.json";
import CONTENT from "./api/content.json";

const badgeClass = {
  domain: "is-warning",
  workflow: "is-primary",
  frame: "is-error",
};

function greetingMessage() {
  const date = new Date();
  const curHr = date.getHours();
  if (curHr < 12) {
    return "Good Morning!!";
  } else if (curHr < 18) {
    return "Good Afternoon!!";
  } else {
    return "Good Evening!!";
  }
}

const NAME = "Sumanth Madishetty";
const SPECIAL_CHARACTER_INDEX = [0, 8];

export default function Home() {
  // useEffect(() => {
  //   // if (window.VANTA) {
  //   //   window.VANTA.NET({
  //   //     el: "#mainContainer",
  //   //     mouseControls: true,
  //   //     touchControls: true,
  //   //     gyroControls: false,
  //   //     minHeight: 200.0,
  //   //     minWidth: 200.0,
  //   //     scale: 1.0,
  //   //     scaleMobile: 1.0,
  //   //     color: "#ffbb8e",
  //   //     backgroundColor: "black",
  //   //     // points: 8.0,
  //   //     points: 10.0,
  //   //     maxDistance: 15.0,
  //   //     spacing: 20.0,
  //   //   });
  //   // }
  //   particlesJS.load("backCanvas", "particlesjs-config.json", function () {
  //     console.log("callback - particles.js config loaded");
  //   });
  // }, []);

  return (
    // <div className={styles.container}>
    <>
      <Script
        strategy="lazyOnload"
        onLoad={() => {
          particlesJS.load(
            "backCanvas",
            "particlesjs-config.json",
            function () {
              console.log("callback - particles.js config loaded");
            }
          );
        }}
        src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"
      ></Script>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Sumanth Madishetty</title>
      </Head>
      <div id="backCanvas" className={styles.absCanvas} />

      <main id="mainContainer" className={styles.main}>
        <div className="z-10 flex all-center mobile-flex-col text-center lg:text-left">
          {/* <!-- Copyright Nintendo --> */}
          <i className="nes-mario is-large mr-2"></i>
          <div className="ml-4">
            <p className={styles.greetingHeader}>Hello, {greetingMessage()}</p>
            <h2 className="big-heading text-blue">
              {" "}
              It&apos;s{" "}
              {NAME.split("").map((t, idx) => {
                return (
                  <span
                    className={`${styles.nameText} ${
                      SPECIAL_CHARACTER_INDEX.includes(idx) &&
                      styles.highlightCharacter
                    }`}
                    key={t}
                  >
                    {t}
                  </span>
                );
              })}
            </h2>
          </div>
        </div>
      </main>
      <SlideOne />
      <ThingsThatIHaveWorkedOn />
      <SlideTwo />
      <ContactMe />
    </>
    // </div>
  );
}

function SlideOne() {
  return (
    <main className={styles.main}>
      <div className="mb-4 grid grid-rows-2 md:grid-cols-2 gap-4 sm:grid-cols-1 md:px-16 px-2">
        <div className="relative">
          <Image
            objectFit="cover"
            layout="fill"
            alt="Sumanth Madishetty"
            src="/me.JPG"
          />
        </div>
        <div className="">
          <div
            className={`nes-container is-dark with-title ${styles.aboutMeContainer}`}
            style={{ minHeight: "300px" }}
          >
            <p style={{ backgroundColor: "black" }} className="title">
              Me & Myself
            </p>
            <p className="lg:leading-9 leading-7 text-base lg:text-sm md:text-sm">
              {`Hey there! I'm Sumanth Madishetty, a full-stack developer with
              over 5 years of experience. My expertise lies primarily in
              JavaScript-based`}{" "}
              <span className="nes-text is-primary">
                full stack development
              </span>
              . Additionally, {`I'm`} well versed in{" "}
              <span className="nes-text is-primary">DevOps</span> practices,
              ensuring smooth software deployment in the cloud. {`I've`} also
              delved into{" "}
              <span className="nes-text is-primary"> data engineering</span>,
              working on pipelines and data warehouses to extract valuable
              insights. {`Let's`} collaborate and create something awesome
              together!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function ThingsThatIHaveWorkedOn() {
  const stacks = [
    {
      title: "Javascript",
      type: "domain",
    },
    {
      title: "ReactJS",
      type: "workflow",
    },
    {
      title: "Typescript",
      type: "workflow",
    },
    {
      title: "NodeJs",
      type: "workflow",
    },
    {
      title: "Next",
      type: "workflow",
    },
    {
      title: "Express",
      type: "workflow",
    },
    {
      title: "Fastify",
      type: "workflow",
    },

    {
      title: "Serverless",
      type: "workflow",
    },
    {
      title: "Webpack",
      type: "workflow",
    },
    {
      title: "Java",
      type: "domain",
    },
    {
      title: "Spring Boot",
      type: "workflow",
    },
    {
      title: "Python",
      type: "domain",
    },
    { title: "Chalice", type: "workflow" },
    { title: "Fast API", type: "workflow" },
    { title: "Flask", type: "workflow" },
    {
      title: "Ruby",
      type: "domain",
    },
    {
      title: "AWS",
      type: "domain",
    },
    {
      title: "Snowflake",
      type: "domain",
    },
    {
      title: "Postgres",
      type: "frame",
    },
    {
      title: "Mongo",
      type: "frame",
    },
    {
      title: "Graphql",
      type: "frame",
    },
  ];

  return (
    <div className="m-4 lg:m-16">
      <h1
        className="big-heading-xl"
        style={{ color: "var(--cust-peach)", fontSize: "35px" }}
      >
        <a href="#journey" className="hashLink">
          #
        </a>{" "}
        Things that i have worked on
      </h1>
      <div
        className="nes-container is-rounded is-dark flex justify-center flex-wrap gap-6 px-8"
        style={{
          backgroundColor: "transparent",
          minHeight: "350px",
          padding: "40px 20px",
        }}
      >
        {stacks.map((i) => {
          return (
            <a
              key={i.title}
              href="#"
              className={`w-auto nes-badge `}
              // style={{ width: "fit-content" }}
            >
              <span className={`${badgeClass[i.type]}`}>
                {i.title || "DEF"}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function SlideTwo() {
  const items = EXPERIENCE.map((i) => i.orgName);
  const [selected, setSelected] = useState(items[0]);

  const onChange = (e) => {
    const { name } = e.target;
    console.log(e);

    setSelected(name);
  };

  return (
    <div className="m-4 mt-14 lg:m-36">
      <h1
        className="big-heading-xl"
        style={{ color: "var(--cust-peach)", fontSize: "35px" }}
      >
        <a href="#journey" className="hashLink">
          #
        </a>{" "}
        My Journey as a developer
      </h1>
      <div className={styles.journeyContainer}>
        <div className=" flex-col lg:flex hidden">
          {items.map((i) => (
            <label tabIndex="-1" role="button" key={i}>
              <input
                type="radio"
                className="nes-radio is-dark"
                name={i}
                checked={i === selected}
                onChange={onChange}
              />
              <span>{i}</span>
            </label>
          ))}

          {/* <label>
          <input
            type="radio"
            className="nes-radio is-dark"
            name="no"
            onChange={onChange}
          />
          <span>No</span>
        </label> */}
        </div>
        {renderMobileTabs()}
        <div>
          <div
            className="nes-container is-rounded is-dark"
            style={{ backgroundColor: "transparent", minHeight: "350px" }}
          >
            {renderSelectedData(selected)}
          </div>
        </div>
      </div>
    </div>
  );

  function renderMobileTabs() {
    return (
      <ul className={`lg:hidden ${styles.mobileTabs}`}>
        {items.map((i) => (
          <li
            key={i}
            onClick={() => setSelected(i)}
            href="#"
            className={i === selected ? styles.selectedMobileTab : ""}
          >
            <span className={i === selected ? "is-success" : "is-error"}>
              {i}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  function renderSelectedData() {
    const orgData = EXPERIENCE.find((i) => i.orgName === selected);
    return (
      <div className="flex flex-col">
        <div className="flex flex-col mx-auto items-center">
          <h1 className="mx-auto text-2xl lg:text-2xl">{orgData.orgName}</h1>
          <div className="text-sm text-center md:text-left lg:text-left sm:text-sm flex flex-col  md:flex-row lg:flex-row items-center row-lg">
            {orgData.designation},
            <span className="mt-2 md:mt-0 lg:mt-0">
              {orgData.start} - {orgData.end}
            </span>
          </div>
        </div>
        {/* {orgData?.summary && (
          <p className=" mt-4 text-sm leading-8">{orgData?.summary}</p>
        )} */}
        <ul
          className={`${styles.customList} nes-list is-dark is-circle mx-6 mt-4`}
        >
          <li className="self-start">Accomplishments</li>
        </ul>

        <ul
          style={{ listStyle: "inside" }}
          className={`${styles.customList} nes-list is-dark mx-6 text-sm`}
        >
          {orgData.accomplishments.map((i, idx) => (
            <li className={"mb-4"} key={idx}>
              {i}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function ContactMe() {
  return (
    <div className="m-4 lg:m-16 text-center">
      <h1
        className="mx-auto text-center big-heading-xl"
        style={{ color: "var(--cust-peach)", fontSize: "35px" }}
      >
        <a href="#journey" className="hashLink">
          #
        </a>{" "}
        Let&apos;s Connect!!
      </h1>
      <div className="text-sm mx-auto mt-6 mb-6" style={{ maxWidth: "650px" }}>
        Ain&apos;t it amazing meeting people? Whether for a project or for
        freelancing or just to say Hi. Just hit me up. I usually respond within
        few hours.
      </div>
      <a
        rel="noreferrer"
        className="mt-4 mb-6"
        target="_blank"
        href="mailto:mailme@sumanth.tech"
      >
        <button className="nes-btn is-warning">Hello </button>
      </a>
      <div
        style={{ maxWidth: "650px" }}
        className="mt-6 mx-auto flex justify-around"
        id="social-list"
      >
        <a
          href={CONTENT.socialProfiles.github}
          target="_blank"
          rel="noreferrer"
        >
          <i className="nes-icon github is-medium"></i>
        </a>
        <a
          href={CONTENT.socialProfiles.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <i className="nes-icon linkedin is-medium"></i>
        </a>
        <a
          href={CONTENT.socialProfiles.stackoverflow}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            width="48px"
            height="48px"
            alt="stack"
            src="/stackoverflow.svg"
          />
        </a>
      </div>
    </div>
  );
}

// Mario Colors

// #ffbb8e => skin peach
// #1560ad => Blue
// #fef102 => Yellow
// #f81c2f => Red
