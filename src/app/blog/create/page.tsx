'use client'
import { useState } from "react";


export default function Home() {
  const [solicitude, setSolicitude] = useState("");
  const [result, setResult] = useState("");

  async function onSubmit(event:any) {
    event.preventDefault();
    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ solicitude }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }


      console.log(data);
      setResult(data.result);
      setSolicitude("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
    //   alert(error.message);
    }
  }

  return (
    <div>


      <main >
        {/* <img src="/dog.png" className={styles.icon} /> */}
        <h3>Create Entry</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="topic"
            placeholder="Enter an topic"
            value={solicitude}
            onChange={(e) => setSolicitude(e.target.value)}
          />
          <input type="submit" value="Generate Topic" />
            
        </form>
        <div  dangerouslySetInnerHTML={{ __html: result }}></div>
      </main>
    </div>
  );
}
