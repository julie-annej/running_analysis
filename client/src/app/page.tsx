// import { useState } from "react";

// import { Link } from "@mui/material";
import Button from "@mui/material/Button";

const stravaAuthorizationURL = `https://www.strava.com/api/v3/oauth/authorize?client_id=${process.env.APP_ID}&redirect_uri=http://localhost:3005/login/&response_type=code&approval_prompt=force&scope=activity:read_all&state=test`

export default function Home() {
  return (
    <div>
      <h1>Welcome to my running app</h1>
      <Button variant="contained" href={stravaAuthorizationURL}>Connect to Strava</Button>
      {/* <Link href="/login" variant="overline">Login</Link> */}
      {/* <Button variant="contained" href="/login">Login</Button> */}
    </div>
  );
  
}
