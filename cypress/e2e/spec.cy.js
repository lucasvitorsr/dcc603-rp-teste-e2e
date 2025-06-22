describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  });

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Edita uma tarefa existente', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]').type('Tarefa a ser editada{enter}');

    cy.get('[data-cy=todos-list] li').first().dblclick();
    
    cy.get('[data-cy=todos-list] li .edit')
      .clear()
      .type('Tarefa editada!{enter}');

    cy.get('[data-cy=todos-list] li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa editada!');
  });

  it('Marca/desmarca todas as tarefas como completas', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}');

    cy.get('[data-cy=todos-list]').children().should('have.length', 3);

    cy.get('.toggle-all-label').click(); 

    cy.get('[data-cy=todos-list] li').each(($li) => {
      cy.wrap($li).should('have.class', 'completed');
    });

    cy.get('.toggle-all-label').click(); 

    cy.get('[data-cy=todos-list] li').each(($li) => {
      cy.wrap($li).should('not.have.class', 'completed');
    });
  });

  it('Limpa todas as tarefas completas', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Tarefa Ativa{enter}')
      .type('Tarefa Completa 1{enter}')
      .type('Tarefa Completa 2{enter}');

    cy.get('[data-cy=todos-list] li').should('have.length', 3);

    cy.get('[data-cy=todos-list] li [data-cy=toggle-todo-checkbox]').eq(1).click();
    cy.get('[data-cy=todos-list] li [data-cy=toggle-todo-checkbox]').eq(2).click();

    cy.get('[data-cy=todos-list] li.completed').should('have.length', 2);

    cy.get('.clear-completed').click(); 

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa Ativa');
  });

});