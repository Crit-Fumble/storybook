import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { useState } from 'react';
import { FormField } from '../../shared/molecules/FormField';
import { Button } from '../../shared/atoms/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../shared/molecules/Card';

/**
 * Integration tests for form components working together
 */
describe('Form Integration', () => {
  describe('FormField with controlled state', () => {
    function ControlledForm() {
      const [values, setValues] = useState({
        email: '',
        password: '',
        message: '',
        role: 'user',
      });
      const [submitted, setSubmitted] = useState(false);

      const handleChange = (field: string) => (value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
      };

      return (
        <form onSubmit={handleSubmit} data-testid="form">
          <FormField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            testId="email"
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange('password')}
            testId="password"
          />
          <FormField
            label="Message"
            name="message"
            type="textarea"
            value={values.message}
            onChange={handleChange('message')}
            testId="message"
          />
          <FormField
            label="Role"
            name="role"
            type="select"
            value={values.role}
            onChange={handleChange('role')}
            options={[
              { value: 'user', label: 'User' },
              { value: 'admin', label: 'Admin' },
            ]}
            testId="role"
          />
          <Button type="submit" testId="submit">
            Submit
          </Button>
          {submitted && <span data-testid="success">Form submitted!</span>}
        </form>
      );
    }

    it('handles multiple field types in a form', () => {
      render(<ControlledForm />);

      // Fill in fields
      fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByTestId('password'), { target: { value: 'secret123' } });
      fireEvent.change(screen.getByTestId('message'), { target: { value: 'Hello world' } });
      fireEvent.change(screen.getByTestId('role'), { target: { value: 'admin' } });

      // Verify values
      expect(screen.getByTestId('email')).toHaveValue('test@example.com');
      expect(screen.getByTestId('password')).toHaveValue('secret123');
      expect(screen.getByTestId('message')).toHaveValue('Hello world');
      expect(screen.getByTestId('role')).toHaveValue('admin');
    });

    it('submits form with all values', () => {
      render(<ControlledForm />);

      // Fill and submit
      fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
      fireEvent.click(screen.getByTestId('submit'));

      // Verify submission
      expect(screen.getByTestId('success')).toBeInTheDocument();
    });
  });

  describe('FormField with validation', () => {
    function ValidatedForm() {
      const [email, setEmail] = useState('');
      const [error, setError] = useState<string | undefined>();
      const [validated, setValidated] = useState(false);

      const handleChange = (value: string) => {
        setEmail(value);
        // Real-time validation when the user has interacted
        if (validated) {
          if (!value.includes('@')) {
            setError('Invalid email address');
          } else {
            setError(undefined);
          }
        }
      };

      const handleValidate = () => {
        setValidated(true);
        if (!email.includes('@')) {
          setError('Invalid email address');
        } else {
          setError(undefined);
        }
      };

      return (
        <div>
          <FormField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            error={error}
            testId="email"
          />
          <button onClick={handleValidate} data-testid="validate-btn">
            Validate
          </button>
        </div>
      );
    }

    it('shows error when validation fails', () => {
      render(<ValidatedForm />);

      const input = screen.getByTestId('email');
      fireEvent.change(input, { target: { value: 'invalid' } });
      fireEvent.click(screen.getByTestId('validate-btn'));

      expect(screen.getByTestId('email-error')).toHaveTextContent('Invalid email address');
    });

    it('clears error when validation passes', () => {
      render(<ValidatedForm />);

      const input = screen.getByTestId('email');

      // First trigger error
      fireEvent.change(input, { target: { value: 'invalid' } });
      fireEvent.click(screen.getByTestId('validate-btn'));
      expect(screen.getByTestId('email-error')).toBeInTheDocument();

      // Then fix it with valid email
      fireEvent.change(input, { target: { value: 'valid@email.com' } });
      expect(screen.queryByTestId('email-error')).not.toBeInTheDocument();
    });
  });

  describe('Card with form content', () => {
    function CardForm() {
      const [name, setName] = useState('');
      const [saved, setSaved] = useState(false);

      return (
        <Card testId="card">
          <CardHeader testId="card-header">
            <CardTitle testId="card-title">User Settings</CardTitle>
          </CardHeader>
          <CardContent testId="card-content">
            <FormField
              label="Name"
              name="name"
              value={name}
              onChange={setName}
              testId="name"
            />
          </CardContent>
          <CardFooter testId="card-footer">
            <span>{saved ? 'Saved!' : 'Not saved'}</span>
            <Button onClick={() => setSaved(true)} testId="save">
              Save
            </Button>
          </CardFooter>
        </Card>
      );
    }

    it('renders form inside card structure', () => {
      render(<CardForm />);

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('card-title')).toHaveTextContent('User Settings');
      expect(screen.getByTestId('name')).toBeInTheDocument();
      expect(screen.getByTestId('save')).toBeInTheDocument();
    });

    it('handles interaction within card', () => {
      render(<CardForm />);

      fireEvent.change(screen.getByTestId('name'), { target: { value: 'John Doe' } });
      fireEvent.click(screen.getByTestId('save'));

      expect(screen.getByText('Saved!')).toBeInTheDocument();
    });
  });
});
