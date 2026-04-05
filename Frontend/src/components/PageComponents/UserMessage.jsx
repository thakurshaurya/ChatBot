import { useState } from "react";
import axios from "axios";

function UserMessage({ setMessages }) {
    const [input, setInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isSending) return;
        const userMessage = {
            id: crypto.randomUUID(),
            sender: "user",
            text: trimmed,
        };
        setIsSending(true);
        setMessages((prev) => [
            ...prev,
            userMessage]);
        try {
            const res = await axios.post("https://chatbotbackend-3v33.onrender.com",
                { message: trimmed, });
            const botReply = res.data?.reply ?? "Sorry, I could not generate a reply.";
            setMessages((prev) => [...prev, {
                id: crypto.randomUUID(),
                sender: "bot",
                text: botReply,
            },
            ]);
            setInput("");
        } catch (error) {
            setMessages((prev) => [...prev, {
                id: crypto.randomUUID(),
                sender: "bot",
                text: "The backend request failed. Please try again.",
            },
            ]);
        } finally {
            setIsSending(false);
        }
    };
    const submitHandler = (e) => {
        e.preventDefault();
        sendMessage();
    };
    return (
        <>
            <form onSubmit={submitHandler}>
                <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-xl backdrop-blur md:p-5">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-rose-400" />
                        <span className="h-2 w-2 rounded-full bg-amber-300" />
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <p className="ml-2 text-xs uppercase tracking-[0.18em] text-slate-400">Ask Anything</p>
                    </div>
                    <div className="mt-3 space-y-2">
                        <div className=" flex gap-3 rounded-xl border border-slate-200/15 bg-slate-800/70 p-3 text-sm text-slate-200">
                            <input type="text" className="mt-1 p-3 text-slate-100 h-10 w-full outline-none" placeholder="Type Here...."
                                onChange={(e) => {
                                    setInput(e.target.value)
                                }} value={input}
                            />
                            <button type="submit" disabled={isSending} className="rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60">
                                {isSending ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </div>
                </section>

            </form>
        </>
    )
}

export default UserMessage
