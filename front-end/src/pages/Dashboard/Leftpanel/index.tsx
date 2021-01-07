import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {IconButton, Fab, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Drawer, Divider} from '@material-ui/core'
import {Add, ChevronLeft, ChevronRight} from '@material-ui/icons'
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

import { Container, Header, HeaderSearchContainer, ContainerGroup, ContentGroup, ContainerMenuFlutuante } from "./styles";

interface LeftPanelParams {
  openDrawer: boolean;
  drawerWidth: number;
  handleToggleDrawerOpen: () => void;
}

const Leftpanel = ({openDrawer, drawerWidth, handleToggleDrawerOpen}: LeftPanelParams) => {
  const [searchFind, setSearchFind] = useState<boolean>(false);
  const [openMenuFlutuante, setOpenMenuFlutuante] = useState(false);
  const [openDialogCreateRoom, setOpenDialogCreateRoom] = useState(false);

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
          <ContentGroup>
            <div>
              <img src="https://web.telegram.org/img/logo_share.png" alt="Avatar-telegram"/>
            </div>

            <div>
              <header>
                <span>Steven Martins</span>
                <time>12.11.2020</time>
              </header>

              <p><span>You: </span>Noob</p>
            </div>
          </ContentGroup>

          <ContentGroup selected>
            <div>
              <img src="https://web.telegram.org/img/logo_share.png" alt="Avatar-telegram"/>
            </div>

            <div>
              <header>
                <span>Steven Martins</span>
                <time>12.11.2020</time>
              </header>

              <p><span>You: </span>Noob</p>
            </div>
          </ContentGroup>

          <ContentGroup>
            <div>
              <img src="https://web.telegram.org/img/logo_share.png" alt="Avatar-telegram"/>
            </div>

            <div>
              <header>
                <span>Steven Martins</span>
                <time>12.11.2020</time>
              </header>

              <p><span>You: </span>Noob</p>
            </div>
          </ContentGroup>

          <ContentGroup>
            <div>
              <img src="https://web.telegram.org/img/logo_share.png" alt="Avatar-telegram"/>
            </div>

            <div>
              <header>
                <span>Steven Martins</span>
                <time>12.11.2020</time>
              </header>

              <p><span>You: </span>Noob</p>
            </div>
          </ContentGroup>

          <ContentGroup>
            <div>
              <img src="https://web.telegram.org/img/logo_share.png" alt="Avatar-telegram"/>
            </div>

            <div>
              <header>
                <span>Steven Martins</span>
                <time>12.11.2020</time>
              </header>

              <p><span>You: </span>Noob</p>
            </div>
          </ContentGroup>
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