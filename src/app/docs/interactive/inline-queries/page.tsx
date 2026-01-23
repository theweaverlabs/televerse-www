import type { Metadata } from "next";
import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
    title: "Inline Queries",
    description: "Build powerful inline bots that work seamlessly in any chat. Learn how to handle inline queries and create interactive results.",
};

const basicSetupCode = `import 'package:televerse/televerse.dart';

void main() {
  final bot = Bot('YOUR_BOT_TOKEN');
  
  // Basic inline query handler
  bot.inlineQuery("inspire", (ctx) async {
    print("Someone needs inspiration! 🌟");
  });
  
  bot.start();
}`;

const firstResultCode = `bot.inlineQuery("inspire", (ctx) async {
  final builder = InlineQueryResultBuilder();
  
  // Create an article result
  builder.article(
    "inspire_1", // Unique ID
    "💫 Steve Jobs", // Title
    (content) => content.text(
      "\\"The only way to do great work is to love what you do.\\"\\n\\n— Steve Jobs",
      parseMode: ParseMode.markdown,
    ),
  );
  
  // Send results to user
  final results = builder.build();
  await ctx.answerInlineQuery(results);
});`;

const multipleResultsCode = `final inspirationalQuotes = [
  {
    'text': 'The only way to do great work is to love what you do.',
    'author': 'Steve Jobs'
  },
  {
    'text': 'Life is what happens to you while you\\'re busy making other plans.',
    'author': 'John Lennon'
  },
  {
    'text': 'The future belongs to those who believe in the beauty of their dreams.',
    'author': 'Eleanor Roosevelt'
  },
];

bot.inlineQuery("inspire", (ctx) async {
  final builder = InlineQueryResultBuilder();
  
  for (int i = 0; i < inspirationalQuotes.length; i++) {
    final quote = inspirationalQuotes[i];
    
    builder.article(
      "inspire_$i",
      "💫 \${quote['author']}",
      (content) => content.text(
        "\\"\${quote['text']}\\"\\n\\n— \${quote['author']}",
        parseMode: ParseMode.markdown,
      ),
    );
  }
  
  final results = builder.build();
  await ctx.answerInlineQuery(results);
});`;

const categoriesCode = `final quotes = {
  'motivational': [
    {'text': 'Success is not final, failure is not fatal...', 'author': 'Winston Churchill'},
    {'text': 'The way to get started is to quit talking and begin doing.', 'author': 'Walt Disney'},
  ],
  'funny': [
    {'text': 'I have not failed. I\\'ve just found 10,000 ways that won\\'t work.', 'author': 'Thomas Edison'},
  ],
  'wisdom': [
    {'text': 'The only true wisdom is in knowing you know nothing.', 'author': 'Socrates'},
  ],
};

Future<void> sendQuotesByCategory(Context ctx, String category, String emoji) async {
  final builder = InlineQueryResultBuilder();
  final categoryQuotes = quotes[category] ?? [];
  
  for (int i = 0; i < categoryQuotes.length; i++) {
    final quote = categoryQuotes[i];
    
    builder.article(
      "\${category}_$i",
      "$emoji \${quote['author']}",
      (content) => content.text(
        "\\"\${quote['text']}\\"\\n\\n— \${quote['author']}",
        parseMode: ParseMode.markdown,
      ),
    );
  }
  
  await ctx.answerInlineQuery(builder.build());
}

// Register category handlers
bot.inlineQuery("motivational", (ctx) async {
  await sendQuotesByCategory(ctx, "motivational", "🚀");
});

bot.inlineQuery("funny", (ctx) async {
  await sendQuotesByCategory(ctx, "funny", "😄");
});

bot.inlineQuery("wisdom", (ctx) async {
  await sendQuotesByCategory(ctx, "wisdom", "🧠");
});`;

