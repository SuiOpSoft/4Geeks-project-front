const ENDPOINT = "https://3001-sapphire-woodpecker-et5s1k92.ws-eu03.gitpod.io"

export default function loginServices ({email , password}) {
    return fetch(`${ENDPOINT}/api/signIn`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then(res=> {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const { access_token } = res
        return access_token
    })
}