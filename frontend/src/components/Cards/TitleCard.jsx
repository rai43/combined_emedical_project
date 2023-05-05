import Subtitle from "../Typography/Subtitle";

function TitleCard({ title, children, topMargin, TopSideButtons }) {
  return (
    <div
      class={"card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")}
    >
      {/* Title for Card */}
      <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
        {title}

        {/* Top side button, show only if present */}
        {TopSideButtons && (
          <div class="inline-block float-right">{TopSideButtons}</div>
        )}
      </Subtitle>

      <div class="divider mt-2"></div>

      {/** Card Body */}
      <div class="h-full w-full pb-6 bg-base-100">{children}</div>
    </div>
  );
}

export default TitleCard;