const searchCode = `bot.inlineQuery(RegExp(r'^search\\s+(.+)'), (ctx) async {
  final inlineQuery = ctx.inlineQuery!;
  final match = RegExp(r'^search\\s+(.+)').firstMatch(inlineQuery.query);
  final searchTerm = match?.group(1)?.toLowerCase() ?? '';
  
  final builder = InlineQueryResultBuilder();
  final allQuotes = <Map<String, String>>[];
  
  // Gather all quotes from all categories
  quotes.values.forEach((categoryQuotes) {
    allQuotes.addAll(categoryQuotes.cast<Map<String, String>>());
  });
  
  // Find matching quotes
  final matchingQuotes = allQuotes.where((quote) =>
    quote['text']!.toLowerCase().contains(searchTerm) ||
    quote['author']!.toLowerCase().contains(searchTerm)
  ).toList();
  
  if (matchingQuotes.isEmpty) {
    builder.article(
      "no_results",
      "🤷‍♂️ No quotes found",
      (content) => content.text(
        "Sorry, I couldn't find any quotes matching \\"$searchTerm\\".\\n\\n"
        "Try searching for: motivational, wisdom, success, or an author's name!",
      ),
    );
  } else {
    for (int i = 0; i < matchingQuotes.length && i < 10; i++) {
      final quote = matchingQuotes[i];
      builder.article(
        "search_$i",
        "🔍 \${quote['author']}",
        (content) => content.text(
          "\\"\${quote['text']}\\"\\n\\n— \${quote['author']}",
          parseMode: ParseMode.markdown,
        ),
      );
    }
  }
  
  await ctx.answerInlineQuery(builder.build());
});`;

const fallbackCode = `// The safety net - handles everything else
bot.onInlineQuery((ctx) async {
  final query = ctx.inlineQuery!.query;
  
  final builder = InlineQueryResultBuilder();
  
  builder.article(
    "fallback",
    "🤔 Not sure what you're looking for?",
    (content) => content.text(
      "I didn't understand \\"$query\\", but I'm here to help! 🤗\\n\\n"
      "Try one of these:\\n"
      "• \`@quotebot motivational\` 🚀\\n"
      "• \`@quotebot funny\` 😄\\n"
      "• \`@quotebot wisdom\` 🧠\\n"
      "• \`@quotebot search <topic>\` 🔍\\n"
      "• \`@quotebot help\` 📚",
      parseMode: ParseMode.markdown,
    ),
  );
  
  await ctx.answerInlineQuery(builder.build());
});`;

const resultTypesCode = `// Article result (text-based content)
builder.article(
  "article_1",
  "Article Title",
  (content) => content.text("Article content"),
);

// Photo result
builder.photo(
  "photo_1",
  "https://example.com/photo.jpg",
  (content) => content.photo("https://example.com/photo.jpg"),
  thumbnailUrl: "https://example.com/thumb.jpg",
);

// Video result
builder.video(
  "video_1",
  "https://example.com/video.mp4",
  "video/mp4",
  "https://example.com/thumb.jpg",
  "Video Title",
  (content) => content.video("https://example.com/video.mp4"),
);

// GIF result
builder.gif(
  "gif_1",
  "https://example.com/animation.gif",
  "https://example.com/thumb.gif",
  (content) => content.animation("https://example.com/animation.gif"),
);`;

