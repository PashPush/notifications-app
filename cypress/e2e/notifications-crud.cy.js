describe('CRUD operations e2e', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.get('input[name="title"]').type('Посидеть с племянником')
    cy.get('textarea').type('С утра его приведут и поиграть до обеда')
    cy.get('button[type="submit"]').click()
  })

  it('should have an empty form', () => {
    cy.get('form').should('exist')
    cy.get('input').should('have.value', '')
    cy.get('textarea').should('have.value', '')
    cy.get('button[type="submit"]').should('have.text', 'Добавить напоминание')
  })

  it('should add 2 more notifications in ascending order', () => {
    cy.get('input[name="title"]').type('День рождения подруги')
    cy.get('textarea').type('Купить цветы и игрушку для подруги')
    cy.get('[data-test-id="date-time-picker"]').click()
    cy.contains('25').click()
    cy.get('[data-test-id="date-time-picker"]').click()

    cy.get('button[type="submit"]').click()

    cy.get('h3').last().should('have.text', 'День рождения подруги')
    cy.get('input[name="title"]').should('have.value', '')

    cy.get('input[name="title"]').type('Съездить в гипермаркет')
    cy.get('textarea').type('Закупить всё необходимое на зиму')
    cy.get('[data-test-id="date-time-picker"]').click()
    cy.contains('19').click()
    cy.get('[data-test-id="date-time-picker"]').click()

    cy.get('button[type="submit"]').click()

    cy.get('h3').eq(1).should('have.text', 'Съездить в гипермаркет')
    cy.get('input[name="title"]').should('have.value', '')
  })

  it('should delete the notification', () => {
    cy.get('article button').last().click()
    cy.get('h3').should('not.exist')
  })

  it('should edit the notification', () => {
    cy.get('article button').first().click()
    cy.get('input[name="title"]').should('have.value', 'Посидеть с племянником')
    cy.get('textarea').should(
      'have.value',
      'С утра его приведут и поиграть до обеда'
    )

    cy.get('input[name="title"]').clear().type('Посидеть с племянникaми')
    cy.get('textarea').clear().type('Их приведут троих поиграть до обеда')

    cy.get('button[type="submit"]').click()

    cy.get('h3').first().should('have.text', 'Посидеть с племянникaми')
    cy.get('article div p')
      .last()
      .should('have.text', 'Их приведут троих поиграть до обеда')
  })
})
