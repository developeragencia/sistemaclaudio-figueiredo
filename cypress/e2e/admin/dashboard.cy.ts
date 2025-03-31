
describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/admin');
    // Login if required
    cy.get('body').then(($body) => {
      if ($body.find('form').length > 0) {
        cy.get('input[type="email"]').type('admin@example.com');
        cy.get('input[type="password"]').type('password123');
        cy.get('button[type="submit"]').click();
      }
    });

    // Wait for dashboard to load
    cy.get('h1').contains('Dashboard', { timeout: 10000 });
  });

  it('displays the dashboard page', () => {
    cy.get('h1').should('contain', 'Dashboard');
  });

  it('shows all dashboard widgets', () => {
    cy.get('[data-test="dashboard-widgets"]').within(() => {
      cy.get('[data-test="widget"]').should('have.length.at.least', 4);
    });
  });

  it('displays client information', () => {
    cy.get('[data-test="clients-widget"]').within(() => {
      cy.get('h3').should('contain', 'Clientes');
      cy.get('[data-test="clients-count"]').should('be.visible');
    });
  });

  it('displays financial overview', () => {
    cy.get('[data-test="financial-widget"]').within(() => {
      cy.get('h3').should('contain', 'Visão Financeira');
    });
  });

  it('displays recent activities', () => {
    cy.get('[data-test="activities-widget"]').within(() => {
      cy.get('h3').should('contain', 'Atividades Recentes');
      cy.get('[data-test="activity-item"]').should('have.length.at.least', 1);
    });
  });

  it('navigates to other sections', () => {
    cy.get('[data-test="nav-clientes"]').click();
    cy.url().should('include', '/clientes');
    
    cy.get('[data-test="nav-dashboard"]').click();
    cy.url().should('include', '/admin');
  });

  it('shows the sidebar toggle', () => {
    cy.get('[data-test="sidebar-toggle"]').should('be.visible').click();
    cy.get('[data-test="sidebar"]').should('have.class', 'collapsed');
    cy.get('[data-test="sidebar-toggle"]').click();
    cy.get('[data-test="sidebar"]').should('not.have.class', 'collapsed');
  });

  it('shows correct user information', () => {
    cy.get('[data-test="user-menu"]').click();
    cy.get('[data-test="user-name"]').should('be.visible');
    cy.get('[data-test="user-role"]').should('be.visible');
  });

  it('has functioning calendar widget', () => {
    cy.get('[data-test="calendar-widget"]').within(() => {
      cy.get('[data-test="calendar-today"]').click();
      cy.get('[data-test="calendar-events"]').should('be.visible');
    });
  });

  it('allows changing dashboard view modes', () => {
    cy.get('[data-test="view-mode-selector"]').click();
    cy.get('[data-test="view-mode-compact"]').click();
    cy.get('[data-test="dashboard-widgets"]').should('have.class', 'compact-mode');
  });
});
