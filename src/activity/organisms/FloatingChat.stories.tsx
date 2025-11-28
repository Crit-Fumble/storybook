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
      <div className="min-h-screen bg-cfg-bg-tertiary p-8">
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
