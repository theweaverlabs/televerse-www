import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
    title: "Keyboards",
    description: "Learn how to build interactive Telegram bots using Reply Keyboards and Inline Keyboards with Televerse's fluent API.",
};

// Reply Keyboard Examples
const basicKeyboardCode = `final keyboard = Keyboard()
    .text("📱 Account")
    .row()
    .text("⚙️ Settings")
    .text("🤌 Nevermind");

await ctx.reply("Please choose an option:", replyMarkup: keyboard);`;

const keyboardFromArrayCode = `// Create keyboard from 2D string array
final keyboard = Keyboard.from([
  ["Yes", "No"],
  ["Maybe", "Cancel"]
]);

// Create a grid layout (3 columns)
final numpad = Keyboard.grid(
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"],
  columns: 3,
);

// Single row of buttons
final quick = Keyboard.singleRow(["Option A", "Option B", "Option C"]);

// Single column of buttons
final menu = Keyboard.column(["Start", "Help", "Settings"]);`;

const keyboardConfigCode = `final keyboard = Keyboard()
    .text("Submit")
    .row()
    .text("Cancel")
    .resized()           // Fit keyboard to screen
    .oneTime()           // Hide after button tap
    .persistent()        // Always show keyboard
    .placeholder("Select an option...");`;

const specialButtonsCode = `final keyboard = Keyboard()
    .requestContact("📞 Share Contact")
    .requestLocation("📍 Share Location")
    .row()
    .users(
      text: "👤 Select User",
      requestId: 1,
      userIsBot: false,
    )
    .chat(
      text: "💬 Select Chat",
      requestId: 2,
    )
    .row()
    .poll("📊 Create Poll", type: PollType.quiz)
    .webApp("🌐 Open App", "https://example.com");`;

const handleKeyboardCode = `// When the user taps a button, its text is sent as a message
bot.text("⚙️ Settings", (ctx) async {
  await ctx.reply("Here are your settings.");
});

// Handle multiple options
bot.text("📱 Account", (ctx) => ctx.reply("Account details..."));
bot.text("🤌 Nevermind", (ctx) => ctx.reply("Okay, no problem!"));`;

const removeKeyboardCode = `// Remove the keyboard from the user's screen
await ctx.reply(
  "Keyboard removed!",
  replyMarkup: Keyboard.remove(),
);`;

// Inline Keyboard Examples
const inlineBasicCode = `final keyboard = InlineKeyboard()
    .text("👍 Like", "like")
    .text("👎 Dislike", "dislike")
    .row()
    .url("🌐 Visit Website", "https://televerse.weaverlabs.ca");

await ctx.reply("Rate this bot:", replyMarkup: keyboard);`;

const inlinePaginationCode = `final keyboard = InlineKeyboard()
    .text("<< 1", "page_first")
    .text("< 3", "page_prev")
    .text("• 4 •", "page_current")
    .text("5 >", "page_next")
    .text("10 >>", "page_last")
    .row()
    .url("🌐 Search on Web", "https://google.com/search?q=...");

await ctx.reply("Results Page 4.", replyMarkup: keyboard);`;

const inlineFromArrayCode = `// Create from (text, callbackData) records
final keyboard = InlineKeyboard.from([
  [("Yes", "answer_yes"), ("No", "answer_no")],
  [("Maybe", "answer_maybe")],
]);

// Grid layout with 3 columns
final options = InlineKeyboard.grid([
  ["A", "opt_a"], ["B", "opt_b"], ["C", "opt_c"],
  ["D", "opt_d"], ["E", "opt_e"], ["F", "opt_f"],
], columns: 3);`;

const inlineAdvancedCode = `final keyboard = InlineKeyboard()
    .text("Callback Button", "data")
    .url("Open URL", "https://example.com")
    .row()
    .webApp("Launch App", "https://app.example.com")
    .login("Auth Login", "https://auth.example.com")
    .row()
    .switchInline("Share", "check this out")
    .switchInlineCurrentChat("Search Here", "query")
    .row()
    .pay("💳 Pay Now")
    .copyText("📋 Copy", copyText: "ABC123");`;

