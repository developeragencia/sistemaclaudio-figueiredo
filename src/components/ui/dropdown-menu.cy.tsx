import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from './dropdown-menu';
import { Button } from './button';

describe('DropdownMenu Component', () => {
  const renderDropdownMenu = (props = {}) => {
    return cy.mount(
      <DropdownMenu {...props}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  beforeEach(() => {
    // Reset any previous dropdown state
    cy.get('body').click(0, 0);
  });

  it('renders trigger button', () => {
    renderDropdownMenu();
    cy.get('button').contains('Open Menu').should('be.visible');
  });

  it('opens on trigger click', () => {
    renderDropdownMenu();
    cy.get('button').contains('Open Menu').click();
    cy.get('[role="menu"]').should('be.visible');
  });

  it('displays menu items', () => {
    renderDropdownMenu();
    cy.get('button').contains('Open Menu').click();
    cy.get('[role="menu"]').within(() => {
      cy.contains('My Account').should('be.visible');
      cy.contains('Profile').should('be.visible');
      cy.contains('Billing').should('be.visible');
      cy.contains('Settings').should('be.visible');
      cy.contains('Log out').should('be.visible');
    });
  });

  it('closes on item click', () => {
    renderDropdownMenu();
    cy.get('button').contains('Open Menu').click();
    cy.contains('Profile').click();
    cy.get('[role="menu"]').should('not.exist');
  });

  it('closes on outside click', () => {
    renderDropdownMenu();
    cy.get('button').contains('Open Menu').click();
    cy.get('body').click(0, 0);
    cy.get('[role="menu"]').should('not.exist');
  });

  it('handles keyboard navigation', () => {
    renderDropdownMenu();
    cy.get('button').contains('Open Menu').focus();
    cy.focused().type('{enter}');
    cy.get('[role="menu"]').should('be.visible');
    cy.focused().type('{downArrow}');
    cy.contains('Profile').should('have.attr', 'data-highlighted');
  });

  it('handles disabled items', () => {
    cy.mount(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
          <DropdownMenuItem>Enabled Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    cy.get('button').contains('Open Menu').click();
    cy.contains('Disabled Item').should('have.attr', 'data-disabled');
    cy.contains('Disabled Item').click();
    cy.get('[role="menu"]').should('be.visible');
  });

  it('handles radio groups', () => {
    cy.mount(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="medium">
            <DropdownMenuRadioItem value="small">Small</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="large">Large</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    cy.get('button').contains('Open Menu').click();
    cy.contains('Medium').should('have.attr', 'data-state', 'checked');
    cy.contains('Large').click();
    cy.contains('Large').should('have.attr', 'data-state', 'checked');
  });

  it('handles checkbox items', () => {
    cy.mount(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>
            Show Status
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    cy.get('button').contains('Open Menu').click();
    cy.contains('Show Status').should('have.attr', 'data-state', 'checked');
    cy.contains('Show Status').click();
    cy.contains('Show Status').should('have.attr', 'data-state', 'unchecked');
  });

  it('handles sub menus', () => {
    cy.mount(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    cy.get('button').contains('Open Menu').click();
    cy.contains('More Options').trigger('mouseover');
    cy.contains('Sub Item 1').should('be.visible');
  });

  it('handles onSelect callback', () => {
    const onSelect = cy.stub().as('onSelect');
    cy.mount(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Click Me</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    cy.get('button').contains('Open Menu').click();
    cy.contains('Click Me').click();
    cy.get('@onSelect').should('have.been.calledOnce');
  });

  it('maintains proper ARIA attributes', () => {
    renderDropdownMenu();
    cy.get('button').contains('Open Menu').should('have.attr', 'aria-expanded', 'false');
    cy.get('button').contains('Open Menu').click();
    cy.get('button').contains('Open Menu').should('have.attr', 'aria-expanded', 'true');
  });

  it('handles custom className', () => {
    renderDropdownMenu({ className: 'custom-dropdown' });
    cy.get('button').contains('Open Menu').click();
    cy.get('.custom-dropdown').should('exist');
  });

  it('handles long content gracefully', () => {
    cy.mount(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            {'Very '.repeat(20) + 'long menu item that should be handled properly'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    cy.get('button').contains('Open Menu').click();
    cy.contains('long menu item that should be handled properly').should('be.visible');
  });

  it('maintains responsive design', () => {
    renderDropdownMenu();
    cy.viewport(320, 480); // Mobile viewport
    cy.get('button').contains('Open Menu').click();
    cy.get('[role="menu"]').should('be.visible');
    cy.viewport(1280, 720); // Desktop viewport
    cy.get('[role="menu"]').should('be.visible');
  });
}); 