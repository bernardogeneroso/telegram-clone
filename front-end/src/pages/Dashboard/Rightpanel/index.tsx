import React, {useState, useEffect, useCallback, useRef} from 'react'
import {IconButton, Popper, Grow, Paper, MenuItem, ClickAwayListener, MenuList} from '@material-ui/core'
import {Search, Call, Info, MoreVert, AttachFile, SentimentSatisfiedOutlined, MicNone, Send, Menu} from '@material-ui/icons'
import {BiCheckDouble} from 'react-icons/bi'
import {format, parseISO} from 'date-fns'
import Picker from 'emoji-picker-react';

import { Container, Header, ContainerMessages, ContainerMessage, MessageContent, Footer, ContainerPicker } from "./styles";

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
  refInputSearch: React.RefObject<HTMLInputElement | null>;
  handleToggleDrawerOpen: () => void;
}

const RightPanel = ({openDrawer, roomSelected, refInputSearch, handleToggleDrawerOpen}: RightPanelParams) => {
  const {data} = useAuth()

  const [searchInput, setSearchInput] = useState("")
  const [messages, setMessages] = useState<Messages[]>([])
  const [openMenuFlutuanteInfo, setOpenMenuFlutuanteInfo] = useState<boolean>(false);
  const buttonMenuFlutuanteInfo = useRef<HTMLButtonElement>(null);
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false)

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

  const handleClickOnSearch = useCallback(
    () => {
      if (refInputSearch.current !== null) {
        refInputSearch.current.focus()
      }
    },
    [refInputSearch],
  )

  const handleToogleMenuFlutuanteInfo = useCallback(() => {
    setOpenMenuFlutuanteInfo((prevOpen) => !prevOpen);
  }, [])

  const handleCloseMenuFlutuanteInfo = useCallback((event: any) => {
    if (buttonMenuFlutuanteInfo.current && buttonMenuFlutuanteInfo.current.contains(event.target)) {
      return;
    }

    setOpenMenuFlutuanteInfo(false);
  }, [])

  const handleListKeyDown = useCallback((event: any) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenuFlutuanteInfo(false);
    }
  }, [])

  const onEmojiClick = useCallback((event, emojiObject) => {
    console.log(emojiObject.emoji)
    setSearchInput(value => value + emojiObject.emoji)
  }, [])

  const handleToggleEmojiPicker = useCallback(() => {
    setEmojiPicker(value => !value)
  }, [])

  return (
    <Container>
      <Header>
        {
          !openDrawer && (
            <IconButton 
              onClick={handleToggleDrawerOpen}
              style={{
                padding: '10px !important',
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
          <IconButton onClick={handleClickOnSearch}>
            <Search style={{opacity: 0.6}} />
          </IconButton>
          <IconButton>
            <Call style={{opacity: 0.6}} />
          </IconButton>
          <IconButton>
            <Info style={{opacity: 0.6}} />
          </IconButton>
          <IconButton 
            ref={buttonMenuFlutuanteInfo}
            onClick={handleToogleMenuFlutuanteInfo}>
            <MoreVert style={{opacity: 0.6}} />
          </IconButton>

          <Popper 
            open={openMenuFlutuanteInfo} 
            anchorEl={buttonMenuFlutuanteInfo.current} 
            role={undefined} 
            transition 
            disablePortal
            style={{
              zIndex: 99
            }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseMenuFlutuanteInfo}>
                    <MenuList autoFocusItem={openMenuFlutuanteInfo} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleCloseMenuFlutuanteInfo}>Profile</MenuItem>
                      <MenuItem onClick={handleCloseMenuFlutuanteInfo}>My account</MenuItem>
                      <MenuItem onClick={handleCloseMenuFlutuanteInfo}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>          
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
        <IconButton style={{
          marginLeft: 6
        }}>
            <AttachFile style={{opacity: 0.6, fontSize: 30}} className="file" />
        </IconButton>

        <input type="text" placeholder="Write a message..." onChange={handleSearchInput} value={searchInput} />

        <IconButton onClick={handleToggleEmojiPicker}>
            <SentimentSatisfiedOutlined style={{opacity: 0.6, fontSize: 30}} />
        </IconButton>
        
        {
          searchInput ? (
            <IconButton>
                <Send style={{opacity: 0.6, fontSize: 30, color: '#007EE4'}} />
            </IconButton>
          ) : (
            <IconButton 
              style={{
                marginRight: 6
              }}
            >
                <MicNone style={{opacity: 0.6, fontSize: 30}} />
            </IconButton>
          )
        }
      </Footer>

      {
        emojiPicker && (
          <ClickAwayListener onClickAway={handleToggleEmojiPicker}>
            <ContainerPicker>
              <Picker onEmojiClick={onEmojiClick} />
            </ContainerPicker>
          </ClickAwayListener>
        )
      }
    </Container>
  )
}

export default RightPanel