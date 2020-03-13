import React from "react";
import troll from "./cardimage/troll.png";
import dragon from "./cardimage/dragon1.png";
import rare from '../../app/cards/rare.png'
import legendary from '../../app/cards/legendary.png'



class SingleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.flipCard = this.flipCard.bind(this);
    this.rarity = this.rarity.bind(this)
  }

  flipCard() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  rarity(minion){
    debugger
    switch (minion.rarity) {
      case "Common":
        return <img className="card" src={rare}></img>;
        break;
      case "Rare":
        return <img className="card" src={rare}></img>;
        break;
      case "Legendary":
        return <img className="card" src={legendary}></img>;
        break;
      case "Epic":
        return <img className="card" src={rare}></img>;
        break;

      default:
        break;
    }
  }

  render() {
    const minion = this.props.minion;
    return (
      <>
        <div id="container" class="col-lg-3">
          <div class="img-container">
            <div class="positioning">
              <ul>
                <li>
                  HP:{minion.hp}
                  <i className="fas fa-briefcase-medical">  </i>Defense:{minion.defense}<i class="fas fa-shield-alt"></i>
                </li>
              </ul>
            </div>
            {this.rarity(minion)}
          </div>
        </div>
      </>
    );
  }
}

export default SingleCard;
