import { db } from "@/lib/firebase"
import { doc, setDoc, collection, addDoc, getDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Check if already seeded
    const profileSnap = await getDoc(doc(db, "settings", "profile"))
    if (profileSnap.exists()) {
      return NextResponse.json({ message: "Already seeded" })
    }

    // Profile
    await setDoc(doc(db, "settings", "profile"), {
      name: "Elisee Mbaya",
      tagline: "AI Engineer",
      title: "AI Engineer",
      bio: "I am a dedicated AI Engineer with years of experience self-teaching and practicing the skills of Java, Python, etc.",
      summary:
        "Innovative and deadline-driven developer with 2 years of non-professional experience in visual privacy and java development. Also possess multiple programming skills self-taught on various opportunity.",
      birthday: "July 27",
      website: "www.embaya01.github.io",
      phone: "+1 803 554 0075",
      city: "Rock Hill, SC",
      degree: "Bachelor of Sciences in Computer Science",
      email: "eliseembaya1@gmail.com",
      address: "2866 Ebinwood Rd, Rock Hill, SC 29732",
      photoUrl: "/images/me.jpg",
      twitter: "https://twitter.com/El_Hack01",
      facebook: "https://www.facebook.com/elisee.mby.5",
      instagram: "https://www.instagram.com/elisee_mby/",
      linkedin: "https://www.linkedin.com/in/eliseembaya/",
    })

    // Resume
    await setDoc(doc(db, "settings", "resume"), {
      url: "/Elisee_Mbaya_Resume.pdf",
    })

    // Education
    const educationItems = [
      {
        title: "Secondary School",
        years: "2010 - 2016",
        institution: "Institut Technique De Mutoshi, Kolwezi, the Democratic Republic of the Congo",
        details: "Cumulative GPA: 3.56",
        order: 0,
      },
      {
        title: "Bachelor of Sciences in Computer Science",
        years: "2017 - 2020",
        institution: "University of Wisconsin Green-Bay, Green Bay, WI",
        details: "Emphasis: Software Development & Information Security. GPA: 3.4",
        order: 1,
      },
    ]
    for (const item of educationItems) {
      await addDoc(collection(db, "education"), item)
    }

    // Experience
    const experienceItems = [
      {
        title: "Visual Privacy Game Design",
        years: "Sept 2019 - May 2020",
        company: "",
        details: [
          "Applied my knowledge of OpenCV, JDBC, and Java to create an app.",
          "Used as a Capstone Project to complete my undergraduate degree.",
          "Presented at multiple conferences to raise awareness of visual data mining.",
        ],
        order: 0,
      },
      {
        title: "Lab Administrator",
        years: "2018 - 2020",
        company: "UWGB Center of Cyber Security Education & Outreach, Green-Bay, WI",
        details: [
          "Troubleshoot laboratory laptops, Android tablets and servers.",
          "Appointed teacher assistant (TA) for the NSA GenCyber Camp.",
          "Assisted in various outreach projects designed to help growth in tech industries.",
        ],
        order: 1,
      },
      {
        title: "Coordinator Assistant",
        years: "2017 - 2020",
        company: "UWGB Central Area for Shipping & Receiving Services, Green-Bay, WI",
        details: [
          "Managed database and resources of the University Public Surplus website.",
          "Demonstrated great customer service skills when delivering mails and packages.",
          "Delivered packages throughout campus in timely manner.",
          "Maintain organization and delivery schedule of Service Center.",
        ],
        order: 2,
      },
    ]
    for (const item of experienceItems) {
      await addDoc(collection(db, "experience"), item)
    }

    // Skills
    const skillItems = [
      { name: "PHP", iconUrl: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/php/php.png", order: 0 },
      { name: "HTML 5", iconUrl: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/html/html.png", order: 1 },
      { name: "Java", iconUrl: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/java/java.png", order: 2 },
      { name: "C++", iconUrl: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/cpp/cpp.png", order: 3 },
      { name: "Python", iconUrl: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png", order: 4 },
      { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png", order: 5 },
      { name: "Wireshark", iconUrl: "/images/icons/wireshark.png", order: 6 },
      { name: "Database Management", iconUrl: "/images/icons/database.png", order: 7 },
      { name: "CSS 3", iconUrl: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/css/css.png", order: 8 },
      { name: "Bootstrap", iconUrl: "/images/icons/bootstrap.png", order: 9 },
    ]
    for (const item of skillItems) {
      await addDoc(collection(db, "skills"), item)
    }

    // Services
    const serviceItems = [
      { title: "Web Development", description: "You have a business idea, want to build a portfolio, etc. you need a website and I can provide...", icon: "globe", order: 0 },
      { title: "Android Development", description: "Created multiple android applications for assignment purpose during my undergraduate...", icon: "smartphone", order: 1 },
      { title: "Desktop Apps", description: "Let's automate your everyday tasks and your routines easier to accomplish.", icon: "monitor", order: 2 },
      { title: "AI/ML", description: "The future is on our doorstep. Are we letting it in or no?", icon: "brain", order: 3 },
      { title: "Pentesting", description: "Security is the key to our protection and privacy. How to make sure we are really secure...", icon: "shield", order: 4 },
    ]
    for (const item of serviceItems) {
      await addDoc(collection(db, "services"), item)
    }

    return NextResponse.json({ message: "Database seeded successfully" })
  } catch (error) {
    console.error("[v0] Seed error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: `Failed to seed database: ${errorMessage}` }, { status: 500 })
  }
}
