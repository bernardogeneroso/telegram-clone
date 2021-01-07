import React, {useState, useEffect, useCallback} from 'react'
import {IconButton} from '@material-ui/core'
import {Search, Call, Info, MoreVert, AttachFile, SentimentSatisfiedOutlined, MicNone, Send, Menu} from '@material-ui/icons'
import {BiCheckDouble} from 'react-icons/bi'
import {format, parseISO} from 'date-fns'

import { Container, Header, ContainerMessages, ContainerMessage, MessageContent, Footer } from "./styles";

import { useAuth } from '../../../hooks/Auth'
import {Rooms} from '../Leftpanel'
import api from '../../../services/api';

interface Messages {
  id: number;
  message: string;
  message_timestamp: string;
  fullname: string;
}

interface RightPanelParams {
  openDrawer: boolean;
  roomSelected: Rooms;
  handleToggleDrawerOpen: () => void;
}

const RightPanel = ({openDrawer, roomSelected, handleToggleDrawerOpen}: RightPanelParams) => {
  const {data} = useAuth()

  const [searchInput, setSearchInput] = useState("")
  const [messages, setMessages] = useState<Messages[]>([])

  useEffect(() => {
    api.get(`/messages/${roomSelected.id}`).then(result => {
      setMessages(result.data)
    })
  }, [roomSelected.id])

  const handleSearchInput = useCallback(
    (event) => {
      setSearchInput(event.target.value)
    },
    [setSearchInput],
  )

  return (
    <Container>
      <Header>
        {
          !openDrawer && (
            <IconButton 
              onClick={handleToggleDrawerOpen}
              style={{
                marginRight: 12
              }}
            >
              <Menu />
            </IconButton>
          )
        }

        {
          roomSelected && (
            <div>
              <span>{roomSelected.name}</span>
              <p>last seen 1 hour ago {roomSelected.user_date}</p>
            </div>
          )
        }

        <div className="header-right-icons">
          <IconButton>
            <Search style={{opacity: 0.6}} />
          </IconButton>
          <IconButton>
            <Call style={{opacity: 0.6}} />
          </IconButton>
          <IconButton>
            <Info style={{opacity: 0.6}} />
          </IconButton>
          <IconButton>
            <MoreVert style={{opacity: 0.6}} />
          </IconButton>
        </div>
      </Header>
      
      <ContainerMessages>
        {
          messages && messages.map((message) => (
            <ContainerMessage key={message.id} receive={message.fullname === data.user.fullname ? true : false} checked>
              <MessageContent>{message.message}</MessageContent>

              <footer>
                <p>
                  {message.fullname}
                </p>
                
                <div>
                  {format(parseISO(message.message_timestamp), 'k:m')} <BiCheckDouble size={22} />
                </div>
              </footer>
            </ContainerMessage>
          ))
        }
      </ContainerMessages>

      <Footer>
        <IconButton>
            <AttachFile style={{opacity: 0.6, fontSize: 30}} className="file" />
        </IconButton>

        <input type="text" placeholder="Write a message..." onChange={event => handleSearchInput(event)} />

        <IconButton>
            <SentimentSatisfiedOutlined style={{opacity: 0.6, fontSize: 30}} />
        </IconButton>
        
        {
          searchInput ? (
            <IconButton>
                <Send style={{opacity: 0.6, fontSize: 30, color: '#007EE4'}} />
            </IconButton>
          ) : (
            <IconButton>
                <MicNone style={{opacity: 0.6, fontSize: 30}} />
            </IconButton>
          )
        }
      </Footer>
    </Container>
  )
}

export default RightPanel