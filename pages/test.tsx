import React from "react";

const TestPage = () => {
  const now = new Date().toLocaleTimeString();

  return (
    <div>
      // Time
      <div>
        <h1> Time</h1>
        <p> Time of page load: {now}</p>
      </div>
  
      // Title
      <div>
        <h1>This is the Test Page</h1>
        <p>Welcome to your new blank page!</p>
      </div>
    </div>
  );
};

export default TestPage;
