import { BusySolutionPage, busyMetadata } from "@/components/landing/busy/BusySolutionPage";
import { busySolutions } from "@/lib/busy-solutions";

const solution = busySolutions["busy-ai-agent"];
export const metadata = busyMetadata(solution);

export default function Page() {
  return <BusySolutionPage solution={solution} />;
}
