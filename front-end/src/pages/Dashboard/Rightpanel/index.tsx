import React, {useState, useCallback, useRef, useMemo, useEffect} from 'react'
import {IconButton, Popper, Grow, Paper, MenuItem, ClickAwayListener, MenuList} from '@material-ui/core'
import {Search, Call, MoreVert, AttachFile, SentimentSatisfiedOutlined, MicNone, Send, Menu} from '@material-ui/icons'
import {BiCheckDouble} from 'react-icons/bi'
import {format, parseISO, differenceInHours, differenceInMinutes, differenceInSeconds, differenceInDays, differenceInYears} from 'date-fns'
import Picker from 'emoji-picker-react';

import { Container, Header, ContainerMessages, ContainerMessage, MessageContent, Footer, ContainerPicker } from "./styles";

import { useAuth } from '../../../hooks/Auth'
import { useSockets } from '../../../hooks/Sockets'
import api from '../../../services/api';

interface RightPanelParams {
  openDrawer: boolean;
  refInputSearch: React.RefObject<HTMLInputElement | null>;
  handleToggleDrawerOpen: () => void;
}

const RightPanel = ({openDrawer, refInputSearch, handleToggleDrawerOpen}: RightPanelParams) => {
  const {data} = useAuth()
  const {messages, roomSelected, scrollStartMessage} = useSockets()

  const containerMessageRef = useRef<HTMLDivElement>(null);

  const [searchInput, setSearchInput] = useState("")
  const [openMenuFlutuanteInfo, setOpenMenuFlutuanteInfo] = useState<boolean>(false)
  const buttonMenuFlutuanteInfo = useRef<HTMLButtonElement>(null)
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false)

  useEffect(() => {
    if (scrollStartMessage){
      const scrollValue = containerMessageRef.current?.scrollHeight;
      if (scrollValue){
        containerMessageRef.current?.scrollTo(0, scrollValue);
      }
    }
  }, [scrollStartMessage])

  useEffect(() => {
    const scrollValue = containerMessageRef.current?.scrollHeight;
    const scrollTop = window.pageYOffset || containerMessageRef.current?.scrollTop
    const divHeight = containerMessageRef.current?.offsetHeight
    
    if (scrollValue && scrollTop && divHeight) {
      if ((scrollValue - scrollTop) <= (divHeight + 100)) {
        containerMessageRef.current?.scrollTo(0, scrollValue);
      }
    }
  }, [messages]);


 
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
    setSearchInput(value => value + emojiObject.emoji)
  }, [])

  const handleToggleEmojiPicker = useCallback(() => {
    setEmojiPicker(value => !value)
  }, [])

  const handleFooterSubmit = useCallback(async (event) => {
      event.preventDefault()

      if (searchInput !== "") {
        await api.post('/messages/newMessage', {
          user_id: data.user.id,
          room_id: roomSelected.id,
          user_fullname: data.user.fullname,
          message: searchInput
        })
        
        setSearchInput("")
      }
    },
    [searchInput, data.user.fullname, data.user.id, roomSelected.id],
  )

  const handleTimeOfMessages = useCallback((time: string) => {
    const dateNow = new Date()
    const formatTime = parseISO(time)

    const differenceInHoursNow = differenceInHours(dateNow, formatTime)
    if (differenceInHoursNow <= 18){
      return format(formatTime, 'k:mm')
    }

    return format(formatTime, 'd/MMM/Y - k:mm')
  }, [])

  const handleFormatDateOfRoom = useMemo(() => {
    if (!roomSelected.user_date) return roomSelected.user_date

    const dateNow = new Date()
    const roomTime = parseISO(roomSelected.user_date)

    const differenceInYearsNow = differenceInYears(dateNow, roomTime)
    if (differenceInYearsNow === 0){
      const differenceInDaysNow = differenceInDays(dateNow, roomTime)
      if (differenceInDaysNow === 0){
        const differenceInHoursNow = differenceInHours(dateNow, roomTime)
        if (differenceInHoursNow === 0){
          const differenceInMinutesNow = differenceInMinutes(dateNow, roomTime)
          if (differenceInMinutesNow  === 0){
            const differenceInSecondsNow = differenceInSeconds(dateNow, roomTime)
            if (differenceInSecondsNow >= 0 && differenceInSecondsNow <= 45){
              return 'seen a few seconds ago'
            }
          } else {
            if (differenceInMinutesNow > 0 && differenceInMinutesNow <= 10) {
              return `seen a ${(differenceInMinutesNow > 1) ? differenceInMinutesNow+" minutes" : differenceInMinutesNow+" minute"} ago`
            } else {
              return 'seen a few minutes ago'
            }
          }
        } else {
          return `last seen a ${(differenceInHoursNow > 1) ? differenceInHoursNow+" hours" : differenceInHoursNow+" hour"} ago`
        }
      } else {
        if (differenceInDaysNow === 1) {
          return `last seen a 1 day ago`
        } else {
          return `last seen ${format(roomTime, 'd.MM.Y')}`
        }
      }
    } else {
      if (differenceInYearsNow === 1) {
        return `last seen a 1 year ago in day ${format(roomTime, 'd.MM.Y')}`
      } else {
        return `last seen ${format(roomTime, 'd.MM.Y')}`
      }
    }
  }, [roomSelected.user_date])

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
              <p>{handleFormatDateOfRoom}</p>
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
                      <MenuItem onClick={handleCloseMenuFlutuanteInfo}>View profile</MenuItem>
                      <MenuItem onClick={handleCloseMenuFlutuanteInfo}>Leave group</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>          
        </div>
      </Header>
      
      <ContainerMessages ref={containerMessageRef}>
        {
          messages && messages.map((message) => (
            <ContainerMessage key={message.id} receive={message.fullname === data.user.fullname ? true : false} checked>
              <MessageContent>{message.message}</MessageContent>

              <footer>
                <p>
                  {message.fullname}
                </p>
                
                <div>
                  {handleTimeOfMessages(message.message_timestamp)} <BiCheckDouble size={22} />
                </div>
              </footer>
            </ContainerMessage>
          ))
        }
      </ContainerMessages>

      <Footer onSubmit={handleFooterSubmit}>
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
            <IconButton type="submit">
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