import type { Metadata } from "next";
import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
    title: "Getting Started",
    description: "Learn how to build your first Telegram bot with Televerse. From 'Hello World' to handling commands and updates.",
};

const basicBotCode = `import 'package:televerse/televerse.dart';

void main() async {
  // Create a new bot instance
  final bot = Bot('YOUR_BOT_TOKEN');

  // Handle the /start command
  bot.command('start', (ctx) => ctx.reply('🚀 Welcome to Televerse!'));

  // Start listening for updates
  await bot.start();
}`;

const commandsCode = `// Handle the /help command
bot.command('help', (ctx) async {
  await ctx.reply('''
Available commands:
/start - Start the bot
/help - Show this message
/settings - Bot settings
  ''');
});

// Handle the /settings command
bot.settings((ctx) async {
  await ctx.reply('⚙️ Settings menu coming soon!');
});`;

const filtersCode = `// Listen for photo messages
bot.on(bot.filters.photo, (ctx) async {
  await ctx.reply('Nice photo! 📸');
});

// Listen for messages matching a pattern
bot.hears(RegExp(r'(?i)hello'), (ctx) async {
  await ctx.reply('Hello there! 👋');
});

// Custom filter - long messages
bot.filter(
  (ctx) => (ctx.text?.length ?? 0) > 100,
  (ctx) async {
    await ctx.reply('That was quite a long message!');
  },
);`;

const errorHandlingCode = `// Global error handler
bot.onError((err) async {
  print('Error: \${err.error}');
  
  // Reply to the user if context is available
  if (err.hasContext) {
    await err.ctx!.reply('Oops! Something went wrong.');
  }
});`;

const contextCode = `bot.command('profile', (ctx) async {
  // Access update information
  final user = ctx.from;
  final chatId = ctx.chat?.id;
  final messageText = ctx.text;
  
  // Reply to the user
  await ctx.reply('''
👤 User: \${user?.firstName}
🆔 Chat ID: \$chatId
💬 Your message: \$messageText
  ''');
});`;

export default function GettingStartedPage() {
    return (
        <DocContent
            title="Getting Started"
            description="Create your first Telegram bot with Televerse in under 5 minutes."
        >
            {/* Prerequisites */}
            <section className="mt-8">
                <h2>Prerequisites</h2>
                <p>
                    Before we begin, make sure you have:
                </p>
                <ul>
                    <li>
                        <Link href="/docs/installation" className="text-white font-medium">
                            Installed Televerse
                        </Link>
                    </li>
                    <li>
                        A bot token from{" "}
                        <Link href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer">
                            @BotFather
                        </Link>{" "}
                        on Telegram
                    </li>
                </ul>
            </section>

            {/* Creating Your First Bot */}
            <section className="mt-12">
                <h2>Creating Your First Bot</h2>
                <p>
                    Let's create a simple bot that responds to the <code>/start</code> command.
                    Create a new file called <code>main.dart</code> and add the following code:
                </p>
                <CodeBlock code={basicBotCode} language="dart" filename="main.dart" />
                <p>
                    Replace <code>YOUR_BOT_TOKEN</code> with the token you received from BotFather,
                    then run the bot:
                </p>
                <CodeBlock code="dart run main.dart" language="bash" filename="terminal" />
                <p>
                    That's it! Your bot is now running. Open Telegram, find your bot, and send <code>/start</code>.
                </p>
            </section>

            {/* Understanding Context */}
            <section className="mt-12">
                <h2>Understanding Context</h2>
                <p>
                    Every handler receives a <code>Context</code> object (often named <code>ctx</code>).
                    This object contains all information about the incoming update and provides convenient
                    methods for replying:
                </p>
                <CodeBlock code={contextCode} language="dart" filename="main.dart" />
                <p>
                    The context provides access to:
                </p>
                <ul>
                    <li><code>ctx.message</code> — The incoming message object</li>
                    <li><code>ctx.from</code> — The user who sent the message</li>
                    <li><code>ctx.chat</code> — The chat where the message was sent</li>
                    <li><code>ctx.text</code> — The message text (shorthand)</li>
                    <li><code>ctx.api</code> — Direct access to all Bot API methods</li>
                </ul>
            </section>

            {/* Handling Commands */}
            <section className="mt-12">
                <h2>Handling Commands</h2>
                <p>
                    Televerse makes it easy to handle commands. You can use <code>bot.command()</code>
                    for any command, or use shortcuts like <code>bot.settings()</code> and <code>bot.help()</code>:
                </p>
                <CodeBlock code={commandsCode} language="dart" filename="main.dart" />
            </section>

            {/* Using Filters */}
            <section className="mt-12">
                <h2>Using Filters</h2>
                <p>
                    Televerse has a powerful filter system with 80+ built-in filters.
                    Use <code>bot.on()</code> to listen for specific types of updates:
                </p>
                <CodeBlock code={filtersCode} language="dart" filename="main.dart" />
                <p>
                    Learn more about the filter system in the{" "}
                    <Link href="/docs/features" className="text-white font-medium">
                        Features
                    </Link>{" "}
                    section.
                </p>
            </section>

            {/* Error Handling */}
            <section className="mt-12">
                <h2>Error Handling</h2>
                <p>
                    Always handle errors to prevent your bot from crashing unexpectedly:
                </p>
                <CodeBlock code={errorHandlingCode} language="dart" filename="main.dart" />
            </section>

            {/* Next Steps */}
            <section className="mt-12">
                <h2>Next Steps</h2>
                <p>
                    Congratulations! You've created your first Televerse bot. Here's what to explore next:
                </p>
                <ul>
                    <li>
                        <Link href="/docs/features" className="text-white font-medium">
                            Features
                        </Link>{" "}
                        — Discover all the powerful features Televerse offers
                    </li>
                    <li>
                        <Link href="https://pub.dev/documentation/televerse/latest/" target="_blank" rel="noopener noreferrer" className="text-white font-medium">
                            API Reference
                        </Link>{" "}
                        — Complete API documentation on pub.dev
                    </li>
                    <li>
                        <Link href="https://telegram.me/TeleverseDart" target="_blank" rel="noopener noreferrer" className="text-white font-medium">
                            Join the Community
                        </Link>{" "}
                        — Get help and share your bots on Telegram
                    </li>
                </ul>
            </section>
        </DocContent>
    );
}