export default function InlineQueriesPage() {
    return (
        <DocContent
            title="Inline Queries"
            description="Build powerful inline bots that users can summon from any chat."
        >
            <section className="mt-8">
                <p>
                    Inline queries allow users to interact with your bot without leaving their current chat.
                    When someone types <code>@yourbot something</code> in any chat, Telegram sends an inline query to your bot,
                    and you can respond with a list of results that the user can select from.
                </p>
                <p className="mt-4">
                    This is perfect for bots that provide content like quotes, images, GIFs, or search results—anything
                    that users might want to share in their conversations without switching contexts.
                </p>
            </section>

            {/* Basic Setup */}
            <section className="mt-12">
                <h2>Getting Started</h2>
                <p>
                    Before handling inline queries, ensure your bot has inline mode enabled. You can do this by talking to
                    <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-white font-medium"> @BotFather</a> and
                    using the <code>/setinline</code> command.
                </p>
                <p className="mt-4">
                    Once enabled, you can start handling inline queries in your bot:
                </p>
                <CodeBlock code={basicSetupCode} language="dart" filename="main.dart" />
            </section>

            {/* First Result */}
            <section className="mt-12">
                <h2>Creating Your First Result</h2>
                <p>
                    The <code>InlineQueryResultBuilder</code> is your toolkit for creating inline results.
                    It provides methods to build different types of results that users can select from.
                </p>
                <CodeBlock code={firstResultCode} language="dart" filename="main.dart" />
                <p className="mt-4">
                    When a user types <code>@yourbot inspire</code>, they'll see a single result with the author's name.
                    Tapping it will send the formatted quote to their chat.
                </p>
            </section>

            {/* Multiple Results */}
            <section className="mt-12">
                <h2>Multiple Results</h2>
                <p>
                    Most inline bots show multiple options for users to choose from. Let's create a collection of quotes:
                </p>
                <CodeBlock code={multipleResultsCode} language="dart" filename="main.dart" />
                <p className="mt-4">
                    Now users will see a scrollable list of quote options, each showing the author's name. They can pick
                    whichever resonates with them.
                </p>
            </section>

            {/* Categories */}
            <section className="mt-12">
                <h2>Category-Based Results</h2>
                <p>
                    For better organization, you can create different handlers for different categories or topics:
                </p>
                <CodeBlock code={categoriesCode} language="dart" filename="main.dart" />
                <p className="mt-4">
                    Users can now type <code>@yourbot motivational</code>, <code>@yourbot funny</code>, or
                    <code>@yourbot wisdom</code> to get quotes from specific categories.
                </p>
            </section>

            {/* Search Feature */}
            <section className="mt-12">
                <h2>Smart Search with RegExp</h2>
                <p>
                    You can use regular expressions to create more flexible handlers, like a search feature:
                </p>
                <CodeBlock code={searchCode} language="dart" filename="main.dart" />
                <p className="mt-4">
                    Now users can search with <code>@yourbot search wisdom</code> or <code>@yourbot search Churchill</code>
                    to find relevant quotes.
                </p>
            </section>

            {/* Result Types */}
            <section className="mt-12">
                <h2>Different Result Types</h2>
                <p>
                    The <code>InlineQueryResultBuilder</code> supports various result types beyond text articles:
                </p>
                <CodeBlock code={resultTypesCode} language="dart" filename="main.dart" />
                <p className="mt-4">
                    Each result type has specific requirements. For example, photos and videos need URLs,
                    while articles can contain any text or media content.
                </p>
            </section>

            {/* Fallback Handler */}
            <section className="mt-12">
                <h2>Fallback Handler</h2>
                <p>
                    Always provide a fallback handler using <code>onInlineQuery</code> to catch any queries
                    that don't match your specific handlers:
                </p>
                <CodeBlock code={fallbackCode} language="dart" filename="main.dart" />
                <p className="mt-4">
                    This ensures users always get helpful feedback, even if they type something unexpected.
                </p>
            </section>

            {/* Best Practices */}
            <section className="mt-12">
                <h2>Best Practices</h2>
                <ul>
                    <li>
                        <strong>Unique IDs:</strong> Each result must have a unique ID. Use descriptive IDs like
                        <code>"category_index"</code> to help with debugging.
                    </li>
                    <li>
                        <strong>Limit Results:</strong> Telegram has a limit on the number of results you can send (usually 50).
                        For search results, limit to 10-20 most relevant items.
                    </li>
                    <li>
                        <strong>Fast Responses:</strong> Aim to respond within 1-2 seconds. Cache data when possible to avoid
                        delays from external APIs.
                    </li>
                    <li>
                        <strong>Clear Titles:</strong> Use descriptive titles that help users understand what they're selecting.
                    </li>
                    <li>
                        <strong>Helpful Fallbacks:</strong> Always show helpful suggestions when queries don't match, rather
                        than empty results.
                    </li>
                </ul>
            </section>

            {/* Handler Priority */}
            <section className="mt-12">
                <h2>Handler Priority</h2>
                <p>
                    Handlers are checked in the order they're registered. More specific handlers should be registered
                    before general ones:
                </p>
                <div className="my-6 p-4 border border-blue-500/20 bg-blue-500/10 rounded-lg">
                    <p className="text-sm">
                        <strong>Tip:</strong> Register specific string matches (like "help") before RegExp patterns
                        (like <code>RegExp(r'^search')</code>), and put <code>onInlineQuery</code> last as the
                        catch-all handler.
                    </p>
                </div>
            </section>

            <section className="mt-12">
                <h2>See Also</h2>
                <ul>
                    <li>
                        <Link href="/docs/core-concepts/context" className="text-white font-medium">
                            Context
                        </Link>
                        - Learn about accessing inline query data from the context.
                    </li>
                    <li>
                        <Link href="/docs/interactive/keyboards" className="text-white font-medium">
                            Keyboards
                        </Link>
                        - Add inline keyboards to your inline query results.
                    </li>
                </ul>
            </section>
        </DocContent>
    );
}
