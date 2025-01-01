import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import { FaLinkedin, FaMedium, FaBlogger, FaGithubSquare } from "react-icons/fa"; // Example from react-icons


const aboutStats = [
  { label: "Years of experience", value: "3+" },
  { label: "Technologies mastered", value: "10+" },
  { label: "Projects", value: "20+" },
];

// const projects = [
//   {
//     title: "Personal Blog",
//     description: "Sharing insights on software engineering, technology trends, and personal growth.",
//     image: "/assets/personal_blog.png",  // Add image for the blog
//     href: "https://medium.com/@jaweria",
//   },
//   {
//     title: "Freelance Writing Portfolio",
//     description: "A showcase of my freelance writing projects focused on Python, AI, and tech.",
//     image: "/assets/freelance_portfolio.png",  // Add relevant image
//     href: "https://jaweria.medium.com/",
//   },
//   {
//     title: "AI-Driven Email Automation Tool",
//     description: "A tool for automating personalized emails for scholarship applications and freelance outreach.",
//     image: "/assets/email_tool.png",  // Add image for the tool
//     href: "#",  // Add link when ready
//   },
//   {
//     title: "Tech Trends in AI & Python",
//     description: "A collection of my articles and thoughts on the latest advancements in AI and Python.",
//     image: "/assets/tech_trends.png",  // Add image for the blog series
//     href: "https://medium.com/@jaweria",
//   },
//   {
//     title: "Student Portfolio - Software Engineering",
//     description: "Showcasing my journey through the world of software engineering and tech projects.",
//     image: "/assets/student_portfolio.png",  // Add image for the portfolio
//     href: "https://github.com/jaweria",
//   },
// ];

const services = [
  {
    service: "Content Writing",
    description:
      "Providing well-researched, engaging, and technically accurate content on topics related to AI, Python, and software engineering.",
    icon: Code2,
  },
  {
    service: "Technical Writing",
    description:
      "Crafting detailed technical articles, tutorials, and documentation for developers and tech enthusiasts.",
    icon: Frame,
  },
  {
    service: "Python Consulting",
    description:
      "Offering consulting and support on Python development, from code optimization to machine learning projects.",
    icon: SearchCheck,
  },
  {
    service: "AI Integration in Apps",
    description:
      "Helping businesses integrate AI-driven solutions into their applications, enhancing functionality and performance.",
    icon: MonitorSmartphone,
  },
  {
    service: "Freelance Writing Mentorship",
    description:
      "Guiding aspiring writers in the freelance industry with tips and strategies for building a successful career.",
    icon: Eye,
  },
];

//  ------------ CHANGED ------------

// const aboutStats = [
//   { label: "Years of experience", value: "3+" },
//   { label: "Technologies mastered", value: "5+" },
//   { label: "Companies worked with", value: "15+" },
// ];

const projects = [
  {
  title: "Crwn Clothing",
  description: "E-commerce platform for stylish clothing.",
  image: "/assets/crwn-clothing.webm",
  href: "https://crwn-clothing-jb.netlify.app/",
  },
  {
  title: "TinDog",
  description: "Interactive web app for finding perfect matches for your dog.",
  image: "/assets/tindog.webm",  
  href: "https://jaweria-b.github.io/TinDog/"
  },
  {
    title: "To Do List",
    description: "To-Do List application to view, add, and manage tasks efficiently.",
    image: "/assets/todolist.webm",
    href: "https://github.com/Jaweria-B/to-do-list"
  },
  {
    title: "Monsters Rolodex",
    description: "A React.js app showcasing monster cards with names and emails.",
    image: "/assets/giphy-2.webp",
    href: "https://monsters-rolodex-jb.vercel.app/",
  },
  {
    title: "Airline Booking System",
    description: "Airline Booking System to view available flights, see flight details, add passengers to flights, and manage accounts.",
    image: "/assets/flights.webm",
    href: "https://github.com/Jaweria-B/airline"
  },
  {
    title: "social-media-post-mechanism",
    description: "A project simulating posting of social media content.",
    image: "/assets/scrolling.webm",
    href: "https://github.com/Jaweria-B/social-media-posts-mechanism"
  },
  {
    title: "Is It New Year?",
    description: "A Django-based app that checks if today is New Year's Day.",
    image: "/assets/no.png",
    href: "https://github.com/Jaweria-B/is-it-new-year"
  },
  {
    title: "singlepages",
    description: "A collection of Single Page Applications demonstrating various content rendering techniques.",
    image: "/assets/pages.png",
    href: "https://github.com/Jaweria-B/singlespages" 
  },
  {
    title: "React Counter Game",
    description: "A fun math game built with React where users solve problems to reach a target score.",
    image: "/assets/mathtest.png",
    href: "https://github.com/Jaweria-B/math-addition-test/"
  },
  {
    title: "Task Manager",
    description: "Interactive web app to dynamically add and manage tasks.",
    image: "/assets/taskslist.png",
    href: "https://github.com/Jaweria-B/tasks-list"
  },
  {
    title: "Message Service",
    description: "A simple Node.js and Express project for displaying and managing messages.",
    image: "/assets/message-service.png",
    href: "https://github.com/Jweria-B/message-service",
  },
  {
    "title": "Portfolio Website",
    "description": "A clone of personal portfolio showcasing skills, projects, and contact information.",
    "image": "/assets/greenresume.png",
    "href": "https://github.com/Jaweria-B/green-cloudy-portfolio-clone"
  },
  {
    "title": "Resume Site",
    "description": "A simple personal website showcasing my profile, skills, and interests.",
    "image": "/assets/htmlresume.png",
    "href": "https://github.com/Jaweria-B/cv"
  },
  {
    title: "This website",
    description: "My personal website",
    image: "/assets/portfolio.webm",
    href: "https://github.com/wendoj/portfolio",
  },
  {
    title: "Hello World",
    description: "A simple Django project that provides a basic greeting interface with dynamic URLs.",
    image: "/assets/hello.png",
    href: "https://github.com/jaweria-b/hello-world",
  }  
];

