import React from "react"
class Signup extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         signUpEmail: '',
         signUpPassword: '',
         signUpName: ''
      }
   }

   onEmailChange = (event) => {
      this.setState({ signUpEmail: event.target.value })
   }

   onPasswordChange = (event) => {
      this.setState({ signUpPassword: event.target.value })
   }

   onNameChange = (event) => {
      this.setState({ signUpName: event.target.value })
   }

   onSubmitSignUp = () => {
      fetch('http://localhost:3000/signup', {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            email: this.state.signUpEmail,
            password: this.state.signUpPassword,
            name: this.state.signUpName
         })
      })
         .then(res => res.json())
         .then(user => {
            if (user) {
               this.props.loadUser(user)
               this.props.onRouteChange('home')
            }
         })
   }
   render () {
      const {onRouteChange} = this.props
      return (
         <div>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
               <main className="pa4 black-80">
                  <div className="measure center">
                     <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
                        <div className="mt3">
                           <label
                              className="db fw6 lh-copy f6"
                              htmlFor="name">Name</label>
                           <input
                              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                              type="text"
                              name="name"
                              onChange={this.onNameChange}
                              id="name" />
                        </div>
                        <div className="mt3">
                           <label
                              className="db fw6 lh-copy f6"
                              htmlFor="email-address">Email</label>
                           <input
                              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                              type="email"
                              name="email-address"
                              autoComplete="email"
                              onChange={this.onEmailChange}
                              id="email-address" />
                        </div>
                        <div className="mv3">
                           <label
                              className="db fw6 lh-copy f6"
                              htmlFor="password"
                           >Password</label>
                           <input
                              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                              type="password"
                              autoComplete="current-password"
                              name="password"
                              onChange={this.onPasswordChange}
                              id="password" />
                        </div>
                     </fieldset>
                     <div className="">
                        <input
                           onClick={this.onSubmitSignUp}
                           className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                           type="submit"
                           value="Sign Up" />
                     </div>
                     <div className="lh-copy mt3">
                        <p
                           onClick={() => onRouteChange('signin')}
                           href="#0"
                           className="f6 link dim black db pointer"
                        >Sign in</p>
                     </div>
                  </div>
               </main>
            </article>
         </div>
      )
   }
   
}

export default Signup