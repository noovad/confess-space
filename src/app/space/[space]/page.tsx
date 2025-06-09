"use client";

import React, { useEffect, useRef } from "react";
import Chat from "./components/chat";
import { messages } from "@/data/messages";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formatDate, formatReadableDate } from "@/utils/date-utils";

interface SpaceDetailProps {
  params: { space: string };
}

const DummySpaceDetail: React.FC<SpaceDetailProps> = ({}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <main className="h-screen p-4">
      <section className="flex h-full w-full flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Channel name</h1>
            <span className="text-xs text-muted-foreground">34 Members</span>
          </div>
          <p className="text-xs text-muted-foreground">small</p>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto mt-5 p-2 flex flex-col-reverse gap-2"
        >
          {messages.slice().map((msg, i, arr) => {
            const currentDate = formatDate(msg.timestamp); // misal: "2025-06-08"
            const nextDate = arr[i + 1]
              ? formatDate(arr[i + 1].timestamp)
              : null;

            const showDateDivider = currentDate !== nextDate;

            return (
              <React.Fragment key={msg.id}>
                <Chat message={msg} nextMessage={arr[i + 1]} />

                {showDateDivider && (
                  <div className="text-center text-sm text-gray-500 my-4">
                    {formatReadableDate(currentDate)}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

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
      </section>
    </main>
  );
};

export default DummySpaceDetail;
