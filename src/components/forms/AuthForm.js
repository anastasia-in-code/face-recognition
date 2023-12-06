import { useState } from "react"
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import s from './AuthForm.module.css';

const AuthForm = ({ setUserName }) => {
    const [name, setName] = useState('')

    const handleInputChange = (event, setState) => setState(event.target.value)

    //validation Schema on signup
    let validationSchema = object({
        name: string().required().min(3),
    })

    //AuthForm submittions
    const onSubmit = async () => {
        try {
            await validationSchema.validate({ name });

            localStorage.setItem('name', name)
            setUserName(name)
        } catch (e) {
            return toast.error(e.message)
        }
    }

    const onSkip = () => {
        localStorage.setItem('name', 'Anonymous')
        setUserName('Anonymous')
    }

    return <div>
        <article className={`${s.authForm} br3 ba b--black-10 mv4  shadow-5 center`}>
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <div className="mt3">
                            <label
                                className="db fw6 mb-10 lh-copy f6"
                                htmlFor="name">What is your name?</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="name"
                                onChange={(event) => handleInputChange(event, setName)}
                                id="name" />
                        </div>
                    </fieldset>
                    <div className={s.buttons}>
                        <button
                            onClick={onSubmit}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Save"
                        >Submit</button>
                        <p
                            onClick={onSkip}
                            className="f6 link dim black db pointer"
                        >{'Skip >>'}</p>
                    </div>
                    <div className="lh-copy mt3">
                    </div>
                </div>
            </main>
        </article>
    </div>
}

export default AuthForm