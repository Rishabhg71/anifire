import React, { useEffect, useCallback, useState, useRef } from "react";

type RemoteEventType =
  | "forward"
  | "backward"
  | "up"
  | "down"
  | "play-pause"
  | null;

export const ControlsContext = React.createContext({
  registerEvent: (
    callback: (event: RemoteEventType) => void,
    key: string
  ) => {},
});

type QueueFunction = (event: RemoteEventType) => void;

export default function RemoteContolsContext({ children }: { children: any }) {
  const eventFunctions = useRef<{
    [k: string]: QueueFunction;
  }>({});

  const handleUserKeyPress = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    let e: RemoteEventType = null;
    if (key === "ArrowRight") e = "forward";
    if (key === "ArrowLeft") e = "backward";
    if (key === "ArrowDown") e = "down";
    if (key === "ArrowUp") e = "up";
    if (key === " ") e = "play-pause";

    Object.keys(eventFunctions.current).map((key) =>
      eventFunctions.current[key](e)
    );
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <ControlsContext.Provider
      value={{
        registerEvent: (callback, key: string) => {
          console.log("EVENT REGISTERED");
          eventFunctions.current = {
            ...eventFunctions.current,
            [key]: callback,
          };
        },
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
}
