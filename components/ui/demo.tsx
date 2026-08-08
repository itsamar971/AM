import React from "react";
import { SpinningText } from "@/components/ui/spinning-text";

function SpinningTextBasic() {
  return (
    <SpinningText
      radius={5}
      fontSize={1.2}
      className="font-medium leading-none"
    >
      {`pre-order • pre-order • pre-order • `}
    </SpinningText>
  );
}

function SpinningTextCustomTransition() {
  return (
    <SpinningText
      radius={7}
      fontSize={1}
      duration={6}
      transition={{ ease: "easeInOut", repeat: Infinity }}
      className="font-mono"
    >
      {`motion-primitives • motion-primitives • `}
    </SpinningText>
  );
}

export { SpinningTextBasic, SpinningTextCustomTransition };

