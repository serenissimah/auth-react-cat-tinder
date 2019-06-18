import React, { useState, useEffect, } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { Header, Image, Card, Button, Icon, } from "semantic-ui-react";

const Home = () => {
  const [cats, setCats] = useState([]);

  useEffect( () => {
    axios.get("/api/cats")
      .then( res => setCats(res.data) )
  }, []);

  const sample = () => {
    if (cats.length) {
      const index = Math.floor(Math.random() * cats.length);
      return cats[index];
    } else {
      return null;
    };
  };

  const downVote = (id) => {
    setCats(cats.filter( c => c.id !== id ));
  };

  const upVote = (id) => {
    axios.put(`/api/cats/${id}`)
      .then( () => setCats(cats.filter( c => c.id !== id)) )
  };

  const cat = sample();
  if (cat) {
    return (
      <div>
        <br />
        <Header as="h3" textAlign="center">Cat Tinder</Header>
        <br />
        <Card>
          <Image src={cat.avatar} />
          <Card.Content>
            <Card.Header>
              { cat.name }
            </Card.Header>
            <Card.Description>
              { cat.breed }
            </Card.Description>
            <Card.Meta>
              { cat.registry }
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Button color="red" icon basic onClick={() => downVote(cat.id)}>
              <Icon name="thumbs down" />
            </Button>
            <Button color="green" icon basic onClick={() => upVote(cat.id)}>
              <Icon name="thumbs up" />
            </Button>
          </Card.Content>
        </Card>
        <Link to="/my-cats">
          <Button color="blue">
            My Cats
          </Button>
        </Link>
      </div>
    );
  } else {
    return <Header as="h2" textAlign="center">No More Cats</Header>
  };
};

export default Home;