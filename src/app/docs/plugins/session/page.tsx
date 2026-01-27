import type { Metadata } from "next";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
  title: "Session Plugin",
  description: "Add persistent state to your bot with the Session Plugin.",
};

export default function SessionPluginPage() {
  return (
    <DocContent
      title="Session Plugin"
      description="Add persistent state to your bot with the Session Plugin."
    >
      <section className="mt-8">
        <p>
          The <strong>Session Plugin</strong> allows your bot to remember data across multiple updates.
          This is crucial for building complex interactions where you need to track user state, store temporary data
          like shopping cart items, or maintain user preferences.
        </p>

        <h2 className="mt-12">Concept</h2>
        <p>
          Televerse sessions work by storing data associated with a specific chat (or user) and automatically loading
          it when a new update arrives. After your handlers finish processing the update, any changes to the session
          data are saved back to the storage.
        </p>
      </section>

      <section className="mt-12">
        <h2>Installation</h2>
        <p>
          The Session Plugin can be imported from the <code>televerse/plugins/session</code> library.
        </p>
        <CodeBlock code="import 'package:televerse/plugins/session.dart';" language="dart" filename="main.dart" />
      </section>

      <section className="mt-12">
        <h2>Basic Usage</h2>
        <p>
          To use sessions, you must extend the <code>SessionContext</code> class. This gives you access to the <code>ctx.session</code> property.
        </p>

        <CodeBlock code={`import 'package:televerse/televerse.dart';
import 'package:televerse/plugins/session.dart';

// 1. Define your custom context
class MyContext extends SessionContext<Map<String, dynamic>> {
  MyContext(super.update, super.api, super.me);
}

void main() {
  // 2. Create the bot with your custom context
  final bot = Bot<MyContext>("TOKEN", contextConstructor: MyContext.new);

  // 3. Initialize the session plugin
  bot.plugin(SessionPlugin<MyContext, Map<String, dynamic>>(
    initial: () => {'count': 0},
  ));

  bot.command('count', (ctx) async {
    // 4. Access session data
    final session = ctx.session;
    
    // Update data
    session['count'] = (session['count'] as int) + 1;
    
    await ctx.reply('Count: \${session['count']}');
  });

  bot.start();
}`} language="dart" filename="main.dart" />
      </section>

      <section className="mt-12">
        <h2>Type-Safe Sessions</h2>
        <p>
          For production apps, we recommend defining a class for your session data.
        </p>

        <h3 className="mt-6">1. Define Session Data</h3>
        <CodeBlock code={`class MySession {
  int count;
  String? username;

  MySession({this.count = 0, this.username});
  
  void increment() => count++;
}`} language="dart" filename="session.dart" />

        <h3 className="mt-6">2. Define Custom Context</h3>
        <CodeBlock code={`class MyContext extends SessionContext<MySession> {
  MyContext(super.update, super.api, super.me);
}`} language="dart" filename="context.dart" />

        <h3 className="mt-6">3. Setup and Usage</h3>
        <CodeBlock code={`void main() {
  final bot = Bot<MyContext>(
    "TOKEN",
    contextConstructor: MyContext.new,
  );

  bot.plugin(SessionPlugin<MyContext, MySession>(
    initial: () => MySession(),
  ));

  bot.command('count', (ctx) async {
    // Type-safe access!
    ctx.session.increment();
    await ctx.reply('Count: \${ctx.session.count}');
  });

  bot.start();
}`} language="dart" filename="main.dart" />
      </section>

      <section className="mt-12">
        <h2>Storage Backends</h2>
        <p>
          By default, <code>SessionPlugin</code> uses <code>MemorySessionStorage</code>. This is fast and great for testing,
          but <strong>data is lost when the bot restarts</strong>.
        </p>
        <p className="mt-4">
          For production, you should use a persistent storage backend (like File, Database, Redis, etc.). You can implement
          the <code>SessionStorage</code> interface to create your own backend.
        </p>

        <CodeBlock code={`class FileSessionStorage<T> implements SessionStorage<T> {
  final File file;
  // Implementation details...
  
  @override
  Future<void> set(String key, T value) async {
    // Write to file
  }
  
  @override
  Future<T?> get(String key) async {
    // Read from file
  }
  
  // ... implement remove, has, clear
}`} language="dart" filename="storage.dart" />

        <p className="mt-4">
          Then use it in your plugin setup:
        </p>

        <CodeBlock code={`bot.plugin(SessionPlugin<MyContext, MySession>(
  initial: () => MySession(),
  storage: FileSessionStorage(File('./sessions.json')),
));`} language="dart" filename="main.dart" />
      </section>

      <section className="mt-12">
        <h2>Session Keys</h2>
        <p>
          By default, sessions are stored per <strong>chat</strong>. This means all users in a group share the same session,
          and a private chat has its own session.
        </p>
        <p className="mt-4">
          You can change this behavior by providing a custom <code>getSessionKey</code> function. For example, to store
          sessions per <strong>user</strong> (regardless of which chat they are in):
        </p>

        <CodeBlock code={`bot.plugin(SessionPlugin<MyContext, MySession>(
  initial: () => MySession(),
  // Use user ID as part of the key
  getSessionKey: (ctx) => 'user_\${ctx.from?.id}',
));`} language="dart" filename="main.dart" />

        <div className="my-6 p-4 border border-yellow-500/20 bg-yellow-500/10 rounded-lg">
          <p className="font-bold text-yellow-500 text-sm mb-1">Important</p>
          <p className="text-sm text-yellow-200/80">
            Always ensure your <code>getSessionKey</code> handles cases where <code>ctx.from</code> or <code>ctx.chat</code> might be null (e.g., in certain updates).
            Return a fallback key or handle appropriately.
          </p>
        </div>
      </section>
    </DocContent>
  );
}
