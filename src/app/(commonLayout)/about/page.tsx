"use client";
import { getSession, getUser } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import React from "react";

const AboutPage = () => {
    const { user, loading, error, refetch } = useSession();
  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {user ? (
        <div>
          <h2>Client Component</h2>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <Button onClick={refetch}>Refresh</Button>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};

export default AboutPage;