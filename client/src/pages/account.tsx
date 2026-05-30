import { UserProfile } from "@clerk/clerk-react";

export default function Account() {
  return (
    <div style={{ padding: "40px" }}>
      <UserProfile />
    </div>
  );
}
