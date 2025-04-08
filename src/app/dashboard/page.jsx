"use client";

import { authClient } from "../../lib/auth-client";

export default function Dashboard() {

  const { data } = authClient.getSession()


  return <h1>WelCome {data.user}</h1 >
}