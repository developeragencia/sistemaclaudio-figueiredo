import { useToast } from './use-toast';
import { Button } from './button';
import { Toast } from './toast';
import { Toaster } from './toaster';

describe('Toast Component', () => {
  const ToastDemo = ({ variant = 'default', ...props }) => {
    const { toast } = useToast();

    const showToast = () => {
      toast({
        variant,
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2024 at 5:57 PM',
        ...props,
      });
    };

    return (
      <>
        <Button onClick={showToast}>Show Toast</Button>
        <Toaster />
      </>
    );
  };

  beforeEach(() => {
    // Reset any previous toast state
    cy.get('body').click(0, 0);
  });

  it('renders toast on button click', () => {
    cy.mount(<ToastDemo />);
    cy.get('button').click();
    cy.get('[role="status"]').should('be.visible');
  });

  it('displays title and description', () => {
    cy.mount(<ToastDemo />);
    cy.get('button').click();
    cy.get('[role="status"]').within(() => {
      cy.get('div').should('contain', 'Scheduled: Catch up');
      cy.get('div').should('contain', 'Friday, February 10, 2024 at 5:57 PM');
    });
  });

  it('auto-dismisses after duration', () => {
    cy.mount(<ToastDemo duration={1000} />);
    cy.get('button').click();
    cy.get('[role="status"]').should('be.visible');
    cy.wait(1500);
    cy.get('[role="status"]').should('not.exist');
  });

  it('can be manually dismissed', () => {
    cy.mount(<ToastDemo />);
    cy.get('button').click();
    cy.get('[role="status"]').within(() => {
      cy.get('button[aria-label="Close"]').click();
    });
    cy.get('[role="status"]').should('not.exist');
  });

  it('handles different variants', () => {
    cy.mount(<ToastDemo variant="destructive" />);
    cy.get('button').click();
    cy.get('[role="status"]').should('have.class', 'destructive');
  });

  it('handles custom action', () => {
    const onAction = cy.stub().as('onAction');
    cy.mount(
      <ToastDemo
        action={{
          label: 'Undo',
          onClick: onAction,
        }}
      />
    );
    cy.get('button').click();
    cy.get('[role="status"]').within(() => {
      cy.get('button').contains('Undo').click();
    });
    cy.get('@onAction').should('have.been.calledOnce');
  });

  it('handles multiple toasts', () => {
    cy.mount(<ToastDemo />);
    cy.get('button').click();
    cy.get('button').click();
    cy.get('button').click();
    cy.get('[role="status"]').should('have.length', 3);
  });

  it('maintains toast order', () => {
    cy.mount(<ToastDemo />);
    cy.get('button').click();
    cy.get('[role="status"]').first().should('contain', 'Scheduled: Catch up');
    cy.get('button').click();
    cy.get('[role="status"]').first().should('contain', 'Scheduled: Catch up');
  });

  it('handles keyboard navigation', () => {
    cy.mount(<ToastDemo />);
    cy.get('button').click();
    cy.get('[role="status"]').focus();
    cy.focused().type('{enter}');
    cy.get('[role="status"]').should('not.exist');
  });

  it('handles custom className', () => {
    cy.mount(<ToastDemo className="custom-toast" />);
    cy.get('button').click();
    cy.get('[role="status"]').should('have.class', 'custom-toast');
  });

  it('handles swipe to dismiss', () => {
    cy.mount(<ToastDemo />);
    cy.get('button').click();
    cy.get('[role="status"]')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 500 })
      .trigger('mouseup');
    cy.get('[role="status"]').should('not.exist');
  });

  it('prevents swipe when swipeDirection is none', () => {
    cy.mount(<ToastDemo swipeDirection="none" />);
    cy.get('button').click();
    cy.get('[role="status"]')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 500 })
      .trigger('mouseup');
    cy.get('[role="status"]').should('be.visible');
  });

  it('handles onOpenChange callback', () => {
    const onOpenChange = cy.stub().as('onOpenChange');
    cy.mount(<ToastDemo onOpenChange={onOpenChange} />);
    cy.get('button').click();
    cy.get('@onOpenChange').should('have.been.calledWith', true);
    cy.get('[role="status"]').within(() => {
      cy.get('button[aria-label="Close"]').click();
    });
    cy.get('@onOpenChange').should('have.been.calledWith', false);
  });

  it('handles custom duration', () => {
    cy.mount(<ToastDemo duration={2000} />);
    cy.get('button').click();
    cy.get('[role="status"]').should('be.visible');
    cy.wait(1000);
    cy.get('[role="status"]').should('be.visible');
    cy.wait(1500);
    cy.get('[role="status"]').should('not.exist');
  });
}); 