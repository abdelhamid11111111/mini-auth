import jwt from 'jsonwebtoken'


const SECRET = process.env.JWT_SECRET!

// generate a token, take id and email as input
export function signToken(payload: {id: number; email: string; username: string}) {

    // jwt.sign() take 3 things:
    // payload -> the data u want to store in token
    // SECRET -> ur JWT_SECRET from .env to sign it 
    // expiresIn -> token expires after 7 days
    return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

// verifies if token is valid, takes the token string as input
export function verifyToken(token: string) {
    try{

        // jwt.verify() checks:
        // is token real
        // is signature valid using SECRET
        // is it expired
        return jwt.verify(token, SECRET)
        
    } catch {
        return null
    }
}





