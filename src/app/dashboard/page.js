import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <div>
        <Link href="/dashboard/public-page">settings</Link>
      </div>
      <div>
        <Link href="/dashboard/connect/whatsapp">whatsapp</Link>
      </div>
    </div>
  );
}
