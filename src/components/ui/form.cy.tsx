import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import { Button } from './button';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

describe('Form Component', () => {
  const ProfileForm = ({ onSubmit = cy.stub().as('onSubmit') }) => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: '',
        email: '',
      },
    });

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  };

  beforeEach(() => {
    // Reset any previous form state
    cy.get('body').click(0, 0);
  });

  it('renders form fields', () => {
    cy.mount(<ProfileForm />);
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('displays labels and descriptions', () => {
    cy.mount(<ProfileForm />);
    cy.contains('label', 'Username').should('be.visible');
    cy.contains('label', 'Email').should('be.visible');
    cy.contains('This is your public display name.').should('be.visible');
    cy.contains('Enter your email address.').should('be.visible');
  });

  it('validates required fields', () => {
    cy.mount(<ProfileForm />);
    cy.get('button[type="submit"]').click();
    cy.contains('Username must be at least 2 characters.').should('be.visible');
    cy.contains('Please enter a valid email address.').should('be.visible');
  });

  it('validates username length', () => {
    cy.mount(<ProfileForm />);
    cy.get('input[name="username"]').type('a');
    cy.get('button[type="submit"]').click();
    cy.contains('Username must be at least 2 characters.').should('be.visible');
  });

  it('validates email format', () => {
    cy.mount(<ProfileForm />);
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.contains('Please enter a valid email address.').should('be.visible');
  });

  it('submits valid form data', () => {
    const onSubmit = cy.stub().as('onSubmit');
    cy.mount(<ProfileForm onSubmit={onSubmit} />);
    
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('button[type="submit"]').click();
    
    cy.get('@onSubmit').should('have.been.calledWith', {
      username: 'johndoe',
      email: 'john@example.com',
    });
  });

  it('handles form reset', () => {
    cy.mount(<ProfileForm />);
    
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="email"]').type('john@example.com');
    
    cy.get('input[name="username"]').clear();
    cy.get('input[name="email"]').clear();
    
    cy.get('input[name="username"]').should('have.value', '');
    cy.get('input[name="email"]').should('have.value', '');
  });

  it('maintains field focus', () => {
    cy.mount(<ProfileForm />);
    cy.get('input[name="username"]').focus();
    cy.get('input[name="username"]').should('be.focused');
  });

  it('handles keyboard navigation', () => {
    cy.mount(<ProfileForm />);
    cy.get('input[name="username"]').focus();
    cy.focused().tab();
    cy.get('input[name="email"]').should('be.focused');
  });

  it('displays custom error messages', () => {
    cy.mount(<ProfileForm />);
    cy.get('input[name="username"]').type('a');
    cy.get('button[type="submit"]').click();
    cy.contains('Username must be at least 2 characters.').should('be.visible');
  });

  it('handles form submission loading state', () => {
    const onSubmit = () => new Promise((resolve) => setTimeout(resolve, 1000));
    cy.mount(<ProfileForm onSubmit={onSubmit} />);
    
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('preserves form values on validation errors', () => {
    cy.mount(<ProfileForm />);
    
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    
    cy.get('input[name="username"]').should('have.value', 'johndoe');
    cy.get('input[name="email"]').should('have.value', 'invalid-email');
  });

  it('handles multiple form submissions', () => {
    const onSubmit = cy.stub().as('onSubmit');
    cy.mount(<ProfileForm onSubmit={onSubmit} />);
    
    // First submission
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('button[type="submit"]').click();
    
    // Clear form
    cy.get('input[name="username"]').clear();
    cy.get('input[name="email"]').clear();
    
    // Second submission
    cy.get('input[name="username"]').type('janedoe');
    cy.get('input[name="email"]').type('jane@example.com');
    cy.get('button[type="submit"]').click();
    
    cy.get('@onSubmit').should('have.been.calledTwice');
  });
}); 