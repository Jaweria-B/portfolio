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
  Bot,
  User,
  Webcam
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
import { FaLinkedin, FaMedium, FaBlogger, FaGithubSquare } from "react-icons/fa"; 
import {SiStreamlit } from "react-icons/si";

const aboutStats = [
  { label: "Years of experience", value: "3+" },
  { label: "Technologies mastered", value: "10+" },
  { label: "Projects", value: "30+" },
];

const services = [
  {
    service: "Web Development",
    description:
      "Building responsive, user-friendly web applications, ranging from simple to complex designs, using modern frameworks like React.js, Next.js, Django.",
    icon: Code2,
  },
  // {
  //   service: "Technical Writing",
  //   description:
  //     "Creating comprehensive technical articles, tutorials, and documentation for developers, tech enthusiasts, and businesses.",
  //   icon: Frame,
  // },
  {
    service: "Python Consulting",
    description:
      "Providing expert guidance on Python development, including code optimization, automation, and machine learning solutions.",
    icon: SearchCheck,
  },
  {
    service: "AI and Machine Learning Solutions",
    description:
      "Designing and implementing AI-driven systems, from predictive analytics to neural network-based applications, tailored to your business needs.",
    icon: MonitorSmartphone,
  },
  {
    service: "Chatbot Development",
    description:
      "Developing intelligent chatbots using Python and NLP techniques to enhance customer interactions and automate workflows.",
    icon: Eye,
  },
  
  {
    service: "Web Scraping and Data Extraction",
    description:
      "Developing robust web scraping tools to gather, clean, and analyze data efficiently for various applications.",
    icon: Frame,
  },
  {
    service: "AI Integration in Applications",
    description:
      "Helping businesses seamlessly integrate AI and machine learning solutions into their software and processes to enhance productivity.",
    icon: Webcam,
  },
  {
    service: "Portfolio Development",
    description:
      "Assisting professionals in creating impactful portfolios to showcase their skills, projects, and achievements.",
    icon: User,
  },
  {
    service: "API Integration and Automation",
    description:
      "Streamlining workflows by integrating APIs and automating processes to boost efficiency and reduce manual effort.",
    icon: Bot,
  },
];


