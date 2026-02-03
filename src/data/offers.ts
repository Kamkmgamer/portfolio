export interface Offer {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    demo: string;
}

export const offers: Offer[] = [
    {
        id: 1,
        title: "Default Offer",
        description: "A high-performance, responsive landing page or portfolio designed to convert visitors.",
        price: "Starting at $13,200",
        image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/past%20offers/Default%20offer.png",
        demo: "https://kamkm-luxury.vercel.app/",
    },
    {
        id: 2,
        title: "Ebasic ecom App",
        description: "Comprehensive e-commerce store with CMS integration.",
        price: "Starting at $1,500",
        image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/past%20offers/Ebasic%20ecom%20App.png",
        demo: "https://doobecommerceproposal.vercel.app/",
    },
    {
        id: 3,
        title: "a custom use holo clone",
        description: "Full-stack web application with custom logic, database integration, and user authentication.",
        price: "Starting at $1,500",
        image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/past%20offers/a%20custom%20use%20holo%20clone.png",
        demo: "https://al-aidy-proposal.vercel.app/",
    },
    {
        id: 4,
        title: "Custom mobile app CMS.",
        description: "A custom CMS for managing content for a mobile application.",
        price: "$1,200",
        image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/past%20offers/Quran_App_CMS.png",
        demo: "https://hollyquran.vercel.app/",
    },
    {
        id: 5,
        title: "car dealership website",
        description: "A custom solution for a car dealership",
        price: "Starting at $5,100",
        image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/past%20offers/Car_Dealership_Website.png",
        demo: "https://evocare-proposal.vercel.app/",
    },
    {
        id: 6,
        title: "Award ceremony Website",
        description: "A comprehensive digital platform for Turkey's premier awards ceremony",
        price: "Starting at $900",
        image: "https://ik.imagekit.io/gtnmxyt2d/khalil-portfolio/past%20offers/Award%20ceremony%20Website.png",
        demo: "https://blue-sky-awards.vercel.app/",
    },
];
