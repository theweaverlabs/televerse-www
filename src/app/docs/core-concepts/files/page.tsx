import type { Metadata } from "next";
import Link from "next/link";
import { DocContent, CodeBlock } from "@/components/docs";

export const metadata: Metadata = {
    title: "Sending & Receiving Files",
    description: "Learn how to send and receive files with Televerse. Work with photos, videos, documents, and more using the InputFile class.",
};

const inputFileBasicCode = `import 'package:televerse/televerse.dart';
import 'dart:io';

// From a file ID (already on Telegram servers)
final photo = InputFile.fromFileId('AgACAgUAAxkBAAIvAWbUio...QADNQQ');

// From a URL
final photo = InputFile.fromUrl('https://example.com/photo.jpg');

// From a local file
final file = File('assets/photo.jpg');
final photo = InputFile.fromFile(file);

// From bytes
final bytes = file.readAsBytesSync();
final photo = InputFile.fromBytes(bytes, name: 'photo.jpg');`;

const sendingPhotoCode = `bot.command('photo', (ctx) async {
  // Using a file ID
  final photo = InputFile.fromFileId('AgACAgUAAxkBAAIvAWbUio...QADNQQ');
  await ctx.replyWithPhoto(photo);
  
  // Using a URL
  final urlPhoto = InputFile.fromUrl(
    'https://televerse.weaverlabs.ca/assets/lockup-with-bg.png',
  );
  await ctx.replyWithPhoto(urlPhoto, caption: 'From URL! 🌐');
  
  // Using a local file
  final localPhoto = InputFile.fromFile(File('assets/sunset.jpg'));
  await ctx.replyWithPhoto(
    localPhoto,
    caption: 'Beautiful sunset! 🌅',
    parseMode: ParseMode.markdown,
  );
});`;

const sendingDocumentCode = `bot.command('document', (ctx) async {
  final document = InputFile.fromFile(File('reports/monthly.pdf'));
  
  await ctx.replyWithDocument(
    document,
    caption: 'Monthly Report - January 2024',
  );
});`;

const sendingVideoCode = `bot.command('video', (ctx) async {
  final video = InputFile.fromFile(File('videos/demo.mp4'));
  
  await ctx.replyWithVideo(
    video,
    caption: 'Check out this demo! 🎥',
    supportsStreaming: true,
    thumbnail: InputFile.fromFile(File('thumbnails/demo-thumb.jpg')),
  );
});`;

const sendingAudioCode = `bot.command('audio', (ctx) async {
  final audio = InputFile.fromFile(File('music/song.mp3'));
  
  await ctx.replyWithAudio(
    audio,
    caption: 'Enjoy this track! 🎵',
    performer: 'Artist Name',
    title: 'Song Title',
    duration: 180, // 3 minutes
  );
});`;

const receivingFileCode = `bot.on(bot.filters.photo, (ctx) async {
  // Get the file information
  final file = await ctx.getMessageFile();
  
  if (file != null) {
    print('File ID: \${file.fileId}');
    print('File size: \${file.fileSize} bytes');
    print('File path: \${file.filePath}');
  }
});`;

const downloadingFileCode = `bot.on(bot.filters.document, (ctx) async {
  await ctx.reply('Processing your document...');
  
  // Get the file information
  final file = await ctx.getMessageFile();
  
  if (file != null) {
    // Get the download URL
    final url = file.getDownloadUrl(bot.token);
    
    // Or download the file directly
    final io.File downloaded = await file.download(token: bot.token);
    
    // Process the file
    print('Downloaded to: \${downloaded.path}');
    
    // You can now read, analyze, or transform the file
    final bytes = await downloaded.readAsBytes();
    print('File size: \${bytes.length} bytes');
    
    await ctx.reply('Document processed successfully! ✅');
  }
});`;

const receivingVideoCode = `bot.on(bot.filters.video, (ctx) async {
  await ctx.reply('Got it!');
  
  final video = ctx.msg!.video!;
  print('Video dimensions: \${video.width}x\${video.height}');
  print('Duration: \${video.duration} seconds');
  
  // Get the file for downloading
  final file = await ctx.getMessageFile();
  
  if (file != null) {
    // Create a download button
    final url = file.getDownloadUrl(bot.token);
    await ctx.reply(
      'Tap the button to download the video.',
      replyMarkup: InlineKeyboard().addUrl('Download Now', url),
    );
  }
});`;

