import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  describe('rendering with image', () => {
    it('renders as img element when src is provided', () => {
      render(<Avatar src="https://example.com/avatar.jpg" testId="avatar" />);
      expect(screen.getByTestId('avatar').tagName).toBe('IMG');
    });

    it('applies src attribute', () => {
      render(<Avatar src="https://example.com/avatar.jpg" testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('applies alt attribute', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveAttribute('alt', 'User Avatar');
    });

    it('uses empty alt by default', () => {
      render(<Avatar src="https://example.com/avatar.jpg" testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveAttribute('alt', '');
    });
  });

  describe('rendering with fallback', () => {
    it('renders as div when no src is provided', () => {
      render(<Avatar testId="avatar" />);
      expect(screen.getByTestId('avatar').tagName).toBe('DIV');
    });

    it('renders as div when src is null', () => {
      render(<Avatar src={null} testId="avatar" />);
      expect(screen.getByTestId('avatar').tagName).toBe('DIV');
    });

    it('displays default fallback character', () => {
      render(<Avatar testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveTextContent('?');
    });

    it('displays first character of custom fallback', () => {
      render(<Avatar fallback="John" testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveTextContent('J');
    });

    it('capitalizes fallback character', () => {
      render(<Avatar fallback="john" testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveTextContent('J');
    });
  });

  describe('size variants', () => {
    it('applies small size classes', () => {
      render(<Avatar size="sm" testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('w-6', 'h-6', 'text-xs');
    });

    it('applies medium size classes by default', () => {
      render(<Avatar testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('w-8', 'h-8', 'text-sm');
    });

    it('applies large size classes', () => {
      render(<Avatar size="lg" testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('w-12', 'h-12', 'text-lg');
    });
  });

  describe('styling', () => {
    it('applies rounded-full to image', () => {
      render(<Avatar src="https://example.com/avatar.jpg" testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('rounded-full', 'object-cover');
    });

    it('applies rounded-full to fallback', () => {
      render(<Avatar testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('rounded-full');
    });

    it('applies fallback background and text styles', () => {
      render(<Avatar testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass(
        'bg-cfg-primary',
        'flex',
        'items-center',
        'justify-center',
        'text-white',
        'font-bold'
      );
    });

    it('merges custom className for image', () => {
      render(<Avatar src="https://example.com/avatar.jpg" className="custom-class" testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('custom-class');
    });

    it('merges custom className for fallback', () => {
      render(<Avatar className="custom-class" testId="avatar" />);
      expect(screen.getByTestId('avatar')).toHaveClass('custom-class');
    });
  });
});
