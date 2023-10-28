module.exports=(err,req,res,next)=>{
    if(err instanceof Error){
        console.log(err)
        return res.status(500).json(err)
    }else if(err){
        const {status,message} = err
        console.log(err)
        return res.status(status).json({message})
    }
}