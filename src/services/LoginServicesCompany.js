const ENDPOINT = "https://3001-gold-tortoise-uotg4rgj.ws-eu03.gitpod.io"

export default function loginServicesCompany({ companyUser, passwordCompany }) {
    
    return fetch(`${ENDPOINT}/api/signInCompany`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({companyUser, passwordCompany})
    }).then(res=> {
        if (!res.ok) throw new Error(res)
        return res.json()
    }).then(res => {
        const { access_token_company } = res
        return access_token_company
    })
}