const web_projects = [
  {
  title: "Crwn Clothing",
  description: "E-commerce platform for stylish clothing.",
  image: "/assets/crwn-clothing.webm",
  href: "https://crwn-clothing-jb.netlify.app/",
  github:"https://github.com/Jaweria-B/crwn-clothing"
  },
  {
  title: "TinDog",
  description: "Interactive web app for finding perfect matches for your dog.",
  image: "/assets/tindog.webm",  
  href: "https://jaweria-b.github.io/TinDog/",
  github:"https://github.com/Jaweria-B/tindog"
  },
  {
    title: "Daily Journal",
    description: "A blog site to create, read, update, and delete posts.",
    image: "/assets/blog-3.png",
    href: "https://github.com/Jaweria-B/journey-junction-blogs",
    github: ""
  },
  {
    title: "Monsters Rolodex",
    description: "A React.js app showcasing monster cards with names and emails.",
    image: "/assets/giphy-2.webp",
    href: "https://monsters-rolodex-jb.vercel.app/",
    github:"https://github.com/Jaweria-B/monsters-rolodex-v2"
  },
  {
    title: "To-Do-List Website",
    description: "Stores tasks in database for today's work and your work list",
    image: "/assets/todo-2.png",
    href: "https://github.com/Jaweria-B/to-do-list-v2",
    github: ""
  },
  {
    title: "Drum Kit",
    description: "A drum kit which plays drum sounds on clicking buttons or pressing keyboard keys.",
    image: "/assets/drum-kit.png",
    href: "https://jaweria-b.github.io/Drum-Kit/",
    github:"https://github.com/Jaweria-B/drum-kit"
  },
  {
    title: "Simon Game",
    description: "A classic memory game recreated using HTML, CSS, JavaScript, and jQuery.",
    image: "/assets/simon.png",
    href: "https://jaweria-b.github.io/Simon-Game/",
    github:"https://github.com/Jaweria-B/simon-game"
  },
  {
    title: "Dice Game",
    description: "A dice rolling game where two players roll dice to see who wins.",
    image: "/assets/dice.png",
    href: "https://jaweria-b.github.io/dice-game/",
    github: "https://github.com/Jaweria-B/dice-game"
  },
  {
    title: "To-Do-List Website",
    description: "Stores tasks for today's work and your work list",
    image: "/assets/todo.png",
    href: "https://github.com/Jaweria-B/to-do-list-v1",
    github: ""
  },
  {
    title: "Blog Site",
    description: "A blog site to create, read, update, and delete posts.",
    image: "/assets/blog-2.png",
    href: "https://github.com/Jaweria-B/blog-project",
    github: ""
  },  
  {
    title: "To Do List",
    description: "To-Do List application to view, add, and manage tasks efficiently.",
    image: "/assets/todolist.webm",
    href: "https://github.com/Jaweria-B/to-do-list",
    github:""
  },
  {
    title: "Airline Booking System",
    description: "To view available flights details, add passengers to flights, and manage accounts.",
    image: "/assets/flights.webm",
    href: "https://github.com/Jaweria-B/airline",
    github:""
  },
  {
    title: "Social Media Post Mechanism",
    description: "A project simulating posting of social media content.",
    image: "/assets/scrolling.webm",
    href: "https://github.com/Jaweria-B/social-media-posts-mechanism",
    github:""
  },
  {
    title: "Is It New Year?",
    description: "A Django-based app that checks if today is New Year's Day.",
    image: "/assets/no.png",
    href: "https://github.com/Jaweria-B/is-it-new-year",
    github: ""
  },
  {
    title: "Singlepages",
    description: "A collection of Applications demonstrating various content rendering techniques.",
    image: "/assets/pages.png",
    href: "https://github.com/Jaweria-B/singlepages",
    github: ""
  },
  {
    title: "React Counter Game",
    description: "A fun math game where users solve problems to reach a target score.",
    image: "/assets/mathtest.png",
    href: "https://github.com/Jaweria-B/math-addition-test/",
    github: ""
  },
  {
    title: "Task Manager",
    description: "Interactive web app to dynamically add and manage tasks.",
    image: "/assets/taskslist.png",
    href: "https://github.com/Jaweria-B/tasks-list",
    github: ""
  },
  {
    title: "Message Service",
    description: "A simple Node.js and Express project for displaying and managing messages.",
    image: "/assets/message-service.png",
    href: "https://github.com/Jweria-B/message-service",
    github: ""
  },
  {
    title: "BMI Calculator",
    description: "Calculates BMI through weight and height.",
    image: "/assets/bmi.png",
    href: "https://github.com/Jaweria-B/bmi-calculator",
    github: ""
  },
  {
    title: "Portfolio Website",
    description: "A clone of personal portfolio showcasing skills, projects, and contact information.",
    image: "/assets/greenresume.png",
    href: "https://github.com/Jaweria-B/green-cloudy-portfolio-clone",
    github: ""
  },
  {
    title: "Resume Site",
    description: "A simple personal website showcasing my profile, skills, and interests.",
    image: "/assets/htmlresume.png",
    href: "https://github.com/Jaweria-B/cv",
    github: ""
  },
  {
    title: "Hello World",
    description: "A simple Django project that provides a basic greeting interface with dynamic URLs.",
    image: "/assets/hello.png",
    href: "https://github.com/jaweria-b/hello-world",
    github: ""
  },
  {
    title: "This website",
    description: "My personal website",
    image: "/assets/portfolio.webm",
    href: "https://github.com/wendoj/portfolio",
  },  
];

