import React, { Component } from "react";
import PropTypes from "prop-types";

import CustomerSupportListComponent from "./CustomerSupportListComponent";
import apiServices from "../../../service/RequestHandler";
import { authClass } from "../../../utils/auth.util";
import * as authUtil from "../../../utils/auth.util";
import { importFirebase } from "../../../utils/functions";
import EmptyDataPlaceholder from "../../../components/layout/EmptyDataPlaceholder";
import MicRecorder from "mic-recorder-to-mp3";
import "./style.css";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class CustomerSupportListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      currentPeerUser: null,
      showChat: false,
      selectedChat: "",
      messages: [],
      isRecording: false,
      audioUrl: "",
      isBlocked: false,
    };

    this.listUser = [];
    this.messageRef = null;
  }

  componentDidMount = () => {
    const user = authClass.getUser;
    this.currentUserId = user._id;
    this.getListUser();
    // this.handleFirebase();
    this.getMedia();
    /*navigator.getUserMedia(
      { audio: true },
      () => {
        this.setState({ isBlocked: false });
      },
      () => {
        this.setState({ isBlocked: true });
      }
    );*/
  };

  async getMedia() {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      /* use the stream */
      if (stream) {
        console.log("stream : ", stream);
        this.setState({ isBlocked: false });
      }
    } catch (err) {
      /* handle the error */
      alert(err);
      console.log(err);
      this.setState({ isBlocked: true });
    }
  }

  getListUser = async () => {
    try {
      const response = await apiServices.getAllChats();
      console.log(">>>>all user list", response.data);
      if (response.data.length > 0) {
        this.listUser = [...response.data];
        this.setState({ activity: false });
      }
    } catch (error) {
      this.setState({ activity: false });
    }
  };

  renderListUser = () => {
    if (this.listUser.length > 0) {
      let viewListUser = [];
      this.listUser.forEach((item, index) => {
        const chatUser = item.user ? item.user : item.transporter;
        if (chatUser._id !== this.currentUserId) {
          viewListUser.push(
            <button
              key={index}
              className={
                this.state.currentPeerUser &&
                  this.state.currentPeerUser.id === item.chatUser._id
                  ? "viewWrapItemFocused"
                  : "viewWrapItem"
              }
              onClick={() => this.handleToggleChat(true, item)}
            // onClick={() => {
            //   this.setState({ currentPeerUser: item })
            // }}
            >
              <img
                className="viewAvatarItem"
                src={
                  chatUser.picture ||
                  require("../../../static/images/image-user.png")
                }
                alt="icon avatar"
              />
              <div className="viewWrapContentItem">
                <span className="textItem">{`Nickname: ${
                  chatUser.firstName + " " + chatUser.lastName
                  }`}</span>
                <span className="textItem">{`Last Message: ${item.lastMessage}`}</span>
              </div>
            </button>
          );
        }
      });
      return viewListUser;
    } else {
      return (
        <div className="body">
          <EmptyDataPlaceholder message="No Chats found." />
        </div>
      );
    }
  };

  async handleFirebase(id) {
    const { database } = await importFirebase();
    this.messageRef = database().ref("messages").child(id);

    this.messageRef.on("value", (message) => {
      if (message.val()) {
        this.setState(
          {
            messages: Object.values(message.val()),
          },
          () => {
            console.log("set state", this.state);
          }
        );
      }
    });
  }

  async uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiServices.uploadAFile(formData);
    return { path: response.data.path, stateKey: file.stateKey };
  }

  createFile = (file) => {
    var d = new Date();
    var n = d.getTime();
    const fileName = "uploaded_file.mp3" + n;
    var newfile = new File([file], fileName, {
      type: "audio/mpeg",
      lastModified: Date.now(),
    });
    return newfile;
  };

  onShareCurrentLocation = async () => {
    const location = await authUtil.getCurrentLocation();
    console.log("this is complete location", location);
    const ShareLocationUrl = `https://www.google.com/maps/place/${location[1]},${location[0]}`;
    this.handleSendLocationMessage(ShareLocationUrl);
  };

  handleSendMessage = (message) => {
    if (message) {
      const newItem = {
        userName: authClass.getUser.name,
        message: message,
        sender: authClass.getUser._id,
        date: new Date().getTime(),
        status: "pending",
        type: "text",
      };
      this.messageRef.push(newItem);
    }
  };

  handleSendLocationMessage = (message) => {
    if (message) {
      const newItem = {
        userName: authClass.getUser.name,
        message: message,
        sender: authClass.getUser._id,
        date: new Date().getTime(),
        status: "pending",
        type: "location",
      };
      this.messageRef.push(newItem);
    }
  };

  handleSendAudioMessage = (audio) => {
    if (audio) {
      const newItem = {
        userName: authClass.getUser.name,
        message: "audio",
        sender: authClass.getUser._id,
        date: new Date().getTime(),
        status: "pending",
        type: "audio",
        media: audio,
      };
      this.messageRef.push(newItem);
    }
  };

  onStartVoiceRecord = () => {
    if (this.state.isBlocked) {
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  onStopVoiceRecord = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        const audioFile = this.createFile(blob);
        const audioUrl = await this.uploadFile(audioFile);
        this.handleSendAudioMessage(audioUrl.path);
        this.setState({ audioUrl: audioUrl.path, isRecording: false });
      })
      .catch((e) => console.log(e));
  };

  onRemoveVoiceRecord = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        this.setState({ isRecording: false });
      })
      .catch((e) => console.log(e));
  };

  handleToggleChat = (value, item) => {
    console.log("This is the item i receive in toogle chat", value, item)
    this.setState({
      showChat: typeof value === "boolean" ? value : false,
      selectedChat: item,
    });
    this.handleFirebase(item._id);
  };

  render() {
    return (
      <CustomerSupportListComponent
        {...this.state}
        user={authClass.getUser}
        handleClick={this.handleClick}
        renderListUser={this.renderListUser}
        handleToggleChat={this.handleToggleChat}
        handleSendMessage={this.handleSendMessage}
        handleStartRecording={this.onStartVoiceRecord}
        handleStopRecording={this.onStopVoiceRecord}
        handleShareLocation={this.onShareCurrentLocation}
        handleRemoveRecording={this.onRemoveVoiceRecord}
      />
    );
  }
}

CustomerSupportListContainer.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
};
