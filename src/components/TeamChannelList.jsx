import React from 'react'

import { AddChannel } from '../assets'

const TeamChannelList = ({ children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    if (error) {
        return type === 'team'
            ? (
                <div className="team-channel-list">
                    <p className="team-channel-list-message">
                        연결 오류입니다. 잠시 기다렸다가 다시 시도하십시오.
                    </p>
                </div>
            )
            : null
    }

    if (loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list_message loading">
                    {type === 'team'
                        ? 'Channels'
                        : 'Messages'
                    } loading...
                </p>
            </div>
        )
    }


    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                    {type === 'team'
                        ? 'Channels'
                        : 'Direct Messages'
                    }
                </p>
                <AddChannel
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    type={type === 'team' ? 'team' : 'messaging'}
                />
            </div>
            {children}
        </div>
    )
}

export default TeamChannelList