const ml_projects = [
  {
    title: "Iris Flower Prediction App",
    description: "A Streamlit app that predicts Iris flower types.",
    image: "/assets/iris.png",
    href: "https://iris-flower-classification-jb.streamlit.app",
    github:"https://github.com/Jaweria-B/iris-flower-classification"
  },
  {
    title: "DNA Nucleotide Count App",
    description: "A Streamlit app to analyze DNA sequences by counting nucleotide composition.",
    image: "/assets/dna.png",
    href: "https://dna-nucleotide-count-jb.streamlit.app/",
    github:"https://github.com/Jaweria-B/bioinformatics-dna-app"

  },
  {
    title: "Penguins Specie Classification App",
    description: "A Streamlit app that predicts Penguins Species.",
    image: "/assets/penguins.png",
    href: "https://penguins-classification-jb.streamlit.app",
    github:"https://github.com/Jaweria-B/penguins-specie-classification"
  },
  {
    title: "Banknotes Classifier",
    description: "A neural network-based system for authenticating and classifying banknotes.",
    image: "/assets/note.webp",
    href: "https://github.com/Jaweria-B/banknotes-classification-neural-network",
    github:""
  },
  {
    title: "Stock Price Tracker App",
    description: "Tracks real-time stock prices of Amazon, Apple, and Microsoft.",
    image: "/assets/stocks.png",
    href: "https://simple-stock-price.streamlit.app",
    github:"https://github.com/Jaweria-B/simple-stock-price"
  },
  {
    title: "Digit Recognition App",
    description: "Predicts digit from drawing using a pre-trained neural network model.",
    image: "/assets/pencil.png",
    href: "https://github.com/Jaweria-B/digit-recognition-app",
    github:"https://digit-recognition-jb.streamlit.app"
  },
  {
    title: "Face Detection App",
    description: "Uses face detection model to detect faces in a picture.",
    image: "/assets/face.png",
    href: "https://face-detection-model-jb.streamlit.app",
    github:"https://github.com/Jaweria-B/face-detection-model"
  },
  {
    title: "S&P Stocks Explorer App",
    description: "Retrieves data about companies listed on the S&P 500 index.",
    image: "/assets/sp.png",
    href: "https://sp-500-explorer.streamlit.app/",
    github:"https://github.com/Jaweria-B/S-P-500-Explorer"
  },
  {
    title: "Edge Detection Filter",
    description: "Detects all the edges and corners in an image.",
    image: "/assets/edge.png",
    href: "https://edge-detection-app-jb.streamlit.app/",
    github:"https://github.com/Jaweria-B/edge-detection-filter"
  },
  {
    title: "NFL Stats (Rushing) Explorer",
    description: "Explores NFL statistics, featuring dynamic data visualization and filtering options.",
    image: "/assets/nfl.png",
    href: "https://nfl-football-stats-explorer-jb.streamlit.app/",
    github:"https://github.com/Jaweria-B/NFL-football-stats-explorer"
  },
  {
    title: "Rain Prediction App",
    description: "Predicts whether it will rain tomorrow based on user-provided weather parameters.",
    image: "/assets/rain.png",
    href: "https://rain-prediction-jb.streamlit.app",
    github:"https://github.com/Jaweria-B/rain-prediction-app"
  },
  {
    title: "NBA Player Stats Explorer",
    description: "Analyzes NBA player stats with user-selected filters.",
    image: "/assets/nba.png",
    href: "https://eda-basketball-jb.streamlit.app/",
    github:"https://github.com/Jaweria-B/eda-basketball"
  },
];

