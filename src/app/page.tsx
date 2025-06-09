import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect the root page to the app route group
  redirect("/space");

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 sm:p-20 pb-20 gap-16 justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex flex-col gap-10 items-center text-center sm:text-left">
        <div className="flex aspect-square size-32 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <MessageSquare className="size-30" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome to Confess Space
        </h1>
        <p className="text-muted-foreground max-w-xl text-sm sm:text-base leading-relaxed">
          An anonymous space to express your thoughts, ideas, and confessions.
          Join or create a space and start the conversation.
        </p>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Link
            href="/spaces"
            className="rounded-full bg-foreground text-background px-5 py-3 text-sm sm:text-base font-medium hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors text-center"
          >
            Explore Spaces
          </Link>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-muted-foreground">
        <a href="/about" className="hover:underline hover:underline-offset-4">
          About
        </a>
        <a href="/privacy" className="hover:underline hover:underline-offset-4">
          Privacy
        </a>
        <a
          href="https://github.com/your-org/confess-space"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:underline-offset-4"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
