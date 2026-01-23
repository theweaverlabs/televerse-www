import type { Metadata } from "next";
import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
  title: "Custom Context",
  description: "Learn how to create custom context types to extend your bot's functionality with type-safe, domain-specific properties and methods.",
};

const basicContextCode = `import 'package:televerse/televerse.dart';

// Define your custom context
class MyContext extends Context {
  MyContext(super.update, super.api, super.me);

  // Add custom methods
  void doSomething() {
    print('Doing something custom!');
    print('Hello from MyContext! 👋');
  }

  // Add custom getters
  String get userName => from?.firstName ?? 'Guest';
  bool get isAdmin => from?.id == 123456789;
}`;

const basicUsageCode = `void main() async {
  // Create bot with custom context type
  final bot = Bot<MyContext>(
    'YOUR_BOT_TOKEN',
    contextFactory: MyContext.new,
  );

  // Handlers receive MyContext instances
  bot.command('start', (ctx) async {
    // ctx is MyContext, not just Context
    await ctx.reply('Hello, \${ctx.userName}!');
    
    // Call custom methods
    ctx.doSomething();
  });

  await bot.start();
}`;

const advancedContextCode = `class MyContext extends Context {
  final DatabaseService db;
  final Logger logger;
  
  MyContext(
    super.update,
    super.api,
    super.me,
    this.db,
    this.logger,
  );

  // Helper method using injected dependencies
  Future<User?> getUserFromDb() async {
    if (from == null) return null;
    return await db.getUser(from!.id);
  }
}`;

const factoryFunctionCode = `void main() async {
  // Set up dependencies
  final db = DatabaseService();
  final logger = Logger();

  // Create factory function that captures dependencies
  MyContext createContext(Update update, RawAPI api, BotInfo me) {
    return MyContext(update, api, me, db, logger);
  }

  // Pass factory to bot
  final bot = Bot<MyContext>(
    'YOUR_BOT_TOKEN',
    contextFactory: createContext,
  );

  bot.command('profile', (ctx) async {
    // Access injected dependencies
    ctx.logger.info('Profile command called');
    
    final user = await ctx.getUserFromDb();
    if (user != null) {
      await ctx.reply('Your profile: \${user.name}');
    }
  });

  await bot.start();
}`;

const mixinCode = `// Define a mixin for internationalization
mixin I18nMixin {
  String translate(String key, {String locale = 'en'}) {
    final translations = {
      'en': {
        'hello': 'Hello',
        'goodbye': 'Goodbye',
      },
      'es': {
        'hello': 'Hola',
        'goodbye': 'Adiós',
      },
    };
    
    return translations[locale]?[key] ?? key;
  }
}

// Define a mixin for logging
mixin LoggingMixin {
  void logCommand(String command) {
    print('[LOG] Command executed: $command');
  }
}`;

const mixinContextCode = `// Use mixins with custom context
class MyContext extends Context with I18nMixin, LoggingMixin {
  MyContext(super.update, super.api, super.me);
  
  String get userLocale {
    // Get user's language from Telegram
    return from?.languageCode ?? 'en';
  }
}`;

const mixinUsageCode = `void main() async {
  final bot = Bot<MyContext>(
    'YOUR_BOT_TOKEN',
    contextFactory: MyContext.new,
  );

  bot.command('start', (ctx) async {
    // Use mixin methods
    ctx.logCommand('start');
    
    // Translate based on user's locale
    final greeting = ctx.translate('hello', locale: ctx.userLocale);
    await ctx.reply(greeting);
  });

  await bot.start();
}`;

const sessionMixinCode = `// Session mixin for stateful conversations
mixin SessionMixin {
  // Store session data in context properties
  Map<String, dynamic> get session {
    if (!has('session')) {
      set('session', <String, dynamic>{});
    }
    return get<Map<String, dynamic>>('session')!;
  }
}

class MyContext extends Context with SessionMixin {
  MyContext(super.update, super.api, super.me);
}`;

const sessionUsageCode = `bot.command('start', (ctx) async {
  ctx.session['step'] = 'waiting_for_name';
  await ctx.reply('What is your name?');
});

bot.onText((ctx) async {
  if (ctx.session['step'] == 'waiting_for_name') {
    ctx.session['name'] = ctx.text;
    ctx.session['step'] = 'complete';
    await ctx.reply('Nice to meet you, \${ctx.text}!');
  }
});`;

const typeSafetyCode = `// This won't compile - type safety!
final bot = Bot<MyContext>(
  'TOKEN',
  // Error: Context is not MyContext
  contextFactory: Context.new, // ❌ Type error
);

// This works - correct type
final bot = Bot<MyContext>(
  'TOKEN',
  contextFactory: MyContext.new, // ✅ Correct
);`;

const fromApiCode = `void main() async {
  // Create and configure API with transformers
  final api = RawAPI('YOUR_BOT_TOKEN');
  
  // Create bot from API with custom context
  final bot = Bot.fromAPI<MyContext>(
    api,
    contextFactory: MyContext.new,
  );

  await bot.start();
}`;