const ai_projects = [
  {
    title: "StoryVerse AI",
    description: "Generates captivating stories with images, text, and audio.",
    image: "/assets/story.png",
    href: "https://storyverse-ai.streamlit.app",
    github:"https://github.com/Jaweria-B/Media-App"
  },
  {
    title: "Code Compass",
    description: "Provides personalized learning paths, interactive quizzes, project inspirations.",
    image: "/assets/code-compass.webp",
    href: "https://github.com/Jaweria-B/code-compass",
    github:""
  },
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
    { href: "https://share.streamlit.io/user/jaweria-b", icon: <SiStreamlit size={40} />, tooltip: "Streamlit" },
    // { href: "https://medium.com/@jaweria_", icon: <FaMedium size={40} />, tooltip: "Medium" },
    // { href: "https://hi-jaweria.blogspot.com/", icon: <FaBlogger size={40} />, tooltip: "Blogger" },
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

  const [carouselApiWeb, setCarouselApiWeb] = useState<CarouselApi | null>(null);
  const [carouselApiML, setCarouselApiML] = useState<CarouselApi | null>(null);
  const [carouselApiAI, setCarouselApiAI] = useState<CarouselApi | null>(null);

  const [currentWeb, setCurrentWeb] = useState<number>(0);
  const [countWeb, setCountWeb] = useState<number>(0);

  const [currentML, setCurrentML] = useState<number>(0);
  const [countML, setCountML] = useState<number>(0);

  const [currentAI, setCurrentAI] = useState<number>(0);
  const [countAI, setCountAI] = useState<number>(0);


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
    if (!carouselApiWeb) return;

    setCountWeb(carouselApiWeb.scrollSnapList().length);
    setCurrentWeb(carouselApiWeb.selectedScrollSnap() + 1);

    carouselApiWeb.on("select", () => {
      setCurrentWeb(carouselApiWeb.selectedScrollSnap() + 1);
    });
  }, [carouselApiWeb]);

  useEffect(() => {
    if (!carouselApiML) return;

    setCountML(carouselApiML.scrollSnapList().length);
    setCurrentML(carouselApiML.selectedScrollSnap() + 1);
  
    carouselApiML.on("select", () => {
      setCurrentML(carouselApiML.selectedScrollSnap() + 1);
    });
  }, [carouselApiML]);  

  useEffect(() => {
    if (!carouselApiAI) return;
  
    setCountAI(carouselApiAI.scrollSnapList().length);
    setCurrentAI(carouselApiAI.selectedScrollSnap() + 1);
  
    carouselApiAI.on("select", () => {
      setCurrentAI(carouselApiAI.selectedScrollSnap() + 1);
    });
  }, [carouselApiAI]);  

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
            <h2 className="py-16 pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              I&apos;m a dedicated Software Engineering student with a proven track record in <span className="underline"> Python</span>, <span className="underline"> AI</span>, and <span className="underline">web development</span>
              . My expertise spans building dynamic web applications, creating intuitive machine learning models, and developing AI-powered tools that solve real-world problems. 
              <br />
              With projects ranging from e-commerce platforms and interactive games to neural network-based classifiers and predictive analytics apps, I take pride in crafting solutions that are both innovative and impactful. 
              Driven by a passion for technology and a commitment to continuous learning, I aim to push boundaries and contribute meaningfully to the tech industry.
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
            <span className="text-gradient clash-grotesk text-4xl font-semibold tracking-tighter mb-40">
              ✨ Projects
            </span>

            <div>
              <h2 className="mt-20 text-4xl font-semibold tracking-tighter xl:text-6xl">
                Web Development
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                I&apos;ve worked on a wide range of web development projects, utilizing both core technologies as well as powerful frameworks. Here are some of my favorites:
              </p>

              {/* Carousel */}
              <div className="mt-14 p-1">
                <Carousel setApi={setCarouselApiWeb} className="w-full">
                  <CarouselContent>
                    {web_projects.map((project) => (
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
                            <div className="border-t border-white/5 p-4 flex justify-between items-center tracking-tighter">
                              {/* Title and Description */}
                              <div>
                                <CardTitle className="text-lg text-gray-300 font-black">
                                  {project.title}
                                </CardTitle>
                                <CardTitle className="font-normal text-base">
                                  {project.description}
                                </CardTitle>
                              </div>

                              {/* GitHub Icon with Link */}
                              <a
                                href={project.github ? project.github : project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-gray-50"
                                aria-label="GitHub"
                              >
                                {/* Replace with an actual GitHub icon */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  className="h-8 w-8"
                                >
                                  <path d="M12 .296c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.234 1.838 1.234 1.07 1.834 2.807 1.304 3.495.997.108-.774.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.312.47-2.384 1.236-3.222-.124-.303-.535-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.298-1.23 3.298-1.23.653 1.653.242 2.874.118 3.176.768.838 1.236 1.91 1.236 3.222 0 4.61-2.807 5.62-5.479 5.92.43.371.824 1.102.824 2.222v3.293c0 .32.22.694.825.575 4.765-1.585 8.203-6.084 8.203-11.385 0-6.627-5.373-12-12-12z" />
                                </svg>
                              </a>
                            </div>
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
                    {currentWeb} / {countWeb}
                  </span>{" "}
                  projects
                </div>
              </div>

            </div>

            {/* ------------- */}
            <div>
              <h2 className="mt-40 text-4xl font-semibold tracking-tighter xl:text-6xl">
                Mahine Learning
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                I&apos;ve explored various machine learning and deep learning techniques, creating intuitive applications that turn data into actionable insights.
              </p>

              {/* Carousel */}
              <div className="mt-14 p-1">
                <Carousel setApi={setCarouselApiML} className="w-full">
                  <CarouselContent>
                    {ml_projects.map((project) => (
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
                            <div className="border-t border-white/5 p-4 flex justify-between items-center tracking-tighter">
                              {/* Title and Description */}
                              <div>
                                <CardTitle className="text-lg text-gray-300 font-black">
                                  {project.title}
                                </CardTitle>
                                <CardTitle className="font-normal text-base">
                                  {project.description}
                                </CardTitle>
                              </div>

                              {/* GitHub Icon with Link */}
                              <a
                                href={project.github ? project.github : project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-gray-50"
                                aria-label="GitHub"
                              >
                                {/* Replace with an actual GitHub icon */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  className="h-8 w-8"
                                >
                                  <path d="M12 .296c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.234 1.838 1.234 1.07 1.834 2.807 1.304 3.495.997.108-.774.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.312.47-2.384 1.236-3.222-.124-.303-.535-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.298-1.23 3.298-1.23.653 1.653.242 2.874.118 3.176.768.838 1.236 1.91 1.236 3.222 0 4.61-2.807 5.62-5.479 5.92.43.371.824 1.102.824 2.222v3.293c0 .32.22.694.825.575 4.765-1.585 8.203-6.084 8.203-11.385 0-6.627-5.373-12-12-12z" />
                                </svg>
                              </a>
                            </div>
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
                    {currentML} / {countML}
                  </span>{" "}
                  projects
                </div>
              </div>
            </div>

            {/* ------------- */}
            <div>
              <h2 className="mt-20 text-4xl font-semibold tracking-tighter xl:text-6xl">
                AI
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              With a passion for artificial intelligence, I&apos;ve built projects that showcase innovative AI solutions and real-world applications. Take a look at some of my top AI creations:
              </p>

               {/* Carousel */}
               <div className="mt-14 p-1">
                <Carousel setApi={setCarouselApiAI} className="w-full">
                  <CarouselContent>
                    {ai_projects.map((project) => (
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
                            <div className="border-t border-white/5 p-4 flex justify-between items-center tracking-tighter">
                              {/* Title and Description */}
                              <div>
                                <CardTitle className="text-lg text-gray-300 font-black">
                                  {project.title}
                                </CardTitle>
                                <CardTitle className="font-normal text-base">
                                  {project.description}
                                </CardTitle>
                              </div>

                              {/* GitHub Icon with Link */}
                              <a
                                href={project.github ? project.github : project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-gray-50"
                                aria-label="GitHub"
                              >
                                {/* Replace with an actual GitHub icon */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  className="h-8 w-8"
                                >
                                  <path d="M12 .296c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.234 1.838 1.234 1.07 1.834 2.807 1.304 3.495.997.108-.774.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.312.47-2.384 1.236-3.222-.124-.303-.535-1.524.116-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.298-1.23 3.298-1.23.653 1.653.242 2.874.118 3.176.768.838 1.236 1.91 1.236 3.222 0 4.61-2.807 5.62-5.479 5.92.43.371.824 1.102.824 2.222v3.293c0 .32.22.694.825.575 4.765-1.585 8.203-6.084 8.203-11.385 0-6.627-5.373-12-12-12z" />
                                </svg>
                              </a>
                            </div>
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
                    {currentAI} / {countAI}
                  </span>{" "}
                  projects
                </div>
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
