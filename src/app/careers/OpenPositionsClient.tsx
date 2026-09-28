"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles
} from "lucide-react";

const departments = [
  { name: "All Departments", value: "all" },
  { name: "Engineering", value: "engineering" },
  { name: "Product", value: "product" },
  { name: "Sales", value: "sales" },
  { name: "Marketing", value: "marketing" },
  { name: "Customer Success", value: "customer-success" },
];

const jobs = [
  {
    id: 1,
    title: "Senior Backend Engineer",
    department: "engineering",
    location: "Mumbai / Remote",
    type: "Full-time",
    experience: "4-6 years",
    description: "Join our engineering team to build scalable WhatsApp API solutions. You'll work on high-traffic systems processing millions of messages daily.",
    requirements: [
      "4+ years of experience with Node.js/TypeScript",
      "Experience with cloud platforms (AWS/GCP)",
      "Strong understanding of RESTful APIs and microservices",
      "Experience with message queues and real-time systems",
      "Knowledge of database design (PostgreSQL, Redis)"
    ],
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Frontend Developer",
    department: "engineering",
    location: "Mumbai / Remote",
    type: "Full-time",
    experience: "2-4 years",
    description: "Build beautiful, responsive interfaces for our dashboard and customer portal using React and Next.js.",
    requirements: [
      "2+ years of experience with React/Next.js",
      "Strong TypeScript skills",
      "Experience with Tailwind CSS and modern styling",
      "Understanding of responsive design principles",
      "Experience with state management (Zustand/Redux)"
    ],
    posted: "3 days ago"
  },
  {
    id: 3,
    title: "Product Manager",
    department: "product",
    location: "Mumbai",
    type: "Full-time",
    experience: "3-5 years",
    description: "Lead product strategy for our WhatsApp integration platform, working closely with engineering and customers.",
    requirements: [
      "3+ years of product management experience in B2B SaaS",
      "Strong analytical and problem-solving skills",
      "Experience with agile development methodologies",
      "Excellent communication and stakeholder management",
      "Technical background is a plus"
    ],
    posted: "1 week ago"
  },
  {
    id: 4,
    title: "Enterprise Sales Manager",
    department: "sales",
    location: "Mumbai / Delhi / Bangalore",
    type: "Full-time",
    experience: "4-8 years",
    description: "Drive enterprise sales across India, building relationships with C-level executives and closing major deals.",
    requirements: [
      "4+ years of enterprise B2B sales experience",
      "Track record of meeting/exceeding quotas",
      "Experience selling SaaS/API products",
      "Strong presentation and negotiation skills",
      "Existing enterprise network is a plus"
    ],
    posted: "5 days ago"
  },
  {
    id: 5,
    title: "Customer Success Manager",
    department: "customer-success",
    location: "Mumbai / Remote",
    type: "Full-time",
    experience: "2-4 years",
    description: "Ensure customer success by onboarding, training, and supporting enterprise clients using our platform.",
    requirements: [
      "2+ years of customer success experience in B2B SaaS",
      "Excellent communication and relationship-building skills",
      "Experience with CRM tools and customer analytics",
      "Technical aptitude to understand API integrations",
      "Fluent in Hindi and English"
    ],
    posted: "1 week ago"
  },
  {
    id: 6,
    title: "Technical Writer",
    department: "marketing",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 years",
    description: "Create comprehensive documentation, API guides, and technical content for our developer community.",
    requirements: [
      "2+ years of technical writing experience",
      "Experience documenting APIs and developer tools",
      "Strong portfolio of technical documentation",
      "Familiarity with Markdown and documentation tools",
      "Understanding of REST APIs and web technologies"
    ],
    posted: "2 weeks ago"
  },
];

function JobCard({ job }: { job: typeof jobs[0] }) {
  const [expanded, setExpanded] = useState(false);
  const applyHref = `mailto:careers@whats91.com?subject=${encodeURIComponent(`Application for ${job.title}`)}`;

  return (
    <Card className="border-border/60 hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <CardTitle className="text-lg sm:text-xl text-text-primary mb-2">{job.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 font-normal">
                {job.department}
              </Badge>
              <Badge variant="outline" className="font-normal">
                <MapPin className="h-3 w-3 mr-1" />
                {job.location}
              </Badge>
              <Badge variant="outline" className="font-normal">
                <Clock className="h-3 w-3 mr-1" />
                {job.type}
              </Badge>
            </div>
          </div>
          <span className="text-xs text-text-muted shrink-0">{job.posted}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-text-secondary mb-4">{job.description}</p>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-brand-primary hover:text-brand-primary-hover p-0 h-auto"
        >
          {expanded ? (
            <>
              Hide requirements <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              View requirements <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-border/60">
            <h4 className="text-sm font-semibold text-text-primary mb-3">Requirements</h4>
            <ul className="space-y-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                  <Sparkles className="h-4 w-4 text-brand-primary mt-0.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-4 bg-brand-primary text-white hover:bg-brand-primary-hover" asChild>
              <a href={applyHref}>
                Apply Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function OpenPositionsClient() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredJobs = selectedDepartment === "all"
    ? jobs
    : jobs.filter(job => job.department === selectedDepartment);

  return (
    <>
      {/* Department Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {departments.map((dept) => (
          <Button
            key={dept.value}
            variant={selectedDepartment === dept.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDepartment(dept.value)}
            className={selectedDepartment === dept.value
              ? "bg-brand-primary text-white hover:bg-brand-primary-hover"
              : "border-border text-text-secondary hover:text-text-primary"
            }
          >
            {dept.name}
          </Button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">No positions found</h3>
            <p className="text-sm text-text-secondary">
              No open positions in this department. Check back later or explore other departments.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
