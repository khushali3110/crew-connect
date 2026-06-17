import { ContactContent } from "../page";

const roleMap: Record<string, string> = {
  rolecrew: "crew",
  roleemployer: "employer"
};

export default function ContactContextPage({ params }: { params: { context: string } }) {
  return <ContactContent role={roleMap[params.context]} />;
}
