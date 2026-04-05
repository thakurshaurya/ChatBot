import UserMessage from "./PageComponents/UserMessage"
import ChatList from "./PageComponents/ChatList"
import { useEffect, useRef, useState } from "react";
function Main() {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages]);

    return (
        <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(56,189,248,0.3),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(232,121,249,0.24),transparent_35%)] pointer-events-none" />
                <div className=" relative z-10 mx-auto min-h-screen flex w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-6 lg:py-14">
                    <div className="flex h-120 flex-col rounded-3xl border border-white/10 bg-slate-900/55 p-5 shadow-2xl backdrop-blur md:p-8 lg:p-10">
                        <span className="inline-flex w-fit rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-sky-200">AI CHAT SYSTEM</span>
                        <div className="mt-5 flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto pr-2">
                            <ChatList messages={messages}/>
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div>
                        <UserMessage setMessages={setMessages} />
                    </div>
                </div>
        </>
    )
}

export default Main