export default function CustomContextPage() {
  return (
    <DocContent
      title="Custom Context"
      description="Extend your bot with type-safe, domain-specific context types."
    >
      <section className="mt-8">
        <p>
          Custom contexts allow you to extend the base <code>Context</code> class with your own properties and methods.
          This enables you to create domain-specific functionality, inject dependencies, and maintain type safety throughout your bot.
        </p>
      </section>

      {/* Why Use Custom Context */}
      <section className="mt-12">
        <h2>Why Use Custom Context?</h2>
        <p>
          Custom contexts provide several key benefits:
        </p>
        <ul>
          <li><strong>Type Safety</strong>: Leverage Dart's type system to catch errors at compile time</li>
          <li><strong>Dependency Injection</strong>: Pass services like databases, loggers, or configuration to your handlers</li>
          <li><strong>Code Organization</strong>: Keep related logic together in context methods</li>
          <li><strong>Reusability</strong>: Use mixins to share functionality across different bot implementations</li>
          <li><strong>Domain-Specific Logic</strong>: Add methods that make sense for your specific use case</li>
        </ul>
      </section>

      {/* Basic Custom Context */}
      <section className="mt-12">
        <h2>Basic Custom Context</h2>
        <p>
          To create a custom context, extend the <code>Context</code> class and add your own methods and properties.
        </p>

        <h3>Defining Your Context</h3>
        <p className="mt-4">
          Your custom context must call the super constructor with <code>update</code>, <code>api</code>, and <code>me</code> parameters.
        </p>
        <CodeBlock code={basicContextCode} language="dart" filename="my_context.dart" />

        <h3>Using Your Custom Context</h3>
        <p className="mt-4">
          Pass your context constructor to the <code>Bot</code> via the <code>contextFactory</code> parameter.
          The generic type parameter tells the bot what type of context to expect.
        </p>
        <CodeBlock code={basicUsageCode} language="dart" filename="main.dart" />

        <div className="my-6 p-4 border border-blue-500/20 bg-blue-500/10 rounded-lg">
          <p className="text-sm">
            <strong>Type Safety:</strong> Notice how <code>ctx</code> is typed as <code>MyContext</code> in the handler.
            This means you get full IDE autocomplete and compile-time type checking for all your custom methods!
          </p>
        </div>
      </section>

      {/* Advanced: Custom Context with Dependencies */}
      <section className="mt-12">
        <h2>Context with Dependencies</h2>
        <p>
          For more complex bots, you'll want to inject services like databases, loggers, or configuration into your context.
        </p>

        <h3>Defining Context with Dependencies</h3>
        <CodeBlock code={advancedContextCode} language="dart" filename="my_context.dart" />

        <h3>Creating a Factory Function</h3>
        <p className="mt-4">
          Since your context now has additional parameters, you need to create a factory function that captures these dependencies
          and returns a function matching the <code>ContextFactory</code> signature.
        </p>
        <CodeBlock code={factoryFunctionCode} language="dart" filename="main.dart" />

        <div className="my-6 p-4 border border-yellow-500/20 bg-yellow-500/10 rounded-lg">
          <p className="text-sm">
            <strong>ContextFactory Type:</strong> The <code>contextFactory</code> parameter expects a function with this signature:
            <code className="block mt-2">CTX Function(Update update, RawAPI api, BotInfo me)</code>
          </p>
        </div>
      </section>

      {/* Using Mixins */}
      <section className="mt-12">
        <h2>Using Mixins for Modularity</h2>
        <p>
          Dart's mixin system allows you to compose functionality from multiple sources.
          This is perfect for adding reusable features to your context.
        </p>

        <h3>Defining Mixins</h3>
        <p className="mt-4">
          Create mixins for common functionality like internationalization, logging, or session management.
        </p>
        <CodeBlock code={mixinCode} language="dart" filename="mixins.dart" />

        <h3>Applying Mixins to Context</h3>
        <p className="mt-4">
          Use the <code>with</code> keyword to apply mixins to your custom context.
        </p>
        <CodeBlock code={mixinContextCode} language="dart" filename="my_context.dart" />

        <h3>Using Mixin Methods</h3>
        <CodeBlock code={mixinUsageCode} language="dart" filename="main.dart" />
      </section>

      {/* Type Safety */}
      <section className="mt-12">
        <h2>Type Safety Benefits</h2>
        <p>
          The generic type system ensures that your context type is consistent throughout the middleware chain.
        </p>
        <CodeBlock code={typeSafetyCode} language="dart" filename="type_safety.dart" />
      </section>

      {/* Advanced Patterns */}
      <section className="mt-12">
        <h2>Advanced Patterns</h2>

        <h3>Using Custom Context with Bot.fromAPI</h3>
        <p className="mt-4">
          You can also use custom contexts when creating a bot from an existing <code>RawAPI</code> instance.
        </p>
        <CodeBlock code={fromApiCode} language="dart" filename="main.dart" />
      </section>

      {/* Best Practices */}
      <section className="mt-12">
        <h2>Best Practices</h2>
        <ul>
          <li>
            <strong>Keep contexts focused</strong>: Don't turn your context into a dumping ground for unrelated functionality.
          </li>
          <li>
            <strong>Use mixins for reusability</strong>: Extract common patterns into mixins that can be shared across projects.
          </li>
          <li>
            <strong>Inject dependencies properly</strong>: Use factory functions to inject services rather than accessing globals.
          </li>
          <li>
            <strong>Leverage type safety</strong>: Let Dart's type system help you catch errors early.
          </li>
          <li>
            <strong>Document your context</strong>: Add dartdoc comments to explain what each property and method does.
          </li>
          <li>
            <strong>Consider async factories</strong>: If you need to fetch data during context creation, your factory can return <code>Future&lt;CTX&gt;</code>.
          </li>
        </ul>
      </section>

      {/* See Also */}
      <section className="mt-12">
        <h2>See Also</h2>
        <ul>
          <li>
            <Link href="/docs/core-concepts/context" className="text-white font-medium">
              Context
            </Link>
            - Learn about the base Context class and its built-in properties.
          </li>
          <li>
            <Link href="/docs/core-concepts/bot" className="text-white font-medium">
              Bot Class
            </Link>
            - Understand how the Bot class uses generic types.
          </li>
        </ul>
      </section>
    </DocContent>
  );
}
