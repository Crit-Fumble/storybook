import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { SettingRow, SettingToggleRow, SettingSelectRow } from '../../shared/molecules/SettingRow';
import { Card, CardHeader, CardTitle, CardContent } from '../../shared/molecules/Card';
import { TabNav, type Tab } from '../../shared/molecules/TabNav';

/**
 * Integration tests for settings page components
 */
describe('Settings Integration', () => {
  describe('Settings card with multiple rows', () => {
    function SettingsCard() {
      const [notifications, setNotifications] = useState(true);
      const [darkMode, setDarkMode] = useState(false);
      const [language, setLanguage] = useState('en');

      return (
        <Card testId="settings-card">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <SettingToggleRow
                label="Enable Notifications"
                description="Receive push notifications for updates"
                checked={notifications}
                onChange={setNotifications}
                testId="notifications"
              />
              <SettingToggleRow
                label="Dark Mode"
                description="Use dark theme"
                checked={darkMode}
                onChange={setDarkMode}
                testId="dark-mode"
              />
              <SettingSelectRow
                label="Language"
                description="Choose your preferred language"
                value={language}
                onChange={setLanguage}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                ]}
                testId="language"
              />
            </div>
          </CardContent>
        </Card>
      );
    }

    it('renders all setting rows', () => {
      render(<SettingsCard />);

      expect(screen.getByText('Enable Notifications')).toBeInTheDocument();
      expect(screen.getByText('Dark Mode')).toBeInTheDocument();
      expect(screen.getByText('Language')).toBeInTheDocument();
    });

    it('toggles work independently', () => {
      render(<SettingsCard />);

      const notificationToggle = screen.getByTestId('notifications-toggle');
      const darkModeToggle = screen.getByTestId('dark-mode-toggle');

      // Initial states
      expect(notificationToggle).toBeChecked();
      expect(darkModeToggle).not.toBeChecked();

      // Toggle notifications off
      fireEvent.click(notificationToggle);
      expect(notificationToggle).not.toBeChecked();
      expect(darkModeToggle).not.toBeChecked();

      // Toggle dark mode on
      fireEvent.click(darkModeToggle);
      expect(notificationToggle).not.toBeChecked();
      expect(darkModeToggle).toBeChecked();
    });

    it('select updates independently', () => {
      render(<SettingsCard />);

      const languageSelect = screen.getByTestId('language-select');
      expect(languageSelect).toHaveValue('en');

      fireEvent.change(languageSelect, { target: { value: 'es' } });
      expect(languageSelect).toHaveValue('es');

      // Toggles unchanged
      expect(screen.getByTestId('notifications-toggle')).toBeChecked();
      expect(screen.getByTestId('dark-mode-toggle')).not.toBeChecked();
    });
  });

  describe('Tabbed settings page', () => {
    const tabs: Tab[] = [
      { id: 'general', label: 'General' },
      { id: 'notifications', label: 'Notifications' },
      { id: 'privacy', label: 'Privacy' },
    ];

    function TabbedSettings() {
      const [activeTab, setActiveTab] = useState('general');
      const [settings, setSettings] = useState({
        theme: 'light',
        emailNotifications: true,
        smsNotifications: false,
        profilePublic: true,
      });

      const updateSetting = (key: string, value: boolean | string) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
      };

      return (
        <div>
          <TabNav
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            testId="settings-tabs"
          />

          {activeTab === 'general' && (
            <Card testId="general-panel">
              <CardContent>
                <SettingSelectRow
                  label="Theme"
                  value={settings.theme}
                  onChange={(value) => updateSetting('theme', value)}
                  options={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                  ]}
                  testId="theme"
                />
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card testId="notifications-panel">
              <CardContent>
                <SettingToggleRow
                  label="Email Notifications"
                  checked={settings.emailNotifications}
                  onChange={(value) => updateSetting('emailNotifications', value)}
                  testId="email-notifications"
                />
                <SettingToggleRow
                  label="SMS Notifications"
                  checked={settings.smsNotifications}
                  onChange={(value) => updateSetting('smsNotifications', value)}
                  testId="sms-notifications"
                />
              </CardContent>
            </Card>
          )}

          {activeTab === 'privacy' && (
            <Card testId="privacy-panel">
              <CardContent>
                <SettingToggleRow
                  label="Public Profile"
                  checked={settings.profilePublic}
                  onChange={(value) => updateSetting('profilePublic', value)}
                  testId="profile-public"
                />
              </CardContent>
            </Card>
          )}
        </div>
      );
    }

    it('renders initial tab', () => {
      render(<TabbedSettings />);

      expect(screen.getByTestId('general-panel')).toBeInTheDocument();
      expect(screen.queryByTestId('notifications-panel')).not.toBeInTheDocument();
      expect(screen.queryByTestId('privacy-panel')).not.toBeInTheDocument();
    });

    it('switches between tabs', () => {
      render(<TabbedSettings />);

      // Switch to notifications
      fireEvent.click(screen.getByTestId('settings-tabs-notifications'));
      expect(screen.queryByTestId('general-panel')).not.toBeInTheDocument();
      expect(screen.getByTestId('notifications-panel')).toBeInTheDocument();

      // Switch to privacy
      fireEvent.click(screen.getByTestId('settings-tabs-privacy'));
      expect(screen.queryByTestId('notifications-panel')).not.toBeInTheDocument();
      expect(screen.getByTestId('privacy-panel')).toBeInTheDocument();

      // Switch back to general
      fireEvent.click(screen.getByTestId('settings-tabs-general'));
      expect(screen.getByTestId('general-panel')).toBeInTheDocument();
    });

    it('preserves settings across tab switches', () => {
      render(<TabbedSettings />);

      // Change theme setting
      fireEvent.change(screen.getByTestId('theme-select'), { target: { value: 'dark' } });
      expect(screen.getByTestId('theme-select')).toHaveValue('dark');

      // Switch to notifications tab
      fireEvent.click(screen.getByTestId('settings-tabs-notifications'));

      // Toggle a notification setting
      const emailToggle = screen.getByTestId('email-notifications-toggle');
      fireEvent.click(emailToggle);
      expect(emailToggle).not.toBeChecked();

      // Switch back to general
      fireEvent.click(screen.getByTestId('settings-tabs-general'));

      // Theme setting preserved
      expect(screen.getByTestId('theme-select')).toHaveValue('dark');

      // Go back to notifications
      fireEvent.click(screen.getByTestId('settings-tabs-notifications'));

      // Notification setting preserved
      expect(screen.getByTestId('email-notifications-toggle')).not.toBeChecked();
    });
  });

  describe('Custom setting row', () => {
    function CustomSettingPage() {
      const [apiKey, setApiKey] = useState('sk-xxx');
      const [copied, setCopied] = useState(false);

      const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
      };

      return (
        <SettingRow
          label="API Key"
          description="Your secret API key for integrations"
          testId="api-key"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={apiKey}
              readOnly
              data-testid="api-key-value"
              className="px-2 py-1 bg-gray-100 rounded"
            />
            <button onClick={handleCopy} data-testid="copy-btn">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </SettingRow>
      );
    }

    it('renders custom children in setting row', () => {
      render(<CustomSettingPage />);

      expect(screen.getByText('API Key')).toBeInTheDocument();
      expect(screen.getByTestId('api-key-value')).toHaveValue('sk-xxx');
      expect(screen.getByTestId('copy-btn')).toBeInTheDocument();
    });

    it('handles custom interaction', () => {
      // Mock clipboard API
      Object.assign(navigator, {
        clipboard: { writeText: vi.fn() },
      });

      render(<CustomSettingPage />);

      fireEvent.click(screen.getByTestId('copy-btn'));
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('sk-xxx');
      expect(screen.getByTestId('copy-btn')).toHaveTextContent('Copied!');
    });
  });
});
