import React from 'react';
import { Container, Header, Left, Body, Footer, Content, Icon, Button, Item, Input, Text, ListItem, List, Spinner, Thumbnail } from 'native-base';
import axios from 'axios';


class App extends React.Component {

  state = {
    name: "",
    temp_name: "",
    search: "",
    dataPlayer: [],
    isLoading: false
  }

  searchApi = () => {
    this.setState({
      isLoading: true
    })
    axios.get(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=${this.state.search}`).then((x) => {
      if (x.data.player) {
        this.setState({
          isLoading: false,
          dataPlayer: x.data.player
        })
      }
      else {
        alert("Data not found!");
        this.setState({
          isLoading: false
        })
      }

    }).catch(() => {
      alert("Please check your internet connection!");
    })

  }


  render() {

    var dataPlayer = this.state.dataPlayer.map((val, i) => {
      var name = val.strPlayer;
      var position = val.strPosition;
      var image = val.strThumb;
      return (
        <ListItem key={i} avatar>
          <Left>
            <Thumbnail source={{ uri: image }} />
          </Left>
          <Body>
            <Text>{name}</Text>
            <Text note>{position}</Text>
          </Body>
        </ListItem>
      )
    })

    return (
      <Container>
        <Header searchBar rounded style={{ backgroundColor: "gray" }}>
          <Item>
            <Icon name="search" />
            <Input placeholder="Input team name.." onChangeText={(e) => {
              this.setState({
                search: e
              })
            }}></Input>
          </Item>
        </Header>
        <Content>
          <Button full iconLeft success onPress={this.searchApi}>
            <Text>Search Player</Text>
          </Button>
          <ScrollView>
            <List>
              {this.state.isLoading ? <Spinner /> : dataPlayer ? dataPlayer : ""}
            </List>
          </ScrollView>
        </Content>
        <Footer></Footer>
      </Container>

    )
  }
}


export default App;