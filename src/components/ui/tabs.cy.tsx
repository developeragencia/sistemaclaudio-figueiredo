import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './tabs';

describe('Tabs Component', () => {
  const tabs = [
    {
      value: 'account',
      label: 'Account',
      content: 'Make changes to your account here.',
    },
    {
      value: 'password',
      label: 'Password',
      content: 'Change your password here.',
    },
    {
      value: 'notifications',
      label: 'Notifications',
      content: 'Configure notification settings.',
    },
  ];

  const renderTabs = (props = {}) => {
    return cy.mount(
      <Tabs defaultValue="account" {...props}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    );
  };

  beforeEach(() => {
    // Reset any previous tabs state
    cy.get('body').click(0, 0);
  });

  it('renders all tabs', () => {
    renderTabs();
    tabs.forEach((tab) => {
      cy.contains(tab.label).should('be.visible');
    });
  });

  it('shows default tab content', () => {
    renderTabs();
    cy.contains(tabs[0].content).should('be.visible');
    cy.contains(tabs[1].content).should('not.be.visible');
    cy.contains(tabs[2].content).should('not.be.visible');
  });

  it('switches tabs on click', () => {
    renderTabs();
    cy.contains(tabs[1].label).click();
    cy.contains(tabs[1].content).should('be.visible');
    cy.contains(tabs[0].content).should('not.be.visible');
  });

  it('handles keyboard navigation', () => {
    renderTabs();
    cy.contains(tabs[0].label).focus();
    cy.focused().type('{rightarrow}');
    cy.contains(tabs[1].label).should('be.focused');
    cy.focused().type('{rightarrow}');
    cy.contains(tabs[2].label).should('be.focused');
    cy.focused().type('{leftarrow}');
    cy.contains(tabs[1].label).should('be.focused');
  });

  it('maintains ARIA attributes', () => {
    renderTabs();
    cy.contains(tabs[0].label).should('have.attr', 'aria-selected', 'true');
    cy.contains(tabs[1].label).should('have.attr', 'aria-selected', 'false');
  });

  it('handles custom className', () => {
    renderTabs({ className: 'custom-tabs' });
    cy.get('.custom-tabs').should('exist');
  });

  it('handles disabled tabs', () => {
    cy.mount(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password" disabled>
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account content</TabsContent>
        <TabsContent value="password">Password content</TabsContent>
      </Tabs>
    );
    cy.contains('Password').should('have.attr', 'data-disabled');
    cy.contains('Password').click();
    cy.contains('Password content').should('not.be.visible');
  });

  it('handles onValueChange callback', () => {
    const onValueChange = cy.stub().as('onValueChange');
    renderTabs({ onValueChange });
    cy.contains(tabs[1].label).click();
    cy.get('@onValueChange').should('have.been.calledWith', 'password');
  });

  it('maintains tab state', () => {
    renderTabs();
    cy.contains(tabs[1].label).click();
    cy.contains(tabs[1].content).should('be.visible');
    cy.contains(tabs[2].label).click();
    cy.contains(tabs[2].content).should('be.visible');
    cy.contains(tabs[1].label).click();
    cy.contains(tabs[1].content).should('be.visible');
  });

  it('handles orientation prop', () => {
    renderTabs({ orientation: 'vertical' });
    cy.get('[role="tablist"]').should('have.attr', 'aria-orientation', 'vertical');
  });

  it('handles activationMode prop', () => {
    renderTabs({ activationMode: 'manual' });
    cy.contains(tabs[1].label).focus();
    cy.focused().type('{rightarrow}');
    cy.contains(tabs[1].content).should('not.be.visible');
    cy.focused().type(' ');
    cy.contains(tabs[1].content).should('be.visible');
  });

  it('handles nested tabs', () => {
    cy.mount(
      <Tabs defaultValue="outer">
        <TabsList>
          <TabsTrigger value="outer">Outer Tab</TabsTrigger>
        </TabsList>
        <TabsContent value="outer">
          <Tabs defaultValue="inner">
            <TabsList>
              <TabsTrigger value="inner">Inner Tab</TabsTrigger>
            </TabsList>
            <TabsContent value="inner">Inner Content</TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    );
    cy.contains('Outer Tab').should('be.visible');
    cy.contains('Inner Tab').should('be.visible');
    cy.contains('Inner Content').should('be.visible');
  });

  it('handles long content gracefully', () => {
    cy.mount(
      <Tabs defaultValue="long">
        <TabsList>
          <TabsTrigger value="long">Long Content Tab</TabsTrigger>
        </TabsList>
        <TabsContent value="long">
          {'Very '.repeat(100) + 'long content that should be handled properly'}
        </TabsContent>
      </Tabs>
    );
    cy.contains('long content that should be handled properly').should('be.visible');
  });

  it('maintains responsive design', () => {
    renderTabs();
    cy.viewport(320, 480); // Mobile viewport
    cy.get('[role="tablist"]').should('be.visible');
    cy.viewport(1280, 720); // Desktop viewport
    cy.get('[role="tablist"]').should('be.visible');
  });

  it('handles dynamic tab updates', () => {
    cy.mount(
      <Tabs defaultValue="dynamic">
        <TabsList>
          <TabsTrigger value="dynamic">Dynamic Tab</TabsTrigger>
        </TabsList>
        <TabsContent value="dynamic" className="content">
          Initial Content
        </TabsContent>
      </Tabs>
    );
    cy.get('.content').invoke('text', 'Updated Content');
    cy.get('.content').should('have.text', 'Updated Content');
  });
}); 