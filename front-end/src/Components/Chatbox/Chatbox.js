import "./Chatbox.scss";
import Conversation from "./Conversations/Conversations";
import { useState } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import { nanoid } from "nanoid";
import socket from "./Socket.IO/socket";

const Chatbox = ({ setClaimItem, claimItem, model, user, users, authenticated }) => {
const [connected, setConnected] = useState([])
const [connectedData, setConnectedData] = useState([])
const [messageHover, setMessageHover] = useState(false);
const [openConvo, setOpenConvo] = useState([])
const [allMessages, setAllMessages] = useState([])

if(claimItem.user.id){
	setClaimItem({user: {}, item: ''});
	let isUserConnected = connectedData.find((data) => data.username === claimItem.user.username)
	isAlreadyAnOpenConversation(claimItem.user)	

	if(isUserConnected){
		let sendThis = `Hi ${isUserConnected.username} 👋, I would like to claim my ${claimItem.item}. When is a good time to talk? 😁`
			socket.emit("private message", {
				sendThis,
				to: isUserConnected.userID,
			});

			setTimeout(() => {setAllMessages([...allMessages, {id: 'self', to: claimItem.user.username, message: sendThis}])
		}, 1000) }
}

	socket.on("connect", () => {
		console.log('Socket is connected')
		console.log("ID:", socket.id);
	});
	
	socket.onAny((event, ...args) => {
		console.log(event, args);
	});
	
	socket.on("connect_error", (err) => {
		if (err.message === "invalid username") {
			console.log('unable to connect')
		}
	});

	socket.on("connect", () => {
		users.forEach((user) => {
			if (user.self) {
				user.active = true;
			}
		});
	});
	
	socket.on("disconnect", () => {
		users.forEach((user) => {
			if (user.self) {
				user.active = false;
			}
		});
	});
	
	// THIS DISPLAYS MESSAGE TO RECEIVER
	socket.on("private message", ({ sendThis, from }) => {
		let searchFromName = (fromId) => { return connectedData.find((data) => fromId === data.userID)}
		let name = searchFromName(from)
		let searchUserData = (name) => { return users.find((user) => user.username === name)}
		if(name){
			let sender = searchUserData(name.username)
			setAllMessages([...allMessages, {id: sender.id, message: sendThis}])
			isAlreadyAnOpenConversation(sender)
		}
		// for (let i = 0; i < this.users.length; i++) {
		// 	const user = this.users[i];
		// 	if (user.userID === from) {
		// 		user.messages.push({
		// 			sendThis,
		// 			fromSelf: false,
		// 		});
		// 		if (user !== this.selectedUser) {
		// 			user.hasNewMessages = true;
		// 		}
		// 		break;
		// 	}
		// }
	});
	
	
	// THIS GIVES US CURRENT USERS
	socket.on("users", (users) => {
		let addActiveKey = users.map((user) => {
			user['active'] = true
			return user
		})
		console.log('current', users)
		setConnectedData([...connectedData, ...addActiveKey])
		users.forEach((user) => {
			user.self = user.userID === socket.id;
			setConnected([...connected, user.username ])
		});
		// put the current user first, and then sort by username
		socket.users = users.sort((a, b) => {
			if (a.self) return -1;
			if (b.self) return 1;
			if (a.username < b.username) return -1;
			return a.username > b.username ? 1 : 0;
		});
	});
		// THIS NOTIFIES US OF ANY NEW USERS CONNECTED
		socket.on("user connected", (user) => {
			user['active'] = true
			console.log("new", user, 'old', connectedData)
			let doesUserExist = (user) => connectedData.find((data) => data.username === user.username)
			if(doesUserExist(user)){
				console.log(user, ': will not be added.')
			} else {
				users.push(user);
				setConnected([...connected, ...user.username])
				setConnectedData([...connectedData, {...user}])
				console.log('after', connectedData)
			}
		});

  const hoverMouse = () => {
    setMessageHover(true);
  };

  const unhoverMouse = () => {
    setMessageHover(false);
  };
	if (authenticated && user.id){
			// THIS LETS USERS PICK THEIR NAME AND CONNECT TO SOCKET
			// WE ONLY WHAT TO CONNECT ONCE THEY SIGN IN
		let { username } = user
		socket.connect()
		socket.emit('new user', username)
		socket.auth = { username }
	} else {
			socket.off("connect_error");
	}

// THIS SENDS THE MESSAGE
function handleMessage(to, content){
	let sendThis = content
	let searchTo = (receiverUserName) => {return connectedData.find((data) => receiverUserName === data.username)}
	let receiver  = searchTo(to)
	// let searchFrom = (senderUserName) => { return connectedData.find((data) => senderUserName === data.username)}
	// let sender = searchFrom(user.username)
	console.log('this is to ', to)
	setAllMessages([...allMessages, {id: 'self', to: to, message: sendThis}])
	console.log('requested to send', sendThis, receiver)
	if(sendThis){
    socket.emit("private message", {
      sendThis,
      to: receiver.userID,
    });
	}
}

 const displayOpenConversation = () => {
	let currentRight = 10.5
	return ( 
		<section>
			{openConvo.map((conversation, index) => {
			return (
				<Conversation allMessages={allMessages} handleMessage={handleMessage} key={index} openConvo={openConvo} setOpenConvo={setOpenConvo} conversation={conversation} index={index} currentRight={currentRight}/>
				)})}
		</section>
	)}

	function isAlreadyAnOpenConversation(user2){
			let found = openConvo.find((user) => user2.id === user.id)
			if(!found && user.id !== user2.id){
				setOpenConvo([...openConvo, user2])
			}
	}

  const renderUsersOnMessages = (user2) => {
    return (
      <section key={nanoid()} className="messageProfiles">
        <Card className="messageCards" onClick={() => {isAlreadyAnOpenConversation(user2)}}>
          <Card.Img
            variant="top"
            className="cardProfileImg"
            src={user2.profileimg}
          />
          <Card.Body>
            <Card.Title>
              Name:{" "}
              <span>
                {connected.includes(user2.username) ? "✅" : ""}
                {user2.username}
              </span>
            </Card.Title>
          </Card.Body>
          {/* <Button
            variant="dark"
            onClick={() => {
              console.log(user2.username);
            }}
          >
            Message
          </Button> */}
        </Card>
      </section>
    );
  };
  // import socket from '../Socket.IO/socket';
  // 	if (item.itemName !== "end"){
  // 		let username = item.itemName
  // 		socket.emit('new user', username)
  // 		socket.auth = { username }
  // 		socket.connect()
  // 		console.log(socket)
  // } else {
  // 		socket.off("connect_error");
  // 		console.log(socket)
  // }

  return authenticated && user ? (
    <section className="chatboxSection">
      <div className={messageHover ? "customArrow sticky" : null}></div>
      <section
        className={`chatboxContainer sticky ${model ? "model-On" : ""}`}
        onMouseOver={hoverMouse}
        onMouseOut={unhoverMouse}
      >
        <Dropdown drop="up" className="messagesDropup">
          <img src={user.profileimg} alt="user" id="messagesIcon" />
          <Dropdown.Toggle id="messagesText" variant="light">
            Messages
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdownMenu">
            {users.map((user2) => {
              return renderUsersOnMessages(user2);
            })}
          </Dropdown.Menu>
        </Dropdown>
        {/* <h4 id="messagesText">Messages</h4> */}
        {openConvo.length > 0 ? displayOpenConversation() : ""}
      </section>
    </section>
  ) : null;
};

export default Chatbox;
