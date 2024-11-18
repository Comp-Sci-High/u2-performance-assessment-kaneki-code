const prompt = require(`prompt-sync`)()

require('dotenv').config()
const apiKey1 = process.env.OPENAI_API_KEY
const apiKey2 = process.env.Spotify_KEY
  
    
async function botmessage(bodydata) {
    const options = {
        method : "POST",
        headers:{
            AUthorization: "Bearer " + apiKey1,
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(bodydata)
    }
    
    let response = await fetch("https://api.openai.com/v1/chat/completions", options)
    let data = await response.json()
    return data;
}

let botbody = {
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        content: ""
      }
    ]
  }

 async function inputting(){
  let userInput = ""
  let loop = true 
  console.log("HI Chat Bot Here")
  console.log("What is your favorite artist")
 

  while(loop){
    let userInput = prompt("")
    botbody.messages[1].content = userInput
    let response  = await botmessage(botbody)
    console.log(response.choices[1].message.content)
    if (userInput == "stop"){
      console.log("Ok GoodBye")
      loop = false
    }
   }
  }
  
  inputting()

 async function albumCover(picture){
   const options ={
    method: "GET",
    headers:{
      AUthorization: "Bearer " + apiKey2,
      "Content-Type": "application/json",
    }
   }
   const response = await fetch("https://api.spotify.com/v1/search?query=" + picture + "&type=track", options)
   const data = await response.json()
   console.log(data)
   console.log(data.tracks.items[0].album.images[0].url)
 }

 let picture = prompt("what artists album cover do you want to see ")

 albumCover(picture)



   