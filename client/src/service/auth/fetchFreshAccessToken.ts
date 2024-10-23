export async function fetchFreshAccessToken(staleAccessToken: string, refreshToken: string) {
  const res = await fetch(
      `${
          process.env.NEXT_PUBLIC_BASE_URL
      }/api/v1/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${staleAccessToken!}`,
        },
        cache: "no-store",
        mode: "cors",
        body: JSON.stringify({ refreshToken }),
      }
  );

  const data = await res.json();
  return data.accessToken;

}