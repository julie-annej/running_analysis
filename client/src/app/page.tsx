// import { useState } from "react";

// import Link from "next/link";
import Button from "@mui/material/Button";

const stravaAuthorizationURL = `https://www.strava.com/api/v3/oauth/authorize?client_id=${process.env.APP_ID}&redirect_uri=http://localhost:3005/&response_type=code&approval_prompt=force&scope=activity:read_all&state=test`


function ConnectStravaButton({ title }: { title: string }) {
  return (
    <Button variant="contained" href={stravaAuthorizationURL}>{title}</Button>
  );
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to my running app</h1>
      <Button variant="contained" href={stravaAuthorizationURL}>Connect to Strava</Button>
    </div>
  );
  
}
