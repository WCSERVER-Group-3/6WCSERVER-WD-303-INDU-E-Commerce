const adminAuth = (req, res, next) => {
    if (req.session.admin) 
    {
        return next();
    } 
    else {
        res.redirect('/adminLogin');
    }
};

export default adminAuth;
