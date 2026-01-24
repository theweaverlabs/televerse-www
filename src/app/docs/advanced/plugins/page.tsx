import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocContent } from "@/components/docs/DocContent";

const pluginInterfaceCode = `abstract interface class BotPlugin<CTX extends Context> {
  // Unique name for the plugin
  String get name;
  
  // Plugin version
  String get version => '1.0.0';
  
  // List of other plugins this plugin depends on
  List<String> get dependencies => const [];
  
  // Description of what the plugin does
  String? get description => null;

  // Called when the plugin is installed
  void install(Bot<CTX> bot);

  // Called when the plugin is uninstalled
  void uninstall(Bot<CTX> bot) {}
}`;

const customPluginCode = `import 'package:televerse/televerse.dart';

class MaintenancePlugin<CTX extends Context> implements BotPlugin<CTX> {
  // Configuration: is maintenance mode active?
  bool enabled;

  // Configuration: message to send
  final String message;

  // Allow admins to bypass maintenance
  final List<int> adminIds;

  MaintenancePlugin({
    this.enabled = false,
    this.message =
        "⚠️ The bot is currently under maintenance. Please try again later.",
    this.adminIds = const [],
  });

  @override
  String get name => 'maintenance-mode';

  @override
  String get description => 'Blocks checks if the bot is in maintenance mode.';

  @override
  void install(Bot<CTX> bot) {
    // Add our middleware to the bot
    bot.use(_handler);
  }

  @override
  void uninstall(Bot<CTX> bot) {
    // No cleanup needed for this simple plugin
  }

  // The middleware logic
  Future<void> _handler(CTX ctx, NextFunction next) async {
    // 1. If maintenance is disabled, just continue
    if (!enabled) {
      await next();
      return;
    }

    // 2. Check if user is admin (can bypass)
    if (ctx.from != null && adminIds.contains(ctx.from!.id)) {
      await next();
      return;
    }

    // 3. Maintenance is active and user is not admin
    // Reply and STOP the chain (don't call next)
    await ctx.reply(message);
  }

  @override
  List<String> get dependencies => [];

  @override
  String get version => "1.0.0";
}`;

const customPluginStep2Code = `void main() async {
  final bot = Bot(Platform.environment["BOT_TOKEN"]!);

  // specific admin ID
  const myAdminId = 123456789;

  // Create the plugin instance
  final maintenance = MaintenancePlugin(
    enabled: true, // Start in maintenance mode
    adminIds: [myAdminId],
  );

  // Install it!
  bot.plugin(maintenance);

  // Define commands
  bot.command('start', (ctx) => ctx.reply("System is online! 🟢"));
  
  // Admin command to toggle maintenance at runtime
  bot.command('toggle', (ctx) {
      if (ctx.from?.id != myAdminId) return;
      
      maintenance.enabled = !maintenance.enabled;
      ctx.reply("Maintenance is now: \${maintenance.enabled ? 'ON 🔴' : 'OFF 🟢'}");
  });

  await bot.start();
}`;

const pluginAdvancedCode = `class ShoppingCartPlugin<CTX extends Context> implements BotPlugin<CTX> {
  @override
  String get name => 'shopping-cart';

  // Declare that this plugin NEEDS 'session' to work
  @override
  List<String> get dependencies => ['session']; 

  @override
  void install(Bot<CTX> bot) {
    // We can safely assume session is available here because
    // Televerse checked the dependencies.
    
    bot.use((ctx, next) async {
        // ... cart logic using ctx.session ...
    });
  }
}`;

const transformerPluginCode = `class MyAutoRetryTransformer<CTX extends Context> implements BotPlugin<CTX> {
  @override
  String get name => 'auto-reply';

  @override
  void install(Bot<CTX> bot) {
    // Install a transformer to intercept API calls
    bot.api.use(MyAutoRetryTransformer());
  }
  
  // ...
}`;

export default function PluginsPage() {
    return (
        <DocContent
            title="Plugins"
            description="Extend your bot's functionality with the modular Plugin system."
        >
            <h2>Overview</h2>
            <p>
                The <strong>Plugin System</strong> in Televerse is designed to make your bot extensible and modular. Plugins allow you to package reusable logic, middleware, and transformers into a single unit that can be easily installed and configured.
            </p>
            <p>
                Plugins are excellent for:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Sharing code:</strong> Package common features (like authentication or session management) and share them across multiple bots.</li>
                <li><strong>Organizing code:</strong> Keep your bot's core logic clean by moving complex features into separate plugin files.</li>
                <li><strong>Community contributions:</strong> Use plugins created by the community to add powerful features instantly.</li>
            </ul>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 my-6">
                <p className="font-medium text-white mb-2">Built-in Plugins</p>
                <p className="text-zinc-400">
                    Televerse comes with powerful built-in plugins like <strong>Session</strong> and <strong>Conversation</strong>. We encourage you to study their source code to understand how to build robust plugins.
                </p>
            </div>

            <h2>The Plugin Interface</h2>
            <p>
                All plugins in Televerse realize the <code>BotPlugin&lt;CTX&gt;</code> interface. This interface defines the contract that your plugin must follow.
            </p>

            <CodeBlock code={pluginInterfaceCode} language="dart" />

            <h3>Types of Plugins</h3>
            <p>
                While the <code>BotPlugin</code> interface is the base, Televerse provides two helper abstract classes for common use cases:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>MiddlewarePlugin:</strong> For plugins that only add middleware (e.g., a logger or flood control).</li>
                <li><strong>TransformerPlugin:</strong> For plugins that only modify API requests (e.g., auto-retry or payload modifier).</li>
            </ul>

            <h2>Creating a Custom Plugin</h2>
            <p>
                Let's build a practical example: a <strong>Maintenance Mode</strong> plugin. This plugin will check a flag and, if maintenance is enabled, reply to all messages with a "Service Unavailable" message and stop further processing.
            </p>

            <h3>Step 1: Define the Plugin</h3>
            <p>
                We'll create a class that implements <code>BotPlugin</code>.
            </p>

            <CodeBlock code={customPluginCode} language="dart" />

            <h3>Step 2: Using the Plugin</h3>
            <p>
                Now that we've created the plugin, using it is incredibly simple.
            </p>

            <CodeBlock code={customPluginStep2Code} language="dart" />

            <h2>Advanced Plugin Features</h2>

            <h3>Dependencies</h3>
            <p>
                Some plugins might require other plugins to function. For example, a <code>ShoppingCartPlugin</code> might need the <code>SessionPlugin</code> to store cart items.
            </p>
            <p>
                You can declare dependencies in your plugin. Televerse will check for them during installation and throw an error if they are missing.
            </p>

            <CodeBlock code={pluginAdvancedCode} language="dart" />

            <h3>Transformers in Plugins</h3>
            <p>
                Plugins can also modify the bot's API behavior by installing Transformers. For example, an <strong>Auto Retry</strong> plugin could automatically retry failed API requests.
            </p>

            <CodeBlock code={transformerPluginCode} language="dart" />
        </DocContent>
    );
}
