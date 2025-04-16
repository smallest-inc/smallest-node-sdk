![image](https://i.imgur.com/TJ2tT4g.png)   


<div align="center">
  <a href="https://twitter.com/smallest_AI">
    <img src="https://img.shields.io/twitter/url/https/twitter.com/smallest_AI.svg?style=social&label=Follow%20smallest_AI" alt="Twitter">
  <a href="https://discord.gg/ywShEyXHBW">
    <img src="https://dcbadge.vercel.app/api/server/ywShEyXHBW?style=flat" alt="Discord">
  </a>
  <a href="https://www.linkedin.com/company/smallest">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-blue" alt="Linkedin">
  </a>
  <a href="https://www.youtube.com/@smallest_ai">
    <img src="https://img.shields.io/static/v1?message=smallest_ai&logo=youtube&label=&color=FF0000&logoColor=white&labelColor=&style=for-the-badge" height=20 alt="Youtube">
  </a>
</div> 

## Official Node Client for Smallest AI API   

Smallest AI offers an end to end Voice AI suite for developers trying to build real-time voice agents. You can either directly use our Text to Speech APIs through the Waves Client or use the Atoms Client to build and operate end to end enterprise ready Voice Agents.

With this sdk, you can easily interact with both Waves and Atoms from your Typescript/Javascript application, by utilising WavesClient and AtomsClient classes respectively. Currently, the WavesClient supports direct synthesis and the ability to synthesize streamed LLM output. AtomsClient provides a simpler way of interacting with all our API's to develop and run agentic workflows.

To learn how to use our API's, check out our documentation for [Atoms](https://atoms-docs.smallest.ai/introduction) and [Waves](https://waves-docs.smallest.ai/content/introduction/)

## Table of Contents

- [Installation](#installation)
- [Get the API Key](#get-the-api-key)
- [What are Atoms?](#what-are-atoms)
  - [Creating your first Agent](#creating-your-first-agent)
  - [Placing an outbound call](#placing-an-outbound-call)
  - [Providing context to the agent](#providing-context-to-the-agent)
  - [Configuring workflows to drive conversations](#configuring-workflows-to-drive-conversations)
  - [Provisioning bulk calling using campaigns](#provisioning-bulk-calling-using-campaigns)  
- [Getting started with Waves](#getting-started-with-waves)
  - [Best Practices for Input Text](#best-practices-for-input-text)
  - [Examples](#examples)
    - [Speech synthesis](#speech-synthesis)
    - [Streaming speech synthesis](#streaming-speech-synthesis)
    - [Add your Voice](#add-your-voice)
    - [Delete your Voice](#delete-your-voice)
  - [Available Methods](#available-methods)
  - [Technical Note: WAV Headers in Streaming Audio](#technical-note-wav-headers-in-streaming-audio)

## Installation

To install the latest version available   
```bash
npm install smallestai
```  
When using an SDK in your application, make sure to pin to at least the major version (e.g., ==1.*). This helps ensure your application remains stable and avoids potential issues from breaking changes in future updates.   
   

## Get the API Key  

1. Visit [console.smallest.ai](https://console.smallest.ai//) and sign up for an account or log in if you already have an account.  
2. Navigate to `API Keys` tab in your account dashboard.
3. Create a new API Key and copy it.
4. Export the API Key in your environment with the name `SMALLEST_API_KEY`, ensuring that your application can access it securely for authentication.


## What are Atoms

Atoms are agents that can talk to anyone on voice or text in any language, in any voice. Imagine an AI that you can hire to perform end-to-end tasks for your business. The following examples give an overview of how AtomsClient leverages abstractions such as KnowledgeBase, Campaigns and graph-based Workflows to let you build the smartest voice agent for your usecase.

### Creating your first Agent

```typescript
import { AtomsClient, Configuration } from 'smallestai';

const TARGET_PHONE_NUMBER = "+919666666666";

async function main() {
    // alternatively, you can export API Key as environment variable SMALLEST_API_KEY. 
    const config = new Configuration({
        accessToken: 'SMALLEST_API_KEY'
    });

    const atomsClient = new AtomsClient(config);

    const agentCreateResponse = await atomsClient.createAgent({
        name: "Atoms Multi-Modal Agent",
        description: "My first atoms agent",
        language: {
            enabled: "en",
            switching: false
        },
        synthesizer: {
            voiceConfig: {
                model: "waves_lightning_large",
                voiceId: "nyah"
            },
            speed: 1.2,
            consistency: 0.5,
            similarity: 0,
            enhancement: 1
        },
        slmModel: "electron-v1"
    });
    
    cosnt agentId = agentCreateResponse.data;
    console.log(`Successfully created agent with id: ${agentId}`);
}

main().catch(console.error);
```

### Placing an outbound call

```typescript
import { AtomsClient } from 'smallestai';

const TARGET_PHONE_NUMBER = "+919666666666";
const MY_AGENT_ID = "67e****ff*ec***82*3c9e**";

async function main() {
    // assumes you have exported API_KEY in SMALLEST_API_KEY environment variable
    const atomsClient = new AtomsClient();

    const callResponse = await atomsClient.startOutboundCall({
        agentId: MY_AGENT_ID,
        phoneNumber: TARGET_PHONE_NUMBER
    });
    
    console.log(`Successfully placed call with id: ${callResponse.data.conversationId}`);
}

main().catch(console.error);
```

### Providing context to the agent

An agent can be attached to a knowledge base, which it can look up during conversations. Here is how you can do it:

```typescript
import { AtomsClient } from 'smallestai';
import * as fs from 'fs';

async function main() {
    // assumes you have exported API_KEY in SMALLEST_API_KEY environment variable
    const atomsClient = new AtomsClient();
    
    // Create a new knowledge base
    const knowledgeBaseId = await atomsClient.createKnowledgeBase({
        name: "Customer Support Knowledge Base",
        description: "Contains FAQs and product information"
    });

    const mediaContent = fs.readFileSync("product_manual.pdf");
    await atomsClient.uploadMediaToKnowledgeBase(
        knowledgeBaseId,
        mediaContent
    );
    console.log("Added product_manual.pdf to knowledge base");
}

main().catch(console.error);
```

### Configuring workflows to drive conversations

An agent can be configured with a graph-based workflow to help it drive meaningful conversations. You can explore making one on our [platform](https://atoms.smallest.ai/dashboard/agents). Refer to our [documentation](https://atoms-docs.smallest.ai/deep-dive/workflow/what-is-a-workflow) for learning more extensively.

![image](https://i.imgur.com/kRs53zV.png)

### Provisioning bulk calling using campaigns

To manage bulk calls, you can use [Atoms platform](https://atoms.smallest.ai/dashboard/audience) to create [audience](https://atoms-docs.smallest.ai/deep-dive/audience/audience) (collection of contacts) and then configure [campaigns](https://atoms-docs.smallest.ai/deep-dive/campaign/campaign) to run.  

## Getting started with Waves

### Best Practices for Input Text

### Examples

#### Speech Synthesis

A text-to-speech synthesis client. 

**Basic Usage:**   
```typescript
import { WavesClient, Configuration } from 'smallestai';

function main() {
    // alternatively, you can export API Key as environment variable SMALLEST_API_KEY. 
    const config = new Configuration({
        accessToken: 'SMALLEST_API_KEY'
    });

    const wavesClient = new WavesClient(config);
    wavesClient.synthesize("lightning", {
        text: "Hello, this is a test for sync synthesis function.",
        voice_id: "emily",
        add_wav_header: true,
        sample_rate: 24000,
        speed: 1.0
    });
}

main();
```

**Parameters:**   
- `accessToken`: Your API key (can be set via SMALLEST_API_KEY environment variable)
- `model`: TTS model to use (default: "lightning")
- `sample_rate`: Audio sample rate (default: 24000)
- `voice_id`: Voice ID (default: "emily")
- `speed`: Speech speed multiplier (default: 1.0)
- `consistency`: Controls word repetition and skipping. Decrease it to prevent skipped words, and increase it to prevent repetition. Only supported in `lightning-large` model. (default: 0.5)
- `similarity`: Controls the similarity between the synthesized audio and the reference audio. Increase it to make the speech more similar to the reference audio. Only supported in `lightning-large` model. (default: 0)
- `enhancement`: Enhances speech quality at the cost of increased latency. Only supported in `lightning-large` model. (default: false)
- `add_wav_header`: Whether to add a WAV header to the output audio.

These parameters are part of the `WavesClient` instance. They can be set when creating the instance (as shown above). However, the `synthesize` function also accepts an options object, allowing you to override these parameters for a specific synthesis request.

For example, you can modify the speech speed and sample rate just for a particular synthesis call:  
```typescript
wavesClient.synthesize("lightning", {
    text: "Hello, this is a test for sync synthesis function.",
    voice_id: "emily",
    add_wav_header: true,
    sample_rate: 16000,  // Overrides default sample rate
    speed: 1.5  // Overrides default speed
});
```

#### Streaming Speech Synthesis

The Waves API supports streaming speech synthesis, which is particularly useful for applications that require real-time audio output.

```typescript
import { WavesClient, Configuration } from 'smallestai';
import { createParser } from 'eventsource-parser';
import { WaveFile } from 'wavefile';
import * as fs from 'fs';

async function saveStreamToWav(response: any, outputPath: string) {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        const parser = createParser({
            onEvent: async (event: any) => {
                if (event.event === 'chunk') {
                    const data = JSON.parse(event.data);
                    const chunk = Buffer.from(data.audio, 'base64');
                    chunks.push(chunk);
                }
            }
        });

        response.data.on('data', (chunk: Buffer) => parser.feed(chunk.toString()));

        response.data.on('end', () => {
            const concat = Buffer.concat(chunks);
            const wav = new WaveFile();
            wav.fromScratch(1, 24000, '16', new Int16Array(concat.buffer));
            fs.writeFileSync(outputPath, wav.toBuffer());
            resolve(true);
        });

        response.data.on('error', (error: Error) => {
            console.error('Error processing stream:', error);
            reject(error);
        });
    });
}

async function main() {
    const config = new Configuration({
        accessToken: 'SMALLEST_API_KEY'
    });

    const wavesClient = new WavesClient(config);

    const request = {
        text: 'Hello, I am Roma. How are you doing today? I will be happy to assist you in planning your day, go through your schedule, and help you with any other tasks you need.',
        voice_id: 'roma',
        add_wav_header: true,
        sample_rate: 24000,
        speed: 1.0,
        language: 'en',
        consistency: 0.5,
        similarity: 0.5,
        enhancement: 1
    };

    const response = await wavesClient.synthesizeStream(request);
    await saveStreamToWav(response, 'streamed_audio.wav');
}

main().catch(console.error);
```

#### Add your Voice   
The Smallest AI SDK allows you to clone your voice by uploading an audio file. This feature is available both synchronously and asynchronously, making it flexible for different use cases. Below are examples of how to use this functionality.  

```typescript
import { WavesClient, Configuration } from 'smallestai';

function main() {
    const config = new Configuration({
        accessToken: 'SMALLEST_API_KEY'
    });
    const client = new WavesClient(config);
    const res = client.addVoiceToModel("My Voice", new File(["my_voice.wav"], "my_voice.wav"));
    console.log(res);
}

main();
```

#### Delete your Voice
The Smallest AI SDK allows you to delete your cloned voice. Below are examples of how to use this functionality.

```typescript
import { WavesClient, Configuration } from 'smallestai';

function main() {
    const config = new Configuration({
        accessToken: 'SMALLEST_API_KEY'
    });
    const client = new WavesClient(config);
    const res = client.deleteVoiceClone({
        voiceId: "voice_id"
    });
    console.log(res);
}

main();
```

#### Available Methods

```typescript
import { WavesClient, Configuration } from 'smallestai';

const config = new Configuration({
    accessToken: 'SMALLEST_API_KEY'
});
const client = new WavesClient(config);

console.log(`Available Voices: ${client.getWavesVoices('lightning')}`);
console.log(`Available Voices: ${client.getClonedVoices()}`);
```

#### Technical Note: WAV Headers in Streaming Audio

When implementing audio streaming with chunks of synthesized speech, WAV headers are omitted from individual chunks because:

##### Technical Issues
- Each WAV header contains metadata about the entire audio file.
- Multiple headers would make chunks appear as separate audio files and add redundancy.
- Headers contain file-specific data (like total size) that's invalid for chunks.
- Sequential playback of chunks with headers causes audio artifacts (pop sounds) when concatenating or playing audio sequentially.
- Audio players would try to reinitialize audio settings for each chunk.

##### Best Practices for Audio Streaming
1. Stream raw PCM audio data without headers
2. Add a single WAV header only when:
   - Saving the complete stream to a file
   - Initializing the audio playback system
   - Converting the stream to a standard audio format