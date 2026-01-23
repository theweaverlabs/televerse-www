import type { Metadata } from "next";
import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore Televerse features: Type-safe Context, 80+ Filters, Plugin System, Middlewares, and standard Telegram API support.",
};

const filterBasicsCode = `// Simple filters
bot.on(bot.filters.photo, (ctx) async {
  await ctx.reply('Nice photo! 📸');
});

bot.on(bot.filters.video, (ctx) async {
  await ctx.reply('Cool video! 🎬');
});

bot.on(bot.filters.privateChat, (ctx) async {
  await ctx.reply('This is a private chat!');
});`;

const filterOperatorsCode = `// OR operator (+) - matches photo OR video
bot.on(
  bot.filters.photo + bot.filters.video,
  (ctx) async {
    await ctx.reply('Media received!');
  },
);

// AND operator (*) - matches text AND in group
bot.on(
  bot.filters.text * bot.filters.groupChat,
  (ctx) async {
    await ctx.reply('Text message in group!');
  },
);

// NOT operator (-) - any message except commands
bot.on(
  bot.filters.anyMessage - bot.filters.command,
  (ctx) async {
    await ctx.reply('Non-command message!');
  },
);

// Complex combinations
bot.on(
  bot.filters.cmd('admin') * bot.filters.privateChat * bot.filters.user(adminId),
  adminHandler,
);`;

const sessionPluginCode = `import 'package:televerse/televerse.dart';

void main() async {
  final bot = Bot<Context>('YOUR_BOT_TOKEN');

  // Install the session plugin
  bot.plugin(SessionPlugin<Context, Map<String, dynamic>>(
    initial: () => {'visits': 0, 'preferences': {}},
    getSessionKey: (ctx) => 'user_\${ctx.from?.id ?? 0}',
  ));

  // Use session in handlers
  bot.command('count', (ctx) async {
    final session = ctx.session as Map<String, dynamic>;
    session['visits'] = (session['visits'] as int) + 1;
    await ctx.reply('Visit count: \${session['visits']}');
  });

  await bot.start();
}`;

const conversationCode = `// Install the conversation plugin
bot.plugin(ConversationPlugin<Context>());

// Define a conversation function
Future<void> askUserInfo(Conversation<Context> conversation, Context ctx) async {
  try {
    await ctx.reply("What's your name?");
    
    // Wait for text message with timeout
    final nameCtx = await conversation.waitFor(
      bot.filters.text.matches,
      timeout: Duration(minutes: 2),
    );
    
    await nameCtx.reply("Nice to meet you, \${nameCtx.text}!");
    
    await nameCtx.reply("How old are you?");
    
    // Wait with validation
    final ageCtx = await conversation.waitUntil(
      (ctx) => int.tryParse(ctx.text ?? '') != null,
      timeout: Duration(minutes: 1),
      otherwise: (ctx) async {
        await ctx.reply("Please send a valid number.");
      },
    );
    
    final age = int.parse(ageCtx.text!);
    await ageCtx.reply("Great! You are \$age years old.");
    
  } on ConversationTimeoutException {
    await ctx.reply("Sorry, you took too long to respond.");
  }
}

// Register and use the conversation
bot.use(createConversation('userInfo', askUserInfo));

bot.command('info', (ctx) async {
  await ctx.conversation.enter('userInfo');
});`;

const middlewareCode = `// Function-based middleware
bot.use((ctx, next) async {
  print('📥 Processing update \${ctx.update.updateId}');
  final start = DateTime.now();
  
  await next(); // Call next middleware
  
  final duration = DateTime.now().difference(start);
  print('✅ Processed in \${duration.inMilliseconds}ms');
});

// Conditional middleware
bot.when(
  (ctx) => ctx.isPrivateChat,
  (ctx, next) async {
    await ctx.reply('This is a private chat!');
    await next();
  },
);

// Forked middleware (runs concurrently)
bot.fork((ctx, next) async {
  await logToDatabase(ctx.update);
});`;

const webhookCode = `final bot = Bot<Context>('YOUR_BOT_TOKEN');

// Setup handlers
bot.command('start', (ctx) async {
  await ctx.reply('Hello from webhook bot! 🚀');
});

// Start webhook server - that's all you need!
await bot.startWebhook(
  webhookUrl: 'https://your-domain.com/webhook',
  port: 8080,
);

// For development with ngrok:
await bot.startWebhookDev('https://abc123.ngrok.io');`;

