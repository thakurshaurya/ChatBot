function ChatList({ messages }) {
    return (
        <div className="flex flex-col gap-4">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`p-4 rounded-xl ${
                        msg.sender === "user"
                            ? "self-end font-extrabold leading-tight text-white md:text-3xl"
                            : "self-start font-extrabold  text-emerald-300 md:text-2xl"
                    }`}
                >
                    {msg.text}
                </div>
            ))}
        </div>
    );
}
export default ChatList;
