import React, {useEffect, useState} from 'react';
import {Avatar, useChatContext} from 'stream-chat-react'

import {InviteIcon} from '../assets';

const ListContainer = ({children}) => {
    return(
        <div className="user-list__container">
            <div className="user-list__header">
                <p>유저</p>
                <p>방문자</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({user, setSelectedUsers}) => {

    const [seleted, setSelected] = useState(false)

    const handleSelect = () => {

        if(seleted){
            setSelectedUsers((prevUsers)=> prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }
        setSelected((prevSelected) => !prevSelected);
    }
    return(
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            
            {seleted ? <InviteIcon /> : <div className="user-item__invite-empty" />}
        </div>
    )
}





const UserList = ({setSelectedUsers}) => {
    
    const {client} = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] =useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const getUsers = async () => {
            if(loading) return;
            setLoading(true);

            try {
                const response = await client.queryUsers(
                    {id : {$ne: client.userID}},
                    {id: 1},
                    {limit: 8}
                );

                if(response.users.length){
                    setUsers(response.users);
                } else {
                    setListEmpty(true);
                }
                
            } catch (error){
                setError(true);
            }
            setLoading(false);
        }
        if(client) getUsers()
    }, []);

    if(error){
        return(
            <ListContainer>
            <div className="user-list__message">
                로딩되지 않았습니다 재시도 해주세요.
            </div>
            </ListContainer>
        )
    }

    if(listEmpty){
        return(
            <ListContainer>
            <div className="user-list__message">
                유저를 찾지 못했습니다.
            </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                유저 불러오는중...
            </div> : (
                users?.map((user, i) => (
                    <UserItem  index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
                ))
            )
            }
        </ListContainer>
    )
}

export default UserList;