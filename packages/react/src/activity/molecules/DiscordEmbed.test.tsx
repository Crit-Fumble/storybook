import { render, screen } from '@testing-library/react';
import { DiscordEmbed } from './DiscordEmbed';

describe('DiscordEmbed', () => {
  describe('rendering', () => {
    it('renders nothing when no content provided', () => {
      const { container } = render(<DiscordEmbed />);
      expect(container.firstChild).toBeNull();
    });

    it('renders when title provided', () => {
      render(<DiscordEmbed title="Test Title" />);
      expect(screen.getByTestId('discord-embed')).toBeInTheDocument();
    });

    it('renders title', () => {
      render(<DiscordEmbed title="Test Title" />);
      expect(screen.getByTestId('discord-embed-title')).toHaveTextContent('Test Title');
    });

    it('renders description', () => {
      render(<DiscordEmbed description="Test description content" />);
      expect(screen.getByTestId('discord-embed-description')).toHaveTextContent('Test description content');
    });

    it('renders color bar with default color', () => {
      render(<DiscordEmbed title="Test" />);
      const colorBar = screen.getByTestId('discord-embed-color-bar');
      expect(colorBar).toHaveStyle({ backgroundColor: '#552e66' });
    });

    it('renders color bar with custom hex color', () => {
      render(<DiscordEmbed title="Test" color="#ff0000" />);
      const colorBar = screen.getByTestId('discord-embed-color-bar');
      expect(colorBar).toHaveStyle({ backgroundColor: '#ff0000' });
    });

    it('renders color bar with decimal color', () => {
      render(<DiscordEmbed title="Test" color={16711680} />);
      const colorBar = screen.getByTestId('discord-embed-color-bar');
      expect(colorBar).toHaveStyle({ backgroundColor: '#ff0000' });
    });

    it('renders thumbnail when provided', () => {
      render(<DiscordEmbed title="Test" thumbnail="https://example.com/thumb.png" />);
      expect(screen.getByTestId('discord-embed-thumbnail')).toBeInTheDocument();
    });

    it('renders main image when provided', () => {
      render(<DiscordEmbed title="Test" image="https://example.com/image.png" />);
      expect(screen.getByTestId('discord-embed-image')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<DiscordEmbed title="Test" className="custom-class" />);
      expect(screen.getByTestId('discord-embed')).toHaveClass('custom-class');
    });

    it('applies custom testId', () => {
      render(<DiscordEmbed title="Test" testId="custom-embed" />);
      expect(screen.getByTestId('custom-embed')).toBeInTheDocument();
    });
  });

  describe('author', () => {
    it('renders author name', () => {
      render(<DiscordEmbed title="Test" author="John Doe" />);
      expect(screen.getByTestId('discord-embed-author')).toHaveTextContent('John Doe');
    });

    it('renders author icon when provided', () => {
      render(<DiscordEmbed title="Test" author="John Doe" authorIcon="https://example.com/icon.png" />);
      const authorSection = screen.getByTestId('discord-embed-author');
      expect(authorSection.querySelector('img')).toBeInTheDocument();
    });

    it('renders author as link when authorUrl provided', () => {
      render(<DiscordEmbed title="Test" author="John Doe" authorUrl="https://example.com" />);
      const authorSection = screen.getByTestId('discord-embed-author');
      const link = authorSection.querySelector('a');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('title link', () => {
    it('renders title as link when url provided', () => {
      render(<DiscordEmbed title="Clickable Title" url="https://example.com" />);
      const title = screen.getByTestId('discord-embed-title');
      expect(title.tagName).toBe('A');
      expect(title).toHaveAttribute('href', 'https://example.com');
    });

    it('renders title as span when no url', () => {
      render(<DiscordEmbed title="Plain Title" />);
      const title = screen.getByTestId('discord-embed-title');
      expect(title.tagName).toBe('SPAN');
    });
  });

  describe('fields', () => {
    it('renders fields when provided', () => {
      const fields = [
        { name: 'Field 1', value: 'Value 1' },
        { name: 'Field 2', value: 'Value 2' },
      ];
      render(<DiscordEmbed title="Test" fields={fields} />);
      expect(screen.getByTestId('discord-embed-fields')).toBeInTheDocument();
      expect(screen.getByTestId('discord-embed-field-0')).toBeInTheDocument();
      expect(screen.getByTestId('discord-embed-field-1')).toBeInTheDocument();
    });

    it('renders field name and value', () => {
      const fields = [{ name: 'Test Field', value: 'Test Value' }];
      render(<DiscordEmbed title="Test" fields={fields} />);
      const field = screen.getByTestId('discord-embed-field-0');
      expect(field).toHaveTextContent('Test Field');
      expect(field).toHaveTextContent('Test Value');
    });

    it('applies full width to non-inline fields', () => {
      const fields = [{ name: 'Wide Field', value: 'Wide Value', inline: false }];
      render(<DiscordEmbed title="Test" fields={fields} />);
      const field = screen.getByTestId('discord-embed-field-0');
      expect(field).toHaveClass('col-span-full');
    });
  });

  describe('footer', () => {
    it('renders footer text', () => {
      render(<DiscordEmbed title="Test" footer="Footer text" />);
      expect(screen.getByTestId('discord-embed-footer')).toHaveTextContent('Footer text');
    });

    it('renders footer icon when provided', () => {
      render(<DiscordEmbed title="Test" footer="Footer" footerIcon="https://example.com/icon.png" />);
      const footer = screen.getByTestId('discord-embed-footer');
      expect(footer.querySelector('img')).toBeInTheDocument();
    });

    it('renders timestamp', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      render(<DiscordEmbed title="Test" timestamp={date} />);
      expect(screen.getByTestId('discord-embed-footer')).toBeInTheDocument();
    });

    it('renders footer with separator when both footer and timestamp', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      render(<DiscordEmbed title="Test" footer="Footer" timestamp={date} />);
      expect(screen.getByTestId('discord-embed-footer')).toHaveTextContent('•');
    });

    it('handles invalid timestamp gracefully', () => {
      render(<DiscordEmbed title="Test" footer="Footer" timestamp="invalid-date" />);
      expect(screen.getByTestId('discord-embed-footer')).not.toHaveTextContent('•');
    });
  });

  describe('content variations', () => {
    it('renders with only description', () => {
      render(<DiscordEmbed description="Just a description" />);
      expect(screen.getByTestId('discord-embed')).toBeInTheDocument();
    });

    it('renders with only author', () => {
      render(<DiscordEmbed author="Only Author" />);
      expect(screen.getByTestId('discord-embed')).toBeInTheDocument();
    });

    it('renders with only footer', () => {
      render(<DiscordEmbed footer="Only Footer" />);
      expect(screen.getByTestId('discord-embed')).toBeInTheDocument();
    });

    it('renders with only image', () => {
      render(<DiscordEmbed image="https://example.com/image.png" />);
      expect(screen.getByTestId('discord-embed')).toBeInTheDocument();
    });

    it('renders with only thumbnail', () => {
      render(<DiscordEmbed thumbnail="https://example.com/thumb.png" />);
      expect(screen.getByTestId('discord-embed')).toBeInTheDocument();
    });

    it('renders full embed with all properties', () => {
      render(
        <DiscordEmbed
          title="Full Embed"
          description="Description text"
          color="#5865f2"
          author="Author Name"
          authorIcon="https://example.com/author.png"
          authorUrl="https://example.com"
          url="https://example.com/title"
          thumbnail="https://example.com/thumb.png"
          image="https://example.com/image.png"
          fields={[
            { name: 'Field 1', value: 'Value 1', inline: true },
            { name: 'Field 2', value: 'Value 2', inline: true },
          ]}
          footer="Footer text"
          footerIcon="https://example.com/footer.png"
          timestamp={new Date()}
        />
      );
      expect(screen.getByTestId('discord-embed')).toBeInTheDocument();
      expect(screen.getByTestId('discord-embed-title')).toBeInTheDocument();
      expect(screen.getByTestId('discord-embed-description')).toBeInTheDocument();
      expect(screen.getByTestId('discord-embed-author')).toBeInTheDocument();
      expect(screen.getByTestId('discord-embed-thumbnail')).toBeInTheDocument();
      expect(screen.getByTestId('discord-embed-image')).toBeInTheDocument();
      expect(screen.getByTestId('discord-embed-fields')).toBeInTheDocument();
      expect(screen.getByTestId('discord-embed-footer')).toBeInTheDocument();
    });
  });
});
