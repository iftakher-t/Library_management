

const fileUplodeController = async (req,res) =>{
    console.log(req.file);
    res.send('File upload successfully')

}

module.exports = {
    fileUplodeController
}

