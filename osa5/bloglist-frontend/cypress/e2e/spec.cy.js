describe('blogtest', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.request('POST','http://localhost:3003/api/users',{
            username: 'user',
            name:'user',
            password: 'user'
        })
        cy.visit('http://localhost:3000')
	})
	it('login shows', () => {
		cy.contains('login')
        cy.contains('username')
        cy.contains('password')
	})

	describe('login works', function() {
        const correct = {
            user: 'user',
            pass: 'user'
        }
        const wrong = {
            user: 'test',
            pass: 'test'
        }
        it('if correct', function() {
            cy.get('input[name=username_input]').type(correct.user)
            cy.get('input[name=password_input]').type(correct.pass)
            cy.get('#loginBtn').click()
            cy.contains(`${correct.user} logged in`)
        })
        it('if wrong', function() {
            cy.get('input[name=username_input]').type(wrong.user)
            cy.get('input[name=password_input]').type(wrong.pass)
            cy.get('#loginBtn').click()
            cy.contains('invalid')
            cy.contains('login')
        })
    })

	describe('blogging works', function() {
        beforeEach( async function() {
            const response = await cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'user',
                password: 'user'
            })
            localStorage.setItem('user', JSON.stringify(response.body))
            const user = JSON.parse(window.localStorage.getItem('user'))
			Cypress.Commands.add('createBlog', ( blog ) => {
                cy.request({
                    url: 'http://localhost:3003/api/blogs',
                    method: 'POST',
                    body: blog,
                    headers: {
                        'Authorization': `bearer ${user.token}`
                    }
                })
            })
			Cypress.Commands.add('deleteBlog', ( blogID ) => {
                cy.request({
                    url: 'http://localhost:3003/api/blogs',
                    method: 'POST',
                    body: blogID,
                    headers: {
                        'Authorization': `bearer ${user.token}`
                    }
                })
            })
            cy.visit('http://localhost:3000')
        })
        it('post blog', function() {
            const blog = {
                title: 'testtitle',
                author: 'testauthor',
                likes: 10,
                url: 'url'
            }
            cy.createBlog(blog)
        })
		it('like blog', async function() {
            const blog = {
                title: 'testtitle',
                author: 'testauthor',
                likes: 10,
                url: 'url'
            }
            
            cy.createBlog(blog)

            cy.contains('show').click()
            cy.contains('like').click()
            cy.get('#blogshown').contains(`2`)
        })
		it('delete blog button shows', async function() {
			const blog = {
                title: 'testtitle',
                author: 'testauthor',
                likes: 10,
                url: 'url'
            }
			cy.createBlog(blog)
			cy.contains('show').click()
			cy.contains('delete')
		it('delete blog', async function() {
			const blog = {
                title: 'testtitle',
                author: 'testauthor',
                likes: 10,
                url: 'url'
            }
			cy.createBlog(blog)
			cy.contains('show').click()
			cy.contains('delete').click()
			cy.contains('testtitle').should('not.exist')
		})
		it('blogs are sorted by likes', async function() {
			const blog1 = {
                title: 'testtitle1',
                author: 'testauthor1',
                likes: 1,
                url: 'url1'
            }
			const blog2 = {
                title: 'testtitle2',
                author: 'testauthor2',
                likes: 10,
                url: 'url2'
            }
			const blog3 = {
                title: 'testtitle3',
                author: 'testauthor3',
                likes: 5,
                url: 'url3'
            }
			cy.createBlog(blog1)
			cy.createBlog(blog2)
			cy.createBlog(blog3)
			cy.get('#blog').then( blogs => {
				cy.wrap(blogs[0]).contains('testtitle1')
				cy.wrap(blogs[1]).contains('testtitle3')
				cy.wrap(blogs[2]).contains('testtitle2')
			})		
		})
    })
})
