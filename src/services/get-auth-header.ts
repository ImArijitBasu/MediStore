
import { cookies } from "next/headers";

export const getHeaders = async () => {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  // Join cookies into a clean string
  const cookieString = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return {
    "Content-Type": "application/json",
    Cookie: cookieString,
  };
};
