const ENDPOINT = "https://suiopback.herokuapp.com"

export default function loginServices ({email , passwordUser}) {
    return fetch(`${ENDPOINT}/api/signInUser`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, passwordUser})
    }).then(res=> {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const { access_token } = res
        return access_token
    })
}

