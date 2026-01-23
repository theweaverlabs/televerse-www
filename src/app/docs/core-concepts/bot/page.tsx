import type { Metadata } from "next";
import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
    title: "Bot Class",
    description: "The Bot class is the core component of Televerse. Learn how to initialize, configure, and run your Telegram bot.",
};

const initializationCode = `import 'package:televerse/televerse.dart';

void main() {
  // Basic initialization
  final bot = Bot('YOUR_BOT_TOKEN');

  // With custom Context
  final myBot = Bot<MyContext>('YOUR_BOT_TOKEN');
}`;

const localBotCode = `// Initialize for local Bot API server
final bot = Bot.local(
  'YOUR_BOT_TOKEN',
  'http://localhost:8081',
);`;

const pollingCode = `void main() async {
  final bot = Bot('YOUR_BOT_TOKEN');
  
  // Start with Long Polling (default)
  await bot.start();
}`;

const webhookCode = `void main() async {
  final bot = Bot('YOUR_BOT_TOKEN');
  
  // Start with Webhook
  await bot.startWebhook(
    webhookUrl: 'https://your-domain.com/webhook',
    port: 3000,
  );
}`;

const methodsCode = `// Handle commands
bot.command('start', (ctx) => ctx.reply('Hello!'));

// Handle text patterns
bot.hears(RegExp(r'hello', caseSensitive: false), (ctx) => ctx.reply('Hi!'));

// Handle specific update types
bot.on(bot.filters.photo, (ctx) => ctx.reply('Nice photo!'));

// Handle errors
bot.onError((err) {
  print('Error: \${err.error}');
});`;

const apiAccessCode = `// Access the RawAPI methods directly
await bot.api.sendMessage(ChatID(123456789), 'Hello directly!');

// Get bot information
print('Bot ID: \${bot.me.id}');
print('Bot Username: @\${bot.me.username}');`;

export default function BotClassPage() {
    return (
        <DocContent
            title="Bot Class"
            description="The heart of your Telegram bot application."
        >
            <section className="mt-8">
                <p>
                    The <code>Bot</code> class is the central entity in the Televerse framework. It manages the connection to the Telegram Bot API,
                    handles incoming updates, and dispatches them to your middleware and listeners.
                    It extends the <code>Composer</code> class, giving it full access to all middleware and filter capabilities.
                </p>
            </section>

            {/* Initialization */}
            <section className="mt-12">
                <h2>Initialization</h2>
                <p>
                    To start using Televerse, you simply need to create an instance of the <code>Bot</code> class with your bot token.
                    You can also specify a custom <code>Context</code> type for type-safe middleware.
                </p>
                <CodeBlock code={initializationCode} language="dart" filename="main.dart" />

                <h3>Local Bot API</h3>
                <p className="mt-4">
                    If you are hosting your own local Telegram Bot API server, you can use the <code>Bot.local</code> constructor.
                </p>
                <CodeBlock code={localBotCode} language="dart" filename="main.dart" />
            </section>

            {/* Starting the Bot */}
            <section className="mt-12">
                <h2>Starting the Bot</h2>
                <p>
                    The <code>Bot</code> class supports multiple ways to receive updates from Telegram.
                </p>

                <h3>Long Polling</h3>
                <p className="mt-4">
                    The simplest way to start your bot is using Long Polling. This method actively asks Telegram for new updates.
                    It is the default behavior when you call <code>bot.start()</code>.
                </p>
                <CodeBlock code={pollingCode} language="dart" filename="main.dart" />

                <div className="my-6 p-4 border border-blue-500/20 bg-blue-500/10 rounded-lg">
                    <p className="text-sm">
                        <strong>Note:</strong> Long Polling is recommended for development and simple bots. For high-traffic production bots, Webhooks are preferred.
                    </p>
                </div>

                <h3>Webhooks</h3>
                <p className="mt-4">
                    Televerse has a built-in webhook server that makes it easy to run your bot on a server.
                    The <code>startWebhook</code> method automatically sets up a server and registers the webhook with Telegram.
                </p>
                <CodeBlock code={webhookCode} language="dart" filename="main.dart" />
            </section>

            {/* Handling Updates */}
            <section className="mt-12">
                <h2>Handling Updates</h2>
                <p>
                    Since <code>Bot</code> extends <code>Composer</code>, it provides all the methods you need to handle incoming updates.
                    You can listen for commands, text patterns, or specific event types.
                </p>
                <CodeBlock code={methodsCode} language="dart" filename="main.dart" />
                <p className="mt-4">
                    Under the hood, these methods register middleware that filters updates and executes your handler functions.
                </p>
            </section>

            {/* API Access */}
            <section className="mt-12">
                <h2>API Access</h2>
                <p>
                    The <code>Bot</code> class exposes the raw Telegram Bot API through the <code>api</code> property.
                    This allows you to call any Telegram method directly, even if it's not related to a specific update context.
                </p>
                <CodeBlock code={apiAccessCode} language="dart" filename="main.dart" />

                <h3 className="mt-6">Bot Information</h3>
                <p>
                    Once the bot is started, you can access information about the bot itself (like its ID, name, and username) via the <code>bot.me</code> getter.
                    This is equivalent to the data returned by <code>getMe</code>.
                </p>
            </section>

            {/* Stopping the Bot */}
            <section className="mt-12">
                <h2>Stopping the Bot</h2>
                <p>
                    To gracefully stop the bot, you can call <code>bot.stop()</code>.
                    This will close the update fetcher (whether Long Polling or Webhook) and release resources.
                </p>
                <CodeBlock code="await bot.stop();" language="dart" filename="main.dart" />
            </section>

            <section className="mt-12">
                <h2>See Also</h2>
                <ul>
                    <li>
                        <Link href="/docs/core-concepts/context" className="text-white font-medium hover:underline">
                            Context
                        </Link>
                        - Learn about the context object passed to handlers.
                    </li>
                    <li>
                        <Link href="/docs/features/middleware" className="text-white font-medium hover:underline">
                            Middleware
                        </Link>
                        - Understand how to use middleware in Televerse.
                    </li>
                </ul>
            </section>
        </DocContent>
    );
}
