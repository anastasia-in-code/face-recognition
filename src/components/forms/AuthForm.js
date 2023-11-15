import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import apiService from '../../api'
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import s from './AuthForm.module.css';
import { useUser, useUserDispatch } from '../../AuthContext';

//component is used for authentication (both signin and signup)
const AuthForm = ({ formName }) => {
    const user = useUser()
    const dispatch = useUserDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        if(user.id) navigate('/')
    }, [user])

    const onEmailChange = (event) => setEmail(event.target.value)

    const onPasswordChange = (event) => setPassword(event.target.value)

    const onNameChange = (event) => setName(event.target.value)

    //validation Schema on signup
    let siginupUserSchema = object({
        name: string().required().min(3),
        email: string().required().email().min(5),
        password: string().required().min(6)
    })

    //validation Schema on signin
    let sigininUserSchema = object({
        email: string().required(),
        password: string().required()
    })

    //AuthForm submittions
    const onSubmit = async () => {
        try {
            if (formName === "Sign Up") {
                await siginupUserSchema.validate({ name, email, password })
            } else {
                await sigininUserSchema.validate({ email, password })
            }

            const data = formName === "Sign Up" ?
                await apiService.signup(
                    email,
                    name,
                    password
                ) :
                await apiService.signin(email, password)

            if (data.id) {
                dispatch({
                    type: 'signin',
                    data
                })
                navigate('/')
            } else {
                return toast.error(data)
            }
        } catch (e) {
            return toast.error(e.message)
        }
    }

    return <div>
        <article className={`${s.authForm} br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center`}>
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset  id="sign_up" className="ba b--transparent ph0 mh0">
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
                                onClick={() => navigate('/signin')}
                                className="f6 link dim black db pointer"
                            >Sign In</p> :
                            <p
                                onClick={() => navigate('/signup')}
                                className="f6 link dim black db pointer"
                            >Sign Up</p>}
                    </div>
                </div>
            </main>
        </article>
    </div>
}

export default AuthForm