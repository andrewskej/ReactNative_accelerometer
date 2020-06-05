import React, { Component } from 'react'
// import axios from 'axios'

export default class FrontBall extends Component {
    state = {
        x:0,
        y:0
    }


   componentDidMount(){
        setInterval(() => {
            const url = 'http://localhost:3002/update'
            fetch(url)
            .then(res => res.json())
            .then(
                ({x,y}) => this.setState({
                    x,y
                },() => console.log(this.state))
            )
        },10)
   }

   

    render() {
        const {x,y} = this.state;

        return (
            <div className="ball" style={{border:'solid black 1px', width:'150px', height:'150px', backgroundColor:'red', borderRadius:'100%',  marginLeft:x, marginTop: y, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'30px'}}>
                x: {x}                
                y: {y}
            </div>
        )
    }
}
