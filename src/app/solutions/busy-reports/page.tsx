import { BusySolutionPage, busyMetadata } from "@/components/landing/busy/BusySolutionPage";
import { busySolutions } from "@/lib/busy-solutions";

const solution = busySolutions["busy-reports"];
export const metadata = busyMetadata(solution);

export default function Page() {
  return <BusySolutionPage solution={solution} />;
}
