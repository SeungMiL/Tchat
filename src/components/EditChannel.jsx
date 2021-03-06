import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'

import { UserList } from './';
import { CloseCreateChannel } from '../assets';
import { async } from 'q';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])

  const handleChange = (e) => {
    e.preventDefault();

    setChannelName(e.target.value);
  }

  return (
    <div className="channel-name-input__wrapper">
      <p>이름</p>
      <input value={channelName} onChange={handleChange} placeholder="채널이름(공백X)" />
      <p>인원 추가</p>
    </div>
  )
}

const EditChannel = ({setIsEditing}) => {
  const {channel} = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (e) => {
    e.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if(nameChanged) {
      await channel.update({name: channelName}, {text : `Channel name changed to ${channelName}`});
    }

    if(selectedUsers.length){
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);

  }

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>채널 편집</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>편집 저장</p>
      </div>
    </div>
  )
}

export default EditChannel