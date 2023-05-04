const sgMail = require('@sendgrid/mail')

const sendResetPassword = async ({ firstName, lastName, email, token, origin }) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const resetURL = `${origin}/users/reset-password?token=${token}&email=${email}`

    const msg = {
        to: email,
        from: {name: 'Fitness Center System', email: 'fitness.center.project@gmail.com'},
        subject: 'Forgot Password',
        text: 'Reset Password Link has been sent',
        html: `
                <div>
                    <p>Hello, ${firstName} ${lastName}.</p>
                    </br>
                    <p>
                        Please reset password by clicking on the following link : <a href="${resetURL}">Reset Password</a> 
                    </p>
                    </br>
                    </br>
                    <p>Fitness Center</p>
                </div>
              `,
    }
    
    const info = await sgMail.send(msg)
}

module.exports = sendResetPassword
