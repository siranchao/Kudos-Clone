
export const newKudo = async (receiver, gif, newMessage, sender) => {

  if (receiver.length === 0) {
    console.log("No Receiver")
  }
  else {
    const data = {
      sender: sender,
      receiver: receiver,
      kudoGif: gif.id,
      message: newMessage,
    }

    try {
      const res = await fetch(`https://rpdukudos-api.azurewebsites.net/api/kudos`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      const json = await res.json()
      console.log(json);

    } catch (error) {
      console.error(error)
    }
  }
}