import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';

describe('Select Component', () => {
  const defaultItems = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ];

  const renderSelect = (props = {}) => {
    return cy.mount(
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {defaultItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  beforeEach(() => {
    // Reset any previous select state
    cy.get('body').click(0, 0);
  });

  it('renders with placeholder', () => {
    renderSelect();
    cy.get('[role="combobox"]').should('contain', 'Select a fruit');
  });

  it('opens content on click', () => {
    renderSelect();
    cy.get('[role="combobox"]').click();
    cy.get('[role="listbox"]').should('be.visible');
  });

  it('displays all options', () => {
    renderSelect();
    cy.get('[role="combobox"]').click();
    defaultItems.forEach((item) => {
      cy.get('[role="option"]').contains(item.label).should('be.visible');
    });
  });

  it('selects an option on click', () => {
    renderSelect();
    cy.get('[role="combobox"]').click();
    cy.get('[role="option"]').contains('Apple').click();
    cy.get('[role="combobox"]').should('contain', 'Apple');
  });

  it('closes content after selection', () => {
    renderSelect();
    cy.get('[role="combobox"]').click();
    cy.get('[role="option"]').contains('Apple').click();
    cy.get('[role="listbox"]').should('not.exist');
  });

  it('handles disabled state', () => {
    renderSelect({ disabled: true });
    cy.get('[role="combobox"]').should('have.attr', 'data-disabled');
    cy.get('[role="combobox"]').click();
    cy.get('[role="listbox"]').should('not.exist');
  });

  it('handles keyboard navigation', () => {
    renderSelect();
    cy.get('[role="combobox"]').click();
    cy.get('body').type('{downArrow}');
    cy.get('[role="option"]').first().should('have.attr', 'data-highlighted', 'true');
    cy.get('body').type('{downArrow}');
    cy.get('[role="option"]').eq(1).should('have.attr', 'data-highlighted', 'true');
  });

  it('handles keyboard selection', () => {
    renderSelect();
    cy.get('[role="combobox"]').click();
    cy.get('body').type('{downArrow}{enter}');
    cy.get('[role="combobox"]').should('contain', 'Apple');
  });

  it('handles onValueChange callback', () => {
    const onValueChange = cy.stub().as('onValueChange');
    renderSelect({ onValueChange });
    cy.get('[role="combobox"]').click();
    cy.get('[role="option"]').contains('Apple').click();
    cy.get('@onValueChange').should('have.been.calledWith', 'apple');
  });

  it('renders with default value', () => {
    renderSelect({ defaultValue: 'banana' });
    cy.get('[role="combobox"]').should('contain', 'Banana');
  });

  it('handles required attribute', () => {
    renderSelect({ required: true });
    cy.get('[role="combobox"]').should('have.attr', 'aria-required', 'true');
  });

  it('displays group label', () => {
    renderSelect();
    cy.get('[role="combobox"]').click();
    cy.get('[role="group"] [role="presentation"]').should('contain', 'Fruits');
  });

  it('handles custom className', () => {
    renderSelect({ className: 'custom-select' });
    cy.get('[role="combobox"]').should('have.class', 'custom-select');
  });

  it('handles form submission', () => {
    const onSubmit = cy.stub().as('onSubmit');
    cy.mount(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Select name="fruit" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {defaultItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <button type="submit">Submit</button>
      </form>
    );

    cy.get('[role="combobox"]').click();
    cy.get('[role="option"]').contains('Apple').click();
    cy.get('button[type="submit"]').click();
    cy.get('@onSubmit').should('have.been.calledOnce');
  });
}); 