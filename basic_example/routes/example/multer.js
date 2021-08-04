class multipartEx{
    static setting(app, upload){
        app.post('/multipartEx', upload.fields([
            { name: 'uploaded_file'},
            { name: 'content'}
          ]), function(req, res){
            console.log("::[start]==================");
            console.log(req.files);
            console.log("---------------------------");
            console.log(req.body.content);
            console.log("---------------------------");
            res.send("success");
            console.log("::[end]====================");
          })

        app.get('/multipartEx', function(req, res){
            res.render("multipartEx.html")
          })
    }
}

module.exports = multipartEx;
