import { cookies } from "next/headers";
import AmaalTracker from "./AmaalTracker";
import { FC } from "react";

const Amaal: FC = () => {
  const token = cookies().get("token");
  return <AmaalTracker token={token?.value || ""} />;
};

export default Amaal;
