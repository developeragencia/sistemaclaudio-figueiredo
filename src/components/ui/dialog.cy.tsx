import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Button } from './button';

describe('Dialog Component', () => {
  const renderDialog = (props = {}) => {
    return cy.mount(
      <Dialog {...props}>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="text-sm font-medium">Some content here</h4>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  beforeEach(() => {
    // Reset any previous dialog state
    cy.get('body').click(0, 0);
  });

  it('renders trigger button', () => {
    renderDialog();
    cy.get('button').contains('Open Dialog').should('be.visible');
  });

  it('opens dialog on trigger click', () => {
    renderDialog();
    cy.get('button').contains('Open Dialog').click();
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('displays title and description', () => {
    renderDialog();
    cy.get('button').contains('Open Dialog').click();
    cy.get('[role="dialog"]').within(() => {
      cy.get('h2').should('contain', 'Edit Profile');
      cy.get('p').should('contain', 'Make changes to your profile here');
    });
  });

  it('closes on close button click', () => {
    renderDialog();
    cy.get('button').contains('Open Dialog').click();
    cy.get('[role="dialog"]').within(() => {
      cy.get('button[aria-label="Close"]').click();
    });
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('closes on overlay click', () => {
    renderDialog();
    cy.get('button').contains('Open Dialog').click();
    cy.get('[role="dialog"]').parent().click('topLeft');
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('closes on ESC key press', () => {
    renderDialog();
    cy.get('button').contains('Open Dialog').click();
    cy.get('body').type('{esc}');
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('handles onOpenChange callback', () => {
    const onOpenChange = cy.stub().as('onOpenChange');
    renderDialog({ onOpenChange });
    cy.get('button').contains('Open Dialog').click();
    cy.get('@onOpenChange').should('have.been.calledWith', true);
    cy.get('body').type('{esc}');
    cy.get('@onOpenChange').should('have.been.calledWith', false);
  });

  it('maintains focus trap', () => {
    renderDialog();
    cy.get('button').contains('Open Dialog').click();
    cy.get('body').tab();
    cy.focused().should('have.attr', 'aria-label', 'Close');
    cy.get('body').tab();
    cy.focused().should('have.text', 'Save changes');
    cy.get('body').tab();
    cy.focused().should('have.attr', 'aria-label', 'Close');
  });

  it('renders with custom className', () => {
    renderDialog();
    cy.get('button').contains('Open Dialog').click();
    cy.get('[role="dialog"]').should('have.class', 'bg-background');
  });

  it('handles form submission', () => {
    const onSubmit = cy.stub().as('onSubmit');
    cy.mount(
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <input type="text" name="name" />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );

    cy.get('button').contains('Open Dialog').click();
    cy.get('input[name="name"]').type('John Doe');
    cy.get('button[type="submit"]').click();
    cy.get('@onSubmit').should('have.been.calledOnce');
  });

  it('handles nested dialogs', () => {
    cy.mount(
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open First Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>First Dialog</DialogTitle>
          </DialogHeader>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Second Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Second Dialog</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>
    );

    cy.get('button').contains('Open First Dialog').click();
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('button').contains('Open Second Dialog').click();
    cy.get('[role="dialog"]').should('have.length', 2);
  });

  it('handles modal and non-modal variants', () => {
    renderDialog({ modal: false });
    cy.get('button').contains('Open Dialog').click();
    cy.get('[role="dialog"]').should('have.attr', 'aria-modal', 'false');
  });
}); 