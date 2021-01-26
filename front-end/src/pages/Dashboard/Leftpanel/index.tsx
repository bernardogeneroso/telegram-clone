import React, {useState, useMemo, useRef, useCallback, RefObject} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {IconButton, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Drawer, Divider, Avatar, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Switch} from '@material-ui/core'
import {ChevronLeft, GroupAddOutlined,  ContactsOutlined, NightsStayOutlined, ExitToApp, Menu} from '@material-ui/icons'
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import {format, parseISO} from 'date-fns'

import api from '../../../services/api';
import { useAuth } from '../../../hooks/Auth';
import { useSockets, Rooms } from '../../../hooks/Sockets';
import { useToast } from '../../../hooks/Toast';

import { Container, Header, HeaderSearchContainer, HeaderDrawerMenu, ContainerGroup, ContentGroup } from "./styles";

interface LeftPanelParams {
  openDrawer: boolean;
  drawerWidth: number;
  refInputSearch: RefObject<HTMLInputElement>;
  handleToggleDrawerOpen: () => void;
}

const Leftpanel = ({openDrawer, drawerWidth, refInputSearch, handleToggleDrawerOpen}: LeftPanelParams) => {
  const { data, signOut } = useAuth()
  const {rooms, roomSelected, handleRoomSelected, leaveChannel, createRoom} = useSockets()
  const {addToast} = useToast()

  const [searchFind, setSearchFind] = useState<boolean>(false)
  const [openDialogCreateRoom, setOpenDialogCreateRoom] = useState<boolean>(false)
  const [openDrawerMenuAvatar, setOpenDrawerMenuAvatar] = useState<boolean>(false)
  const [nightMode, setNightMode] = useState<boolean>(false)

  const [groupName, setGroupName] = useState<string>("")

  const buttonMenuFlutuanteAvatarRef = useRef<HTMLButtonElement>(null);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex"
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: 0
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      justifyContent: "flex-end",
      height: 55
    },
    list: {
      width: 300,
    },
    fullList: {
      width: 'auto',
    }
  }));

  const classes = useStyles();

  const handleToogleDialog = useCallback(() => {
    setOpenDialogCreateRoom(value => !value)
  }, [])

  const handleToogleMenuDrawerMenu = useCallback(() => {
    setOpenDrawerMenuAvatar((prevOpen) => !prevOpen);
  }, [])

  const handleToggleNightMode = useCallback(
    () => {
      setNightMode(value => !value)
    },
    [],
  )

  const handleCreateRoom = useCallback(
    () => {
      if (groupName !== "") {
        const room_data = {
          name: groupName,
          users: [data.user.id]
        }

        api.post('/rooms/create-room', room_data).then(response => {
          let room_info: Rooms = response.data.room

          room_info = {
            ...room_info,
            image: "https://web.telegram.org/img/logo_share.png",
            fullname: null,
            user_message: null,
            user_date: null
          }

          createRoom(room_info)

          addToast({
            type: "success",
            title: "Group successfully created",
            description: `New group called ${room_info.name}`
          })
        })
      }
    },
    [groupName, data.user.id, addToast, createRoom],
  )

  const eventHandlersSearch = useMemo(() => ({
    onFocus: () => setSearchFind(true),
    onBlur: () => setSearchFind(false),
  }), []);

  return (
    <Container drawerWidth={drawerWidth}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <Button 
            ref={buttonMenuFlutuanteAvatarRef} 
            aria-controls={openDrawer ? 'menu-list-grow' : undefined} 
            aria-haspopup="true" 
            style={{
              minWidth: 'auto',
              opacity: 0.6
            }}
            onClick={handleToogleMenuDrawerMenu}
          >
            <Menu />
          </Button>

          <SwipeableDrawer
            anchor='left'
            open={openDrawerMenuAvatar}
            onClose={handleToogleMenuDrawerMenu}
            onOpen={handleToogleMenuDrawerMenu}
          >
            <div
              className={classes.list}
              role="presentation"
            >
              <HeaderDrawerMenu>
                <div>
                  <Avatar alt={data.user.fullname} src={data.user.image} />

                  <IconButton 
                    style={{
                      color: '#fff'
                    }}
                    onClick={handleToogleMenuDrawerMenu}
                  >
                    <ChevronLeft />
                  </IconButton>
                </div>

                <p>{data.user.fullname}</p>
              </HeaderDrawerMenu>
              <List>
                <ListItem 
                  button 
                  style={{
                    padding: '10px 22px'
                  }}
                  onClick={handleToogleDialog}
                >
                  <ListItemIcon><GroupAddOutlined /></ListItemIcon>
                  <ListItemText primary="New Group" />
                </ListItem>
                <ListItem 
                  button 
                  style={{
                    padding: '10px 22px'
                  }}
                >
                  <ListItemIcon><ContactsOutlined /></ListItemIcon>
                  <ListItemText primary="Contacts" />
                </ListItem>
                <ListItem 
                    button 
                    style={{
                    padding: '10px 22px'
                  }}
                >
                  <ListItemIcon><NightsStayOutlined /></ListItemIcon>
                  <ListItemText primary="Night Mode" />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={nightMode}
                      onChange={handleToggleNightMode}
                      name="nightModeChecked"
                      color="primary"
                      style={{
                        height: 39
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem 
                  button 
                  style={{
                    padding: '10px 22px'
                  }}
                  onClick={signOut}
                >
                  <ListItemIcon><ExitToApp /></ListItemIcon>
                  <ListItemText primary="Log Out" />
                </ListItem>
              </List>
            </div>
          </SwipeableDrawer>
          
          <Header>        
            <HeaderSearchContainer>
              <input name="search" type="text" placeholder="Search" ref={refInputSearch} {...eventHandlersSearch}/>
              
              {!searchFind ? <AiOutlineSearch size={18} /> : <AiOutlineClose size={18} />}
            </HeaderSearchContainer>
          </Header>
          {
            Object.keys(roomSelected).length !== 0 && (
              <IconButton onClick={handleToggleDrawerOpen}>
                <ChevronLeft />
              </IconButton>
            )
          }
        </div>
        <Divider />
        <ContainerGroup>

          {
            rooms && rooms.map((room) => (
              <ContentGroup
                selected={roomSelected.id === room.id ? true : false} 
                key={room.id} 
                onClick={() => {
                  leaveChannel(roomSelected.id)
                  handleRoomSelected(room)
                }}
              >
                <div>
                  <img src={room.image} alt={room.name} />
                </div>

                <div>
                  <header>
                    <span>{room.name}</span>
                    {room.user_date && <time>{format(parseISO(room.user_date), 'd.MM.Y')}</time>}
                  </header>
             

                  {room.user_message && <p><span>{room.fullname}: </span>{room.user_message}</p>}
                </div>
              </ContentGroup>
            ))
          }
          
        </ContainerGroup>
      </Drawer>

      <Dialog open={openDialogCreateRoom} onClose={handleToogleDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a group to chat with your friends ...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group's name"
            type="text"
            fullWidth
            onChange={(event) => setGroupName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToogleDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
                handleToogleDialog()
                handleCreateRoom()
          }} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Leftpanel