const customContextCode = `// Define your custom context
class MyContext extends Context {
  MyContext(super.update, super.api, super.me);
  
  // Add custom properties
  String get userName => from?.firstName ?? 'Unknown';
  bool get isAdmin => from?.id == 123456789;
  
  // Add custom methods
  Future<void> sendWelcome() async {
    await reply('Welcome, \$userName! 🎉');
  }
}

// Use your custom context
final bot = Bot('YOUR_BOT_TOKEN', contextFactory: MyContext.new);

bot.command('start', (MyContext ctx) async {
  await ctx.sendWelcome(); // Use your custom method
  
  if (ctx.isAdmin) {
    await ctx.reply('You have admin access!');
  }
});`;

const keyboardCode = `// Reply keyboard
final keyboard = Keyboard()
  ..text("Account")
  ..text("Settings")
  ..row()
  ..requestLocation("Send Location")
  ..resized()
  ..oneTime();

bot.command('menu', (ctx) async {
  await ctx.reply("Choose an option:", replyMarkup: keyboard);
});

// Inline keyboard with callbacks
final inlineKeyboard = InlineKeyboard()
  ..addButton(
    text: "Visit Website",
    url: "https://televerse.dev",
  )
  ..row()
  ..addButton(
    text: "Help",
    callbackData: "help_clicked",
  );

bot.command('links', (ctx) async {
  await ctx.reply("Useful links:", replyMarkup: inlineKeyboard);
});

// Handle callback queries
bot.callbackQuery('help_clicked', (ctx) async {
  await ctx.answer('Help is on the way!');
  await ctx.reply('Here is your help...');
});`;

const localBotApiCode = `// Use your own Bot API server
final bot = Bot.local(
  'YOUR_BOT_TOKEN',
  'http://localhost:8081',
);

// Everything works the same way!
bot.command('start', (ctx) async {
  await ctx.reply('Running on local Bot API server!');
});

await bot.start();`;

