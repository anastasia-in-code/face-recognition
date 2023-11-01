class apiService {
    BASE = 'https://glacial-harbor-16594-9b4b8730b23a.herokuapp.com'

    signin = async (email, password) => {
        try {
            const response = await fetch(`${this.BASE}/signin`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            const result = await response.json()
            
            return result
        } catch (error) {
            return { error }
        }
    }

    signup = async (email, name, password) => {
        try {
            const response = await fetch(`${this.BASE}/signup`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    name
                })
            })

            const result = await response.json()
            return result
        } catch (error) {
            return { error }
        }
    }

    clarifai = async (input) => {
        try {
            const response = await fetch(`${this.BASE}/imageurl`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: input,
                })
            })

            const result = await response.json()
            return result
        } catch (error) {
            return { error }
        }
    }

    updateEntries = async (id) => {
        try {
            const response = await fetch(`${this.BASE}/image`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                })
            })

            const result = await response.json()
            return result
        } catch (error) {
            return { error }
        }
    }
}

const apiServiceInstance = new apiService()

export default apiServiceInstance