
// Email template for user Activation Link
export const userActivationEmailTemplate = ({email,name,url}) => {
  return {
    from: 'declan25@ethereal.email',
    to: email,
    subject:"Hello",
    text:`Hello ${name}, Click the following link to activate your account. ${url}`,
    html:`
            <h4>Hello ${name}</h4>
            <br/>
            <br/>
            <br/>
            <p>Please click the following button to activate your Account</p>
            <br/>
            <br/>
            <br/>
            <a href=${url}><button style="background:green; color:white;padding:1rem 0.8rem;border:none;border-radius:10px;cursor:pointer">Activate Account</button></a>
          `
  }
}
