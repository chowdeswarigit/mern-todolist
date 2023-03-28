import jwt from 'jsonwebtoken'

export const verifyJwtToken = async(req,res,next) => {
    try{
      const token = req.cookies.token.token
    
      if(!token) return res.status(401).json({mesage: 'Unauthorized'})
      jwt.verify(token, process.env.SECREAT_KEY, (err , user) => {
        if(err) {
            return res.status(401).json({message: 'Something Went Wrong'})
        }
        // return res.json({user})
        req.user = user
      }) 
      next()
    }
    catch(err) {
        next(err)
    }
}