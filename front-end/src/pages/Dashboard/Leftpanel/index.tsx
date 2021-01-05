import React, {useState, useMemo} from 'react'
import {IconButton} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

import { Container, Header, HeaderSearchContainer, ContainerGroup, ContentGroup } from "./styles";

const Leftpanel: React.FC = () => {
  const [searchFind, setSearchFind] = useState<boolean>(false);

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
    </Container>
  )
}

export default Leftpanel