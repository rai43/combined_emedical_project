function DashboardStats({ title, icon, value, description, colorIndex }) {
  const COLORS = ["primary", "primary"];

  const getDescStyle = () => {
    if (description.includes("↗︎")) return "font-bold text-green-700";
    else if (description.includes("↙")) return "font-bold text-red-700";
    else return "";
  };

  return (
    <div class="stats shadow">
      <div class="stat">
        <div class={`stat-figure text-${[colorIndex % 2]}`}>{icon}</div>
        <div class="stat-title">{title}</div>
        <div class={`stat-value text-${COLORS[colorIndex % 2]}`}>{value}</div>
        <div class={"stat-desc  " + getDescStyle()}>{description}</div>
      </div>
    </div>
  );
}

export default DashboardStats;
