function AmountStats({}) {
  return (
    <div class="stats bg-base-100 shadow">
      <div class="stat">
        <div class="stat-title">Amount to be Collected</div>
        <div class="stat-value">$25,600</div>
        <div class="stat-actions">
          <button class="btn btn-xs">View Users</button>
        </div>
      </div>

      <div class="stat">
        <div class="stat-title">Cash in hand</div>
        <div class="stat-value">$5,600</div>
        <div class="stat-actions">
          <button class="btn btn-xs">View Members</button>
        </div>
      </div>
    </div>
  );
}

export default AmountStats;
