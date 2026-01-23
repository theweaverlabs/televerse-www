import type { Metadata } from "next";
import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
    title: "Context Class",
    description: "Learn about the Context class in Televerse, your main interface for handling updates and interacting with Telegram.",
};

const accessCode = `bot.on(bot.filters.message, (ctx) => {
  // Access the message text
  print(ctx.text);
  
  // Access the user who sent it
  print(ctx.from?.firstName);
  
  // Access the chat
  print(ctx.chat?.title);
});`;

const shortcutsCode = `// Instead of:
// final text = ctx.update.message?.text ?? 
//             ctx.update.channelPost?.text ?? 
//             ctx.update.callbackQuery?.message?.text;

// You can simply use:
final text = ctx.text;

// Instead of checking multiple places for the user:
final user = ctx.from;`;

const methodsCode = `bot.command('start', (ctx) async {
  // Simple reply (auto-detects chat ID)
  await ctx.reply("Hello! 👋");
  
  // Reply with photo
  final photo = InputFile.fromFile(File('welcome.jpg'));
  await ctx.replyWithPhoto(photo, caption: "Welcome to the bot!");
  
  // Send a sticker
  await ctx.replyWithSticker(
    InputFile.fromFileId('CAACAgIAAxkBAAIEal...'),
  );
});`;

const middlewareDataCode = `// In your authentication middleware
bot.use((ctx, next) async {
  final user = await database.getUser(ctx.from?.id);
  
  // Store user data in context
  ctx.set('db_user', user);
  
  await next();
});

// In your command handler
bot.command('profile', (ctx) {
  // Retrieve the data
  final user = ctx.get<UserConfig>('db_user');
  
  ctx.reply("Hello \${user.name}!");
});`;

const commandParsingCode = `// User sends: /ban @baduser spamming

bot.command('ban', (ctx) {
  // ctx.command -> "ban"
  
  // ctx.args -> ["@baduser", "spamming"]
  final target = ctx.args[0];
  final reason = ctx.args.sublist(1).join(' ');
  
  ctx.reply("Banning $target for $reason");
});`;

const patternMatchingCode = `// Match email addresses
bot.hears(RegExp(r'[a-zA-Z0-9._]+@[a-z]+\.[a-z]+'), (ctx) {
  // Access the matches
  final email = ctx.matches.first.group(0);
  
  ctx.reply("Found email: $email");
});`;

