import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {IconButton, Fab, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Drawer, Divider} from '@material-ui/core'
import {Add, ChevronLeft, ChevronRight} from '@material-ui/icons'
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import {format, parseISO} from 'date-fns'

import api from '../../../services/api';
import { useAuth } from '../../../hooks/Auth';

import { Container, Header, HeaderSearchContainer, ContainerGroup, ContentGroup, ContainerMenuFlutuante } from "./styles";

export interface Rooms {
  id: string;
  name: string;
  image: string;
  fullname: string;
  user_message: string;
  user_date: string;
}

interface LeftPanelParams {
  openDrawer: boolean;
  drawerWidth: number;
  roomSelected: Rooms;
  handleToggleDrawerOpen: () => void;
  handleRoomSelected: (rooms: Rooms) => void;
}

const Leftpanel = ({openDrawer, drawerWidth, roomSelected, handleToggleDrawerOpen, handleRoomSelected}: LeftPanelParams) => {
  const { data } = useAuth();

  const [searchFind, setSearchFind] = useState<boolean>(false);
  const [openMenuFlutuante, setOpenMenuFlutuante] = useState(false);
  const [openDialogCreateRoom, setOpenDialogCreateRoom] = useState(false);
  const [rooms, setRooms] = useState<Rooms[]>([])

  const buttonMenuFlutuanteRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(openMenuFlutuante);

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
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  }));

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    if (prevOpen.current === true && openMenuFlutuante === false && buttonMenuFlutuanteRef.current !== null) {
      buttonMenuFlutuanteRef.current.focus();
    }

    prevOpen.current = openMenuFlutuante;
  }, [openMenuFlutuante]);

  useEffect(() => {
    api.get(`/rooms/${data.user.id}`).then(result => {
      setRooms(result.data)
    })
  }, [data.user.id])

  const handleToogleDialog = useCallback(() => {
    setOpenDialogCreateRoom(value => !value)
  }, [])

  const handleToggle = useCallback(() => {
    setOpenMenuFlutuante((prevOpen) => !prevOpen);
  }, [])

  const handleCloseMenuFlutuante = useCallback((event: any) => {
    if (buttonMenuFlutuanteRef.current && buttonMenuFlutuanteRef.current.contains(event.target)) {
      return;
    }

    setOpenMenuFlutuante(false);
  }, [])

  const handleListKeyDown = useCallback((event: any) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenuFlutuante(false);
    }
  }, [])

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
          <Header>        
            <HeaderSearchContainer>
              <input name="search" type="text" placeholder="Search" {...eventHandlersSearch}/>
              
              {!searchFind ? <AiOutlineSearch size={18} /> : <AiOutlineClose size={18} />}
            </HeaderSearchContainer>
          </Header>
          <IconButton onClick={handleToggleDrawerOpen}>
            {theme.direction === "ltr" ? (
              <ChevronLeft />
            ) : (
              <ChevronRight />
            )}
          </IconButton>
        </div>
        <Divider />
        <ContainerGroup>

          {
            rooms && rooms.map((room) => (
              <ContentGroup
                selected={roomSelected.id === room.id ? true : false} 
                key={room.id} 
                onClick={() => handleRoomSelected(room)}
              >
                <div>
                  <img src={room.image} alt={room.name} />
                </div>

                <div>
                  <header>
                    <span>{room.name}</span>
                    {room.user_message && <time>{format(parseISO(room.user_date), 'd.MM.Y')}</time>}
                  </header>
             

                  {room.user_message && <p><span>{room.fullname}: </span>{room.user_message}</p>}
                </div>
              </ContentGroup>
            ))
          }
          
        </ContainerGroup>
      </Drawer>

      <ContainerMenuFlutuante>
        <Button
          ref={buttonMenuFlutuanteRef}
          aria-controls={openMenuFlutuante ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{
            marginTop: 200
          }}
        >
          <Fab aria-label="add">
            <Add />
          </Fab>
        </Button>
        <Popper
          open={openMenuFlutuante}
          anchorEl={buttonMenuFlutuanteRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "top" ? "center top" : "center top"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseMenuFlutuante}>
                  <MenuList
                    autoFocusItem={openMenuFlutuante}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={(event) => {
                      handleCloseMenuFlutuante(event); 
                      handleToogleDialog();
                    }}>
                        Nova sala
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <Dialog open={openDialogCreateRoom} onClose={handleToogleDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Cria sala</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Crie uma sala, para conversar com os seus amigos...
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nome sala"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToogleDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleToogleDialog} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </ContainerMenuFlutuante>
    </Container>
  )
}

export default Leftpanel