import { useState } from "react"
import apiService from '../../api'

const AuthForm = ({ formName, onRouteChange, loadUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const onEmailChange = (event) => setEmail(event.target.value)

    const onPasswordChange = (event) => setPassword(event.target.value)

    const onNameChange = (event) => setName(event.target.value)
    
    const onSubmit = async () => {
        const data = formName === "Sign Up"?
        await apiService.signup(
            email,
            name,
            password
        ) : 
        await apiService.signin(email, password)

        if (data.id) {
            loadUser(data)
            onRouteChange('home')
        }
    }

    return <div>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">{formName}</legend>
                        {formName === "Sign Up" && <div className="mt3">
                            <label
                                className="db fw6 lh-copy f6"
                                htmlFor="name">Name</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="name"
                                onChange={onNameChange}
                                id="name" />
                        </div>}
                        <div className="mt3">
                            <label
                                className="db fw6 lh-copy f6"
                                htmlFor="email-address"
                            >Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                autoComplete="email"
                                onChange={onEmailChange}
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
                                onChange={onPasswordChange}
                                id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={onSubmit}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value={formName} />
                    </div>
                    <div className="lh-copy mt3">
                        {formName === 'Sign Up' ?
                            <p
                                onClick={() => onRouteChange('signin')}
                                href="#0"
                                className="f6 link dim black db pointer"
                            >Sign In</p> :
                            <p
                                onClick={() => onRouteChange('signup')}
                                href="#0"
                                className="f6 link dim black db pointer"
                            >Sign Up</p>}
                    </div>
                </div>
            </main>
        </article>
    </div>
}

export default AuthForm