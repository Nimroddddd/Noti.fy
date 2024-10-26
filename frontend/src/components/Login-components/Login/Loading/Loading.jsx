import React from "react";
import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div class="loader">
      <p>Please wait...</p>
      <ClipLoader />  
    </div>
  )
}
