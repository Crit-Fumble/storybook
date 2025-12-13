import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatWindow, type ChatMessage } from './ChatWindow';

const meta: Meta<typeof ChatWindow> = {
  title: 'Activity/Organisms/ChatWindow',
  component: ChatWindow,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-cfg-background-tertiary min-h-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatWindow>;

const sampleMessages: ChatMessage[] = [
  { id: '1', role: 'user', content: 'What\'s the range of a Fireball spell?' },
  { id: '2', role: 'assistant', content: 'In D&D 5e, Fireball has a range of 150 feet. The spell creates a 20-foot-radius sphere of fire at a point you can see within range.' },
  { id: '3', role: 'user', content: 'Thanks! And what\'s the damage?' },
  { id: '4', role: 'assistant', content: 'Fireball deals 8d6 fire damage on a failed Dexterity saving throw, or half as much on a successful save. When cast using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.' },
];

export const Empty: Story = {
  args: {
    title: 'FumbleBot',
    subtitle: 'Your TTRPG Assistant',
    avatar: { fallback: 'F' },
    messages: [],
    inputValue: '',
    onInputChange: () => {},
    onSubmit: () => {},
    welcomeMessage: {
      greeting: 'Hey there!',
      hint: 'Ask me anything about TTRPGs, rules, or your campaign.',
    },
  },
};

export const WithMessages: Story = {
  args: {
    title: 'FumbleBot',
    subtitle: 'Your TTRPG Assistant',
    avatar: { fallback: 'F' },
    messages: sampleMessages,
    inputValue: '',
    onInputChange: () => {},
    onSubmit: () => {},
  },
};

export const Loading: Story = {
  args: {
    title: 'FumbleBot',
    subtitle: 'Your TTRPG Assistant',
    avatar: { fallback: 'F' },
    messages: sampleMessages.slice(0, 3),
    inputValue: '',
    onInputChange: () => {},
    onSubmit: () => {},
    isLoading: true,
  },
};

export const WithMessageAction: Story = {
  args: {
    title: 'Wiki Assistant',
    subtitle: 'Writing Helper',
    avatar: { fallback: 'W' },
    messages: [
      { id: '1', role: 'user', content: 'Write a description for a fire elemental.' },
      { id: '2', role: 'assistant', content: 'A fire elemental is a creature composed entirely of living flame. Standing roughly 12 feet tall, it flickers and dances with an inner heat that can be felt from several feet away. Its form is vaguely humanoid, with arms that end in grasping tendrils of fire and a head crowned with blazing flames.' },
    ],
    inputValue: '',
    onInputChange: () => {},
    onSubmit: () => {},
    messageAction: {
      label: '+ Insert into editor',
      onClick: (content) => alert(`Would insert: ${content.substring(0, 50)}...`),
    },
  },
};

// Interactive story with state
function InteractiveChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (message: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Simulate response
    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated response to: "${message}"`,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <ChatWindow
      title="Interactive Demo"
      subtitle="Type a message to see it in action"
      avatar={{ fallback: 'D' }}
      messages={messages}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      welcomeMessage={{
        greeting: 'Welcome to the interactive demo!',
        hint: 'Type a message and see the chat in action.',
      }}
      className="w-96 h-[500px]"
    />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveChatWindow />,
};

// Mobile-responsive chat window for testing
function MobileChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (message: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Response to: "${message}"`,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ChatWindow
      title="FumbleBot"
      subtitle="Your TTRPG Assistant"
      avatar={{ fallback: 'F' }}
      messages={messages}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      welcomeMessage={{
        greeting: 'Hey there!',
        hint: 'Ask me anything about TTRPGs.',
      }}
      className="w-full h-[calc(100vh-2rem)] max-h-[500px] sm:w-96 sm:h-[500px]"
    />
  );
}

export const MobileSamsungS22: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'samsungS22',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-2 bg-cfg-background-tertiary min-h-screen">
        <Story />
      </div>
    ),
  ],
  render: () => <MobileChatWindow />,
};

export const MobileIPhone13: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone13',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-2 bg-cfg-background-tertiary min-h-screen">
        <Story />
      </div>
    ),
  ],
  render: () => <MobileChatWindow />,
};

export const MobileDiscordActivity: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'discordActivity',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-2 bg-cfg-background-tertiary min-h-screen">
        <Story />
      </div>
    ),
  ],
  render: () => <MobileChatWindow />,
};
