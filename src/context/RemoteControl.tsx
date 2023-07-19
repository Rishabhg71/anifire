import React, { useEffect, useCallback, useState, useRef } from "react";

type RemoteEventType =
  | "forward"
  | "backward"
  | "up"
  | "down"
  | "play-pause"
  | "go-back"
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
    if (key === "GoBack") e = "go-back";
    if (key === " ") e = "play-pause";

    Object.keys(eventFunctions.current).map((key) =>
      eventFunctions.current[key](e)
    );
  }, []);

  const AmazonFireRemoteEvents = () => {
    //API code goes here
    console.log("Now connected to Firetv api");
    // document.addEventListener("pause", function (){ console.log("PRESSED PAUSE")}, false);
    // document.addEventListener("resume", function (){console.log("PRESSED RESUME")}, false);

    // document.addEventListener("keydown", (e) => {
    //   console.log("DPAD PRESSED", e.code);
    // });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    document.addEventListener(
      "amazonPlatformReady",
      AmazonFireRemoteEvents,
      false
    );
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
      document.removeEventListener(
        "amazonPlatformReady",
        AmazonFireRemoteEvents
      );
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
