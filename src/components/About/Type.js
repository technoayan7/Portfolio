import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Know Who I'M",
        ],
        autoStart: true,
        loop: true,  // Changed from false to true
        deleteSpeed: 30,
      }}
    />
  );
}

export default Type;
