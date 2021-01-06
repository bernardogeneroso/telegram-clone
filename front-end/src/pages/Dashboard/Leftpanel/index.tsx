import React, {useState, useMemo, useRef, useCallback} from 'react'
import {IconButton, Fab, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField} from '@material-ui/core'
import {Menu, Add} from '@material-ui/icons'
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

import { Container, Header, HeaderSearchContainer, ContainerGroup, ContentGroup, ContainerMenuFlutuante } from "./styles";
import { useEffect } from 'react';

const Leftpanel: React.FC = () => {
  const [searchFind, setSearchFind] = useState<boolean>(false);
  const [openMenuFlutuante, setOpenMenuFlutuante] = useState(false);
  const [openDialogCreateRoom, setOpenDialogCreateRoom] = React.useState(false);

  const handleToogleDialog = useCallback(() => {
    setOpenDialogCreateRoom(value => !value)
  }, [])

  const buttonMenuFlutuanteRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(openMenuFlutuante);

  const handleToggle = () => {
    setOpenMenuFlutuante((prevOpen) => !prevOpen);
  };

  const handleCloseMenuFlutuante = (event: any) => {
    if (buttonMenuFlutuanteRef.current && buttonMenuFlutuanteRef.current.contains(event.target)) {
      return;
    }

    setOpenMenuFlutuante(false);
  };

  function handleListKeyDown(event: any) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenuFlutuante(false);
    }
  }
  useEffect(() => {
    if (prevOpen.current === true && openMenuFlutuante === false && buttonMenuFlutuanteRef.current !== null) {
      buttonMenuFlutuanteRef.current.focus();
    }

    prevOpen.current = openMenuFlutuante;
  }, [openMenuFlutuante]);

  const eventHandlersSearch = useMemo(() => ({
    onFocus: () => setSearchFind(true),
    onBlur: () => setSearchFind(false),
  }), []);

  return (
    <Container>
      <Header>        
        <IconButton>
          <Menu style={{opacity: 0.8}} />
        </IconButton>

        <HeaderSearchContainer>
          <input name="search" type="text" placeholder="Search" {...eventHandlersSearch}/>
          
          {!searchFind ? <AiOutlineSearch size={18} /> : <AiOutlineClose size={18} />}
        </HeaderSearchContainer>
      </Header>

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
          <Fab color="primary" aria-label="add">
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
                        Nova conversa
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <Dialog open={openDialogCreateRoom} onClose={handleToogleDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Cria uma sala</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Crie uma nova sala, para conversar com os seus amigos...
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