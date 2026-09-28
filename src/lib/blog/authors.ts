/**
 * Author Registry - Author profiles for blog posts
 * 
 * This file contains author metadata for SEO and blog attribution.
 * Each author has a dedicated page at /authors/[slug]
 */

export interface Author {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  expertise: string[];
  location?: string;
  joinedAt: string;
}

// Author profiles - Real team members
export const authors: Author[] = [
  {
    id: "1",
    slug: "devendar-singh-gohil",
    name: "Devendar Singh Gohil",
    role: "Developer",
    bio: "Devendar Singh Gohil is the Lead Developer at Whats91, specializing in WhatsApp Cloud API integration, enterprise software development, and ERP solutions. With extensive experience in building scalable messaging infrastructure, he has architected robust integrations between WhatsApp Business Platform and various ERP systems including Busy Accounting. Devendar is passionate about creating seamless communication solutions that help businesses automate and scale their customer engagement.",
    shortBio: "Lead Developer specializing in WhatsApp Cloud API integration and enterprise ERP solutions.",
    avatar: "/authors/devendar-singh-gohil.png",
    social: {
      linkedin: "https://www.linkedin.com/company/whats91",
      github: "https://github.com/whats91",
    },
    expertise: [
      "WhatsApp Cloud API",
      "Full-Stack Development",
      "ERP Integration",
      "System Architecture",
      "API Development",
      "Busy Accounting Integration",
    ],
    location: "Ujjain, Madhya Pradesh, India",
    joinedAt: "2024-01-01",
  },
  {
    id: "2",
    slug: "mayur-arya",
    name: "Mayur Arya",
    role: "Meta Technical Support",
    bio: "Mayur Arya is a Meta Technical Support specialist at Whats91 with extensive experience in WhatsApp Cloud API implementation and troubleshooting. He helps businesses navigate the complexities of Meta's Business Platform, from initial setup to advanced integrations. Mayur is known for his deep understanding of API error handling, webhook configurations, and compliance requirements.",
    shortBio: "Meta Technical Support specialist helping businesses implement WhatsApp Cloud API solutions.",
    avatar: "/authors/mayur-arya.png",
    social: {
      linkedin: "https://www.linkedin.com/company/whats91",
    },
    expertise: [
      "WhatsApp Cloud API",
      "Meta Business Platform",
      "API Troubleshooting",
      "Webhook Configuration",
      "Technical Support",
    ],
    location: "Ujjain, Madhya Pradesh, India",
    joinedAt: "2024-01-01",
  },
  {
    id: "3",
    slug: "santosh-patil",
    name: "Santosh Patil",
    role: "Meta Support",
    bio: "Santosh Patil serves as Meta Support at Whats91, specializing in customer success and platform optimization. With hands-on experience in helping dozens of businesses scale their WhatsApp communication, Santosh provides expert guidance on conversation pricing optimization, template approval strategies, and best practices for maximizing ROI on the WhatsApp Business Platform.",
    shortBio: "Meta Support expert guiding businesses through WhatsApp Business Platform optimization.",
    avatar: "/authors/santosh-patil.png",
    social: {
      linkedin: "https://www.linkedin.com/company/whats91",
    },
    expertise: [
      "Customer Success",
      "Platform Optimization",
      "Template Management",
      "Conversation Pricing",
      "Business Verification",
    ],
    location: "Ujjain, Madhya Pradesh, India",
    joinedAt: "2024-01-01",
  },
  {
    id: "4",
    slug: "ankita-arya",
    name: "Ankita Arya",
    role: "Sales Team",
    bio: "Ankita Arya is a key member of the Sales Team at Whats91, helping businesses discover the right WhatsApp solutions for their needs. She has helped numerous enterprises understand the benefits of official WhatsApp API integration, from SMEs looking to automate customer communication to large corporations seeking enterprise-grade messaging solutions.",
    shortBio: "Sales professional helping businesses find the right WhatsApp API solutions.",
    avatar: "/authors/ankita-arya.png",
    social: {
      linkedin: "https://www.linkedin.com/company/whats91",
    },
    expertise: [
      "Business Consultation",
      "Solution Architecture",
      "Enterprise Sales",
      "Customer Onboarding",
      "ROI Analysis",
    ],
    location: "Ujjain, Madhya Pradesh, India",
    joinedAt: "2024-01-01",
  },
];

// Helper functions
export function getAllAuthors(): Author[] {
  return authors.sort((a, b) => a.name.localeCompare(b.name));
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((author) => author.id === id);
}

// Default author for posts without explicit author
export const defaultAuthor = authors[0];
