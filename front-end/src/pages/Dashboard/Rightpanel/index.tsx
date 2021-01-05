import React, {useState, useCallback} from 'react'
import {IconButton} from '@material-ui/core'
import {Search, Call, Info, MoreVert, AttachFile, SentimentSatisfiedOutlined, MicNone, Send} from '@material-ui/icons'
import {BiCheckDouble} from 'react-icons/bi'

import { Container, Header, ContainerMessages, ContainerMessage, MessageContent, Footer } from "./styles";

const Rightpanel: React.FC = () => {
  const [searchInput, setSearchInput] = useState("")

  const handleSearchInput = useCallback(
    (event) => {
      setSearchInput(event.target.value)
    },
    [setSearchInput],
  )

  return (
    <Container>
      <Header>
        <div>
          <span>Steven Martins</span>
          <p>last seen 1 hour ago</p>
        </div>

        <div>
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
        <ContainerMessage receive>
          <MessageContent>teste</MessageContent>

          <footer>15:02 <BiCheckDouble size={22} /></footer>
        </ContainerMessage>

        <ContainerMessage>
          <MessageContent>teste</MessageContent>

          <footer>15:02 <BiCheckDouble size={22} /></footer>
        </ContainerMessage>

        <ContainerMessage receive>
          <MessageContent>teste</MessageContent>

          <footer>15:02 <BiCheckDouble size={22} /></footer>
        </ContainerMessage>
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

export default Rightpanel