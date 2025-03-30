import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';
import { Button } from './button';

describe('Card Component', () => {
  const renderCard = (props = {}) => {
    return cy.mount(
      <Card {...props}>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    );
  };

  beforeEach(() => {
    // Reset any previous card state
    cy.get('body').click(0, 0);
  });

  it('renders card with all sections', () => {
    renderCard();
    cy.get('[role="article"]').should('exist');
    cy.get('[role="article"]').within(() => {
      cy.get('h3').should('contain', 'Create project');
      cy.get('p').first().should('contain', 'Deploy your new project in one-click.');
      cy.get('p').last().should('contain', 'Card Content');
      cy.get('button').should('contain', 'Deploy');
    });
  });

  it('renders with custom className', () => {
    renderCard({ className: 'custom-card' });
    cy.get('[role="article"]').should('have.class', 'custom-card');
  });

  it('handles click events', () => {
    const onClick = cy.stub().as('onClick');
    renderCard({ onClick });
    cy.get('[role="article"]').click();
    cy.get('@onClick').should('have.been.calledOnce');
  });

  it('maintains proper structure and spacing', () => {
    renderCard();
    cy.get('[role="article"]').should('have.class', 'rounded-lg');
    cy.get('[role="article"]').should('have.class', 'border');
    cy.get('[role="article"]').should('have.class', 'bg-card');
  });

  it('renders header with proper styling', () => {
    renderCard();
    cy.get('[role="article"]').within(() => {
      cy.get('div').first().should('have.class', 'flex');
      cy.get('h3').should('have.class', 'text-lg');
      cy.get('p').first().should('have.class', 'text-sm');
    });
  });

  it('renders content with proper spacing', () => {
    renderCard();
    cy.get('[role="article"]').within(() => {
      cy.get('div').eq(1).should('have.class', 'p-6');
    });
  });

  it('renders footer with proper alignment', () => {
    renderCard();
    cy.get('[role="article"]').within(() => {
      cy.get('div').last().should('have.class', 'flex');
    });
  });

  it('handles keyboard navigation', () => {
    renderCard();
    cy.get('[role="article"]').focus();
    cy.get('[role="article"]').should('be.focused');
    cy.focused().tab();
    cy.get('button').should('be.focused');
  });

  it('renders with custom data attributes', () => {
    renderCard({ 'data-testid': 'test-card' });
    cy.get('[data-testid="test-card"]').should('exist');
  });

  it('handles hover state', () => {
    renderCard({ className: 'hover:shadow-lg' });
    cy.get('[role="article"]')
      .trigger('mouseover')
      .should('have.class', 'hover:shadow-lg');
  });

  it('renders nested cards', () => {
    cy.mount(
      <Card>
        <CardHeader>
          <CardTitle>Parent Card</CardTitle>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle>Child Card</CardTitle>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
    );
    cy.get('[role="article"]').should('have.length', 2);
    cy.get('[role="article"]').first().find('h3').should('contain', 'Parent Card');
    cy.get('[role="article"]').last().find('h3').should('contain', 'Child Card');
  });

  it('handles long content gracefully', () => {
    cy.mount(
      <Card>
        <CardHeader>
          <CardTitle>{'Very '.repeat(20) + 'Long Title'}</CardTitle>
          <CardDescription>{'Very '.repeat(50) + 'Long Description'}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{'Very '.repeat(100) + 'Long Content'}</p>
        </CardContent>
      </Card>
    );
    cy.get('[role="article"]').should('exist');
    cy.get('[role="article"]').should('have.css', 'overflow', 'visible');
  });

  it('maintains responsive design', () => {
    renderCard();
    cy.viewport(320, 480); // Mobile viewport
    cy.get('[role="article"]').should('be.visible');
    cy.viewport(1280, 720); // Desktop viewport
    cy.get('[role="article"]').should('be.visible');
  });

  it('handles conditional rendering', () => {
    const showFooter = false;
    cy.mount(
      <Card>
        <CardHeader>
          <CardTitle>Conditional Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Content</p>
        </CardContent>
        {showFooter && (
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        )}
      </Card>
    );
    cy.get('[role="article"]').find('button').should('not.exist');
  });

  it('handles dynamic content updates', () => {
    cy.mount(
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="content">Initial Content</p>
        </CardContent>
      </Card>
    );
    cy.get('.content').invoke('text', 'Updated Content');
    cy.get('.content').should('have.text', 'Updated Content');
  });
}); 