// const services = [
//   {
//     service: "Frontend Development",
//     description:
//       "Creating stellar user interfaces and web experiences using the latest technologies.",
//     icon: Code2,
//   },
//   {
//     service: "UX Design",
//     description:
//       "Building intuitive, user-centric designs that drive engagement and conversion.",
//     icon: Frame,
//   },
//   {
//     service: "SEO Optimization",
//     description:
//       "Enhancing your website's visibility in search engines for increased organic traffic.",
//     icon: SearchCheck,
//   },
//   {
//     service: "Responsive Design",
//     description:
//       "Designing websites that look and perform equally well on all devices and screen sizes.",
//     icon: MonitorSmartphone,
//   },
//   {
//     service: "Backend Development",
//     description:
//       "Developing robust, scalable server-side logic for a wide range of web applications.",
//     icon: Eye,
//   },
// ];


function SocialIcons() {
  const socialLinks = [
    { href: "https://www.linkedin.com/in/jaweria-batool/", icon: <FaLinkedin size={40} />, tooltip: "LinkedIn" },
    { href: "https://github.com/Jaweria-B", icon: <FaGithubSquare size={40} />, tooltip: "GitHub" },
    { href: "https://medium.com/@jaweria_", icon: <FaMedium size={40} />, tooltip: "Medium" },
    { href: "https://hi-jaweria.blogspot.com/", icon: <FaBlogger size={40} />, tooltip: "Blogger" },
  ];

  return (
    <div
      data-scroll
      data-scroll-direction="horizontal"
      data-scroll-speed=".09"
      className="flex flex-row items-center space-x-6"
    >
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <span
            className="transition border border-input bg-background flex items-center justify-center text-xs px-2.5 py-2 rounded-xl hover:-translate-y-1 hover:bg-primary duration-300"
          >
            {social.icon}
          </span>
          {/* Tooltip */}
          <span
            className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {social.tooltip}
          </span>
        </a>
      ))}
    </div>
  );
}


export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>next.js</span>
              <span className={styles.pill}>tailwindcssnotworkin</span>
              <span className={styles.pill}>typescript</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Jaweria Batool.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                Passionate Software Engineering student and freelance writer, blending tech expertise with creative storytelling to inspire and inform.
              </p>
            </div>
            {/* <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>
                <FaLinkedin className="text-white" size={35} />
              </span>
              <span className={styles.pill}>
                <FaGithubSquare className="text-white" size={35} />
              </span>
              <span className={styles.pill}>
                <FaMedium className="text-white" size={35} />
              </span>
              <span className={styles.pill}>
                <FaBlogger className="text-white" size={35} />
              </span>
            </div> */}
            {SocialIcons()}
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="mailto:bjaweria509@gmail.com" passHref>
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            {/* <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              I&apos;m an experienced full-stack developer proficient in{" "}
              <Link
                href="https://create.t3.gg/"
                target="_blank"
                className="underline"
              >
                TypeScript, Tailwind, and Next.js
              </Link>{" "}
              since 2021. My experience spans from startups to mid-sized
              companies, where I&apos;ve been instrumental in the entire product
              design process; from ideation and wireframing, through
              prototyping, to the delivery of the final product, all while
              efficiently collaborating with cross-functional teams.
            </h2> */}

            <h2 className="py-16 pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              I&apos;m a passionate Software Engineering student with a strong focus on{" "}
              <Link
                href="https://www.python.org/"
                target="_blank"
                className="underline"
              >
                Python, AI, and web development
              </Link>{" "}
              . I thrive on solving complex problems, developing innovative solutions, and constantly expanding my skill set. Whether it’s through coding, creating content, or offering insights into emerging technologies, I aim to make a meaningful impact in the tech world.
            </h2>

            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Streamlined digital experiences.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, from small websites to
              large-scale web applications. Here are some of my favorites:
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card id="tilt">
                        <CardHeader className="p-0">
                          <Link href={project.href} target="_blank" passHref>
                            {project.image.endsWith(".webm") ? (
                              <video
                                src={project.image}
                                autoPlay
                                loop
                                muted
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            ) : (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={300}
                                quality={100}
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            )}
                          </Link>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Need more info?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are some of the services I offer. If you have any
                  questions, feel free to reach out.
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently available for freelance work and open to
              discussing new projects.
            </p>
            <Link href="mailto:bjaweria509@gmail.com" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
