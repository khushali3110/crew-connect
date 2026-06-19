import { ContactContent } from "../../page";

const roleMap: Record<string, string> = {
  rolecrew: "crew",
  roleemployer: "employer"
};

export default function ContactContextSectorPage({
  params
}: {
  params: { context: string; sector: string };
}) {
  return <ContactContent role={roleMap[params.context]} sector={params.sector} />;
}
