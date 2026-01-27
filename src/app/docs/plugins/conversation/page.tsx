import type { Metadata } from "next";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
    title: "Conversation Plugin",
    description: "Create multi-step interactions and wizards easily.",
};

export default function ConversationPluginPage() {
    return (
        <DocContent
            title="Conversation Plugin"
            description="Create multi-step interactions and wizards easily."
        >
            <section className="mt-8">
                <p>
                    The <strong>Conversation Plugin</strong> makes it easy to build multi-step interactions where your bot needs to wait
                    for user input. Instead of managing complex state machines manually, you can write linear, readable code that
                    "pauses" execution until the user replies.
                </p>
            </section>

            <section className="mt-12">
                <h2>Installation</h2>
                <p>
                    Import the plugin from the main package.
                </p>
                <CodeBlock code="import 'package:televerse/plugins/conversation.dart';" language="dart" filename="main.dart" />
            </section>

            <section className="mt-12">
                <h2>Basic Usage</h2>
                <p>
                    Conversations are defined as functions that take a <code>Conversation</code> object and a <code>Context</code>.
                </p>

                <h3 className="mt-6">1. Define the Conversation</h3>
                <CodeBlock code={`Future<void> welcomeConversation(
  Conversation<Context> conversation, 
  Context ctx
) async {
  await ctx.reply("Welcome! What is your name?");
  
  // Wait for the next text message
  final nameCtx = await conversation.wait();
  
  await nameCtx.reply("Nice to meet you, \${nameCtx.text}! Now, how old are you?");
  
  // Wait again...
  final ageCtx = await conversation.wait();
  
  await ageCtx.reply("Got it! You are \${ageCtx.text} years old.");
}`} language="dart" filename="conversation.dart" />

                <h3 className="mt-6">2. Register and Trigger</h3>
                <CodeBlock code={`void main() {
  final bot = Bot("TOKEN");
  
  // 1. Install the plugin
  bot.plugin(ConversationPlugin());
  
  // 2. Register usage of the conversation
  bot.use(createConversation("welcome", welcomeConversation));
  
  // 3. Trigger it
  bot.command("start", (ctx) async {
    await ctx.conversation.enter("welcome");
  });
  
  bot.start();
}`} language="dart" filename="main.dart" />
            </section>

            <section className="mt-12">
                <h2>Waiting for Specific Input</h2>
                <p>
                    Often you don&apos;t just want <em>any</em> update, but specific input (like a photo, or text matching a regex).
                    The <code>conversation</code> handle provides methods for this.
                </p>

                <h3 className="mt-6"><code>waitFor(predicate)</code></h3>
                <p>
                    Wait until an update matches a specific condition.
                </p>
                <CodeBlock code={`// Wait until we receive a photo
final photoCtx = await conversation.waitFor(
  (ctx) => ctx.msg?.photo != null
);`} language="dart" filename="main.dart" />

                <h3 className="mt-6"><code>waitUntil(predicate, otherwise)</code></h3>
                <p>
                    Like <code>waitFor</code>, but allows you to give feedback if the user sends the wrong thing.
                </p>
                <CodeBlock code={`final numberCtx = await conversation.waitUntil(
  (ctx) => int.tryParse(ctx.text ?? '') != null,
  otherwise: (ctx) async {
    await ctx.reply("That's not a number! Please try again.");
  },
);`} language="dart" filename="main.dart" />
            </section>

            <section className="mt-12">
                <h2>Handling Timeouts</h2>
                <p>
                    Conversations shouldn&apos;t stall forever. You can define timeouts to stop waiting if the user disappears.
                </p>

                <CodeBlock code={`try {
  await ctx.reply("Quick! Type 'yes' in 10 seconds!");
  
  final response = await conversation.wait(
    timeout: Duration(seconds: 10),
  );
  
  await response.reply("You made it!");
} on ConversationTimeoutException {
  await ctx.reply("Too slow! 🐢");
}`} language="dart" filename="main.dart" />

                <p className="mt-4">
                    You can also set a default timeout when installing the plugin:
                </p>

                <CodeBlock code={`bot.plugin(ConversationPlugin(
  defaultTimeout: Duration(minutes: 5),
));`} language="dart" filename="main.dart" />
            </section>

            <section className="mt-12">
                <h2>Persistence and Storage</h2>
                <p>
                    Like sessions, conversations need to be stored, especially if your bot restarts. The <code>ConversationPlugin</code>
                    supports custom storage backends just like the Session Plugin.
                </p>
                <p className="mt-4">
                    By default, it uses memory storage. For production, pass a persistent storage implementation to the
                    <code>storage</code> parameter of the plugin constructor.
                </p>
            </section>
        </DocContent>
    );
}
