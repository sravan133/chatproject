const express=require("express")



const menu=express()

const fs=require("fs")

const bodyParse=require("body-parser")
menu.use(bodyParse.urlencoded({extended:false}))



menu.get("/",(req,res,)=>{
    fs.readFile('message.txt',(err,data)=>{
        if(err){
            console.log(err)
            data="The Chat Does not Exist"
        }
        console.log("The message is Saved")
    
        res.send(`
        <p>${data}</p>
        <html>
        <body>
        <form action="/" onSubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
        <input type="text" id="message" name="message" placeHolder="message">
        <input type="hidden" id="username" name="username">
        <button type="submit">SUbmit</button>
        </body>
        </html>
        `)
    })
})

menu.post("/",(req,res)=>{
    
    
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("message.txt",`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{
        console.log(err)
    })
    res.redirect("/")

})

menu.get("/login",(req,res,next)=>{
    res.send(`

        <html>
        <body>
        <form onSubmit="localStorage.setItem('username',document.getElementById('username').value)" action="/login" method="POST" >
        <input type="text" id="username" name="username" placeHolder="username">
        
        <button type="submit">send</button>
        </form>
        </body>
        </html>
    `)

})

menu.post("/login",(req,res)=>{
    res.redirect("/")
})





menu.listen(4000,()=>{
    console.log("server is listening is at port at 4000!")
})