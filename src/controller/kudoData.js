export const getKudos = () => {
 
    fetch("http://localhost:8000/api/kudos")
        .then(result => result.json())
        .then((json) => {});


}
export default function newKudo({receiver,gif,newMessage,send}) {
    if (receiver.length == 0) {
      setError(
        <p className="errorMessage">
          Please enter a person to receive the kudo!
        </p>
      )
    } else {
      const send = getUser().name;
      const gifid = gif.id;
      fetch(`http://localhost:8000/api/kudos`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          to: receiver[0],
          kudosType: parseInt(option),
          kudosMessage: newMessage,
          from: send ,
          kudoGif: gifid,
        }),
      })
        .then(function (response) {
            console.log(response);
          if (response.ok) {
            console.log("Click was recorded")
            return
          }
          throw new Error("Request failed.")
        })
        .catch(function (error) {
          console.log(error)
        })

      setError(<p color="green">Congratulations, your kudo has been sent!</p>)
    }
}