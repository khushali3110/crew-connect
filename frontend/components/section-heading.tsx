export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-aqua sm:text-sm">{eyebrow}</p>
      <h2 className="fluid-section-title mt-3 font-black">{title}</h2>
      {copy ? <p className="fluid-copy mt-4 text-slateblue">{copy}</p> : null}
    </div>
  );
}
