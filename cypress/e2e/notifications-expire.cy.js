describe('Task done e2e', () => {
  it('should disappear by itself (because got stale - 1 hour or more left)', () => {
    cy.visit('/')

    const now = new Date(new Date().getTime() - 60 * 60 * 1000)

    cy.window().then(win => {
      win.localStorage.setItem(
        'task-store',
        `{"state":{"tasks":[{"id":"GtYhi0","title":"Посидеть с племянникaми","description":"Их приведут троих поиграть до обеда","date":"${now}","status":"PROCESS","isStale":false}],"sort":"dateAsc","filter":"PROCESS","search":"","editingTaskId":null},"version":0}`
      )
    })

    cy.contains('🔔 Уже').should('exist')
    cy.get('h3').should('not.exist')
  })

  it('should exist (because passed less than 1 hour )', () => {
    cy.visit('/')

    const now = new Date(new Date().getTime() - 50 * 60 * 1000)

    cy.window().then(win => {
      win.localStorage.setItem(
        'task-store',
        `{"state":{"tasks":[{"id":"GtYhi0","title":"Посидеть с племянникaми","description":"Их приведут троих поиграть до обеда","date":"${now}","status":"PROCESS","isStale":false}],"sort":"dateAsc","filter":"PROCESS","search":"","editingTaskId":null},"version":0}`
      )
    })

    cy.contains('🔔 Уже').should('exist')
    cy.wait(1000)
    cy.get('h3').should('exist')
  })

  it('should be in EXPIRED list', () => {
    cy.visit('/')

    const now = new Date(new Date().getTime() - 65 * 60 * 1000)

    cy.window().then(win => {
      win.localStorage.setItem(
        'task-store',
        `{"state":{"tasks":[{"id":"GtYhi0","title":"Посидеть с племянникaми","description":"Их приведут троих поиграть до обеда","date":"${now}","status":"PROCESS","isStale":false}],"sort":"dateAsc","filter":"PROCESS","search":"","editingTaskId":null},"version":0}`
      )
    })

    cy.contains('🔔 Уже').should('exist')
    cy.get('h3').should('not.exist')
    cy.contains('Ожидаемые').click()
    cy.contains('Пропущенные').click()
    cy.contains('Посидеть с племянникaми').should('exist')
  })
})
