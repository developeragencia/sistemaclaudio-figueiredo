import { Checkbox } from './checkbox';

describe('Checkbox Component', () => {
  it('renders unchecked by default', () => {
    cy.mount(<Checkbox />);
    cy.get('button[role="checkbox"]').should('have.attr', 'data-state', 'unchecked');
  });

  it('can be checked and unchecked', () => {
    cy.mount(<Checkbox />);
    cy.get('button[role="checkbox"]').click();
    cy.get('button[role="checkbox"]').should('have.attr', 'data-state', 'checked');
    cy.get('button[role="checkbox"]').click();
    cy.get('button[role="checkbox"]').should('have.attr', 'data-state', 'unchecked');
  });

  it('renders with default checked state', () => {
    cy.mount(<Checkbox defaultChecked />);
    cy.get('button[role="checkbox"]').should('have.attr', 'data-state', 'checked');
  });

  it('can be disabled', () => {
    cy.mount(<Checkbox disabled />);
    cy.get('button[role="checkbox"]').should('have.attr', 'disabled');
    cy.get('button[role="checkbox"]').should('have.class', 'cursor-not-allowed');
    cy.get('button[role="checkbox"]').should('have.class', 'opacity-50');
  });

  it('handles onChange events', () => {
    const onCheckedChange = cy.stub().as('onCheckedChange');
    cy.mount(<Checkbox onCheckedChange={onCheckedChange} />);
    cy.get('button[role="checkbox"]').click();
    cy.get('@onCheckedChange').should('have.been.calledWith', true);
    cy.get('button[role="checkbox"]').click();
    cy.get('@onCheckedChange').should('have.been.calledWith', false);
  });

  it('renders with custom className', () => {
    cy.mount(<Checkbox className="custom-class" />);
    cy.get('button[role="checkbox"]').should('have.class', 'custom-class');
  });

  it('handles keyboard interactions', () => {
    cy.mount(<Checkbox />);
    cy.get('button[role="checkbox"]').focus();
    cy.get('button[role="checkbox"]').type(' '); // Space key
    cy.get('button[role="checkbox"]').should('have.attr', 'data-state', 'checked');
    cy.get('button[role="checkbox"]').type(' '); // Space key
    cy.get('button[role="checkbox"]').should('have.attr', 'data-state', 'unchecked');
  });

  it('renders with label using aria-label', () => {
    cy.mount(<Checkbox aria-label="Accept terms" />);
    cy.get('button[role="checkbox"]').should('have.attr', 'aria-label', 'Accept terms');
  });

  it('renders with required attribute', () => {
    cy.mount(<Checkbox required />);
    cy.get('button[role="checkbox"]').should('have.attr', 'required');
  });

  it('handles form submission', () => {
    const onSubmit = cy.stub().as('onSubmit');
    cy.mount(
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        <Checkbox name="terms" required />
        <button type="submit">Submit</button>
      </form>
    );
    cy.get('button[role="checkbox"]').click();
    cy.get('button[type="submit"]').click();
    cy.get('@onSubmit').should('have.been.calledOnce');
  });

  it('renders with indeterminate state', () => {
    cy.mount(<Checkbox checked="indeterminate" />);
    cy.get('button[role="checkbox"]').should('have.attr', 'data-state', 'indeterminate');
  });

  it('maintains focus state styles', () => {
    cy.mount(<Checkbox />);
    cy.get('button[role="checkbox"]').focus();
    cy.get('button[role="checkbox"]').should('have.class', 'ring-offset-background');
  });

  it('renders with custom id', () => {
    cy.mount(<Checkbox id="custom-id" />);
    cy.get('button[role="checkbox"]').should('have.attr', 'id', 'custom-id');
  });
}); 