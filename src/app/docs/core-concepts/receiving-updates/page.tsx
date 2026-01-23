import type { Metadata } from "next";
import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
    title: "Receiving Updates",
    description: "Learn how to receive updates from Telegram using Long Polling or Webhooks in Televerse.",
};

const longPollingCode = `import 'package:televerse/televerse.dart';

void main() async {
  final bot = Bot('YOUR_BOT_TOKEN');

  // Start with default Long Polling
  await bot.start();
}`;

const pollingConfigCode = `// Low latency configuration (faster updates, more requests)
final lowLatency = LongPollingConfig.lowLatency();

// High throughput configuration (more efficient for many updates)
final highThroughput = LongPollingConfig.highThroughput();

// Custom configuration
final customConfig = LongPollingConfig(
  timeout: 40,
  limit: 50,
  allowedUpdates: [UpdateType.message, UpdateType.callbackQuery],
);

await bot.start(LongPollingFetcher(
  bot.api,
  config: customConfig,
));`;

const webhookSimpleCode = `void main() async {
  final bot = Bot('YOUR_BOT_TOKEN');

  // Start a webhook server on port 8080
  await bot.startWebhook(
    webhookUrl: 'https://your-domain.com/webhook',
    port: 8080,
  );
}`;

const webhookDevCode = `void main() async {
  final bot = Bot('YOUR_BOT_TOKEN');

  // Automatically configures for local development
  // 1. Sets up server on port 8080
  // 2. Uses the provided ngrok URL
  // 3. Drops pending updates
  await bot.startWebhookDev('https://your-ngrok-url.ngrok-free.app');
}`;

const webhookCustomCode = `// Production-ready webhook configuration
final config = WebhookConfig.production(
  webhookUrl: 'https://your-domain.com/webhook',
  port: 8443,
  secretToken: 'your-secure-secret-token',
  maxConnections: 60,
  allowedUpdates: [UpdateType.message, UpdateType.editedMessage],
);

final fetcher = WebhookFetcher(
  api: bot.api, 
  config: config,
);

await bot.start(fetcher);`;

export default function ReceivingUpdatesPage() {
    return (
        <DocContent
            title="Receiving Updates"
            description="Choose the right method to get updates from Telegram."
        >
            <section className="mt-8">
                <p>
                    Televerse supports the two distinct methods provided by Telegram for receiving updates: <strong>Long Polling</strong> and <strong>Webhooks</strong>.
                    Understanding the difference between them is key to building an efficient bot.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <div className="text-xl font-medium mb-3 text-white">Long Polling</div>
                        <p className="text-gray-400 text-sm mb-4">
                            Your bot actively requests updates from Telegram. Best for development and simple bots.
                        </p>
                        <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                            <li>No public IP/domain required</li>
                            <li>Easiest to set up</li>
                            <li>Works behind firewalls</li>
                        </ul>
                    </div>
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <div className="text-xl font-medium mb-3 text-white">Webhooks</div>
                        <p className="text-gray-400 text-sm mb-4">
                            Telegram sends updates to your server. Best for production and high-traffic bots.
                        </p>
                        <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                            <li>Lower latency</li>
                            <li>Less resource intensive</li>
                            <li>Requires HTTPS & public URL</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Long Polling Section */}
            <section className="mt-16">
                <h2>Long Polling</h2>
                <p>
                    Long Polling is the default behavior in Televerse. When you call <code>bot.start()</code> without arguments,
                    it automatically sets up a <code>LongPollingFetcher</code>.
                </p>
                <CodeBlock code={longPollingCode} language="dart" filename="main.dart" />

                <h3 className="mt-8">Advanced Configuration</h3>
                <p className="mt-2">
                    You can customize the polling behavior using <code>LongPollingConfig</code>.
                    Televerse provides presets for common use cases.
                </p>
                <CodeBlock code={pollingConfigCode} language="dart" filename="main.dart" />
            </section>

            {/* Webhooks Section */}
            <section className="mt-16">
                <h2>Webhooks</h2>
                <p>
                    For production bots, Webhooks are often preferred as they are more efficient.
                    Televerse comes with a built-in highly performant HTTP server making webhook setup trivial.
                </p>

                <h3 className="mt-8">Easiest Way: startWebhook</h3>
                <p className="mt-4">
                    The <code>startWebhook</code> method handles everything for you: starting the server,
                    setting the webhook with Telegram, and listening for updates.
                </p>
                <CodeBlock code={webhookSimpleCode} language="dart" filename="main.dart" />
                <p className="mt-4 text-sm text-gray-400">
                    This automatically monitors the <code>/webhook</code> path on the specified port.
                </p>

                <h3 className="mt-8">Local Development with Ngrok</h3>
                <p className="mt-4">
                    During development, you might want to test webhooks using a tunneling service like <a href="https://ngrok.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ngrok</a>.
                    The <code>startWebhookDev</code> helper is designed exactly for this.
                </p>
                <CodeBlock code={webhookDevCode} language="dart" filename="main.dart" />

                <h3 className="mt-8">Production Configuration</h3>
                <p className="mt-4">
                    For full control over the webhook configuration (custom paths, secret tokens, max connections),
                    use the <code>WebhookConfig</code> and pass it to a <code>WebhookFetcher</code>.
                </p>
                <CodeBlock code={webhookCustomCode} language="dart" filename="main.dart" />

                <div className="mt-6 p-4 border border-yellow-500/20 bg-yellow-500/10 rounded-lg">
                    <p className="text-sm text-yellow-200">
                        <strong>Security Note:</strong> In production, always use a <code>secretToken</code> to verify that incoming requests are actually from Telegram.
                    </p>
                </div>
            </section>

            <section className="mt-16">
                <h2>Which one to choose?</h2>
                <p>
                    Start with <strong>Long Polling</strong> for development. It's hassle-free and requires no server configuration.
                </p>
                <p className="mt-4">
                    Switch to <strong>Webhooks</strong> when you deploy your bot to a server or if your bot has high traffic.
                    Webhooks are more resource-efficient as your bot doesn't need to constantly ask "Are there new messages?".
                </p>
            </section>
        </DocContent>
    );
}
