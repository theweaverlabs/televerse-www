import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";
import { botApiVersion, televerseVersion } from "@/consts";

const pubspecCode = `dependencies:
  televerse: ${televerseVersion}`;

const importCode = `import 'package:televerse/televerse.dart';`;

const addPackageCode = `dart pub add televerse`;

export default function InstallationPage() {
    return (
        <DocContent
            title="Installation"
            description="Add Televerse to your Dart project in seconds."
        >
            {/* Requirements */}
            <section className="mt-8">
                <h2>Requirements</h2>
                <p>
                    Before installing Televerse, make sure you have the following:
                </p>
                <ul>
                    <li>
                        <strong>Dart SDK</strong> — Version 3.8.0 or higher
                    </li>
                    <li>
                        <strong>A Telegram Bot Token</strong> — Get one from{" "}
                        <Link href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer">
                            @BotFather
                        </Link>
                    </li>
                </ul>
            </section>

            {/* Installation Methods */}
            <section className="mt-12">
                <h2>Installation</h2>

                <h3>Using dart pub add (Recommended)</h3>
                <p>
                    The easiest way to install Televerse is using the <code>dart pub add</code> command:
                </p>
                <CodeBlock code={addPackageCode} language="bash" filename="terminal" />

                <h3>Manual Installation</h3>
                <p>
                    Alternatively, add Televerse to your <code>pubspec.yaml</code> file manually:
                </p>
                <CodeBlock code={pubspecCode} language="yaml" filename="pubspec.yaml" />
                <p>
                    Then run:
                </p>
                <CodeBlock code="dart pub get" language="bash" filename="terminal" />
            </section>

            {/* Import */}
            <section className="mt-12">
                <h2>Import the Package</h2>
                <p>
                    Once installed, import Televerse in your Dart file:
                </p>
                <CodeBlock code={importCode} language="dart" filename="main.dart" />
                <p>
                    This single import gives you access to all Televerse classes, including the <code>Bot</code> class,
                    <code>Context</code>, all Telegram models, and utilities.
                </p>
            </section>

            {/* Version Notes */}
            <section className="mt-12">
                <h2>Version Compatibility</h2>
                <div className="not-prose">
                    <table className="w-full text-sm text-left">
                        <thead className="text-zinc-400 border-b border-zinc-800">
                            <tr>
                                <th className="py-3 px-4">Televerse Version</th>
                                <th className="py-3 px-4">Dart SDK</th>
                                <th className="py-3 px-4">Bot API</th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-300">
                            <tr className="border-b border-zinc-800/50">
                                <td className="py-3 px-4">^1.20.0</td>
                                <td className="py-3 px-4">&gt;=3.8.0</td>
                                <td className="py-3 px-4">{botApiVersion}</td>
                            </tr>
                            <tr className="border-b border-zinc-800/50">
                                <td className="py-3 px-4">^1.15.0</td>
                                <td className="py-3 px-4">&gt;=3.0.0</td>
                                <td className="py-3 px-4">7.9</td>
                            </tr>
                            <tr className="border-b border-zinc-800/50">
                                <td className="py-3 px-4">^1.10.0</td>
                                <td className="py-3 px-4">&gt;=2.19.0</td>
                                <td className="py-3 px-4">7.0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Next Steps */}
            <section className="mt-12">
                <h2>Next Steps</h2>
                <p>
                    Now that you have Televerse installed, head over to the{" "}
                    <Link href="/docs/getting-started" className="text-white font-medium">
                        Getting Started
                    </Link>{" "}
                    guide to create your first bot!
                </p>
            </section>
        </DocContent>
    );
}