export default function ContextPage() {
    return (
        <DocContent
            title="Context Class"
            description="The context of a Telegram update."
        >
            <section className="mt-8">
                <p>
                    The <code>Context</code> class is arguably the most important component you'll interact with when building a bot.
                    Whenever Televerse receives an update from Telegram, it wraps that update in a <code>Context</code> object.
                </p>
                <p className="mt-4">
                    This object does three things:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
                    <li>Holds the <code>Update</code> data (message, callback query, etc.).</li>
                    <li>Provides convenient "shortcuts" or getters to access common data.</li>
                    <li>Exposes methods to reply or perform actions in the context of that update.</li>
                </ul>
            </section>

            {/* Core Properties */}
            <section className="mt-12">
                <h2>Core Properties</h2>
                <p>
                    Every context instance exposes these fundamental properties:
                </p>
                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-700/50">
                                <th className="py-2 pr-4 font-medium text-blue-400">Property</th>
                                <th className="py-2 pr-4 font-medium text-blue-400">Type</th>
                                <th className="py-2 font-medium text-blue-400">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-gray-800/50">
                                <td className="py-3 pr-4 font-mono text-xs">ctx.update</td>
                                <td className="py-3 pr-4 font-mono text-xs text-purple-400">Update</td>
                                <td className="py-3 text-gray-400">The raw update object received from Telegram.</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-3 pr-4 font-mono text-xs">ctx.api</td>
                                <td className="py-3 pr-4 font-mono text-xs text-purple-400">RawAPI</td>
                                <td className="py-3 text-gray-400">Access to all Telegram Bot API methods.</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                                <td className="py-3 pr-4 font-mono text-xs">ctx.me</td>
                                <td className="py-3 pr-4 font-mono text-xs text-purple-400">BotInfo</td>
                                <td className="py-3 text-gray-400">Information about your bot (username, ID, etc.).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Smart Getters */}
            <section className="mt-12">
                <h2>Smart Getters</h2>
                <p>
                    Telegram updates can be complex. A "text message" might come from a private chat, a group, a channel post, or even an edited message.
                    The <code>Context</code> class provides smart getters that abstract away this complexity.
                </p>
                <CodeBlock code={shortcutsCode} language="dart" filename="handler.dart" />

                <h3 className="mt-6">Common Getters</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <li className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <code className="text-blue-300">ctx.msg</code>
                        <p className="text-sm mt-1 text-gray-400">The effective message. Checks <code>message</code>, <code>editedMessage</code>, <code>channelPost</code>, etc.</p>
                    </li>
                    <li className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <code className="text-blue-300">ctx.from</code>
                        <p className="text-sm mt-1 text-gray-400">The user who triggered the update. Works for messages, callbacks, inline queries, etc.</p>
                    </li>
                    <li className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <code className="text-blue-300">ctx.chat</code>
                        <p className="text-sm mt-1 text-gray-400">The conversation where the update happened.</p>
                    </li>
                    <li className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <code className="text-blue-300">ctx.text</code>
                        <p className="text-sm mt-1 text-gray-400">The text content of the message or caption.</p>
                    </li>
                </ul>
            </section>

            {/* Context-Aware Methods */}
            <section className="mt-12">
                <h2>Context-Aware Methods</h2>
                <p>
                    Instead of using <code>bot.api.sendMessage(chatId, "Hello")</code> and manually passing the chat ID,
                    <code>Context</code> provides methods that "know" where to reply.
                </p>
                <CodeBlock code={methodsCode} language="dart" filename="commands.dart" />
                <p className="mt-4">
                    Available methods include <code>reply</code>, <code>replyWithPhoto</code>, <code>replyWithAudio</code>, <code>replyWithVideo</code>,
                    <code>replyWithDocument</code>, <code>replyWithSticker</code>, <code>replyWithLocation</code>, and many more.
                </p>
            </section>

            {/* Command Parsing */}
            <section className="mt-12">
                <h2>Command Parsing</h2>
                <p>
                    When dealing with commands, <code>Context</code> automatically parses the command and its arguments.
                </p>
                <CodeBlock code={commandParsingCode} language="dart" filename="commands.dart" />
            </section>

            {/* Pattern Matching */}
            <section className="mt-12">
                <h2>Pattern Matching</h2>
                <p>
                    If you use <code>bot.hears</code> with a <code>RegExp</code>, the matches are automatically stored in the context.
                </p>
                <CodeBlock code={patternMatchingCode} language="dart" filename="regex.dart" />
            </section>

            {/* Middleware Data */}
            <section className="mt-12">
                <h2>Passing Data (Middleware)</h2>
                <p>
                    You can use the <code>Context</code> to pass data between middlewares. This is useful for authentication,
                    session management, or passing database objects to your handlers.
                </p>
                <CodeBlock code={middlewareDataCode} language="dart" filename="middleware.dart" />
            </section>

            <section className="mt-12">
                <h2>Next Steps</h2>
                <ul>
                    <li>
                        <Link href="/docs/core-concepts/bot" className="text-white font-medium">
                            Bot Class
                        </Link>
                        - Learn about the main Bot class.
                    </li>
                    <li>
                        <Link href="/docs/features/middleware" className="text-white font-medium">
                            Middleware
                        </Link>
                        - Dive deeper into the middleware system.
                    </li>
                </ul>
            </section>
        </DocContent>
    );
}