const handleCallbackCode = `// Handle specific callback data
bot.callbackQuery("like", (ctx) async {
  await ctx.answerCallbackQuery(text: "Thanks for liking! ❤️");
  await ctx.editMessageText("You liked this message!");
});

// Handle with pattern matching
bot.callbackQuery(RegExp(r'^page_'), (ctx) async {
  final action = ctx.callbackQuery!.data;
  // Parse action and update pagination...
  await ctx.editMessageText("Page updated!");
});`;

export default function KeyboardsPage() {
    return (
        <DocContent
            title="Keyboards"
            description="Create interactive bot experiences with Reply and Inline Keyboards."
        >
            <section className="mt-8">
                <p>
                    Telegram bots support two types of keyboards that enhance user interaction:
                    <strong> Reply Keyboards</strong> (custom keyboards that appear below the chat) and
                    <strong> Inline Keyboards</strong> (buttons attached directly to messages).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <div className="text-xl font-medium mb-3 text-white">Reply Keyboard</div>
                        <p className="text-gray-400 text-sm mb-4">
                            Appears below the message input. When tapped, sends the button text as a regular message.
                        </p>
                        <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                            <li>Replaces the default keyboard</li>
                            <li>Great for menu navigation</li>
                            <li>Can request contact/location</li>
                        </ul>
                    </div>
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <div className="text-xl font-medium mb-3 text-white">Inline Keyboard</div>
                        <p className="text-gray-400 text-sm mb-4">
                            Attached to messages. Triggers a callback query without sending a message.
                        </p>
                        <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                            <li>Stays with the message</li>
                            <li>Perfect for actions & navigation</li>
                            <li>Can open URLs & web apps</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Reply Keyboard Section */}
            <section className="mt-16">
                <h2>Reply Keyboard</h2>
                <p>
                    The <code>Keyboard</code> class provides a fluent API for building reply keyboards.
                    Instead of manually constructing <code>ReplyKeyboardMarkup</code> with nested arrays,
                    you can chain methods to build keyboards intuitively.
                </p>

                <div className="my-8 flex justify-center">
                    <Image
                        src="/assets/keyboards/keyboard.png"
                        alt="Reply Keyboard Example"
                        width={600}
                        height={200}
                        className="rounded-lg border border-white/10"
                    />
                </div>

                <h3>Basic Usage</h3>
                <p className="mt-4">
                    Use <code>.text()</code> to add buttons and <code>.row()</code> to start a new row:
                </p>
                <CodeBlock code={basicKeyboardCode} language="dart" filename="main.dart" />

                <h3 className="mt-10">Factory Constructors</h3>
                <p className="mt-4">
                    For common patterns, <code>Keyboard</code> provides convenient factory constructors:
                </p>
                <CodeBlock code={keyboardFromArrayCode} language="dart" filename="main.dart" />

                <h3 className="mt-10">Configuration Options</h3>
                <p className="mt-4">
                    Customize keyboard behavior with configuration methods:
                </p>
                <CodeBlock code={keyboardConfigCode} language="dart" filename="main.dart" />

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 font-medium text-white">Method</th>
                                <th className="text-left py-3 px-4 font-medium text-white">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>resized()</code></td>
                                <td className="py-3 px-4">Resize keyboard vertically for optimal fit</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>oneTime()</code></td>
                                <td className="py-3 px-4">Hide keyboard after a button is tapped</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>persistent()</code></td>
                                <td className="py-3 px-4">Always show keyboard when regular keyboard is hidden</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>placeholder(text)</code></td>
                                <td className="py-3 px-4">Show placeholder text in input field</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>makeSelective()</code></td>
                                <td className="py-3 px-4">Show keyboard to specific users only</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="mt-10">Special Buttons</h3>
                <p className="mt-4">
                    Reply keyboards support special button types for requesting user data:
                </p>
                <CodeBlock code={specialButtonsCode} language="dart" filename="main.dart" />

                <h3 className="mt-10">Handling Keyboard Taps</h3>
                <p className="mt-4">
                    When a button is tapped, its text is sent as a regular message. Use <code>bot.text()</code> to handle it:
                </p>
                <CodeBlock code={handleKeyboardCode} language="dart" filename="main.dart" />

                <h3 className="mt-10">Removing the Keyboard</h3>
                <p className="mt-4">
                    To remove the custom keyboard and show the default system keyboard:
                </p>
                <CodeBlock code={removeKeyboardCode} language="dart" filename="main.dart" />
            </section>

            {/* Inline Keyboard Section */}
            <section className="mt-16">
                <h2>Inline Keyboard</h2>
                <p>
                    The <code>InlineKeyboard</code> class provides a fluent API for building inline keyboards.
                    Inline buttons appear directly on messages and trigger callback queries instead of sending messages.
                </p>

                <div className="my-8 flex justify-center">
                    <Image
                        src="/assets/keyboards/inline-keyboard.png"
                        alt="Inline Keyboard Example"
                        width={600}
                        height={150}
                        className="rounded-lg border border-white/10"
                    />
                </div>

                <h3>Basic Usage</h3>
                <p className="mt-4">
                    Use <code>.text(label, callbackData)</code> to add callback buttons:
                </p>
                <CodeBlock code={inlineBasicCode} language="dart" filename="main.dart" />

                <h3 className="mt-10">Pagination Example</h3>
                <p className="mt-4">
                    Inline keyboards are perfect for pagination and navigation controls:
                </p>
                <CodeBlock code={inlinePaginationCode} language="dart" filename="main.dart" />

                <h3 className="mt-10">Factory Constructors</h3>
                <p className="mt-4">
                    Build keyboards from arrays using factory constructors:
                </p>
                <CodeBlock code={inlineFromArrayCode} language="dart" filename="main.dart" />

                <h3 className="mt-10">Button Types</h3>
                <p className="mt-4">
                    Inline keyboards support various button types for different actions:
                </p>
                <CodeBlock code={inlineAdvancedCode} language="dart" filename="main.dart" />

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 font-medium text-white">Method</th>
                                <th className="text-left py-3 px-4 font-medium text-white">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>text(label, data)</code></td>
                                <td className="py-3 px-4">Callback button with custom payload</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>url(label, url)</code></td>
                                <td className="py-3 px-4">Opens a URL in browser</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>webApp(label, url)</code></td>
                                <td className="py-3 px-4">Opens a Telegram Web App</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>login(label, url)</code></td>
                                <td className="py-3 px-4">Telegram Login button</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>switchInline(label, query)</code></td>
                                <td className="py-3 px-4">Switch to inline mode in another chat</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>switchInlineCurrentChat()</code></td>
                                <td className="py-3 px-4">Switch to inline mode in current chat</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>pay(label)</code></td>
                                <td className="py-3 px-4">Payment button (invoices only)</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>copyText(label, copyText:)</code></td>
                                <td className="py-3 px-4">Copy text to clipboard</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 px-4"><code>game(label)</code></td>
                                <td className="py-3 px-4">Launch a Telegram game</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="mt-10">Handling Callback Queries</h3>
                <p className="mt-4">
                    When an inline button is pressed, a callback query is sent. Use <code>bot.callbackQuery()</code> to handle it:
                </p>
                <CodeBlock code={handleCallbackCode} language="dart" filename="main.dart" />

                <div className="mt-6 p-4 border border-blue-500/20 bg-blue-500/10 rounded-lg">
                    <p className="text-sm">
                        <strong>Tip:</strong> Always call <code>ctx.answerCallbackQuery()</code> to acknowledge the callback.
                        This removes the loading indicator from the button.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2>See Also</h2>
                <ul>
                    <li>
                        <Link href="/docs/core-concepts/context" className="text-white font-medium">
                            Context
                        </Link>
                        {" "}- Learn about reply methods and context properties.
                    </li>
                    <li>
                        <Link href="/docs/core-concepts/bot" className="text-white font-medium">
                            Bot Class
                        </Link>
                        {" "}- Understand how to handle updates with the Bot class.
                    </li>
                </ul>
            </section>
        </DocContent>
    );
}
