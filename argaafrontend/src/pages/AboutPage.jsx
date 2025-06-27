import React from 'react';
import { motion } from 'framer-motion';

// We will create this component next
import TeamMemberCard from '../components/TeamMemberCard';

// You can find a high-quality, relevant image from Unsplash or a similar site
const heroImageUrl = "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974";

const AboutPage = () => {
    // Team member data - easily updatable
    const teamMembers = [
        {
            name: "Bonsa Daba",
            role: "Software Engineer & Team Lead",
            imageUrl: "https://i.pravatar.cc/300?u=bonsa", // Placeholder image
            bio: "Leading the team with a vision for seamless technology and user-centric design, Bonsa orchestrates the development process from concept to deployment.",
            socials: {
                linkedin: "#",
                twitter: "#",
            }
        },
        {
            name: "Yosef Muluneh",
            role: "Software Engineer & AI Specialist",
            imageUrl: "https://i.pravatar.cc/300?u=yosef", // Placeholder image
            bio: "Yosef is the architect behind our intelligent features, leveraging AI to create a smarter, more personalized travel experience for every user.",
            socials: {
                linkedin: "#",
                twitter: "#",
            }
        },
        {
            name: "Tolera Imiru",
            role: "Backend Developer",
            imageUrl: "https://i.pravatar.cc/300?u=tolera", // Placeholder image
            bio: "The backbone of our platform, Tolera builds and maintains the robust, scalable, and secure server-side logic that powers Argaa.",
            socials: {
                linkedin: "#",
                twitter: "#",
            }
        },
        {
            name: "Abdi Kebede",
            role: "UI/UX Designer",
            imageUrl: "https://i.pravatar.cc/300?u=abdi", // Placeholder image
            bio: "Abdi crafts the beautiful and intuitive interfaces you see, ensuring that every click and interaction on our platform is a delight.",
            socials: {
                linkedin: "#",
                twitter: "#",
            }
        }
    ];

    return (
        <div className="animate-fadeIn">
            {/* --- Hero Section --- */}
            <div className="relative h-80 rounded-lg overflow-hidden mb-16">
                <img src={heroImageUrl} alt="Team collaboration" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl font-extrabold text-white"
                    >
                        About Argaa Platform
                    </motion.h1>
                </div>
            </div>

            {/* --- Mission Section --- */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    We are Team 4, a passionate group of creators dedicated to revolutionizing the tourism experience in Ethiopia. Our goal is to empower local guides, foster community-driven travel, and provide a platform where every journey is authentic, accessible, and unforgettable. We built Argaa to be more than an app—it's a bridge between cultures and a gateway to adventure.
                </p>
            </div>

            {/* --- Meet the Team Section --- */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet the Innovators</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={member.name} member={member} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;