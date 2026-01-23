import type { Metadata } from "next";
import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
    title: "RawAPI Class",
    description: "Learn how to use the RawAPI class to make direct calls to the Telegram Bot API with Televerse.",
};

const initializationCode = `import 'package:televerse/televerse.dart';

void main() {
  // Initialize with your bot token
  final api = RawAPI('YOUR_BOT_TOKEN');
}`;

const accessFromBotCode = `final bot = Bot('YOUR_BOT_TOKEN');

// Access API through bot instance
await bot.api.sendMessage(ChatID(123456789), 'Hello!');`;

const sendMessageCode = `// Send a text message
await api.sendMessage(
  ChatID(123456789),
  'Hello World!',
  parseMode: ParseMode.html,
);`;

const sendPhotoCode = `import 'dart:io';

// Send a photo from a local file
final photo = File('path/to/photo.jpg');
await api.sendPhoto(
  ChatID(123456789),
  InputFile.fromFile(photo),
  caption: 'Check out this photo!',
);`;

const genericCallCode = `// Type-safe generic call
final message = await api<Map<String, dynamic>>(
  APIMethod.sendMessage,
  Payload({
    'chat_id': 123456789,
    'text': 'Hello generic!',
  }),
);`;

export default function RawAPIPage() {
    return (
        <DocContent
            title="RawAPI Class"
            description="Direct access to the Telegram Bot API."
        >
            <section className="mt-8">
                <p>
                    The <code>RawAPI</code> class provides a low-level, type-safe interface to the Telegram Bot API.
                    It mirrors the official API methods and handles the HTTP requests, JSON serialization, and response parsing for you.
                    While the <code>Bot</code> class is great for handling updates, <code>RawAPI</code> is your tool for sending actions back to Telegram.
                </p>
            </section>

            {/* Initialization */}
            <section className="mt-12">
                <h2>Initialization</h2>
                <p>
                    You can create a standalone instance of <code>RawAPI</code> if you just need to send requests without running a bot listener.
                    This is useful for scripts, admin tools, or serverless functions.
                </p>
                <CodeBlock code={initializationCode} language="dart" filename="main.dart" />

                <h3 className="mt-6">Access from Bot</h3>
                <p>
                    If you are using the <code>Bot</code> class, you don&apos;t need to create a separate <code>RawAPI</code> instance.
                    The bot instance already has one ready for you at <code>bot.api</code>.
                </p>
                <CodeBlock code={accessFromBotCode} language="dart" filename="main.dart" />
            </section>

            {/* Making Requests */}
            <section className="mt-12">
                <h2>Making Requests</h2>
                <p>
                    The <code>RawAPI</code> class contains methods for almost every action available in the Telegram Bot API.
                    These methods are named exactly as they appear in the official documentation.
                </p>

                <h3 className="mt-6">Sending Messages</h3>
                <CodeBlock code={sendMessageCode} language="dart" filename="main.dart" />

                <h3 className="mt-6">Sending Media</h3>
                <p>
                    Televerse makes it easy to send files. You can use the <code>InputFile</code> class to send files from your file system, URLs, or raw bytes.
                </p>
                <CodeBlock code={sendPhotoCode} language="dart" filename="main.dart" />
            </section>

            {/* Advanced Usage */}
            <section className="mt-12">
                <h2>Advanced Usage</h2>
                <p>
                    For advanced use cases, you can use the generic <code>call</code> method in the <code>RawAPI</code> class which makes its instances callable.
                </p>

                <CodeBlock code={genericCallCode} language="dart" filename="main.dart" />
            </section>

            <section className="mt-12">
                <h2>See Also</h2>
                <ul>
                    <li>
                        <Link href="https://core.telegram.org/bots/api#available-methods" className="text-white font-medium hover:underline" target="_blank">
                            Official Telegram Bot API
                        </Link>
                        - Full list of available methods and parameters.
                    </li>
                    <li>
                        <Link href="/docs/core-concepts/bot" className="text-white font-medium hover:underline">
                            Bot Class
                        </Link>
                        - Learn about the main Bot class.
                    </li>
                </ul>
            </section>
        </DocContent>
    );
}
