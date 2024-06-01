// getToken.tsx
// import { useSession } from 'next-auth/client';

// Function to retrieve the access token from the session
export const getToken = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE3MTcyNDg0OTEsImlzcyI6IkJCUFJPIiwiYXVkIjoiaHR0cHM6Ly9iYnByby5tZS8ifQ.4MVrr0BauaEHA0GFfWYq6PsQ-WufC1RdUM09aKWHwPM";
  //   const [session, loading] = useSession();

  // Check if session is loading or not available
  //   if (loading || !session) {
  //     return null;
  //   }
  return token;
  //   // Return the access token from the session
  //   return session.accessToken;
};
