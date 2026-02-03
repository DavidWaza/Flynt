"use client";

import { useEffect, useRef, useState } from "react";

export type SyncStage = "connecting" | "syncing" | "finalizing" | "done";

export default function useSync(onDone?: () => void) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<SyncStage>("connecting");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // start simulation
    let acc = 0;
    setStage("connecting");
    setProgress(4);

    timerRef.current = window.setInterval(() => {
      if (stage === "connecting") {
        acc += Math.random() * 6 + 4; // fast initial
        setProgress(Math.min(12 + acc, 25));
        if (acc > 10) {
          setStage("syncing");
          acc = 0;
        }
      } else if (stage === "syncing") {
        acc += Math.random() * 8 + 3;
        setProgress((p) => Math.min(25 + acc, 88));
        if (acc > 45) {
          setStage("finalizing");
          acc = 0;
        }
      } else if (stage === "finalizing") {
        acc += Math.random() * 8 + 6; // finish quickly
        setProgress((p) => {
          const next = Math.min(88 + acc, 100);
          if (next >= 100) {
            setStage("done");
            return 100;
          }
          return next;
        });
      } else {
        // done
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    }, 250);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // we intentionally don't include stage in deps so simulation flows deterministically
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stage === "done") {
      onDone?.();
    }
  }, [stage, onDone]);

  return { progress, stage };
}