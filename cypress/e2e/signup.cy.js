
import SignupPage from '../support/pages/signup'

describe('Cadastro', function () {

    context('quando o usuário é novato', function () {
        const user = {
            name: 'Ronaldo Miranda',
            email: 'ronaldovalenga95@gmail.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

        })

        it('Deve cadastrar com sucesso', function () {

            SignupPage.go()
            SignupPage.form(user)
            SignupPage.submit()
            SignupPage.toast.shouldHavetext('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })

    context('quando o email ja existe', function () {
        const user = {
            name: 'Juca junio',
            email: 'jucajunio@gmail.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })

        })
        it('Não deve cadastrar o usuario', function () {
            SignupPage.go()
            SignupPage.form(user)
            SignupPage.submit()
            SignupPage.toast.shouldHavetext('Email já cadastrado para outro usuário.')

        })

    })

    context('quando o email é incorreto', function () {
        const user = {
            name: 'Elizabetch Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123'
        }
        it('deve exibir mensagem de alerta', function () {
            SignupPage.go()
            SignupPage.form(user)
            SignupPage.submit()
            SignupPage.alertHavetext('Informe um email válido')
        })

    })

    context('quando a senha é muito curta', function () {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            SignupPage.go()
        })

        passwords.forEach(function (p) {
            it('Não deve cadastrar com a senha:' + p, function () {
                const user = { name: 'Jason Friday', email: 'jason@gmail.com', password: p }
                SignupPage.form(user)
                SignupPage.submit()

            })
        })

        afterEach(function () {
            SignupPage.alertHavetext('Pelo menos 6 caracteres')
        })

    })

    context('quando não preencho nenhum dos campos', function () {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(function () {
            SignupPage.go()
            SignupPage.submit()

        })

        alertMessages.forEach(function (alert) {
            it('deve exibir' + alert.toLowerCase(), function () {

                SignupPage.alertHavetext(alert)

            })

        })
    })


})

