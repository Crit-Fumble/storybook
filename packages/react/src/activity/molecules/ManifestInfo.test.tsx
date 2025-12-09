import { render, screen } from '@testing-library/react';
import { ManifestInfo, FoundryManifestInfo } from './ManifestInfo';

describe('ManifestInfo', () => {
  const defaultManifest: FoundryManifestInfo = {
    id: 'test-module',
    title: 'Test Module',
  };

  it('renders with default testId', () => {
    render(<ManifestInfo manifest={defaultManifest} />);
    expect(screen.getByTestId('manifest-info')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<ManifestInfo manifest={defaultManifest} testId="custom-manifest" />);
    expect(screen.getByTestId('custom-manifest')).toBeInTheDocument();
  });

  describe('basic info', () => {
    it('displays title', () => {
      render(<ManifestInfo manifest={defaultManifest} />);
      expect(screen.getByTestId('manifest-info-title')).toHaveTextContent('Test Module');
    });

    it('displays id', () => {
      render(<ManifestInfo manifest={defaultManifest} />);
      expect(screen.getByTestId('manifest-info-id')).toHaveTextContent('test-module');
    });
  });

  describe('version badge', () => {
    it('does not show version when not provided', () => {
      render(<ManifestInfo manifest={defaultManifest} />);
      expect(screen.queryByTestId('manifest-info-version')).not.toBeInTheDocument();
    });

    it('shows version badge when provided', () => {
      const manifest = { ...defaultManifest, version: '1.2.3' };
      render(<ManifestInfo manifest={manifest} />);
      expect(screen.getByTestId('manifest-info-version')).toHaveTextContent('v1.2.3');
    });
  });

  describe('description', () => {
    it('does not show description when not provided', () => {
      render(<ManifestInfo manifest={defaultManifest} />);
      expect(screen.queryByTestId('manifest-info-description')).not.toBeInTheDocument();
    });

    it('shows description when provided', () => {
      const manifest = { ...defaultManifest, description: 'A great module' };
      render(<ManifestInfo manifest={manifest} />);
      expect(screen.getByTestId('manifest-info-description')).toHaveTextContent('A great module');
    });

    it('hides description in compact mode', () => {
      const manifest = { ...defaultManifest, description: 'A great module' };
      render(<ManifestInfo manifest={manifest} compact />);
      expect(screen.queryByTestId('manifest-info-description')).not.toBeInTheDocument();
    });
  });

  describe('compatibility', () => {
    const manifestWithCompat: FoundryManifestInfo = {
      ...defaultManifest,
      compatibility: {
        minimum: '10',
        verified: '11',
        maximum: '12',
      },
    };

    it('shows compatibility by default', () => {
      render(<ManifestInfo manifest={manifestWithCompat} />);
      expect(screen.getByTestId('manifest-info-compatibility')).toBeInTheDocument();
    });

    it('hides compatibility when showCompatibility is false', () => {
      render(<ManifestInfo manifest={manifestWithCompat} showCompatibility={false} />);
      expect(screen.queryByTestId('manifest-info-compatibility')).not.toBeInTheDocument();
    });

    it('displays minimum version', () => {
      render(<ManifestInfo manifest={manifestWithCompat} />);
      expect(screen.getByText('Min: 10')).toBeInTheDocument();
    });

    it('displays verified version', () => {
      render(<ManifestInfo manifest={manifestWithCompat} />);
      expect(screen.getByText('Verified: 11')).toBeInTheDocument();
    });

    it('displays maximum version', () => {
      render(<ManifestInfo manifest={manifestWithCompat} />);
      expect(screen.getByText('Max: 12')).toBeInTheDocument();
    });
  });

  describe('authors', () => {
    const manifestWithAuthors: FoundryManifestInfo = {
      ...defaultManifest,
      authors: [
        { name: 'Author 1' },
        { name: 'Author 2', url: 'https://example.com' },
      ],
    };

    it('shows authors by default', () => {
      render(<ManifestInfo manifest={manifestWithAuthors} />);
      expect(screen.getByTestId('manifest-info-authors')).toBeInTheDocument();
    });

    it('hides authors when showAuthors is false', () => {
      render(<ManifestInfo manifest={manifestWithAuthors} showAuthors={false} />);
      expect(screen.queryByTestId('manifest-info-authors')).not.toBeInTheDocument();
    });

    it('hides authors in compact mode', () => {
      render(<ManifestInfo manifest={manifestWithAuthors} compact />);
      expect(screen.queryByTestId('manifest-info-authors')).not.toBeInTheDocument();
    });

    it('displays author names', () => {
      render(<ManifestInfo manifest={manifestWithAuthors} />);
      expect(screen.getByText(/Author 1/)).toBeInTheDocument();
      expect(screen.getByText(/Author 2/)).toBeInTheDocument();
    });

    it('links author name when url provided', () => {
      render(<ManifestInfo manifest={manifestWithAuthors} />);
      const link = screen.getByRole('link', { name: 'Author 2' });
      expect(link).toHaveAttribute('href', 'https://example.com');
    });
  });

  describe('links', () => {
    const manifestWithLinks: FoundryManifestInfo = {
      ...defaultManifest,
      url: 'https://example.com/project',
      license: 'MIT',
    };

    it('shows links when url is provided', () => {
      render(<ManifestInfo manifest={manifestWithLinks} />);
      expect(screen.getByTestId('manifest-info-links')).toBeInTheDocument();
    });

    it('hides links in compact mode', () => {
      render(<ManifestInfo manifest={manifestWithLinks} compact />);
      expect(screen.queryByTestId('manifest-info-links')).not.toBeInTheDocument();
    });

    it('displays project page link', () => {
      render(<ManifestInfo manifest={manifestWithLinks} />);
      const link = screen.getByRole('link', { name: 'Project Page' });
      expect(link).toHaveAttribute('href', 'https://example.com/project');
    });

    it('displays license info', () => {
      render(<ManifestInfo manifest={manifestWithLinks} />);
      expect(screen.getByText('License: MIT')).toBeInTheDocument();
    });
  });

  it('handles manifest with all fields', () => {
    const fullManifest: FoundryManifestInfo = {
      id: 'full-module',
      title: 'Full Module',
      description: 'Complete manifest',
      version: '2.0.0',
      compatibility: { minimum: '10', verified: '11' },
      authors: [{ name: 'Dev' }],
      url: 'https://github.com/test',
      license: 'Apache-2.0',
    };
    render(<ManifestInfo manifest={fullManifest} />);
    expect(screen.getByTestId('manifest-info-title')).toHaveTextContent('Full Module');
    expect(screen.getByTestId('manifest-info-version')).toHaveTextContent('v2.0.0');
    expect(screen.getByTestId('manifest-info-description')).toBeInTheDocument();
    expect(screen.getByTestId('manifest-info-compatibility')).toBeInTheDocument();
    expect(screen.getByTestId('manifest-info-authors')).toBeInTheDocument();
    expect(screen.getByTestId('manifest-info-links')).toBeInTheDocument();
  });
});
