"use client";

import { GithubIcon, LoadingCircle, SendIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { examples, site } from "@/config";
import va from "@vercel/analytics";
import { useChat } from "ai/react";
import clsx from "clsx";
import { Bot, User } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import Textarea from "react-textarea-autosize";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        va.track("Rate limited");
        return;
      } else {
        va.track("Chat initiated");
      }
    },
    onError: (error) => {
      va.track("Chat errored", {
        input,
        error: error.message,
      });
    },
  });

  const disabled = isLoading || input.length === 0;

  return (
    <main className="flex flex-col items-center justify-between pb-40">
      <div className="flex w-full items-center justify-between p-5 border-b">
        <Link
          href="/"
          target="_blank"
          className={buttonVariants({ variant: "link" })}
        >
          <h1 className="font-bold leading-tight">ChatNR</h1>
        </Link>
        <div className="flex items-center">
          <ThemeToggle />
          <Link
            href="https://github.com/gneiru/chatnr"
            target="_blank"
            className={buttonVariants({ variant: "link", size: "icon" })}
          >
            <GithubIcon />
          </Link>
        </div>
      </div>
      {messages.length > 0 ? (
        messages.map((message, i) => (
          <div
            key={i}
            className={clsx(
              "flex w-full items-center justify-center border-b py-8 ",
              message.role !== "user" && "bg-gray-100 dark:bg-gray-900"
            )}
          >
            <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
              <div
                className={clsx(
                  "p-1.5 text-white",
                  message.role === "assistant"
                    ? "bg-green-500"
                    : "bg-neutral-700"
                )}
              >
                {message.role === "user" ? (
                  <User width={20} />
                ) : (
                  <Bot width={20} />
                )}
              </div>
              <ReactMarkdown
                className="prose mt-1 w-full break-words prose-p:leading-relaxed"
                remarkPlugins={[remarkGfm]}
                components={{
                  // open links in new tab
                  a: (props) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))
      ) : (
        <div className="border-gray-200 sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border sm:w-full">
          <div className="flex flex-col space-y-4 p-7 sm:p-10">
            <h1 className="text-lg font-semibold">Welcome to {site.name}</h1>
            <p className="text-gray-500">{site.description}</p>
          </div>
          <div className="flex flex-col space-y-4 border-t bg-gray-50  dark:bg-neutral-800 p-7 sm:p-10">
            {examples.map((example, i) => (
              <Button
                key={i}
                className="border transition-all duration-75 bg-background hover:border-black dark:hover:border-white text-gray-500 dark:text-gray-400 justify-start flex-1 items-center"
                variant={"ghost"}
                onClick={() => {
                  setInput(example);
                  inputRef.current?.focus();
                }}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 dark:via-neutral-900 dark:to-neutral-900 to-gray-100 p-5 pb-3 sm:px-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-white dark:bg-black dark:border-gray-800 px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4 dark:shadow-gray-600"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none dark:bg-black"
          />
          <button
            className={clsx(
              "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
              disabled
                ? "cursor-not-allowed bg-white dark:bg-black"
                : "bg-green-500 hover:bg-green-600"
            )}
            disabled={disabled}
          >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-4 w-4",
                  input.length === 0
                    ? "text-gray-300 dark:text-gray-700"
                    : "text-white dark:text-black"
                )}
              />
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
