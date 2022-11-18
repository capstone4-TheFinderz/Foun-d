import React from "react";
import "./FAQs.scss";
export default function FAQs() {
  return (
    <div>
      <h1>How can we help you?</h1>
      <br />

      <input
        type="text"
        id="userInput"
        placeholder="Type keywords to find answers"
      ></input>
      <h3>Payment</h3>
      <ol>How do I pay a finder?</ol>

      <h3>Finders Program</h3>
      <ol>How do I become a finder?</ol>
      <ol>Does being a Finder pay?</ol>

      <h3>Lost Property</h3>
      <ol>What happens if I don't retrive my items right away?</ol>
    </div>
  );
}