const mediaGroupCode = `bot.command('album', (ctx) async {
  final media = [
    InputMediaPhoto(media: InputFile.fromFile(File('photos/1.jpg'))),
    InputMediaPhoto(
      media: InputFile.fromFile(File('photos/2.jpg')),
      caption: 'Photo 2 with caption',
    ),
    InputMediaPhoto(media: InputFile.fromFile(File('photos/3.jpg'))),
  ];
  
  await ctx.replyWithMediaGroup(media);
});`;

const voiceAndVideoNoteCode = `// Sending voice messages
bot.command('voice', (ctx) async {
  final voice = InputFile.fromFile(File('voice/greeting.ogg'));
  await ctx.replyWithVoice(voice, duration: 5);
});

// Sending video notes (rounded videos)
bot.command('videonote', (ctx) async {
  final videoNote = InputFile.fromFile(File('notes/message.mp4'));
  await ctx.replyWithVideoNote(
    videoNote,
    duration: 10,
  );
});`;

export default function FilesPage() {
    return (
        <DocContent
            title="Sending & Receiving Files"
            description="Master file handling in your Telegram bot with Televerse."
        >
            <section className="mt-8">
                <p>
                    Working with files is a fundamental part of building Telegram bots. Whether you're sending photos,
                    videos, documents, or receiving files from users, Televerse makes this process straightforward with the{" "}
                    <code>InputFile</code> class and context-aware methods.
                </p>
            </section>

            {/* Telegram File Upload Principles */}
            <section className="mt-12">
                <h2>Telegram File Upload Principles</h2>
                <p>
                    According to the{" "}
                    <a
                        href="https://core.telegram.org/bots/api#sending-files"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-medium"
                    >
                        Telegram Bot API
                    </a>
                    , there are three main ways to send files:
                </p>
                <ol className="mt-4">
                    <li>
                        <strong>File ID:</strong> If the file is already stored on Telegram's servers, use its <code>file_id</code>.
                        No size limit when using this method.
                    </li>
                    <li>
                        <strong>URL:</strong> Provide a publicly accessible URL. Telegram downloads and sends it for you.
                        Size limit: <strong>5 MB</strong> for photos, <strong>20 MB</strong> for other types.
                    </li>
                    <li>
                        <strong>Upload (multipart/form-data):</strong> Upload a local file directly.
                        Size limit: <strong>10 MB</strong> for photos, <strong>50 MB</strong> for other types.
                    </li>
                </ol>
            </section>

            {/* The InputFile Class */}
            <section className="mt-12">
                <h2>The InputFile Class</h2>
                <p>
                    The <code>InputFile</code> class is your gateway to sending files with Televerse.
                    It supports all three upload methods through dedicated constructors.
                </p>

                <h3>Constructors</h3>
                <ul className="mt-4">
                    <li><code>InputFile.fromFileId</code> - Use a file already on Telegram servers</li>
                    <li><code>InputFile.fromUrl</code> - Send a file from a URL</li>
                    <li><code>InputFile.fromFile</code> - Upload a local <code>File</code> object</li>
                    <li><code>InputFile.fromBytes</code> - Upload raw bytes with a name</li>
                </ul>

                <CodeBlock code={inputFileBasicCode} language="dart" filename="input_file_examples.dart" />

                <div className="my-6 p-4 border border-yellow-500/20 bg-yellow-500/10 rounded-lg">
                    <p className="text-sm">
                        <strong>Note:</strong> A <code>file_id</code> is unique to your bot. The same file can have different IDs
                        across bots. While you can sometimes use file IDs from other bots, it's not guaranteed to work.
                    </p>
                </div>
            </section>

            {/* Sending Files */}
            <section className="mt-12">
                <h2>Sending Files</h2>
                <p>
                    Once you have an <code>InputFile</code>, you can send it using Context methods.
                    Televerse provides convenient reply methods for all file types.
                </p>

                <h3>Sending Photos</h3>
                <CodeBlock code={sendingPhotoCode} language="dart" filename="send_photo.dart" />

                <h3>Sending Documents</h3>
                <p className="mt-6">
                    Documents are perfect for PDFs, spreadsheets, or any general file type.
                </p>
                <CodeBlock code={sendingDocumentCode} language="dart" filename="send_document.dart" />

                <h3>Sending Videos</h3>
                <p className="mt-6">
                    Send video files with optional thumbnails and streaming support.
                </p>
                <CodeBlock code={sendingVideoCode} language="dart" filename="send_video.dart" />

                <h3>Sending Audio</h3>
                <p className="mt-6">
                    Audio files support metadata like performer, title, and duration.
                </p>
                <CodeBlock code={sendingAudioCode} language="dart" filename="send_audio.dart" />
            </section>

            {/* Media Groups */}
            <section className="mt-12">
                <h2>Media Groups (Albums)</h2>
                <p>
                    Send 2-10 photos or videos as an album using <code>replyWithMediaGroup</code>.
                </p>
                <CodeBlock code={mediaGroupCode} language="dart" filename="media_group.dart" />
            </section>

            {/* Voice and Video Notes */}
            <section className="mt-12">
                <h2>Voice Messages & Video Notes</h2>
                <p>
                    Telegram supports special file types for voice messages and rounded video notes.
                </p>
                <CodeBlock code={voiceAndVideoNoteCode} language="dart" filename="voice_and_notes.dart" />
            </section>

            {/* Receiving Files */}
            <section className="mt-12">
                <h2>Receiving Files</h2>
                <p>
                    When users send files to your bot, you can access file information and download files easily.
                </p>

                <h3>Getting File Information</h3>
                <p className="mt-4">
                    Use the <code>getMessageFile()</code> context method to retrieve file metadata.
                    This method automatically detects the file type (photo, document, video, etc.) and returns the <code>File</code> object.
                </p>
                <CodeBlock code={receivingFileCode} language="dart" filename="receive_file.dart" />

                <p className="mt-4">
                    The <code>getMessageFile()</code> method works with:
                </p>
                <ul className="mt-2">
                    <li>Photos (returns the largest size)</li>
                    <li>Documents</li>
                    <li>Audio files</li>
                    <li>Videos</li>
                    <li>Animations (GIFs)</li>
                    <li>Voice messages</li>
                    <li>Video notes</li>
                    <li>Stickers</li>
                </ul>
            </section>

            {/* Downloading Files */}
            <section className="mt-12">
                <h2>Downloading Files</h2>
                <p>
                    Once you have the <code>File</code> object, you can download it to your server for processing.
                </p>
                <CodeBlock code={downloadingFileCode} language="dart" filename="download_file.dart" />

                <div className="my-6 p-4 border border-amber-500/20 bg-amber-500/10 rounded-lg">
                    <p className="text-sm">
                        <strong>Important:</strong> Download links expire after <strong>1 hour</strong>.
                        If you need a fresh link, call <code>getMessageFile()</code> or <code>api.getFile()</code> again.
                    </p>
                </div>

                <h3>Practical Example: Video Handler</h3>
                <p className="mt-6">
                    Here's a complete example that receives a video and provides a download button:
                </p>
                <CodeBlock code={receivingVideoCode} language="dart" filename="video_handler.dart" />
            </section>

            {/* Using Raw API */}
            <section className="mt-12">
                <h2>Using the Raw API</h2>
                <p>
                    If you're not working within a context (e.g., scheduled tasks), you can use the Raw API directly:
                </p>
                <CodeBlock
                    code={`// Send a photo
await bot.api.sendPhoto(
  ChatID(123456789),
  InputFile.fromFile(File('photo.jpg')),
  caption: 'Direct API call',
);

// Get file information by file ID
final file = await bot.api.getFile('AgACAgUAAxkBAAIvAWbUio...QADNQQ');
final downloaded = await file.download(token: bot.token);`}
                    language="dart"
                    filename="raw_api_files.dart"
                />
            </section>

            <section className="mt-12">
                <h2>See Also</h2>
                <ul>
                    <li>
                        <Link href="/docs/core-concepts/context" className="text-white font-medium">
                            Context
                        </Link>
                        - Learn about context-aware reply methods
                    </li>
                    <li>
                        <Link href="/docs/core-concepts/raw-api" className="text-white font-medium">
                            Raw API
                        </Link>
                        - Direct API access for file operations
                    </li>
                </ul>
            </section>
        </DocContent>
    );
}
