"use client"; 
export default function Page() {
  return (
    <main>
      <button
      onClick={async () => {
       await fetch("/api/email", {method: "GET"});
      }}
       >
        SendEmail
        </button>
     
    </main>
  );
}