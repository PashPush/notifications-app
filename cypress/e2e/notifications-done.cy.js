describe('Task done e2e', () => {
  beforeEach(() => {
    cy.visit('/')

    const now = new Date()

    cy.window().then(win => {
      win.localStorage.setItem(
        'task-store',
        `{"state":{"tasks":[{"id":"GtYhi0","title":"Посидеть с племянникaми","description":"Их приведут троих поиграть до обеда","date":"${now}","status":"PROCESS","isStale":false}],"sort":"dateAsc","filter":"PROCESS","search":"","editingTaskId":null},"version":0}`
      )
    })
  })

  it('should appear toaster and 10m+ button', () => {
    cy.contains('🔔 Уже').should('exist')
    cy.contains('10м+').should('exist')
  })

  it('should disappear after clicking OK', () => {
    cy.get('[data-test-id="toaster-done"]').click()
    cy.contains('🔔 Уже').should('not.exist')
    cy.get('h3').should('not.exist')
  })

  it('should disappear after clicking Напомнить позже', () => {
    cy.get('[data-test-id="toaster-postpone"]').click()
    cy.contains('🔔 Уже').should('not.exist')
    cy.get('h3').should('exist')
  })

  it('should be in DONE list after clicking OK', () => {
    cy.get('[data-test-id="toaster-done"]').click()
    cy.contains('Ожидаемые').click()
    cy.contains('Выполненные').click()
    cy.contains('Посидеть с племянникaми').should('exist')
  })
})
