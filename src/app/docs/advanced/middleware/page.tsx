import type { Metadata } from "next";
import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
  title: "Middleware",
  description: "Learn how to use Televerse Middleware to handle updates efficiently. Explore methods like use, when, fork, and branch to build powerful bots.",
};

const basicMiddlewareCode = `// Basic logging middleware
bot.use((ctx, next) async {
  final startTime = DateTime.now();
  await next();
  final duration = DateTime.now().difference(startTime);
  print('Update processed in \${duration.inMilliseconds}ms');
});`;

const useNamedCode = `// Named middleware helps with debugging
bot.useNamed('logger', (ctx, next) async {
  print('Processing update: \${ctx.update.updateId}');
  await next();
});`;

const whenCode = `// Only runs for private chats
bot.when(
  (ctx) => ctx.chat?.type == ChatType.private,
  (ctx, next) async {
    await ctx.reply('This is a private chat!');
    await next();
  },
);`;

const forkCode = `// Runs concurrently without blocking the main flow
bot.fork((ctx) async {
  await database.logUpdate(ctx.update);
  // No need to call next() in forked middleware
});`;

const branchCode = `// Branch execution based on a condition
bot.branch(
  (ctx) => ctx.command == 'admin',
  (ctx, next) async {
    await ctx.reply('Welcome, Admin!'); 
    // Admin middleware chain...
  },
  (ctx, next) async {
    await ctx.reply('Access Denied');
  },
);`;

const lazyCode = `// Create middleware dynamically based on context
bot.lazy((ctx) {
  if (ctx.from?.isPremium == true) {
    return (ctx, next) async {
      print('Update from a premium user');
      await next();
    };
  }
  return (ctx, next) => next();
});`;

export default function MiddlewarePage() {
  return (
    <DocContent
      title="Middleware"
      description="Build powerful, modular bot logic with the Middleware system."
    >
      <section className="mt-8">
        <p>
          Middleware is the backbone of any complex Televerse bot. It allows you to intercept, process, and modify updates
          before they reach your final command handlers. Think of it as a pipeline where each update flows through a series of functions.
        </p>
        <div className="my-6 p-4 border border-blue-500/20 bg-blue-500/10 rounded-lg">
          <p className="text-sm">
            <strong>Developer Note:</strong> Mastering middleware is key to building scalable bots. It lets you separate concerns like
            logging, authentication, and error handling from your business logic.
          </p>
        </div>
      </section>

      {/* Basic Usage */}
      <section className="mt-12">
        <h2>Basic Usage</h2>
        <p>
          The <code>use</code> method is the simplest way to add middleware. It takes a function receiving the context and a <code>next</code> function.
          Calling <code>next()</code> passes control to the next middleware in the chain.
        </p>
        <CodeBlock code={basicMiddlewareCode} language="dart" filename="main.dart" />
      </section>

      {/* Advanced Composition */}
      <section className="mt-12">
        <h2>Advanced Composition</h2>
        <p>
          Televerse provides specialized methods to compose middleware in powerful ways.
          These help you organize your bot's logic cleanly and efficiently.
        </p>

        {/* useNamed */}
        <h3 className="mt-8">Named Middleware</h3>
        <p>
          Use <code>useNamed</code> to attach a name to your middleware. This is invaluable when debugging, as stack traces or logs
          can refer to the middleware by name instead of an anonymous function.
        </p>
        <CodeBlock code={useNamedCode} language="dart" filename="main.dart" />

        {/* when */}
        <h3 className="mt-8">Conditional Execution</h3>
        <p>
          The <code>when</code> method executes middleware only if a specific condition (predicate) is met.
          This is great for filtering updates, like applying logic only to private chats or specific users.
        </p>
        <CodeBlock code={whenCode} language="dart" filename="main.dart" />

        {/* fork */}
        <h3 className="mt-8">Concurrent Execution (Fork)</h3>
        <p>
          Sometimes you want to run a task without delaying the bot's response, like analytics or database logging.
          <code>fork</code> runs the middleware appropriately without awaiting it in the main flow.
        </p>
        <CodeBlock code={forkCode} language="dart" filename="main.dart" />

        {/* branch */}
        <h3 className="mt-8">Branching Logic</h3>
        <p>
          <code>branch</code> lets you split your middleware flow into two paths. Use this for things like separate logic for admins vs. regular users,
          or handling different types of updates distinctly.
        </p>
        <CodeBlock code={branchCode} language="dart" filename="main.dart" />

        {/* lazy */}
        <h3 className="mt-8">Dynamic Middleware (Lazy)</h3>
        <p>
          With <code>lazy</code>, you can generate middleware on the fly for each update. This is useful when the middleware logic depends on
          values available only in the context, like user settings or database states.
        </p>
        <CodeBlock code={lazyCode} language="dart" filename="main.dart" />
      </section>

      {/* Why use Middleware? */}
      <section className="mt-12">
        <h2>Why use Middleware?</h2>
        <p>
          Using these tools makes your code:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
          <li><strong>Modular:</strong> Break down complex logic into small, reusable functions.</li>
          <li><strong>Clean:</strong> Keep your main handlers focused on their specific task.</li>
          <li><strong>Robust:</strong> Handle global concerns like errors and logging in one place.</li>
          <li><strong>Efficient:</strong> Use <code>fork</code> to keep your bot responsive even during heavy background tasks.</li>
        </ul>
      </section>
    </DocContent>
  );
}
