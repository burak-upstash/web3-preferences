
import React, { useContext } from "react";

export default function Showcase(parameters) {
  // const { title, description } = useContext(FeedbackContext);

  // const userSettings = JSON.stringify(parameters).userSettings
  const userSettings = parameters.userSettings


  console.log("stuff", userSettings)

  const items = []
  if (userSettings) {


    const obj = userSettings[0]
    console.log(22222222222, userSettings, userSettings["accountID"])

    for (const key in userSettings) {
      console.log(key, userSettings[key])
      items.push(<li key={key}> {key}: {userSettings[key]} </li>)
    }

    // userSettings.forEach(element => {
    //   items.push(<li key={element}> {userSettings[element]} </li>)
    // });
  }

  return (
    <div className="chatbox-widget-header">
      <h2>{"Hi 👋"}</h2>
      <p>
        {"Ask us anything, or share your feedback."}
      </p>
      <p>Parameters:</p>
      {items}
    </div>
  );
}