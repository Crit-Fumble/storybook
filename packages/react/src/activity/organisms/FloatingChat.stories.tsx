import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FloatingChat, type ChatMessage } from './FloatingChat';

const meta: Meta<typeof FloatingChat> = {
  title: 'Activity/Organisms/FloatingChat',
  component: FloatingChat,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-cfg-background-tertiary p-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl text-white mb-4">Page Content</h1>
          <p className="text-cfg-text-normal mb-4">
            This demonstrates the floating chat button. Click the button in the
            bottom-right corner to open the chat window.
          </p>
          <p className="text-cfg-text-muted">
            The floating chat provides a non-intrusive way to access an AI
            assistant while browsing the page.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FloatingChat>;

// Interactive story with full functionality
function InteractiveFloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
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

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Thanks for your message! You said: "${message}"`,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <FloatingChat
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
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
      position="bottom-right"
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveFloatingChat />,
};

// Closed state
export const Closed: Story = {
  args: {
    isOpen: false,
    onToggle: () => {},
    title: 'FumbleBot',
    subtitle: 'Your TTRPG Assistant',
    avatar: { fallback: 'F' },
    messages: [],
    inputValue: '',
    onInputChange: () => {},
    onSubmit: () => {},
  },
};

// Open state
export const Open: Story = {
  args: {
    isOpen: true,
    onToggle: () => {},
    title: 'FumbleBot',
    subtitle: 'Your TTRPG Assistant',
    avatar: { fallback: 'F' },
    messages: [
      { id: '1', role: 'user', content: 'Hello!' },
      { id: '2', role: 'assistant', content: 'Hi there! How can I help you today?' },
    ],
    inputValue: '',
    onInputChange: () => {},
    onSubmit: () => {},
    welcomeMessage: {
      greeting: 'Hey!',
      hint: 'Ask me anything.',
    },
  },
};

// Bottom left position
function BottomLeftChat() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <FloatingChat
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      title="Support"
      subtitle="We\'re here to help"
      avatar={{ fallback: 'S' }}
      messages={[]}
      inputValue=""
      onInputChange={() => {}}
      onSubmit={() => {}}
      position="bottom-left"
      welcomeMessage={{
        greeting: 'Need help?',
        hint: 'Send us a message.',
      }}
    />
  );
}

export const BottomLeft: Story = {
  render: () => <BottomLeftChat />,
};

// Mobile viewport stories for testing responsive design
export const MobileSamsungS22: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'samsungS22',
    },
  },
  render: () => <InteractiveFloatingChat />,
};

export const MobileIPhone13: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone13',
    },
  },
  render: () => <InteractiveFloatingChat />,
};

export const MobileDiscordActivity: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'discordActivity',
    },
  },
  render: () => <InteractiveFloatingChat />,
};

// Mobile with messages to test scrolling
function MobileWithMessages() {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const manyMessages: ChatMessage[] = [
    { id: '1', role: 'user', content: 'Hello! I need help with my D&D character.' },
    { id: '2', role: 'assistant', content: 'Of course! I\'d be happy to help. What class are you playing?' },
    { id: '3', role: 'user', content: 'I\'m playing a level 5 Paladin.' },
    { id: '4', role: 'assistant', content: 'Great choice! Paladins are versatile - they can tank, heal, and deal good damage. What specifically do you need help with?' },
    { id: '5', role: 'user', content: 'I want to optimize my spell slots for combat.' },
    { id: '6', role: 'assistant', content: 'For a level 5 Paladin, you have 4 first-level and 2 second-level spell slots. Here are my recommendations:\n\n1. Save at least one 2nd level slot for Divine Smite on critical hits\n2. Prepare Shield of Faith for tough fights\n3. Keep Cure Wounds ready for emergencies' },
    { id: '7', role: 'user', content: 'That\'s really helpful, thank you!' },
  ];

  return (
    <FloatingChat
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      title="FumbleBot"
      subtitle="Your TTRPG Assistant"
      avatar={{ fallback: 'F' }}
      messages={manyMessages}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSubmit={() => {}}
      position="bottom-right"
    />
  );
}

export const MobileSamsungS22WithMessages: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'samsungS22',
    },
  },
  render: () => <MobileWithMessages />,
};

export const MobileIPhone13WithMessages: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone13',
    },
  },
  render: () => <MobileWithMessages />,
};
