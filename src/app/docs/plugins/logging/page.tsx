import type { Metadata } from "next";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
  title: "Logging Plugin",
  description: "Debug your bot with the built-in comprehensive logging plugin.",
};

export default function LoggingPluginPage() {
  return (
    <DocContent
      title="Logging Plugin"
      description="Debug your bot with the built-in comprehensive logging plugin."
    >
      <section className="mt-8">
        <p>
          The <strong>Logging Plugin</strong> is a powerful built-in tool that provides detailed insights into your bot&apos;s
          interactions with the Telegram API. It&apos;s an essential utility for development, debugging, and production monitoring.
        </p>

        <p className="mt-4">
          This plugin automatically logs requests sent to the Telegram Bot API and their responses, giving you
          visibility into network traffic, payload structures, and execution times.
        </p>
      </section>

      <section className="mt-12">
        <h2>Installation</h2>
        <p>
          The Logging Plugin is part of the core Televerse package, so you don&apos;t need to install any external dependencies.
          Simply import it from <code>televerse/plugins/logging.dart</code>.
        </p>
      </section>

      <section className="mt-12">
        <h2>Basic Usage</h2>
        <p>
          To start using the logger, simply attach it to your bot instance using the <code>plugin</code> method.
        </p>

        <CodeBlock code={`import 'package:televerse/televerse.dart';
import 'package:televerse/plugins/logging.dart';

void main() {
  final bot = Bot("YOUR_BOT_TOKEN");
  
  // Attach the logging plugin
  bot.plugin(LoggingPlugin());
  
  bot.start();
}`} language="dart" filename="main.dart" />

        <p className="mt-4">
          By default, this will enable comprehensive logging with colored output, pretty-printed JSON, and detailed
          request/response information.
        </p>
      </section>

      <section className="mt-12">
        <h2>Configuration</h2>
        <p>
          The <code>LoggingPlugin</code> is highly configurable through the <code>options</code> parameter, which accepts a
          <code>LoggerOptions</code> object. You can fine-tune what exactly gets logged.
        </p>

        <h3 className="mt-6">Pre-defined Configurations</h3>
        <p>
          Televerse provides several named constructors for common use cases:
        </p>

        <CodeBlock code={`// Default configuration (detailed, colored)
bot.plugin(LoggingPlugin());

// Detailed configuration (explicit)
bot.plugin(LoggingPlugin(
  options: LoggerOptions.detailed(),
));

// Minimal configuration (request/method names only, no bodies)
bot.plugin(LoggingPlugin(
  options: LoggerOptions.minimal(),
));

// Errors only (quiet during normal operation)
bot.plugin(LoggingPlugin(
  options: LoggerOptions.errorsOnly(),
));

// Production safe (no colors, sensitive data might still need care but less noise)
bot.plugin(LoggingPlugin(
  options: LoggerOptions.production(),
));`} language="dart" filename="main.dart" />

        <h3 className="mt-6">Custom Configuration</h3>
        <p>
          You can customize every aspect of the logger by creating a custom <code>LoggerOptions</code> instance:
        </p>

        <CodeBlock code={`bot.plugin(LoggingPlugin(
  options: LoggerOptions(
    // Enable/disable specific log components
    request: true,        // Log request method and ID
    requestBody: true,    // Log parameters and files
    responseBody: true,   // Log the API response
    error: true,          // Log error messages
    stackTrace: true,     // Log stack traces on error
    
    // Formatting options
    prettyPrint: true,    // Indent JSON for readability
    colorOutput: true,    // Use ANSI colors in terminal
    
    // Filter specific methods
    methods: [
      APIMethod.sendMessage, 
      APIMethod.sendPhoto,
    ],
  ),
));`} language="dart" filename="main.dart" />
      </section>

      <section className="mt-12">
        <h2>Output Example</h2>
        <p>
          When enabled, the logger produces structured, readable output in your console:
        </p>

        <div className="bg-zinc-950 p-4 rounded-lg font-mono text-sm text-gray-300 overflow-x-auto my-6 border border-zinc-800">
          <div className="text-cyan-400">📤 [10:23:45.123] sendMessage [K7L2M9]</div>
          <div>   ┌─ Request Body:</div>
          <div>   │  Parameters:</div>
          <div>   │    chat_id: 123456789</div>
          <div>   │    text: "Hello, World!"</div>
          <div className="text-green-400 mt-2">✅ sendMessage [K7L2M9] completed in 145ms</div>
          <div>   ┌─ Response Body:</div>
          <div>   │  {'{'}</div>
          <div>   │    "ok": true,</div>
          <div>   │    "result": {'{'} ... {'}'}</div>
          <div>   │  {'}'}</div>
        </div>
      </section>

      <section className="mt-12">
        <h2>Saving Logs to File</h2>
        <p>
          By default, the logger prints to the standard output (console). You can redirect logs to a file or any
          other destination by providing a custom <code>logPrint</code> function.
        </p>

        <CodeBlock code={`import 'dart:io';

void main() {
  final bot = Bot("TOKEN");
  final logFile = File('bot.log');
  
  bot.plugin(LoggingPlugin(
    options: LoggerOptions(
      // Custom printer function
      logPrint: (message) {
        // Append to file instead of printing to console
        logFile.writeAsStringSync(
          '$message\\n', 
          mode: FileMode.append,
        );
      },
    ),
  ));
  
  bot.start();
}`} language="dart" filename="main.dart" />
      </section>
    </DocContent>
  );
}
