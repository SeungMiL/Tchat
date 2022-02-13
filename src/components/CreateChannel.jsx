import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import {UserList} from './';
import {CloseCreateChannel} from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName}) => {

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

const CreateChannel = ({createType, setIsCreating}) => {
    const {client, setActiveChannel} = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])

    const [channelName, setChannelName] = useState('');
    
    const createChannel = async (e) => {
        e.preventDefault();

        try {
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members: selectedUsers
            });

            await newChannel.watch();

            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);
        } catch (error){
            console.log(error);
        }
    }


    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'team' ? '새 채널 만들기' : '디엠 보내기'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating} />
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/> }
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
            </div>
            {/* <ChannelNameInput /> */}
        </div>
    )
}

export default CreateChannel