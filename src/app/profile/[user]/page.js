"use client";

export default function Page({ params }) {
  console.log(params);
  return (
    <p>
      {params.user}
      <button>testing</button>
    </p>
  );
}
