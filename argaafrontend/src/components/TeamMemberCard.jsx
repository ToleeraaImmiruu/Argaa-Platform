import React from 'react';
import { motion } from 'framer-motion';

// Reusable SVG icons
const LinkedInIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);
const TwitterIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const TeamMemberCard = ({ member, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
        >
            <img 
                src={member.imageUrl} 
                alt={member.name} 
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
            />
            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
            <p className="text-blue-600 font-semibold">{member.role}</p>
            <p className="text-gray-600 mt-2 text-sm flex-grow">{member.bio}</p>
            <div className="flex space-x-4 mt-4">
                <a href={member.socials.linkedin} className="text-gray-400 hover:text-blue-700 transition-colors">
                    <LinkedInIcon className="h-6 w-6" />
                </a>
                <a href={member.socials.twitter} className="text-gray-400 hover:text-black transition-colors">
                    <TwitterIcon className="h-6 w-6" />
                </a>
            </div>
        </motion.div>
    );
};

export default TeamMemberCard;