export default function FeaturesPage() {
  return (
    <DocContent
      title="Features"
      description="Explore the powerful features that make Televerse the most advanced Telegram Bot framework in the Dart ecosystem."
    >
      {/* Filter System */}
      <section className="mt-8">
        <h2>🎯 Revolutionary Filter System</h2>
        <p>
          Televerse features a powerful filter system with <strong>80+ built-in filters</strong> that
          can be combined using logical operators for expressive, type-safe update handling.
        </p>

        <h3>Basic Filters</h3>
        <p>
          Use <code>bot.on()</code> with any built-in filter to handle specific types of updates:
        </p>
        <CodeBlock code={filterBasicsCode} language="dart" filename="main.dart" />

        <h3>Combining Filters with Operators</h3>
        <p>
          The real power comes from combining filters using logical operators:
        </p>
        <ul>
          <li><code>+</code> (OR) — Match either filter</li>
          <li><code>*</code> (AND) — Match both filters</li>
          <li><code>-</code> (NOT) — Match first but not second</li>
        </ul>
        <CodeBlock code={filterOperatorsCode} language="dart" filename="main.dart" />

        <div className="not-prose mt-6 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <h4 className="text-sm font-semibold text-white mb-2">Available Filter Categories</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-zinc-400">
            <span>• Media (photo, video, audio)</span>
            <span>• Chat types (private, group)</span>
            <span>• Message content (text, caption)</span>
            <span>• Entities (URL, mention, hashtag)</span>
            <span>• Service messages</span>
            <span>• Business features</span>
          </div>
        </div>
      </section>

      {/* Plugin Architecture */}
      <section className="mt-12">
        <h2>🔌 Plugin Architecture</h2>
        <p>
          Televerse has a comprehensive plugin system with three built-in plugins and support
          for creating your own.
        </p>

        <h3>Session Plugin</h3>
        <p>
          Store and retrieve user-specific data across updates:
        </p>
        <CodeBlock code={sessionPluginCode} language="dart" filename="main.dart" />

        <h3>Conversation Plugin</h3>
        <p>
          Engage users in multi-step conversations with timeout handling and validation:
        </p>
        <CodeBlock code={conversationCode} language="dart" filename="main.dart" />

        <h3>Logging Plugin</h3>
        <p>
          Enable detailed request/response logging with a single line:
        </p>
        <CodeBlock code="bot.plugin(LoggingPlugin<Context>());" language="dart" filename="main.dart" />
      </section>

      {/* Middleware System */}
      <section className="mt-12">
        <h2>🛠️ Middleware System</h2>
        <p>
          The middleware system provides powerful composition capabilities for processing updates:
        </p>
        <CodeBlock code={middlewareCode} language="dart" filename="main.dart" />
        <p>
          Middleware types include:
        </p>
        <ul>
          <li><code>bot.use()</code> — Standard middleware that runs for every update</li>
          <li><code>bot.when()</code> — Conditional middleware based on predicate</li>
          <li><code>bot.fork()</code> — Runs concurrently without blocking</li>
          <li><code>bot.lazy()</code> — Created on-demand based on context</li>
        </ul>
      </section>

      {/* Webhook Server */}
      <section className="mt-12">
        <h2>🌐 Built-in Webhook Server</h2>
        <p>
          Start a production-ready webhook bot with just one method call. Perfect for
          serverless deployments and high-traffic bots:
        </p>
        <CodeBlock code={webhookCode} language="dart" filename="main.dart" />
      </section>

      {/* Custom Context */}
      <section className="mt-12">
        <h2>🎨 Custom Context</h2>
        <p>
          Extend the <code>Context</code> class with your own properties and methods for
          cleaner, more maintainable code:
        </p>
        <CodeBlock code={customContextCode} language="dart" filename="main.dart" />
      </section>

      {/* Keyboards */}
      <section className="mt-12">
        <h2>⌨️ Keyboard Utilities</h2>
        <p>
          Create reply keyboards and inline keyboards with intuitive builder classes:
        </p>
        <CodeBlock code={keyboardCode} language="dart" filename="main.dart" />
      </section>

      {/* Local Bot API */}
      <section className="mt-12">
        <h2>🏠 Local Bot API Support</h2>
        <p>
          Host your own Bot API server for increased privacy, higher file size limits, and
          faster response times:
        </p>
        <CodeBlock code={localBotApiCode} language="dart" filename="main.dart" />
      </section>

      {/* More Features */}
      <section className="mt-12">
        <h2>✨ And Much More</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
            <h4 className="font-semibold text-white mb-2">🛡️ Error Handling</h4>
            <p className="text-sm text-zinc-400">
              Comprehensive error boundaries with context access for graceful error recovery.
            </p>
          </div>
          <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
            <h4 className="font-semibold text-white mb-2">📤 File Uploads</h4>
            <p className="text-sm text-zinc-400">
              Easy file sending with InputFile class supporting files, URLs, and file IDs.
            </p>
          </div>
          <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
            <h4 className="font-semibold text-white mb-2">🔍 Inline Queries</h4>
            <p className="text-sm text-zinc-400">
              Handle inline queries with the InlineQueryResultBuilder for all result types.
            </p>
          </div>
          <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
            <h4 className="font-semibold text-white mb-2">📋 Menu System</h4>
            <p className="text-sm text-zinc-400">
              InlineMenu and KeyboardMenu classes with built-in handler registration.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="mt-12">
        <h2>Learn More</h2>
        <p>
          For complete API documentation and more examples, visit:
        </p>
        <ul>
          <li>
            <Link href="https://pub.dev/documentation/televerse/latest/" target="_blank" rel="noopener noreferrer" className="text-white font-medium">
              API Reference
            </Link>{" "}
            — Complete documentation on pub.dev
          </li>
          <li>
            <Link href="https://github.com/theweaverlabs/televerse/tree/main/examples" target="_blank" rel="noopener noreferrer" className="text-white font-medium">
              Examples Repository
            </Link>{" "}
            — Real-world bot examples
          </li>
          <li>
            <Link href="https://telegram.me/TeleverseDart" target="_blank" rel="noopener noreferrer" className="text-white font-medium">
              Telegram Community
            </Link>{" "}
            — Get help and share your bots
          </li>
        </ul>
      </section>
    </DocContent>
  );
}
