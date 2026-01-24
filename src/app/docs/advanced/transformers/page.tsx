import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocContent } from "@/components/docs/DocContent";

const createTransformerExampleCode = `// Create a transformer (example)
class MyTransformer extends Transformer {
  @override
  Future<Map<String, dynamic>> transform(
    APICaller call, 
    APIMethod method, 
    [Payload? payload]
  ) async {
    print("Calling method: \${method.name}");
    return await call(method, payload);
  }
}

// Attach it to your bot
bot.api.use(MyTransformer());`;

const performanceLoggerExampleCode = `class PerformanceLogger extends Transformer {
  @override
  Future<Map<String, dynamic>> transform(
    APICaller call, 
    APIMethod method, 
    [Payload? payload]
  ) async {
    final stopwatch = Stopwatch()..start();
    
    try {
      // Continue the chain
      final result = await call(method, payload);
      
      print('✅ \${method.name} took \${stopwatch.elapsedMilliseconds}ms');
      return result;
    } catch (e) {
      print('❌ \${method.name} failed after \${stopwatch.elapsedMilliseconds}ms');
      rethrow;
    }
  }
}`;

const autoRetryExampleCode = `import 'package:auto_retry/auto_retry.dart';

// Use the AutoRetry plugin
bot.plugin(AutoRetryPlugin(
  maxRetryAttempts: 5,
  rethrowInternalServerErrors: true,
  enableLogs: true,
));`;

const transformerPluginExampleCode = `class MyPlugin extends TransformerPlugin {
  @override
  Transformer get transformer => MyTransformer();
  
  @override
  String get name => 'my-plugin';
  
  @override
  void install(Bot bot) {
    // Automatically attaches the transformer
    super.install(bot); 
    // You can also add more initialization logic here
  }
}

// Usage
bot.install(MyPlugin());`;

const removeTransformerExampleCode = `// Remove a specific transformer instance
bot.api.removeTransformer(myTransformer);

// Remove all transformers of a specific type
bot.api.removeTransformersOfType<LoggingTransformer>();

// Clear all transformers
bot.api.clearTransformers();`;


export default function TransformersPage() {
  return (
    <DocContent
      title="Transformers"
      description="Intercept, modify, and handle Telegram Bot API requests with the powerful Transformer system."
    >
      <h2>Overview</h2>
      <p>
        <strong>Transformers</strong> are a powerful feature in Televerse that allow you to intercept and modify outgoing API requests before they are sent to the Telegram servers.
      </p>
      <p>
        Think of Transformers as <strong>middleware for API calls</strong>. While normal middleware handles <em>incoming updates</em> (from Telegram to your bot), Transformers handle <em>outgoing requests</em> (from your bot to Telegram).
      </p>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 my-6">
        <p className="font-medium text-white mb-2">Transformers vs Middleware</p>
        <ul className="list-disc pl-4 space-y-1 text-zinc-400">
          <li><strong>Middleware:</strong> Intercepts incoming updates (e.g. messages, callback queries).</li>
          <li><strong>Transformers:</strong> Intercepts outgoing API calls (e.g. sendMessage, editMessageText).</li>
        </ul>
      </div>

      <h2>How It Works</h2>
      <p>
        Transformers form a chain around the raw API caller. When you make an API call (like <code>ctx.reply</code> or <code>bot.api.sendMessage</code>), the request passes through all registered transformers in order.
      </p>
      <p>
        Each transformer can:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Modify the request</strong>: Change parameters, headers, or the API method itself.</li>
        <li><strong>Perform side effects</strong>: Log the request, update metrics, or trigger other actions.</li>
        <li><strong>Intercept the response</strong>: Modify the data returned by Telegram before it reaches your code.</li>
        <li><strong>Handle errors</strong>: Catch exceptions and retry the request or return a fallback value.</li>
        <li><strong>Cancel the request</strong>: Prevent the call from ever reaching the network.</li>
      </ul>

      <h2>Using Transformers</h2>
      <p>
        To use a transformer, you simply attach it to the <code>bot.api</code> instance using the <code>use</code> method.
      </p>

      <CodeBlock code={createTransformerExampleCode} language="dart" />

      <h2>Creating a Custom Transformer</h2>
      <p>
        To create a custom transformer, extend the <code>Transformer</code> abstract class and implement the <code>transform</code> method.
      </p>
      <p>
        The <code>transform</code> method receives:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><code>call</code>: A function representing the <strong>next</strong> step in the chain (either another transformer or the actual network request).</li>
        <li><code>method</code>: The API method being called (e.g., <code>APIMethod.sendMessage</code>).</li>
        <li><code>payload</code>: The data payload (parameters and files) for the request.</li>
      </ul>

      <h3>Example: Logging Transformer</h3>
      <p>
        Here is a simple transformer that logs the time taken for each API call.
      </p>

      <CodeBlock code={performanceLoggerExampleCode} language="dart" />

      <h3>Example: Auto-Retry Transformer</h3>
      <p>
        Transformers are excellent for implementing reliability logic like automatic retries. We have a dedicated plugin for this called <code>auto_retry</code>.
      </p>
      <p>
        Check out the <a href="https://pub.dev/packages/auto_retry" target="_blank" rel="noopener noreferrer">auto_retry package on pub.dev</a> for a production-ready implementation.
      </p>

      <CodeBlock code={autoRetryExampleCode} language="dart" />

      <h2>Transformer Plugins</h2>
      <p>
        If you are building a reusable package or just want to organize your code better, you can use the <code>TransformerPlugin</code> interface. This allows users to install your transformer using the standard <code>bot.use</code> or <code>bot.install</code> (if it's a plugin).
      </p>
      <CodeBlock code={transformerPluginExampleCode} language="dart" />

      <h2>Under The Hood</h2>
      <p>
        Deep down, the <code>RawAPI</code> class maintains a <code>TransformerManager</code>. When you call <code>bot.api.transformers</code>, you can see the list of active transformers.
      </p>
      <p>
        You can also remove transformers if needed:
      </p>
      <CodeBlock code={removeTransformerExampleCode} language="dart" />
    </DocContent>
  );
}
