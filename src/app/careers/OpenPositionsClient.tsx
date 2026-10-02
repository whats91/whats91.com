"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  ExternalLink,
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
    "id": 1,
    "title": "Senior Backend Engineer",
    "department": "engineering"
  },
  {
    "id": 2,
    "title": "Frontend Developer",
    "department": "engineering"
  },
  {
    "id": 3,
    "title": "Product Manager",
    "department": "product"
  },
  {
    "id": 4,
    "title": "Enterprise Sales Manager",
    "department": "sales"
  },
  {
    "id": 5,
    "title": "Customer Success Manager",
    "department": "customer-success"
  },
  {
    "id": 6,
    "title": "Technical Writer",
    "department": "marketing"
  }
];

function JobCard({ job }: { job: typeof jobs[0] }) {
  const [expanded, setExpanded] = useState(false);
  const requirementsId = useId();
  const applyHref = `mailto:careers@whats91.com?subject=${encodeURIComponent(`Availability enquiry: ${job.title}`)}`;

  return (
    <Card id={`role-${job.id}`} className="border-border/60 hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <CardTitle className="text-lg sm:text-xl text-text-primary mb-2">{job.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 font-normal">
                {job.department}
              </Badge>
            </div>
          </div>
          {/* Source relative labels have no publication anchor; omit until B19/OI12 provides one. */}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-text-secondary mb-4">Availability, location and employment terms are unconfirmed.</p>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={requirementsId}
          aria-label={`${expanded ? "Hide" : "View"} availability details for ${job.title}`}
          className="text-brand-primary hover:text-brand-primary-hover p-0 min-h-11"
        >
          {expanded ? (
            <>
              Hide availability details <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              View availability details <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>

          <div id={requirementsId} hidden={!expanded} className="mt-4 pt-4 border-t border-border/60">
            <p className="text-sm text-text-secondary">Confirm that this role is accepting applications before sending a CV. Requirements and dates are not available here.</p>
            <Button className="mt-4 bg-brand-primary text-white hover:bg-brand-primary-hover" asChild>
              <a href={applyHref}>
                Ask about availability
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
      </CardContent>
    </Card>
  );
}

export function OpenPositionsClient({ roles = jobs }: { roles?: typeof jobs } = {}) {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredJobs = selectedDepartment === "all"
    ? roles
    : roles.filter(job => job.department === selectedDepartment);

  return (
    <>
      {/* Department Filter */}
      <div role="group" aria-label="Filter role categories by department" className="flex flex-wrap justify-center gap-2 mb-8">
        {departments.map((dept) => (
          <Button
            key={dept.value}
            variant={selectedDepartment === dept.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDepartment(dept.value)}
            aria-pressed={selectedDepartment === dept.value}
            className={selectedDepartment === dept.value
              ? "min-h-11 bg-brand-primary text-white hover:bg-brand-primary-hover"
              : "min-h-11 border-border text-text-secondary hover:text-text-primary"
            }
          >
            {dept.name}
          </Button>
        ))}
      </div>

      {/* Jobs List */}
      <p role="status" className="sr-only">{filteredJobs.length} {filteredJobs.length === 1 ? "role category" : "role categories"} shown.</p>
      <div className="space-y-4 max-w-3xl mx-auto">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">No role categories found</h3>
            <p className="text-sm text-text-secondary">
              No previously listed role categories match this department. Explore another department; this filter does not confirm vacancy status.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
