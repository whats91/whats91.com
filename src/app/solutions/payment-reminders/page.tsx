import { AutomationPage, automationMetadata } from "@/components/landing/automation/AutomationPage";
import { automationPages } from "@/lib/automation-pages";

const page = automationPages["payment-reminders"];
export const metadata = automationMetadata(page);
export default function Page() { return <AutomationPage page={page} />; }
