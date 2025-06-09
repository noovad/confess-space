"use client";

import React, { useEffect, useRef } from "react";
import Chat from "./components/Chat";
import { messages } from "@/data/messages";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formatDate, formatReadableDate } from "@/utils/date-utils";
import { JoinSpaceDialog } from "./components/JoinSpaceDialog";
import { LeaveSpaceDialog } from "./components/LeaveSpaceDialog";
import { Card } from "@/components/ui/card";
import { currentSpace } from "@/data/space";

interface SpaceDetailProps {
  params: { space: string };
}

const Space: React.FC<SpaceDetailProps> = ({}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const space = currentSpace;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  function isMemberOfSpace(): boolean {
    // Call API with params space.id to check if the user is a member of the space
    return false;
  }

  return (
    <main className="h-screen p-4">
      <section className="flex h-full w-full flex-col">
        <Card
          className="mb-4 flex flex-row items-center justify-between px-4 py-2 bg-white shadow-sm rounded-lg"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">{space.name}</h1>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">34 Members</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {space.description}
              </span>
            </div>
          </div>
          {isMemberOfSpace() ? <LeaveSpaceDialog /> : <JoinSpaceDialog />}
        </Card>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto flex flex-col-reverse gap-2"
        >
          {messages.slice().map((msg, i, arr) => {
            const currentDate = formatDate(msg.timestamp);
            const nextDate = arr[i + 1]
              ? formatDate(arr[i + 1].timestamp)
              : null;

            const showDateDivider = currentDate !== nextDate;

            return (
                <React.Fragment key={msg.id}>
                <Chat
                  message={msg}
                  nextMessage={showDateDivider ? undefined : arr[i + 1]}
                />

                {showDateDivider && (
                  <div className="text-center text-sm text-gray-500 my-4">
                  {formatReadableDate(currentDate)}
                  </div>
                )}
                </React.Fragment>
            );
          })}
        </div>
        {isMemberOfSpace() && (
          <div className="pt-8 flex gap-4 justify-center items-center">
            <Textarea
              placeholder="Type your message here."
              className="resize-none"
              spellCheck="false"
            />
            <Button size="icon">
              <Send />
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Space;
