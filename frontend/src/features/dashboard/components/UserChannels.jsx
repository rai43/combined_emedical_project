import TitleCard from "../../../components/Cards/TitleCard";

const userSourceData = [
  { source: "Facebook Ads", count: "26,345", conversionPercent: 10.2 },
  { source: "Google Ads", count: "21,341", conversionPercent: 11.7 },
  { source: "Instagram Ads", count: "34,379", conversionPercent: 12.4 },
  { source: "Affiliates", count: "12,359", conversionPercent: 20.9 },
  { source: "Organic", count: "10,345", conversionPercent: 10.3 },
];

function UserChannels() {
  return (
    <TitleCard title={"User Signup Source"}>
      {/** Table Data */}
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th class="normal-case">Source</th>
              <th class="normal-case">No of Users</th>
              <th class="normal-case">Conversion</th>
            </tr>
          </thead>
          <tbody>
            {userSourceData.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.source}</td>
                  <td>{u.count}</td>
                  <td>{`${u.conversionPercent}%`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default UserChannels;
