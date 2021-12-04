import sgMail from '@sendgrid/mail'

export default async ( user: any ) => {

    await sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

    const msg = {
      to: user?.email || 'mikey.prus@gmail.com', // Change to your recipient
      from: process.env.NIVEST_EMAIL_ADDRESS || '', // Change to your verified sender NIVEST_EMAIL_ADDRESS
      subject: `Hey ${user?.first_name || user?.name || ''}, approve your account to complete your registration.`,
      text: `Welcome to NiVest! \n \n Congratulations on your access to crowdfunding and investments simulator.  \n \n Your approval code is ${user.code}`,
      html: `<h1>Welcome to NiVest!</h1> <h3>Congratulations on your access to crowdfunding and investments simulator.  </h3> <p>Your approval code is <strong>${user.code}</strong></p>`,
    }
    await sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })

}